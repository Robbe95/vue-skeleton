<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

// import type { UnwrapRef } from 'vue'
// import type { CollapseItem } from '@/modules/ui/composables/app/collapse/useCollapseGroup'
// import { useCollapseGroup } from '@/modules/ui/composables/app/collapse/useCollapseGroup'
// import { generateUuid } from '@/helpers/uuid/generateUuid'

// const context = useCollapseGroup()
// const collapse = ref<HTMLElement>()
// const uuid = generateUuid()
// const isOpen = ref(false)
// const collapseItem = ref<UnwrapRef<CollapseItem>>({
//   id: uuid,
//   isOpen: false,
// })
// onMounted(() => {
//   if (context)
//     context.registerCollapseItem(collapseItem)
// })

// onUnmounted(() => {
//   if (context)
//     context.unregisterCollapseItem(uuid)
// })
</script>

<template>
  <Disclosure v-slot="{ open }" as="div" class="flex flex-col gap-1">
    <DisclosureButton class="flex w-full items-center justify-between gap-4 rounded bg-slate-200 px-4 py-1">
      <span>
        <slot name="button" />
      </span>
      <ChevronDownIcon
        :class="{
          'rotate-180': open,
        }"
        class="h-5 w-5 text-primary-500 transition"
      />
    </DisclosureButton>
    <TransitionExpand>
      <DisclosurePanel class="rounded bg-slate-100 px-4 text-sm">
        <slot name="panel" />
      </DisclosurePanel>
    </TransitionExpand>
  </Disclosure>
</template>
