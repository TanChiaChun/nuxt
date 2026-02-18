<script setup lang="ts">
import 'vue-sonner/style.css'
</script>

<template>
  <div class="min-h-screen">
    <main>
      <div class="mx-auto max-w-xl px-4 py-6">
        <NuxtPage />
      </div>
    </main>

    <UiToaster position="top-center" rich-colors />
  </div>
</template>
