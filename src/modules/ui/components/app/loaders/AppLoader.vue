<template>
  <div class="flex items-center justify-center w-full">
    <span class="flex-1 w-full h-full border-4 rounded-full loader border-primary-500 border-b-secondary-500" />
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
