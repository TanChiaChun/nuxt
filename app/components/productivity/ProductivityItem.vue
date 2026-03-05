<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
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

    <UiItemActions>
      <UiButton variant="ghost" as-child size="icon-sm" class="rounded-full">
        <NuxtLink :to="`/productivities/${props.productivity.id}/edit`"
        >
          <Pencil />
        </NuxtLink>
      </UiButton>
    </UiItemActions>
  </UiItem>
</template>
