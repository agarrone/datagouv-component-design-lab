<template>
  <div>
    <button
      ref="trigger"
      type="button"
      class="proposal-notification-options-trigger"
      data-icon-action="true"
      :aria-label="t('Pourquoi je reçois ça ?')"

      :title="t('Pourquoi je reçois ça ?')"
      aria-haspopup="dialog"
      :aria-controls="panelId"
      :aria-expanded="open"
      @click="open = !open"
    >
      <RiMoreLine data-icon-size="base" focusable="false"
        class=" lab-ds-icon"
        aria-hidden="true"
      />
    </button>
    <!-- Not teleported: inside the notifications panel, clicking here keeps that one open.
         Fixed, so that the notification list, which scrolls, does not clip it. -->
    <div
      v-if="open"
      ref="panel"
      :id="panelId"
      role="dialog"
      :aria-label="t('Options de notification')"
      class="proposal-notification-menu"
      :style="floatingStyles"
    >
      <p v-if="error" role="alert" class="proposal-notification-menu-reason">{{ error }}</p>
      <p
        v-if="reasons"
        class="proposal-notification-menu-reason"
      >
        {{ t('Vous recevez cette notification {reasons}.', { reasons }) }}
      </p>
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        class="flex w-full items-center lab-ds-u-gap-2 lab-ds-u-px-3 lab-ds-u-py-2 text-left lab-ds-u-text-sm leading-tight lab-ds-u-text-gray-title disabled:opacity-50"
        :disabled="pending"
        @click="apply(action)"
      >
        {{ action.label }}
      </button>
      <CdataLink
        to="/admin/me/notifications"
        class="flex w-full items-center lab-ds-u-gap-2 lab-ds-u-px-3 lab-ds-u-py-2 border-t lab-ds-u-border-gray-default lab-ds-u-text-sm leading-tight lab-ds-u-text-gray-title !bg-none !no-underline"
        @click="open = false"
      >
        <RiSettings3Line data-icon-size="base" focusable="false"
          class="shrink-0 lab-ds-u-text-gray-medium lab-ds-icon"
          aria-hidden="true"
        />
        {{ t('Gérer mes notifications') }}
      </CdataLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '/proposals/shared/notifications.css'
import {useId} from 'vue'

import {useTranslation} from '/src/compat/application/runtime.js'
import {useNotificationSettings} from '/src/compat/application/runtime.js'
import {useNotificationLabels} from '/vendor/cdata-runtime/composables/useNotificationLabels.ts'
import {computed} from 'vue'
import {ref} from 'vue'
import {useTemplateRef} from 'vue'

import { throwOnNever, toast } from '@datagouv/components-next'
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/vue'
import { RiMoreLine, RiSettings3Line } from '@remixicon/vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import CdataLink from '/vendor/cdata-components/CdataLink.vue'
import type { NotificationRuleKey, NotificationScope, UserNotification } from '/vendor/cdata-runtime/types/notifications'
import { getSubjectDemonstrative } from '/vendor/cdata-runtime/utils/discussions'

// The rule an action writes, and the title of what it names when known, for the toast.
type Action = { label: string, key: NotificationRuleKey, title?: string }

const props = defineProps<{
  notification: UserNotification
}>()

const { t } = useTranslation()
const { mute } = useNotificationSettings()

const { reasonsPhrase, eventLabel, mutedMessage } = useNotificationLabels()
// Badges and answers to membership requests are about the organization itself.
const reasons = computed(() => reasonsPhrase(props.notification.reasons, props.notification.type.startsWith('organization.')))

function ignoreSubject(scope: NotificationScope, title?: string): Action {
  return {
    label: t('Ne rien recevoir sur {subject}', { subject: getSubjectDemonstrative(t, scope.class) }),
    key: { scope, event: null },
    title,
  }
}

// The subject-level ways out, for the notifications whose subject is known: what they
// carry, not their type, tells which.
function subjectActions(notification: UserNotification): Array<Action> {
  const details = notification.details
  switch (details.class) {
    case 'DiscussionNotificationDetails':
      return [
        {
          label: t('Ne plus suivre cette discussion'),
          key: { scope: { class: 'Discussion', id: details.discussion.id }, event: 'discussion' },
          title: details.discussion.title,
        },
        ignoreSubject(details.discussion.subject),
      ]
    case 'ReuseCreatedNotificationDetails':
    case 'DataserviceCreatedNotificationDetails':
      return [ignoreSubject({ class: 'Dataset', id: details.dataset.id }, details.dataset.title)]
    case 'NewBadgeNotificationDetails':
    case 'MembershipAcceptedNotificationDetails':
    case 'MembershipRefusedNotificationDetails':
      return [ignoreSubject({ class: 'Organization', id: details.organization.id }, details.organization.name)]
    // Nothing a rule can be scoped to: a request to answer, which no rule applies to, or
    // a harvest source.
    case 'MembershipRequestNotificationDetails':
    case 'TransferRequestNotificationDetails':
    case 'ValidateHarvesterNotificationDetails':
      return []
    default:
      return throwOnNever(details, `Unknown notification ${notification.type}`)
  }
}

// The five badge types read as one, "Badges de l'organisation": turning them off turns
// them all off, or the next badge of another kind would come anyway.
const kind = computed(() => props.notification.type.startsWith('organization.badge.') ? 'organization.badge' : props.notification.type)

// Every action says "no": on this subject when it is known, and on this kind of
// notification anywhere.
const actions = computed<Array<Action>>(() => [
  ...subjectActions(props.notification),
  {
    label: t('Ne plus recevoir : {type}', { type: eventLabel(kind.value) }),
    key: { scope: null, event: kind.value },
  },
])

const error = ref('')
const pending = ref(false)

async function apply(action: Action) {
  error.value = ''
  pending.value = true
  try {
    await mute(action.key)
    toast.success(mutedMessage(action.key, action.title))
    open.value = false
  }
  catch { error.value = t('Impossible de modifier vos notifications. Réessayez.') }
  finally {
    pending.value = false
  }
}

// A hand-made menu rather than headlessui's Popover: nested in the notifications
// panel, itself a teleported Popover, it took a second click on its own button for a
// click outside, closed on mousedown and reopened on click.
const panelId = useId()
const open = ref(false)
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const panel = useTemplateRef<HTMLElement>('panel')
onClickOutside(panel, () => {
  open.value = false
}, { ignore: [trigger] })
// Captured before the notifications panel, which closes itself on Escape and stops it
// there: Escape closes this menu first, the panel on the next one.
useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !open.value) return
  event.preventDefault()
  event.stopPropagation()
  open.value = false
  trigger.value?.focus()
}, { capture: true })

const { floatingStyles } = useFloating(trigger, panel, {
  placement: 'bottom-end',
  strategy: 'fixed',
  middleware: [flip(), shift({ padding: 16 })],
  whileElementsMounted: autoUpdate,
})
</script>
