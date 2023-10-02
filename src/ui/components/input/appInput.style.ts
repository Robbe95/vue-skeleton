import { cva } from '@/ui/utils/tailwind/cva'

export const inputWrapper = cva({
  base: 'relative flex h-10 w-full items-center rounded-input border border-solid border-input-border bg-background ring-offset-background duration-100',
  variants: {
    isDisabled: {
      true: 'bg-input-disabled opacity-50',
    },
    isFocused: {
      true: 'border-primary ring-2 ring-primary ring-offset-2',
    },
    isInvalid: {
      true: 'border-destructive text-destructive ring-destructive',
    },
  },
})

export const input = cva({
  base: 'h-full w-full truncate bg-transparent px-3 py-2 text-subtext outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed',
})

export const inputIcon = cva({
  base: 'h-3.5 w-3.5 text-muted-foreground',
  variants: {
    isInvalid: {
      true: 'text-destructive',
    },
  },
})
