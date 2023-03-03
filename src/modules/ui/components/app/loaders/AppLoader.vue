<template>
  <div class="flex w-full items-center justify-center">
    <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
    <span class="loader h-full w-full flex-1 rounded-full border-4 border-primary-500 border-b-secondary-500" />
  </div>
</template>

<style scoped>
.loader {
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
