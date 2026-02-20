<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div v-if="$slots.prepend">
      <slot name="prepend" />
    </div>

    <h1 class="flex-1 text-2xl font-bold">{{ props.title }}</h1>

    <div v-if="$slots.append">
      <slot name="append" />
    </div>
  </div>
</template>
