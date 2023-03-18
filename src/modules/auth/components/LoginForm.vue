<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { LoginForm } from '../models/loginForm.model'
import { loginForm } from '../models/loginForm.model'
import type { User } from '@/models/user.model'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const authStore = useAuthStore()

const user = ref<User>()
const submit = async (values: LoginForm): Promise<void> => {
  await authStore.signIn(values.email, values.password)
  user.value = await authStore.getUser()
}

const form = useForm(loginForm, {
  // @ts-expect-error: library needs return Promise<void>
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
        @click="form.submit"
      >
        Login
      </AppButton>
    </div>
  </section>
</template>
