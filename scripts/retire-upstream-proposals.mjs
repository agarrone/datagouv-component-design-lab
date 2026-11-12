import { execFileSync } from 'node:child_process';
import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeIfChanged } from './lib/write-if-changed.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const checkout = join(root, 'upstream');
const proposalsPath = join(root, 'proposals/proposals.json');
const statusesPath = join(root, 'data/audit-statuses.json');
const illustrationUsagePath = join(root, 'data/illustration-component-usage.json');
const reportPath = join(root, 'data/retired-proposals.json');
const lock = JSON.parse(await readFile(join(root, 'upstream.lock.json'), 'utf8'));
const proposals = JSON.parse(await readFile(proposalsPath, 'utf8'));
const statuses = JSON.parse(await readFile(statusesPath, 'utf8'));
const illustrationUsage = JSON.parse(await readFile(illustrationUsagePath, 'utf8'));
const previousCommit = proposals.find(proposal => proposal.sourceCommit)?.sourceCommit;

if (!previousCommit) throw new Error('Aucun commit source trouvé dans les propositions.');
const checkoutCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
if (checkoutCommit !== lock.commit) throw new Error('Le checkout upstream doit correspondre à upstream.lock.json.');

const changedPaths = new Set(execFileSync('git', ['diff', '--name-only', previousCommit, lock.commit], {
  cwd: checkout,
  encoding: 'utf8',
}).trim().split('\n').filter(Boolean));

// These adapters were not edited themselves, but their proposal only wrapped or rebuilt a
// content card that is now authoritative upstream.
const cardAdapters = new Set([
  'cdata/Dataservices/Card/Card',
  'cdata/Embeds/DataserviceCard.global',
  'cdata/Embeds/DatasetCard.global',
  'cdata/Embeds/OrganizationCard.global',
  'cdata/Embeds/ReuseCard.global',
  'cdata/Post/card',
  'cdata/Reuses/ReuseCard',
  'cdata/dataset/card-lg',
]);

const retired = new Set(proposals
  .filter(proposal => changedPaths.has(proposal.sourcePath) || cardAdapters.has(proposal.component))
  .map(proposal => proposal.component));

for (const component of retired) {
  await rm(join(root, 'proposals/components', `${component}.vue`), { force: true });
  statuses[component] = 'valide';
  delete illustrationUsage[component];
}

const remainingProposals = proposals.filter(proposal => !retired.has(proposal.component));
const report = {
  previousCommit,
  adoptedCommit: lock.commit,
  reason: 'Le composant amont fait foi ; la proposition locale est retirée et son suivi est validé.',
  components: [...retired].sort((a, b) => a.localeCompare(b, 'fr')),
};

await Promise.all([
  writeIfChanged(proposalsPath, JSON.stringify(remainingProposals, null, 2) + '\n'),
  writeIfChanged(statusesPath, JSON.stringify(statuses, null, 2) + '\n'),
  writeIfChanged(illustrationUsagePath, JSON.stringify(illustrationUsage, null, 2) + '\n'),
  writeIfChanged(reportPath, JSON.stringify(report, null, 2) + '\n'),
]);

console.log(`${retired.size} propositions retirées ; composants marqués comme validés.`);
