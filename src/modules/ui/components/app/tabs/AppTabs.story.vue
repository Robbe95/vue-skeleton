<script setup lang="ts">

</script>

<template>
  <Story
    title="App/Tabs/AppTabs"
  >
    <Variant title="Default">
      <AppTabs>
        <template #tabs>
          <AppTabButton>Tab 1</AppTabButton>
          <AppTabButton>Tab 2</AppTabButton>
          <AppTabButton>Tab 3</AppTabButton>
        </template>
        <template #panels>
          <AppTabPanel class="bg-red-500">
            Panel 1
          </AppTabPanel>
          <AppTabPanel class="bg-green-500">
            Panel 2
          </AppTabPanel>
          <AppTabPanel class="bg-purple-500">
            Panel 3
          </AppTabPanel>
        </template>
      </AppTabs>
    </Variant>
    <Variant title="Vertical">
      <AppTabs is-vertical>
        <template #tabs>
          <AppTabButton>Tab 1</AppTabButton>
          <AppTabButton>Tab 2</AppTabButton>
          <AppTabButton>Tab 3</AppTabButton>
        </template>
        <template #panels>
          <AppTabPanel class="bg-red-500">
            Panel 1
          </AppTabPanel>
          <AppTabPanel class="bg-green-500">
            Panel 2
          </AppTabPanel>
          <AppTabPanel class="bg-purple-500">
            Panel 3
          </AppTabPanel>
        </template>
      </AppTabs>
    </Variant>
  </Story>
</template>
