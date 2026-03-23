<script setup lang="ts">
import { toast } from 'vue-sonner'

const session = authClient.useSession()

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        toast.success('Successfully log out')
        await navigateTo('/login')
      },
      onError: () => {
        toast.error('Error logging out')
      }
    }
  })
}
</script>

<template>
  <UiButton v-if="session.data" @click="signOut">Log Out</UiButton>
  <UiButton v-else as-child>
    <NuxtLink to="/login">Log In</NuxtLink>
  </UiButton >
</template>
