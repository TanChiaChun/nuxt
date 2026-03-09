<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { ProductivityForm } from '#shared/schemas/productivities'

const errorMessage = ref<string | null>(null)
const initialValues = {
  name: '',
  lastCheck: new Date(),
}

async function submitForm(values: ProductivityForm) {
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
}
</script>

<template>
  <ProductivityFormPage title="New">
    <ProductivityForm
      :initial-values
      :submit-form
      v-model:error-message="errorMessage"
    />
  </ProductivityFormPage>
</template>
