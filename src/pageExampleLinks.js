// Concrete public examples checked on 2026-10-20. A route match proves a
// candidate page, not visibility of every conditional component on that page.
const concrete = {
  'pages/datasets/[did].vue': 'https://www.data.gouv.fr/datasets/base-adresse-nationale',
  'pages/datasets/[did]/index.vue': 'https://www.data.gouv.fr/datasets/base-adresse-nationale',
  'pages/organizations/[oid]/datasets.vue': 'https://www.data.gouv.fr/organizations/base-adresse-nationale/datasets',
  'pages/organizations/[oid]/dataservices.vue': 'https://www.data.gouv.fr/organizations/direction-interministerielle-du-numerique/dataservices',
};
export function pageRoute(file) {
  return '/'+file.replace(/^pages\//,'').replace(/\.vue$/,'').replace(/(^|\/)index$/,'').replace(/\[\.\.\.([^\]]+)\]/g,':$1*').replace(/\[([^\]]+)\]/g,':$1');
}
export function pageExampleUrl(file) {
  if (concrete[file]) return concrete[file];
  const path=pageRoute(file);
  return path.includes(':')?null:`https://www.data.gouv.fr${path}`;
}
