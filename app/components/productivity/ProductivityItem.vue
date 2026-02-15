<script setup lang="ts">
interface Props {
  name: string
  lastCheck: string
}

const props = defineProps<Props>()
</script>

<template>
  <UiItem variant="outline">
    <UiItemContent>
      <UiItemTitle>{{ props.name }}</UiItemTitle>
      <UiItemDescription>
        <NuxtTime
          :datetime="props.lastCheck"
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
