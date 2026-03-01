<script setup lang="ts">
import type { ProductivityResponse } from '#shared/schemas/productivities'

const props = defineProps<{ productivity: ProductivityResponse }>()
</script>

<template>
  <UiItem variant="outline">
    <UiItemContent>
      <UiItemTitle>{{ props.productivity.name }}</UiItemTitle>
      <UiItemDescription>
        <NuxtTime
          :datetime="props.productivity.lastCheck"
          year="numeric"
          month="short"
          day="numeric"
          hour="numeric"
          minute="2-digit"
        />
      </UiItemDescription>
    </UiItemContent>
  </UiItem>
</template>
