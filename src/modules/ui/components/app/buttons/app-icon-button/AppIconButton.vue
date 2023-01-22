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
      'w-7 h-7': props.size === 'sm',
      'w-8 h-8': props.size === 'md',
      'w-9 h-9': props.size === 'lg',
    }"
    class="grid rounded-full place-items-center"
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
