<script setup lang="ts">
const session = authClient.useSession()
</script>

<template>
  <UiButton v-if="session.data">Log Out</UiButton>
  <UiButton v-else as-child>
    <NuxtLink to="/login">Log In</NuxtLink>
  </UiButton >
</template>
