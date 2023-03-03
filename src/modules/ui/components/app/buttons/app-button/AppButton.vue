<script setup lang="ts">
interface Props {
  isDisabled?: boolean
  isLoading?: boolean
  type: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isLoading: false,
  type: 'primary',
})

const emits = defineEmits(['component:click'])

const { isDisabled, isLoading } = toRefs(props)

const handleClick = (): void => {
  if (!isDisabled.value && !isLoading.value)
    emits('component:click')
}
</script>

<template>
  <!-- eslint-disable tailwindcss/no-custom-classname -->
  <button
    class="overflow-hidden whitespace-nowrap rounded border px-3 py-2 transition duration-200 hover:shadow-main md:px-8"
    :class="{
      'cursor-not-allowed bg-opacity-70': isDisabled || isLoading,
      'border border-transparent bg-primary-500 text-white': type === 'primary',
      'border border-primary-500 bg-white text-primary-500': type === 'secondary',
    }"
    @click="handleClick"
  >
    <div :class="{ 'opacity-0': isLoading }" class="transition-opacity">
      <slot />
    </div>
    <div
      :class="[isLoading ? 'opacity-100' : 'opacity-0']"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div class="relative inline-block h-2.5 w-10">
        <div
          v-for="i in 4" :key="i"
          class="orb absolute top-[1px] h-2 w-2 rounded-full"
          :class="{
            'bg-white': type === 'primary',
            'bg-primary-500': type === 'secondary',
          }"
        />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.orb:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.orb:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.orb:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.orb:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}
</style>
