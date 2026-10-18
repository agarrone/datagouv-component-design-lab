// Ne pas effacer une décision d’audit ou un travail déjà commencé.
export function reconcileUsageStatuses(statuses, components) {
  const next = { ...statuses };
  for (const [id, component] of Object.entries(components)) {
    if (['demo-only', 'no-runtime-reference'].includes(component.state) && next[id] === 'a-auditer') next[id] = 'non-utilise-question';
    else if (['referenced', 'possible-reference'].includes(component.state) && next[id] === 'non-utilise-question') next[id] = 'a-auditer';
  }
  return next;
}
