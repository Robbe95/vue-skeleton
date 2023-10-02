import type { VariantProps } from '@/ui/utils/tailwind/cva'
import { cva } from '@/ui/utils/tailwind/cva'

export const sizeOptions = {
  default: 'h-6',
  sm: 'h-4',
  lg: 'h-8',
}

export const iconVariants = cva(
  {
    base: null,
    variants: {
      size: sizeOptions,
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type IconProps = VariantProps<typeof iconVariants>

export const iconSizeOptions = Object.keys(sizeOptions)
