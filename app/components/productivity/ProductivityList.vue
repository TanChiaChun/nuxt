<script setup lang="ts">
const { data: productivities } = await useFetch('/api/productivities')
</script>

<template>
  <div class="flex flex-col gap-2">
    <ProductivityItem
      v-for="productivity in productivities"
      :key="productivity.id"
      :name="productivity.name"
      :last-check="productivity.lastCheck"
    />
  </div>
</template>
