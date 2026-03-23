<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
</script>

<template>
  <UiSheet>
    <UiSheetTrigger as-child>
      <UiButton size="icon" variant="ghost">
        <Menu />
      </UiButton>
    </UiSheetTrigger>

    <UiSheetContent side="left">
      <UiSheetFooter>
        <UiSheetClose as-child>
          <slot name="footerButton" />
        </UiSheetClose>
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
</template>
