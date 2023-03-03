<template>
  <div class="flex flex-col gap-2">
    <p class="text-lg font-medium">
      <slot name="title" />
    </p>
    <div class="mb-2 flex flex-col gap-1">
      <slot name="content" />
    </div>
    <AppDivider />
  </div>
</template>
