<script setup lang="ts">
const { to, variant = 'default' } = defineProps<{
  to: string
  variant?: 'default' | 'bold'
}>()

const baseActiveClass = [
  'text-sky-600',
  'hover:text-blue-600',
  'dark:text-sky-300',
  'underline',
  'underline-offset-6',
]
const variantActiveClass = {
  default: '',
  bold: 'font-bold',
}
const activeClass = [
  ...baseActiveClass,
  variantActiveClass[variant],
].join(' ')
</script>

<template>
  <NuxtLink :to :active-class>
    <slot></slot>
  </NuxtLink>
</template>
