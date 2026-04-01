<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import type { NavLink } from '~/types/nav'

const props = defineProps<{ links: NavLink[] }>()
</script>

<template>
  <UiSheet>
    <UiSheetTrigger as-child>
      <UiButton size="icon" variant="ghost">
        <Menu />
      </UiButton>
    </UiSheetTrigger>

    <UiSheetContent side="left">
      <UiSheetHeader>
        <UiSheetTitle></UiSheetTitle>
      </UiSheetHeader>

      <ul class="px-4">
        <li
          v-for="link in props.links"
          :key="link.label"
          class="px-4 py-2 hover:bg-accent rounded-sm"
        >
          <UiSheetClose as-child>
            <BaseNavLink :to="link.to" class="block text-sm font-medium">
              {{ upperCaseFirst(link.label) }}
            </BaseNavLink>
          </UiSheetClose>
        </li>
      </ul>
      
      <UiSheetFooter>
        <UiSeparator />
        <UiSheetClose as-child>
          <slot name="footerButton" />
        </UiSheetClose>
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
</template>
