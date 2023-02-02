<script setup lang="ts">
import useAuth from '@/composables/auth/useAuth'
import type { User } from '@/models/user.model'

const { signIn, getUser } = useAuth()
const email = ref('')
const password = ref('')
const user = ref<User>()
const submit = async (): Promise<void> => {
  await signIn(email.value, password.value)
  user.value = await getUser()
}
</script>

<template>
  <section>
    <FormInputField
      v-model="email"
      label="Email"
      type="email"
      placeholder="Email"
    />
    <FormInputField
      v-model="password"
      label="Password"
      type="password"
      placeholder="Password"
    />
    <div class="flex justify-between">
      <AppButton
        @click="submit"
      >
        Login
      </AppButton>
    </div>
  </section>
</template>
