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
  <button
    class="px-3 py-2 overflow-hidden transition duration-200 transform border rounded md:px-8 whitespace-nowrap hover:shadow-main"
    :class="{
      'bg-opacity-70 cursor-not-allowed': isDisabled || isLoading,
      'bg-primary-500 text-white border border-transparent': type === 'primary',
      'bg-white text-primary-500 border border-primary-500': type === 'secondary',

    }"
    @click="handleClick"
  >
    <div :class="{ 'opacity-0': isLoading }" class="transition-opacity">
      <slot />
    </div>
    <div
      :class="[isLoading ? 'opacity-100' : 'opacity-0']"
      class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <div class="w-10 h-2.5 inline-block relative">
        <div
          v-for="i in 4" :key="i"
          class="rounded-full w-2 h-2 top-[1px] absolute orb"
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
