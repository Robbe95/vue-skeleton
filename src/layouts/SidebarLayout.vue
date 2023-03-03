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
  <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
  <div class="grid max-w-[100vw] grid-cols-sidebar overflow-hidden">
    <AppSidebar has-hidden class="w-80">
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
