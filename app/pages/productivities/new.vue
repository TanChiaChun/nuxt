<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { CircleAlert } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { productivitySchema } from '#shared/schemas/productivities'

const { defineField, errors, handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(productivitySchema),
  initialValues: {
    name: '',
  },
})
const [name, nameAttrs] = defineField('name')

const errorMessage = ref<string |null>(null)

watch(values, () => {
  if (errorMessage.value) {
    errorMessage.value = null
  }
})

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null

  try {
    await $fetch('/api/productivities', {
      method: 'POST',
      body: values,
    })

    toast.success(`${values.name} successfully created`)

    await navigateTo('/productivities')
  } catch {
    errorMessage.value = 'Error creating Productivity'
  }
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <UiAlert v-if="errorMessage" variant="destructive">
      <CircleAlert />
      <UiAlertTitle>{{ errorMessage }}</UiAlertTitle>
    </UiAlert>
  
    <form @submit="onSubmit">
      <UiFieldGroup>
        <UiField :data-invalid="!!errors.name">
          <UiFieldLabel for="name">Name</UiFieldLabel>
          <UiInput
            type="text"
            id="name"
            v-model="name"
            v-bind="nameAttrs"
            :aria-invalid="!!errors.name"
          />
          <UiFieldError v-if="!!errors.name" :errors="[errors.name]" />
        </UiField>

        <UiField orientation="horizontal">
          <UiButton type="submit" :disabled="isSubmitting">
            <UiSpinner v-if="isSubmitting" />
            Submit
          </UiButton>
        </UiField>
      </UiFieldGroup>
    </form>
  </div>
</template>
