<script setup lang="ts">
import { useFacts } from '../api/example.api'

const { data: facts } = useFacts()
</script>

<template>
  {{ facts }}
</template>
