<script setup lang="ts">
import { Item, ItemContent, ItemTitle } from '@/components/ui/item'

interface Props {
  name: string
}

const props = defineProps<Props>()
</script>

<template>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>{{ props.name }}</ItemTitle>
    </ItemContent>
  </Item>
</template>
