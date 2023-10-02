<script setup lang="ts">
import { ref } from 'vue'
import { TabGroup, TabList, TabPanels } from '@headlessui/vue'

const props = withDefaults(defineProps<{
  isVertical: boolean
}>(), {
  isVertical: false,
})

const tabButtons = ref<HTMLElement | undefined>()

const selectedTab = ref(0)

const activeTabBounding = computed(() => {
  return tabButtons.value?.children[selectedTab.value].getBoundingClientRect()
})

const previousTabsWidthAndHeight = computed(() => {
  let width = 0
  let height = 0

  for (let i = 0; i < selectedTab.value; i++) {
    const bounding = tabButtons.value?.children[i].getBoundingClientRect()
    width += bounding?.width ?? 0
    height += bounding?.height ?? 0
  }
  return { width, height }
})

function changeTab(index: number): void {
  selectedTab.value = index
}

const movingStyle = computed(() => {
  return {
    height: `${activeTabBounding.value?.height ?? 0}px`,
    width: `${activeTabBounding.value?.width ?? 0}px`,
    transform: props.isVertical ? `translateY(${previousTabsWidthAndHeight.value.height}px)` : `translateX(${previousTabsWidthAndHeight.value.width}px)`,
  }
})
</script>

<template>
  <div class="">
    <TabGroup
      :selected-index="selectedTab" :vertical="isVertical" as="div" :class="{
        'flex flex-row gap-2': isVertical,
      }"
      @change="changeTab"
    >
      <TabList class="max-w-max rounded bg-neutral-100 p-1">
        <div class="relative z-10">
          <div class="z-0">
            <div
              class="absolute top-0 z-0 rounded bg-white transition-transform"
              :style="movingStyle"
            />
          </div>
          <div
            ref="tabButtons" class="relative z-10"
            :class="{ 'flex flex-col': isVertical }"
          >
            <slot name="tabs" />
          </div>
        </div>
      </TabList>

      <TabPanels class="mt-2">
        <slot name="panels" />
      </TabPanels>
    </TabGroup>
  </div>
</template>
