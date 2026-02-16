<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { productivitySchema } from '#shared/schemas/productivities'

const { defineField, errors } = useForm({
  validationSchema: toTypedSchema(productivitySchema),
  initialValues: {
    name: '',
  },
})

const [name, nameAttrs] = defineField('name')
</script>

<template>
  <UiFieldGroup>
    <UiField>
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
  </UiFieldGroup>
</template>
