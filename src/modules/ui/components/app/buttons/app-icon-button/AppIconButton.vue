<script setup lang="ts">
interface Props {
  isButton?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  isButton: true,
  size: 'md',
})

const emit = defineEmits(['component:click'])

const component = computed(() => {
  if (props.isButton)
    return 'button'
  return 'div'
})
</script>

<template>
  <Component
    :is="component"
    :class="{
      'h-7 w-7': props.size === 'sm',
      'h-8 w-8': props.size === 'md',
      'h-9 w-9': props.size === 'lg',
    }"
    class="grid place-items-center rounded-full"
    @click="emit('component:click')"
  >
    <div
      :class="
        {
          'h-[0.875rem] w-[0.875rem]': props.size === 'sm',
          'h-[1.25rem] w-[1.25rem]': props.size === 'md',
          'h-[1.5rem] w-[1.5rem]': props.size === 'lg',
        }
      "
    >
      <slot />
    </div>
  </Component>
</template>
