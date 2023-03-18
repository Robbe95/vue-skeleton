<script setup lang="ts">
import { getFacts } from '@/modules/example/api/example.api'
import type { Fact } from '@/modules/example/models/facts.model'

const facts = ref<Fact[]>()
const fetchPokemon = async (): Promise<void> => {
  facts.value = await getFacts()
  console.error(facts.value)
}
fetchPokemon()
</script>

<template>
  {{ facts }}
</template>
