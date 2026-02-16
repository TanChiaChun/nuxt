<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

const { data: productivities } = await useFetch('/api/productivities')
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-end">
      <UiButton variant="outline" size="icon" class="rounded-full" as-child>
        <NuxtLink to="/productivities/new">
          <Plus />
        </NuxtLink>
      </UiButton>
    </div>

    <div class="flex flex-col gap-2">
      <ProductivityItem
        v-for="productivity in productivities"
        :key="productivity.id"
        :name="productivity.name"
        :last-check="productivity.lastCheck"
      />
    </div>
  </div>
</template>
