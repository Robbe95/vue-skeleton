<script setup lang="ts">
interface Props {
  isDisabled?: boolean
  isLoading?: boolean
  isReady?: boolean
  type?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isLoading: false,
  isReady: false,
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
    class="relative overflow-hidden whitespace-nowrap rounded border px-3 py-2 transition duration-200 hover:shadow-main md:px-8"
    :class="{
      'cursor-not-allowed bg-opacity-70': isDisabled || isLoading,
      'border border-transparent bg-primary-500 text-white': type === 'primary',
      'border border-primary-500 bg-white text-primary-500': type === 'secondary',
    }" @click="handleClick">
    <div :class="{ 'opacity-30': isLoading }" class="transition-opacity">
      <slot />
      <!-- <Transition>
        <div
          v-if="isReady"
          :class="[isReady ? 'opacity-100' : 'opacity-0']"
          class="text-secondary-500"
        >
          <svg width="17" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="currentColor"
              fill="currentColor"
              d="M15.438 0a1.505 1.505 0 0 0-1.042.474c-2.937 3-5.616 5.95-8.453 8.895L2.465 6.54a1.5 1.5 0 0 0-2.133.242A1.566 1.566 0 0 0 .57 8.954l4.55 3.709c.603.49 1.472.44 2.018-.116 3.266-3.336 6.198-6.619 9.4-9.89.45-.443.587-1.124.344-1.712A1.515 1.515 0 0 0 15.438 0Z"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </Transition> -->
    </div>
    <Transition name="fade">
      <div v-if="isLoading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="relative inline-block h-2.5 w-10">
          <div v-for="i in 4" :key="i" class="orb absolute top-[1px] h-2 w-2 rounded-full" :class="{
              'bg-white': type === 'primary',
              'bg-primary-500': type === 'secondary',
            }" />
        </div>
      </div>
    </Transition>

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
