<template>
  <svg
    viewBox="25 25 50 50"
  >
    <circle
      class="h-full w-full"
      cx="100%"
      cy="100%"
      r="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
    />
  </svg>
</template>

<style scoped>
svg {
  animation: loading-spinner-rotate 1s linear infinite;
}
svg circle {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: loading-spinner-dash 2s ease-in-out infinite, loading-spinner-color 8s ease-in-out infinite;
  stroke-linecap: round;
  stroke-width: 4px;
}

@keyframes loading-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
