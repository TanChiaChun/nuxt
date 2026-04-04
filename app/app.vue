<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import 'vue-sonner/style.css'
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants'
import type { ToasterProps } from 'vue-sonner'
import type { NavLink } from '~/types/nav'

const { data: session } = await authClient.useSession(useFetch)

const breakpoints = useBreakpoints(breakpointsTailwind)
const toasterPosition = computed<ToasterProps['position']>(() => {
  return breakpoints.greaterOrEqual('sm').value ? 'top-right' : 'top-center'
})

const links: NavLink[] = PRODUCTIVITY_FREQUENCIES.map((element) => {
  return { label: element, to: `/productivities/${element}` }
})
const drawerLinks: NavLink[] = [
  ...links,
  { label: 'credits', to: '/credits' },
]
</script>

<template>
  <div class="min-h-screen">
    <NuxtLoadingIndicator />

    <header
      v-if="session"
      class="sticky top-0 inset-x-0 bg-background border-b py-2 px-4"
    >
      <div class="grid grid-cols-3">
        <BaseNavDrawer :links="drawerLinks">
          <template v-slot:footerButton>
            <AuthButton />
          </template>
        </BaseNavDrawer>
        <div class="hidden sm:flex justify-center">
          <BaseNavBar :links />
        </div>
      </div>
    </header>

    <main>
      <div class="mx-auto max-w-xl px-4 py-6">
        <NuxtPage />
      </div>
    </main>

    <div
      v-if="session"
      class="
        flex
        sm:hidden
        justify-center
        fixed
        bottom-0
        inset-x-0
        bg-background
        border-t
        py-2
      "
    >
      <BaseNavBar :links />
    </div>

    <UiToaster
      :position="toasterPosition"
      rich-colors
      :close-button="true"
      close-button-position="top-left"
    />
  </div>
</template>
