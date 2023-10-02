<script setup lang="ts">
import { useForm } from 'formango'
import type { LoginForm } from '../models/loginForm.model'
import { loginForm } from '../models/loginForm.model'
import { useAuthStore } from '../stores/auth.store'
import type { User } from '../models/user.model'

const authStore = useAuthStore()

const user = ref<User>()
async function submit(values: LoginForm): Promise<void> {
  await authStore.signIn(values.email, values.password)
  user.value = await authStore.getUser()
}

const { form, onSubmitForm } = useForm(loginForm)

onSubmitForm((data) => {
  submit(data)
  return null
})
</script>

<template>
  <section>
    <FormInputField v-bind="form.register('email')" label="Email" type="email" placeholder="Email" />
    <FormInputField v-bind="form.register('password')" label="Password" type="password" placeholder="Password" />
    <div class="flex justify-between">
      <AppButton @click="form.submit">
        Login
      </AppButton>
    </div>
  </section>
</template>
