<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants'
import { ProductivityFormSchema } from '#shared/schemas'
import type { ProductivityForm } from '#shared/schemas'

const { createProductivity, deleteProductivity, updateProductivity } =
  useProductivity()

const props = defineProps<{
  initialValues: ProductivityForm
  id?: number
  previousLastCheck?: Date
}>()

const mode = props.id ? 'update' : 'create'
const errorMessage = ref<string | null>(null)
const isDeleting = ref(false)

const { defineField, errors, handleSubmit, isSubmitting, meta, values } =
  useForm<ProductivityForm>({
    validationSchema: toTypedSchema(ProductivityFormSchema),
    initialValues: props.initialValues,
  })
const [name, nameAttrs] = defineField('name')
const [lastCheck] = defineField('lastCheck')
const [frequency, frequencyAttrs] = defineField('frequency')

const canUndo = computed(() => {
  return (
    props.previousLastCheck && 
    props.previousLastCheck.getTime() !== lastCheck.value.getTime()
  )
})
watch(values, () => {
  if (errorMessage.value) {
    errorMessage.value = null
  }
})

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null

  try {
    if (props.id) {
      await updateProductivity(props.id, values)
    } else {
      await createProductivity(values)
    }

    toast.success(`${values.name} ${mode} success`)

    await navigateTo(`/productivities/${values.frequency}`)
  } catch {
    errorMessage.value = `Productivity ${mode} error`
  }
})

async function onUndo() {
  if (props.previousLastCheck) {
    lastCheck.value = new Date(props.previousLastCheck)
  }
}

async function onDelete() {
  if (props.id === undefined) {
    return
  }

  errorMessage.value = null
  isDeleting.value = true

  try {
    await deleteProductivity(props.id)

    toast.success(`${name.value} successfully deleted`)

    await navigateTo(`/productivities/${frequency.value}`)
  } catch {
    errorMessage.value = 'Productivity delete error'
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <BaseErrorAlert v-if="errorMessage" :title="errorMessage" />
  
    <form @submit="onSubmit">
      <UiFieldGroup>
        <UiField :data-invalid="!!errors.frequency">
          <UiFieldLabel for="frequency-select">Frequency</UiFieldLabel>
          <UiNativeSelect 
            id="frequency-select" 
            v-model="frequency" 
            v-bind="frequencyAttrs" 
            :aria-invalid="!!errors.frequency"
          >
            <UiNativeSelectOption
              v-for="frequency in PRODUCTIVITY_FREQUENCIES" :value="frequency"
            >
              {{ upperCaseFirst(frequency) }}
            </UiNativeSelectOption>
          </UiNativeSelect>
          <UiFieldError
            v-if="!!errors.frequency"
            :errors="[errors.frequency]"
          />
        </UiField>

        <UiField :data-invalid="!!errors.name">
          <UiFieldLabel for="name">Name</UiFieldLabel>
          <UiInput
            type="text"
            id="name"
            v-model="name"
            v-bind="nameAttrs"
            :aria-invalid="!!errors.name"
            autofocus
            class="text-sm"
          />
          <UiFieldError v-if="!!errors.name" :errors="[errors.name]" />
        </UiField>
  
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-end">
          <FormDateTimePicker
            v-model="lastCheck"
            :error-message="errors.lastCheck"
            class="sm:grow"
          />
          <UiButton
            :disabled="!canUndo"
            type="button"
            variant="secondary"
            @click="onUndo"
            class="hover:bg-primary/60 hover:text-primary-foreground"
          >
            Undo
          </UiButton>
        </div>

        <UiField orientation="responsive">
          <UiButton
            type="submit"
            :disabled="!meta.valid || !meta.dirty || isSubmitting"
            class="hover:bg-primary/70"
          >
            <UiSpinner v-if="isSubmitting" />
            Submit
          </UiButton>
          <UiAlertDialog v-if="props.id">
            <UiAlertDialogTrigger as-child>
              <UiButton
                variant="destructive"
                :disabled="isDeleting"
                class="hover:bg-destructive/70 dark:hover:bg-destructive/50"
              >
                <UiSpinner v-if="isDeleting" />
                Delete
              </UiButton>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent>
              <UiAlertDialogHeader>
                <UiAlertDialogTitle>Delete {{ name }}?</UiAlertDialogTitle>
              </UiAlertDialogHeader>
              <UiAlertDialogFooter>
                <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                <UiAlertDialogAction @click="onDelete">
                  Delete
                </UiAlertDialogAction>
              </UiAlertDialogFooter>
            </UiAlertDialogContent>
          </UiAlertDialog>
        </UiField>
      </UiFieldGroup>
    </form>
  </div>
</template>
