<script setup lang="ts">
import { reactive } from 'vue'
import { iconNames } from '@/ui/icons'
import type { Icon } from '@/ui/icons'
import { iconSizeOptions } from '@/ui/components/icon/appIcon.style'
import type { IconProps } from '@/ui/components/icon/appIcon.style'
import AppIcon from '@/ui/components/icon/AppIcon.vue'

interface State {
  size: IconProps['size']
  icon: Icon
  customClasses: string
}

const state: State = reactive({
  size: 'default',
  icon: 'checkmark',
  customClasses: '',
})
</script>

<template>
  <Story
    title="App/Icon/AppIcon"
  >
    <Variant title="Default" auto-props-disabled>
      <template #controls>
        <HstSelect v-model="state.size" title="Size" :options="iconSizeOptions" />
        <HstSelect v-model="state.icon" title="Variant" :options="iconNames" />
        <HstText v-model="state.customClasses" title="Custom Classes" />
      </template>

      <div class="grid h-20 w-20 place-items-center">
        <AppIcon v-bind="state" :class="state.customClasses" />
      </div>
    </Variant>
  </Story>
</template>
