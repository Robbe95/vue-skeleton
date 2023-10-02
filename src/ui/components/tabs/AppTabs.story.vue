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
          <AppTabPanel>
            Panel 1
          </AppTabPanel>
          <AppTabPanel>
            Panel 2
          </AppTabPanel>
          <AppTabPanel>
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
          <AppTabPanel>
            Panel 1
          </AppTabPanel>
          <AppTabPanel>
            Panel 2
          </AppTabPanel>
          <AppTabPanel>
            Panel 3
          </AppTabPanel>
        </template>
      </AppTabs>
    </Variant>
  </Story>
</template>
