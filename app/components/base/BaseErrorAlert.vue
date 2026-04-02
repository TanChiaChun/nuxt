<script setup lang="ts">
import { CircleAlert } from '@lucide/vue'

const props = defineProps<{ title: string }>()
</script>

<template>
  <UiAlert variant="destructive">
    <CircleAlert />
    <UiAlertTitle>{{ props.title }}</UiAlertTitle>
  </UiAlert>
</template>
