<script setup lang="ts">
import 'vue-sonner/style.css'
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants'

const links = PRODUCTIVITY_FREQUENCIES.map((element) => {
  return { label: element, to: `/productivities/${element}` }
})
</script>

<template>
  <div class="min-h-screen">
    <NuxtLoadingIndicator />

    <header class="
      fixed
      sm:sticky
      bottom-0
      sm:top-0
      inset-x-0
      bg-background
      border-t
      sm:border-b
      py-2
      "
    >
      <BaseNavBar :links />
    </header>

    <main>
      <div class="mx-auto max-w-xl px-4 py-6">
        <NuxtPage />
      </div>
    </main>

    <UiToaster position="top-center" rich-colors />
  </div>
</template>
