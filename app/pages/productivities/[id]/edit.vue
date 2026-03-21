<script setup lang="ts">
const { getProductivity } = useProductivity()
const route = useRoute()
const id = useRouteParamsId()

const { data, status } = await getProductivity(id)
if (status.value === 'error') {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}

const redirect = route.query.redirect ? String(route.query.redirect) : undefined
</script>

<template>
  <ProductivityFormPage title="Edit" :redirect>
    <ProductivityForm
      v-if="status === 'success' && data"
      :initial-values="data"
      :id
      :previous-last-check="data.previousLastCheck"
    />
    <BaseErrorAlert v-else title="Error loading Productivity" />
    
  </ProductivityFormPage>
</template>
