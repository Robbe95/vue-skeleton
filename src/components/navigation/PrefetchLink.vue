<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { useElementVisibility } from '@vueuse/core'
import { useRouter } from 'vue-router'
import type { Route, routeNames } from '@/router/routes.type'
import { queryFunctions } from '@/http/queryKeys'

interface Props {
  to: typeof routeNames[keyof typeof routeNames]
}

const props = defineProps<Props>()
const router = useRouter()
const queryClient = useQueryClient()
const chosenRoute = router.resolve({ name: props.to }) as unknown as Route
const prefetchData = async (): Promise<void> => {
  chosenRoute?.meta?.prefetchRoutes?.forEach((queryKey) => {
    queryClient.prefetchQuery({
      queryKey: [queryKey],
      queryFn: queryFunctions[queryKey],
      staleTime: 5000,
    })
  })
}

const routerLink = ref<HTMLElement | undefined>()
if (chosenRoute?.meta?.prefetchRoutes && chosenRoute?.meta?.prefetchRoutes?.length > 0) {
  const isVisible = useElementVisibility(routerLink)
  watch(() => isVisible.value, () => {
    if (isVisible.value)
      prefetchData()
  }, { immediate: true })
}
</script>

<template>
  <RouterLink ref="routerLink" :to="{ name: to }">
    <slot />
  </RouterLink>
</template>
