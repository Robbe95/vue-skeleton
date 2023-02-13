<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})
</script>

<template>
  <div class="sidebar-layout max-w-[100vw] overflow-hidden">
    <AppSidebar has-hidden>
      <AppSidebarCategory>
        <template #title>
          Category 1
        </template>
        <template #content>
          <AppSidebarItem to="/home">
            Home
          </AppSidebarItem>
          <AppSidebarItem has-children>
            Dropdown
            <template #children>
              <AppSidebarItem to="/home">
                Item 1
              </AppSidebarItem>
              <AppSidebarItem has-children>
                Item 2
                <template #children>
                  <AppSidebarItem to="/home">
                    Item 1
                  </AppSidebarItem>
                  <AppSidebarItem to="/home">
                    Item 2
                  </AppSidebarItem>
                  <AppSidebarItem to="/home">
                    Item 3
                  </AppSidebarItem>
                </template>
              </AppSidebarItem>
              <AppSidebarItem to="/home">
                Item 3
              </AppSidebarItem>
            </template>
          </AppSidebarItem>
        </template>
      </AppSidebarCategory>
      <AppSidebarCategory>
        <template #title>
          Category 2
        </template>
        <template #content>
          <AppSidebarItem to="/home">
            Item 1
          </AppSidebarItem>
          <AppSidebarItem to="/home">
            Item 2
          </AppSidebarItem>
          <AppSidebarItem to="/home">
            Item 3
          </AppSidebarItem>
        </template>
      </AppSidebarCategory>
    </AppSidebar>
    <div class="transition-all duration-500">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar content";
}
</style>
