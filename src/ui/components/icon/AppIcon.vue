<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from '@/ui/utils/tailwind/twMerge'
import { icons } from '@/ui/icons'
import type { Icon } from '@/ui/icons'
import type { IconProps } from '@/ui/components/icon/appIcon.style'
import { iconVariants } from '@/ui/components/icon/appIcon.style'

interface Props {
  icon: Icon
  size?: IconProps['size']
}

const { icon, size = 'default' } = defineProps<Props>()

const attrs = useAttrs()

const iconComponent = computed(() => icons[icon])
</script>

<template>
  <Component :is="iconComponent" :class="twMerge(iconVariants({ size }), attrs?.class as string)" />
</template>
