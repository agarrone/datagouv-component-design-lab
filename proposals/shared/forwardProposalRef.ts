import type { Ref } from 'vue'

// Keep native public methods (capture, generateFile, $el…) available to parents.
// Props, event listeners and slots are forwarded by each proposal without a DOM wrapper.
export function forwardProposalRef(child: Ref<any>) {
  return new Proxy({}, {
    get: (_, key) => child.value?.[key],
    has: (_, key) => key in (child.value || {}),
  })
}
