<script setup lang="ts">
const list = [
  {
    value: '1',
    label: 'Item 1',
  },
  {
    value: '2',
    label: 'Item 2',
  },
  {
    value: '3',
    label: 'Item 3',
  },
]
</script>

<template>
  <Story
    title="App/Buttons/AppDropdownButton"
  >
    <Variant title="Default">
      <AppDropdownButton>
        <template #button>
          <AppButton>
            Dropdown
          </AppButton>
        </template>
        <template #panel>
          panel
        </template>
      </AppDropdownButton>
    </Variant>
    <Variant title="List">
      <AppDropdownButton>
        <template #button>
          <AppButton>
            Dropdown
          </AppButton>
        </template>
        <template #panel>
          <AppDropdownButtonItem
            v-for="item in list"
            :key="item.value"
            has-arrow
          >
            {{ item.label }}
          </AppDropdownButtonItem>
        </template>
      </AppDropdownButton>
    </Variant>
  </Story>
</template>
