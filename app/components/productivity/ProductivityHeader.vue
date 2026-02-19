<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center">
    <h1 class="flex-1 text-2xl font-bold">{{ props.title }}</h1>
    <slot />
  </div>
</template>
