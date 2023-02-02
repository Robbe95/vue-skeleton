import { inject } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export type CollapseItem = Ref<{ id: string; isOpen: boolean }>

export interface CollapseStateDefinition {
  openedCollapse: Ref<number | null>
  collapseItems: Ref<CollapseItem[]>
  hasMaxOneOpen: Ref<boolean>

  changeOpenedCollapse: (id: string) => void
  registerCollapseItem: (item: CollapseItem) => void
  unregisterCollapseItem: (id: string) => void
}

export const CollapseGroupContext = Symbol('CollapseGroupContext') as InjectionKey<CollapseStateDefinition>

export const useCollapseGroup = (): CollapseStateDefinition | null => {
  const context = inject(CollapseGroupContext, null)
  return context
}
