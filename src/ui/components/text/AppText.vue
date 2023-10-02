<script setup lang="ts">
import { useAttrs } from 'vue'
import { textVariants } from '@/ui/components/text/appText.style'
import type { TextProps } from '@/ui/components/text/appText.style'

type TextType = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'blockquote'

interface Props {
  variant?: TextProps['variant']
  boldness?: TextProps['boldness']
  numberOfLines?: TextProps['truncate']
  as?: TextType
}

const {
  variant = 'p',
  numberOfLines,
  boldness,
  as = 'p',
} = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <Component :is="as" :class="textVariants({ variant, boldness, truncate: numberOfLines, class: attrs?.class as string })">
    <slot />
  </Component>
</template>
