<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { ProductivityForm } from '#shared/schemas/productivities'

const props = defineProps<{
  title: string,
  initialValues: ProductivityForm,
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <ProductivityHeader :title="props.title">
      <template #prepend>
        <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
          <NuxtLink to="/productivities">
            <ArrowLeft />
          </NuxtLink>
        </UiButton>
      </template>
    </ProductivityHeader>

    <ProductivityForm :initial-values="props.initialValues" />
  </div>
</template>
