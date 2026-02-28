<script setup lang="ts">
import { fromDate, getLocalTimeZone } from '@internationalized/date'
import { ChevronDown } from 'lucide-vue-next'

const model = defineModel<Date>({ required: true })
const props = defineProps<{ errorMessage?: string }>()

const placeholder = ref()
const date = computed({
  get() {
    return fromDate(model.value, getLocalTimeZone())
  },
  set(newValue) {
    const hours = model.value.getHours()
    const minutes = model.value.getMinutes()

    const newDateTime = newValue.toDate()
    newDateTime.setHours(hours, minutes)

    model.value = newDateTime
  },
})
const time = computed({
  get() {
    const hours = model.value.getHours().toString().padStart(2, '0')
    const minutes = model.value.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  },
  set(newValue) {
    const [hours, minutes] = newValue.split(':').map(Number)

    const newDateTime = new Date(model.value)
    newDateTime.setHours(hours ?? 0, minutes ?? 0)

    model.value = newDateTime
  },
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
    <UiField :data-invalid="!!errorMessage">
      <UiFieldLabel for="date-picker">Date</UiFieldLabel>
      <UiPopover v-slot="{ close }">
        <UiPopoverTrigger as-child>
          <UiButton
            id="date-picker"
            variant="outline"
            class="flex justify-between"
            :aria-invalid="!!errorMessage"
          >
            <NuxtTime
              :datetime="date.toDate()"
              year="numeric"
              month="short"
              day="numeric"
            />
            <ChevronDown />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="p-2" align="start">
          <UiCalendar
            v-model="date"
            @update:model-value="close"
            v-model:placeholder="placeholder"
          />
        </UiPopoverContent>
      </UiPopover>
    </UiField>
  
    <UiField :data-invalid="!!errorMessage">
      <UiFieldLabel for="time-picker">Time</UiFieldLabel>
      <UiInput
        id="time-picker"
        type="time"
        v-model="time"
        :aria-invalid="!!errorMessage"
      />
    </UiField>
  
    <UiFieldError
      class="sm:col-span-2"
      v-if="!!errorMessage"
      :errors="[errorMessage]"
    />
  </div>
</template>
