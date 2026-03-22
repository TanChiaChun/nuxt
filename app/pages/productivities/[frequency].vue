<script setup lang="ts">
import { FolderCode, Plus } from 'lucide-vue-next'
import { FrequencyEnumSchema } from '#shared/schemas'

const route = useRoute()
const { getProductivitiesByFrequency } = useProductivity()

const result = FrequencyEnumSchema.safeParse(
  useRequiredRouteParam(route.params.frequency),
)
if (!result.success) {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}
const frequency = result.data
const { data: productivities, status } =
  await getProductivitiesByFrequency(frequency)
</script>

<template>
  <div class="flex flex-col gap-5">
    <ProductivityHeader :title="upperCaseFirst(frequency)">
      <template #append>
        <UiButton variant="outline" size="icon" class="rounded-full" as-child>
          <NuxtLink
            :to="{ name: 'productivities-new', query: { redirect: frequency } }"
          >
            <Plus />
          </NuxtLink>
        </UiButton>
      </template>
    </ProductivityHeader>

    <div v-if="status === 'success'" class="flex flex-col gap-2">
      <template v-if="productivities?.length">
        <ProductivityItem
          v-for="productivity in productivities"
          :key="productivity.id"
          :productivity
          :frequency
        />
      </template>

      <UiEmpty v-else class="border">
        <UiEmptyHeader>
          <UiEmptyMedia variant="icon">
            <FolderCode />
          </UiEmptyMedia>
        </UiEmptyHeader>
        <UiEmptyTitle>No Data</UiEmptyTitle>
      </UiEmpty>
    </div>
    <BaseErrorAlert
      v-else-if="status === 'error'"
      title="Error loading Productivities"
    />
  </div>
</template>
