<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { ProductivityForm } from '#shared/schemas/productivities'

const route = useRoute()

const errorMessage = ref<string | null>(null)
const { data, status } = await useFetch(
  `/api/productivities/${route.params.id}`,
  {
    transform: productivity => ({
      ...productivity,
      lastCheck: new Date(productivity.lastCheck),
    }),
  },
)

async function onSubmit(values: ProductivityForm) {
  try {
    await $fetch(`/api/productivities/${route.params.id}`, {
      method: 'PUT',
      body: values,
    })

    toast.success(`${values.name} successfully updated`)

    await navigateTo('/productivities')
  } catch {
    errorMessage.value = 'Error updating Productivity'
  }
}
</script>

<template>
  <ProductivityFormPage title="Edit">
    <ProductivityForm
      v-if="status === 'success' && data"
      :initial-values="data"
      v-model:error-message="errorMessage"
      @submit="onSubmit"
    />
    <BaseErrorAlert v-else title="Error loading Productivity" />
    
  </ProductivityFormPage>
</template>
