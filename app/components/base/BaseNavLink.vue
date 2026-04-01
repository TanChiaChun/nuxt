<script setup lang="ts">
const props = defineProps<{ to: string }>()

const activeClass = [
  'text-sky-600',
  'hover:text-blue-600',
  'dark:text-sky-300',
  'font-bold',
  'underline',
  'underline-offset-6',
].join(' ')
</script>

<template>
  <NuxtLink :to :active-class>
    <slot></slot>
  </NuxtLink>
</template>
