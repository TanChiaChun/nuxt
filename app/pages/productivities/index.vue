<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
</script>

<template>
  <div class="mx-auto max-w-xl flex flex-col gap-3">
    <div class="flex justify-end">
      <UiButton variant="outline" size="icon" class="rounded-full" as-child>
        <NuxtLink to="/productivities/new">
          <Plus />
        </NuxtLink>
      </UiButton>
    </div>
    <ProductivityList />
  </div>
</template>
