<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle
} from '@/components/ui/item'

interface Props {
  name: string
  lastCheck: string
}

const props = defineProps<Props>()
</script>

<template>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>{{ props.name }}</ItemTitle>
      <ItemDescription>
        <NuxtTime
          :datetime="props.lastCheck"
          year="numeric"
          month="short"
          day="numeric"
          hour="numeric"
          minute="2-digit"
        />
      </ItemDescription>
    </ItemContent>
  </Item>
</template>
