<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'

const { addSnackbar } = useSnackbar()
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const onClick = () => {
  addSnackbar({ message: 'Dit is een test', type: 'success' })
}

const onClick2 = () => {
  addSnackbar({ message: 'Dit is een 2', type: 'info', position: 'top-right' })
}
</script>

<template>
  <div class="p-4">
    <div>
      <AppCollapse class="mb-1 w-80">
        <template #button>
          Button
        </template>
        <template #panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda pariatur quam nisi dolorem commodi perspiciatis omnis est nemo ipsa iure cum, id voluptas eos quaerat doloribus excepturi ipsam voluptatum nesciunt?
        </template>
      </AppCollapse>
      <AppCollapse class="mb-1 w-80">
        <template #button>
          Button2
        </template>
        <template #panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda pariatur quam nisi dolorem commodi perspiciatis omnis est nemo ipsa iure cum, id voluptas eos quaerat doloribus excepturi ipsam voluptatum nesciunt?
        </template>
      </AppCollapse>
      <AppCollapse class="mb-1 w-80">
        <template #button>
          Button3
        </template>
        <template #panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda pariatur quam nisi dolorem commodi perspiciatis omnis est nemo ipsa iure cum, id voluptas eos quaerat doloribus excepturi ipsam voluptatum nesciunt?
        </template>
      </AppCollapse>
    </div>
  </div>
</template>
