<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { LoginForm } from '../models/loginForm.model'
import { loginForm } from '../models/loginForm.model'
import { useAuthStore } from '../stores/auth.store'
import type { User } from '../models/user.model'

const authStore = useAuthStore()

const user = ref<User>()
const submit = async (values: LoginForm): Promise<void> => {
  await authStore.signIn(values.email, values.password)
  user.value = await authStore.getUser()
}

const form = useForm(loginForm, {
  onSubmit: submit,
})
</script>

<template>
  <section>
    <FormInputField
      v-bind="form.register('email')"
      label="Email"
      type="email"
      placeholder="Email"
    />
    <FormInputField
      v-bind="form.register('password')"
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
