<script setup lang="ts">
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants'
import type {
  FrequencyEnum,
  ProductivityForm
} from '#shared/schemas/productivities'

const route = useRoute()

const redirect = route.query.redirect ? String(route.query.redirect) : undefined
const frequency = PRODUCTIVITY_FREQUENCIES.includes(redirect as FrequencyEnum)
  ? redirect as FrequencyEnum
  : 'key'
const initialValues: ProductivityForm = {
  name: '',
  lastCheck: new Date(),
  frequency: frequency,
}
</script>

<template>
  <ProductivityFormPage title="New" :redirect>
    <ProductivityForm :initial-values />
  </ProductivityFormPage>
</template>
