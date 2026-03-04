<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { ProductivityFormSchema } from '#shared/schemas/productivities'
import type { ProductivityForm } from '#shared/schemas/productivities'

const props = defineProps<{ initialValues: ProductivityForm }>()
const errorMessage = defineModel<string | null>('errorMessage', {
  required: true,
})
const emit = defineEmits<{ submit: [values: ProductivityForm] }>()

const { defineField, errors, handleSubmit, isSubmitting, values } =
  useForm<ProductivityForm>({
    validationSchema: toTypedSchema(ProductivityFormSchema),
    initialValues: props.initialValues,
  })
const [name, nameAttrs] = defineField('name')
const [lastCheck] = defineField('lastCheck')

watch(values, () => {
  if (errorMessage.value) {
    errorMessage.value = null
  }
})

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null
  emit('submit', values)
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <BaseErrorAlert v-if="errorMessage" :title="errorMessage" />
  
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
            autofocus
          />
          <UiFieldError v-if="!!errors.name" :errors="[errors.name]" />
        </UiField>
  
        <FormDateTimePicker
          v-model="lastCheck"
          :error-message="errors.lastCheck"
        />
  
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
