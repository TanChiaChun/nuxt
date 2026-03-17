<script setup lang="ts">
const { getProductivity } = useProductivity()
const id = useRouteParamsId()

const { data, status } = await getProductivity(id)
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
