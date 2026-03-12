<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Pencil, RefreshCcw } from 'lucide-vue-next'
import type { ProductivityResponse } from '#shared/schemas/productivities'

const { updateProductivityLastCheck } = useProductivity()

const props = defineProps<{ productivity: ProductivityResponse }>()
const lastCheck = shallowRef(new Date(props.productivity.lastCheck))

async function onUpdate() {
  const newLastCheck = new Date()
  try {
    await updateProductivityLastCheck(props.productivity.id,  newLastCheck)

    lastCheck.value = newLastCheck

    toast.success(`${props.productivity.name} updated`)
  } catch {
    toast.error(`Error updating ${props.productivity.name}`)
  }
}
</script>

<template>
  <UiItem variant="outline">
    <UiItemContent>
      <UiItemTitle>{{ props.productivity.name }}</UiItemTitle>
      <UiItemDescription>
        <NuxtTime
          :datetime="lastCheck"
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
      <UiButton size="icon-sm" variant="outline" @click="onUpdate">
        <RefreshCcw />
      </UiButton>
    </UiItemActions>
  </UiItem>
</template>
