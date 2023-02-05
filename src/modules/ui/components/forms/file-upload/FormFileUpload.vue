<script setup lang="ts">
import { generateUuid } from '@/helpers/uuid/generateUuid'

interface Props {
  accept?: string
  hasMultiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
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
      class="w-full text-secondary flex min-h-40 items-center justify-center bg-primary-100 border border-dashed border-primary-500 transition p-8 rounded-md"
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
          :src="files[0].url" :alt="files[0].name" class="object-contain bg-contain w-full h-full overflow-hidden max-h-80 rounded-md"
        >
      </div>

    </label>
    <input
      :id="uploadUuid"
      type="file"
      :accept="accept"
      class="w-0 h-0 overflow-hidden"
      @change="handleFileChange"
    >
    <div v-if="hasMultiple" class="flex gap-1 flex-wrap">
      <img
        v-for="file in files" :key="file.url" :src="file.url" :alt="file.name" class="w-32 h-32 object-cover"
      >
    </div>
  </div>
</template>
