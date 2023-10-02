import type { VariantProps } from '@/ui/utils/tailwind/cva'
import { cva } from '@/ui/utils/tailwind/cva'

export const variantOptions = {
  default: 'bg-background text-foreground',
  disabled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-focus-destructive',
}

export const active = {
  true: 'bg-secondary text-secondary-foreground bg-secondary/80',
  false: null,
}

export const selected = {
  true: 'text-primary underline-offset-4 underline hover:bg-secondary/80',
  false: null,
}

export const formSelectOptionVariants = cva(
  {
    base: 'flex w-full gap-2 rounded border border-transparent bg-white px-2 py-1 text-left text-black transition-all',
    variants: {
      variant: variantOptions,
      active,
      selected,
    },
    defaultVariants: {
      variant: 'default',
      active: false,
      selected: false,
    },
  },
)

export type FormSelectOptionProps = VariantProps<typeof formSelectOptionVariants>
export const formSelectOptionVariantOptions = Object.keys(variantOptions)
