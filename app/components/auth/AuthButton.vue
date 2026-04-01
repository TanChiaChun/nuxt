<script setup lang="ts">
import { toast } from 'vue-sonner'

const { data: session } = await authClient.useSession(useFetch)

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        await navigateTo('/login', { external: true })
      },
      onError: () => {
        toast.error('Error logging out')
      }
    }
  })
}
</script>

<template>
  <UiButton
    v-if="session"
    variant="ghost"
    class="justify-start"
    @click="signOut"
  >
    Log Out
  </UiButton>
  <UiButton v-else as-child variant="ghost" class="justify-start">
    <NuxtLink to="/login">Log In</NuxtLink>
  </UiButton >
</template>
