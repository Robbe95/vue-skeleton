<script setup lang="ts">

</script>

<template>
  <Story
    title="App/Tooltip/AppTooltip"
  >
    <Variant title="Default">
      <div class="flex gap-1 w-full items-center justify-center">
        <AppTooltip>
          <template #element>
            <AppButton>Bottom</AppButton>
          </template>
          <template #tooltip>
            <div class="bg-white rounded shadow p-2">
              <p class="text-gray-800 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic veritatis dignissimos mollitia, recusandae, pariatur totam praesentium animi voluptatem explicabo voluptatibus inventore illum eveniet amet ex. Sapiente dignissimos quas quos aut.
              </p>
            </div>
          </template>
        </AppTooltip>
      </div>
    </Variant>
    <Variant title="Left">
      <div class="flex gap-1">
        <AppTooltip placement="left">
          <template #element>
            <AppButton>Left</AppButton>
          </template>
          <template #tooltip>
            <div class="bg-white rounded shadow p-2">
              <p class="text-gray-800 text-sm">
                Left
              </p>
            </div>
          </template>
        </AppTooltip>
      </div>
    </Variant>
  </Story>
</template>
