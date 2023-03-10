<script setup lang="ts">
interface Props {
  as: 'title' | 'subtitle' | 'text' | 'label' | 'link'
  numberOfLines?: 1 | 2 | 3 | 4 | 5 | 6
}

const props = defineProps<Props>()

const htmlElement = computed(() => {
  switch (props.as) {
    case 'title':
      return 'h1'
    case 'subtitle':
      return 'h2'
    case 'text':
      return 'p'
    case 'label':
      return 'p'
    case 'link':
      return 'a'
  }
})

const textStyles = computed(() => {
  switch (props.as) {
    case 'title':
      return 'text-2xl font-bold'
    case 'subtitle':
      return 'text-xl font-bold'
    case 'text':
      return 'text-base'
    case 'label':
      return 'text-sm text-neutral-300'
    case 'link':
      return 'text-sm text-primary-500 underline'
  }
})

const truncate = computed(() => {
  if (props?.numberOfLines)
    return `line-clamp-${props?.numberOfLines}`
})
</script>

<template>
  <!-- truncate text based on number of lines prop -->
  <Component :is="htmlElement" :class="[textStyles, truncate]">
    <slot />
  </Component>
</template>
