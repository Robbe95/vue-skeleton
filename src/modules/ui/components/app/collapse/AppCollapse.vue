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
  <Disclosure v-slot="{ open }" ref="collapse" as="div" class="flex flex-col gap-1">
    <DisclosureButton class="flex items-center justify-between w-full gap-4 px-4 py-1 rounded bg-slate-200">
      <span>
        <slot name="button" />
      </span>
      <ChevronDownIcon
        :class="{
          'rotate-180 transform': open,
        }"
        class="w-5 h-5 transition text-primary-500"
      />
    </DisclosureButton>
    <TransitionExpand>
      <DisclosurePanel class="px-4 text-sm rounded bg-slate-100">
        <slot name="panel" />
      </DisclosurePanel>
    </TransitionExpand>
  </Disclosure>
</template>
