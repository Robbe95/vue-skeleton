<script setup lang="ts">
const emit = defineEmits<{
  (event: 'component:confirm'): void
  (event: 'component:decline'): void
}>()

const { t } = useI18n()

const decline = (close: Function): void => {
  close()
  emit('component:decline')
}

const accept = (close: Function): void => {
  close()
  setTimeout(() => {
    emit('component:confirm')
  }, 200)
}
</script>

<template>
  <AppDropdownButton has-arrow placement="bottom-start">
    <template #button>
      <slot />
    </template>
    <template #panel="{ close }">
      <div class="whitespace-normal">
        {{ t('label.confirm_text') }}
      </div>
      <div class="flex gap-2 px">
        <AppButton @component:click="accept(close)">
          {{ t('label.confirm') }}
        </AppButton>
        <AppButton type="secondary" @component:click="decline(close)">
          {{ t('label.cancel') }}
        </AppButton>
      </div>
    </template>
  </AppDropdownButton>
</template>
