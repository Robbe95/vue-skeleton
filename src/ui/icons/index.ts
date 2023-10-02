import * as allIcons from '@/ui/icons/icons'

function convertIconName(iconName: string): Icon {
  const name = iconName.replace('Icon', '')
  return name.charAt(0).toLowerCase() + name.slice(1) as Icon
}

export const iconNames = Object.keys(allIcons)
  .map(convertIconName)

export const iconComponents = Object.keys(allIcons).reduce((acc, key) => {
  const iconComponent = allIcons[key as keyof typeof allIcons]
  return {
    ...acc,
    [convertIconName(key)]: iconComponent,
  }
}, {} as Record<Icon, typeof allIcons[keyof typeof allIcons]>)

export type WithoutIconSuffix<TFullIconName extends string> = TFullIconName extends `${infer IconName}Icon` ? IconName : never
export type Icon = WithoutIconSuffix<Uncapitalize<keyof typeof allIcons>>

export const icons = iconComponents
