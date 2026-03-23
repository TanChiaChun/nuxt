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

    <header class="sticky top-0 inset-x-0 bg-background border-b py-2 px-4">
      <div class="sm:hidden">
        <BaseNavDrawer>
          <template v-slot:footerButton>
            <AuthButton />
          </template>
        </BaseNavDrawer>
      </div>

      <div class="hidden sm:grid grid-cols-3 mx-auto max-w-7xl">
        <div></div>
        <BaseNavBar :links />
        <div class="flex justify-end">
          <AuthButton />
        </div>
      </div>
    </header>

    <main>
      <div class="mx-auto max-w-xl px-4 py-6">
        <NuxtPage />
      </div>
    </main>

    <div class="sm:hidden fixed bottom-0 inset-x-0 bg-background border-t py-2">
      <BaseNavBar :links />
    </div>

    <UiToaster
      position="top-center"
      rich-colors
      :close-button="true"
      close-button-position="top-left"
    />
  </div>
</template>
