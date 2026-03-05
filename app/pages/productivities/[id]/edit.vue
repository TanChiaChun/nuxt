<script setup lang="ts">
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
</script>

<template>
  <ProductivityFormPage title="Edit">
    <ProductivityForm
      v-if="status === 'success' && data"
      :initial-values="data"
      v-model:error-message="errorMessage"
    />
    <BaseErrorAlert v-else title="Error loading Productivity" />
    
  </ProductivityFormPage>
</template>
