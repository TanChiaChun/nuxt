<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col gap-3">
    <ProductivityHeader title="New">
      <template #prepend>
        <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
          <NuxtLink to="/productivities">
            <ArrowLeft />
          </NuxtLink>
        </UiButton>
      </template>
    </ProductivityHeader>

    <ProductivityForm />
  </div>
</template>
