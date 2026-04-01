<script setup lang="ts">
import type { NavLink } from '~/types/nav'

const props = defineProps<{ links: NavLink[] }>()
</script>

<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="link in props.links" :key="link.label">
        <UiNavigationMenuLink class="rounded-full px-5 sm:px-8" as-child>
          <NuxtLink
            :to="link.to"
            active-class="
              text-sky-600
              hover:text-blue-600
              dark:text-sky-300
              font-bold
              underline
              underline-offset-6
            "
          >
            {{ upperCaseFirst(link.label) }}
          </NuxtLink>
        </UiNavigationMenuLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
