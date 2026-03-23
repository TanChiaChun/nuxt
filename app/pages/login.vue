<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const errorMessage = ref<string | null>(null)

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 20
const passwordMessage =
  `Password must be between ${MIN_PASSWORD_LENGTH} ` +
  `and ${MAX_PASSWORD_LENGTH} characters long`
const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, passwordMessage)
    .max(MAX_PASSWORD_LENGTH, passwordMessage),
})
const { errors, handleSubmit, isSubmitting, meta, values } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const {
  handleBlur: handleEmailBlur,
  meta: emailMeta,
  value: email,
} = useField<string>('email')
const {
  handleBlur: handlePasswordBlur,
  meta: passwordMeta,
  value: password,
} = useField<string>('password')

watch(values, () => {
  if (errorMessage.value) {
    errorMessage.value = null
  }
})

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null

  const { data, error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
    rememberMe: false,
    callbackURL: '/',
  }, {
    onError: () => {
      errorMessage.value = 'Error logging in'
    }
  })
})
</script>

<template>
  <div class="mx-auto max-w-sm flex flex-col gap-5">
    <BaseErrorAlert v-if="errorMessage" :title="errorMessage" />

    <form @submit="onSubmit">
      <UiFieldGroup>
        <h1 class="text-xl font-bold">Login</h1>

        <UiField :data-invalid="emailMeta.touched && !!errors.email">
          <UiFieldLabel for="email">Email</UiFieldLabel>
          <UiInput
            type="email"
            id="email"
            v-model="email"
            @blur="handleEmailBlur"
            :aria-invalid="emailMeta.touched && !!errors.email"
          />
          <UiFieldError
            v-if="emailMeta.touched && !!errors.email"
            :errors="[errors.email]"
          />
        </UiField>

        <UiField :data-invalid="passwordMeta.touched && !!errors.password">
          <UiFieldLabel for="password">Password</UiFieldLabel>
          <UiInput
            type="password"
            id="password"
            v-model="password"
            @blur="handlePasswordBlur"
            :aria-invalid="passwordMeta.touched && !!errors.password"
          />
          <UiFieldError
            v-if="passwordMeta.touched && !!errors.password"
            :errors="[errors.password]"
          />
        </UiField>

        <UiField>
          <UiButton :disabled="!meta.valid || isSubmitting">
            <UiSpinner v-if="isSubmitting" />
            Login
          </UiButton>
        </UiField>
      </UiFieldGroup>
    </form>
  </div>
</template>