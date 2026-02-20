<script setup lang="ts">
import { CircleAlert, Plus } from 'lucide-vue-next'

const { data: productivities, status } = await useFetch('/api/productivities')
</script>

<template>
  <div class="flex flex-col gap-3">
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
      <ProductivityItem
        v-for="productivity in productivities"
        :key="productivity.id"
        :name="productivity.name"
        :last-check="productivity.lastCheck"
      />
    </div>
    <UiAlert v-else-if="status === 'error'" variant="destructive">
      <CircleAlert />
      <UiAlertTitle>Error loading Productivities</UiAlertTitle>
    </UiAlert>
  </div>
</template>
