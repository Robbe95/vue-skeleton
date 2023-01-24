<script setup lang="ts">

</script>

<template>
  <Story
    title="App/Collapse/AppCollapse"
  >
    <Variant title="Default">
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
    </Variant>
  </Story>
</template>
