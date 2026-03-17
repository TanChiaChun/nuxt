<script setup lang="ts">
const id = useRouteParamsId()

const { data, status } = await useFetch(
  `/api/productivities/${id}`,
  {
    transform: productivity => ({
      ...productivity,
      lastCheck: new Date(productivity.lastCheck),
    }),
  },
)
if (status.value === 'error') {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}
</script>

<template>
  <ProductivityFormPage title="Edit">
    <ProductivityForm
      v-if="status === 'success' && data"
      :initial-values="data"
      :id
    />
    <BaseErrorAlert v-else title="Error loading Productivity" />
    
  </ProductivityFormPage>
</template>
