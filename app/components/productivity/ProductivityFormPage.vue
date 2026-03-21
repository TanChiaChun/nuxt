<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps<{
  title: string,
  redirect?: string,
}>()

const backTo = props.redirect ? `/productivities/${props.redirect}` : '/'
</script>

<template>
  <div class="flex flex-col gap-3">
    <ProductivityHeader :title="props.title">
      <template #prepend>
        <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
          <NuxtLink :to="backTo">
            <ArrowLeft />
          </NuxtLink>
        </UiButton>
      </template>
    </ProductivityHeader>

    <slot></slot>
  </div>
</template>
