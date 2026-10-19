import {writeIfChanged} from './lib/write-if-changed.mjs';
import { readFile } from 'node:fs/promises';
import { auditStatuses, defaultAuditStatus } from '../src/auditStatus.js';
const inventory = JSON.parse(await readFile(new URL('../data/components.json', import.meta.url), 'utf8'));
const file = new URL('../data/audit-statuses.json', import.meta.url);
let statuses = {};
try { statuses = JSON.parse(await readFile(file, 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (!statuses || Array.isArray(statuses) || typeof statuses !== 'object') throw new Error('Le suivi d’audit doit être un objet indexé par identifiant de composant.');
const allowed = new Set(auditStatuses.map(status => status.id));
for (const [id, status] of Object.entries(statuses)) if (!allowed.has(status)) throw new Error(`Statut d’audit invalide pour ${id} : ${status}`);
for (const component of inventory) if (!(component.id in statuses)) statuses[component.id] = defaultAuditStatus;
// Garder également les statuts des fichiers retirés de la source pour conserver l’historique.
await writeIfChanged(file, JSON.stringify(Object.fromEntries(Object.entries(statuses).sort(([a], [b]) => a.localeCompare(b))), null, 2) + '\n');
console.log(`${inventory.length} composants suivis ; les statuts existants sont conservés.`);
