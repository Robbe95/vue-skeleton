<template>
  <div class="relative overflow-x-auto rounded-lg">
    <table class="w-full text-sm text-left">
      <thead class="text-xs text-white uppercase bg-gray-700">
        <slot name="header" />
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>
