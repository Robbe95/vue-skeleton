<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { generateUuid } from '@/helpers/uuid/generateUuid'

interface Props {
  accept?: string
  hasMultiple?: boolean
}

withDefaults(defineProps<Props>(), {
  accept: '*',
})

const { t } = useI18n()

const uploadUuid = ref(`${generateUuid()}_upload`)
const files = ref<{ file: File; url: string; name: string }[]>([])
const fileOverDropArea = ref(false)

const fileUpload = (file: File): void => {
  const fileUrl = URL.createObjectURL(file)
  const fileName = file.name
  files.value.push({
    file,
    url: fileUrl,
    name: fileName,
  })
}
const handleFileChange = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return
  fileUpload(file)
}

const dropFile = (e: DragEvent): void => {
  const droppedFile = e?.dataTransfer?.files[0]
  if (!droppedFile)
    return
  fileUpload(droppedFile)
}
</script>

<template>
  <div class="container mx-auto py-20">
    <label
      class="flex min-h-40 w-full items-center justify-center rounded-md border border-dashed border-primary-500 bg-primary-100 p-8 text-secondary-500 transition"
      :class="{
        'border-primary-700 bg-primary-100/20': fileOverDropArea,
      }"
      :for="uploadUuid"
      @dragover.prevent
      @dragenter.prevent="fileOverDropArea = true"
      @dragleave.prevent="fileOverDropArea = false"
      @drop.prevent="dropFile"
    >
      <div v-if="files.length === 0 && !hasMultiple">
        {{ t('label.drop_file') }}
      </div>
      <div v-else>
        <img
          :src="files[0].url" :alt="files[0].name" class="h-full max-h-80 w-full overflow-hidden rounded-md bg-contain object-contain"
        >
      </div>

    </label>
    <input
      :id="uploadUuid"
      type="file"
      :accept="accept"
      class="h-0 w-0 overflow-hidden"
      @change="handleFileChange"
    >
    <div v-if="hasMultiple" class="flex flex-wrap gap-1">
      <img
        v-for="file in files" :key="file.url" :src="file.url" :alt="file.name" class="h-32 w-32 object-cover"
      >
    </div>
  </div>
</template>
