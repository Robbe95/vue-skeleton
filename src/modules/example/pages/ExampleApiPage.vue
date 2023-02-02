<script setup lang="ts">
import { getFacts } from '../api/example.api'
import type { Fact } from '../models/facts.model'

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
