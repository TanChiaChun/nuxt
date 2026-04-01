<script setup lang="ts">
import type { NavLink } from '~/types/nav'

const props = defineProps<{ links: NavLink[] }>()
</script>

<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="link in props.links" :key="link.label">
        <UiNavigationMenuLink class="rounded-full px-5 sm:px-8" as-child>
          <BaseNavLink :to="link.to" variant="bold">
            {{ upperCaseFirst(link.label) }}
          </BaseNavLink>
        </UiNavigationMenuLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
