<script setup lang="ts">
import { useForm } from '@appwise/forms/index'
import type { LoginForm } from '../models/loginForm.model'
import { loginForm } from '../models/loginForm.model'
import useAuth from '@/composables/auth/useAuth'
import type { User } from '@/models/user.model'

const { signIn, getUser } = useAuth()

const user = ref<User>()
const submit = async (values: LoginForm): Promise<void> => {
  await signIn(values.email, values.password)
  user.value = await getUser()
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
        @click="submit"
      >
        Login
      </AppButton>
    </div>
  </section>
</template>
