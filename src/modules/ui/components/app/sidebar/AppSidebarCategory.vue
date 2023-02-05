<template>
  <div class="flex gap-2 flex-col">
    <p class="text-lg font-medium">
      <slot name="title" />
    </p>
    <div class="flex gap-1 flex-col mb-2">
      <slot name="content" />
    </div>
    <AppDivider />
  </div>
</template>
