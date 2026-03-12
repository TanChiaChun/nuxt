<script setup lang="ts">
import { FolderCode, Plus } from 'lucide-vue-next'

const { getProductivities } = useProductivity()

const { data: productivities, status } = await getProductivities()
</script>

<template>
  <div class="flex flex-col gap-5">
    <ProductivityHeader title="Key">
      <template #append>
        <UiButton variant="outline" size="icon" class="rounded-full" as-child>
          <NuxtLink to="/productivities/new">
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
