import { cva } from '@/ui/utils/tailwind/cva'

export const formLabel = cva({
  base: 'text-subtext text-muted-foreground',
  variants: {
    isInvalid: {
      true: 'text-destructive',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
})
