<script setup lang="ts">
import { getFacts } from '../api/example.api'

const facts = ref()
const fetchPokemon = async () => {
  facts.value = await getFacts()
  console.error(facts.value)
}
fetchPokemon()
</script>

<template>
  {{ facts }}
</template>
