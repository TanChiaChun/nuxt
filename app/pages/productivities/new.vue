<script setup lang="ts">
const initialValues = {
  name: '',
  lastCheck: new Date(),
}
</script>

<template>
  <ProductivityFormPage title="New">
    <ProductivityForm :initial-values />
  </ProductivityFormPage>
</template>
