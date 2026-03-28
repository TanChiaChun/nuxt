<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div v-if="$slots.prepend">
      <slot name="prepend" />
    </div>

    <BaseHeader class="flex-1" :title="props.title" />

    <div v-if="$slots.append">
      <slot name="append" />
    </div>
  </div>
</template>
