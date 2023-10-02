import type { VariantProps } from '@/ui/utils/tailwind/cva'
import { cva } from '@/ui/utils/tailwind/cva'

export const button = cva({
  base: 'relative inline-flex flex-shrink-0 items-center justify-center gap-x-2 rounded-button border border-solid text-subtext font-medium ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      default: 'border-primary bg-primary text-primary-foreground focus-visible:ring-primary hover:enabled:bg-primary/90',
      secondary: 'border-muted bg-muted text-muted-foreground focus-visible:ring-muted-foreground/25 hover:enabled:bg-muted/80',
      outline: 'border-secondary bg-background focus:border-primary focus-visible:ring-primary hover:enabled:border-primary hover:enabled:text-accent-foreground',
      destructive: 'border-destructive bg-destructive text-destructive-foreground focus-visible:ring-destructive hover:enabled:bg-destructive/90',
      ghost: 'border-transparent text-muted-foreground focus-visible:ring-primary/50 hover:enabled:bg-muted',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-button px-3',
      lg: 'h-11 rounded-button px-8',
      icon: 'h-10 w-10 gap-x-0',
    },
    isLoading: {
      true: '!opacity-100',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export const buttonIcon = cva({
  variants: {
    size: {
      default: 'h-3.5 w-3.5',
      sm: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
      icon: 'h-3.5 w-3.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type ButtonProps = VariantProps<typeof button>
