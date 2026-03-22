<script setup lang="ts">
import { useIntervalFn, useNow } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { Pencil, RefreshCcw } from 'lucide-vue-next'
import type {
  ProductivityResponse,
  FrequencyEnum,
} from '#shared/schemas'

const { updateProductivityLastCheck } = useProductivity()

const props = defineProps<{
  productivity: ProductivityResponse
  frequency: FrequencyEnum
}>()

const isUpdating = ref(false)
const lastCheck = shallowRef(props.productivity.lastCheck)

const now = useNow({ scheduler: cb => useIntervalFn(cb, 1000) })
const borderClass = computed(() => {
  const elapsedMs = now.value.getTime() - lastCheck.value.getTime()
  const elapsedHours = elapsedMs / 1000 / 60 / 60

  if (elapsedHours < 1) {
    return 'border-l-green-500'
  } else if (elapsedHours < 2) {
    return 'border-l-yellow-500'
  }
  return 'border-l-red-500'
})

async function onUpdate() {
  isUpdating.value = true

  const newLastCheck = new Date()
  try {
    await updateProductivityLastCheck(props.productivity.id,  newLastCheck)

    lastCheck.value = newLastCheck

    toast.success(`${props.productivity.name} updated`)
  } catch {
    toast.error(`Error updating ${props.productivity.name}`)
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <UiItem variant="outline" class="border-l-5" :class="borderClass">
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
        <NuxtLink
          :to="{
            name: 'productivities-id-edit',
            params: { id: props.productivity.id },
            query: { redirect: props.frequency },
          }"
        >
          <Pencil />
        </NuxtLink>
      </UiButton>
      <UiButton
        size="icon-sm"
        variant="outline"
        @click="onUpdate"
        :disabled="isUpdating"
      >
        <RefreshCcw :class="{ 'animate-spin': isUpdating }" />
      </UiButton>
    </UiItemActions>
  </UiItem>
</template>
