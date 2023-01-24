<script setup lang="ts">
import { CollapseGroupContext } from '@/modules/ui/composables/app/collapse/useCollapseGroup'
import type { CollapseItem, CollapseStateDefinition } from '@/modules/ui/composables/app/collapse/useCollapseGroup'

interface Props {
  hasMaxOneOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasMaxOneOpen: false,
})

const collapseItems = ref<CollapseItem[]>([])

const setupApi: CollapseStateDefinition = {
  collapseItems,
  hasMaxOneOpen: ref(props.hasMaxOneOpen),
  openedCollapse: ref(null),
  changeOpenedCollapse(id) {
    // TODO: check if hasMaxOneOpen is true
  },
  registerCollapseItem(action: CollapseItem) {
    collapseItems.value.push(action)
  },
  unregisterCollapseItem(id) {
    const idx = collapseItems.value.findIndex(item => item.value.id === id)
    if (idx === -1)
      return
    collapseItems.value.splice(idx, 1)
  },
}

provide(CollapseGroupContext, setupApi)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
