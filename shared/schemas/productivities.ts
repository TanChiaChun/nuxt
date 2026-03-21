import { z } from 'zod'
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants'

export const FrequencyEnumSchema = z.enum(PRODUCTIVITY_FREQUENCIES)

const ProductivityBaseSchema = z.object({
  name: z.string().min(1, 'Name required').max(256).trim(),
})

export const ProductivityFormSchema = ProductivityBaseSchema.extend({
  lastCheck: z.date(),
  frequency: FrequencyEnumSchema,
})

export const ProductivityRequestSchema = ProductivityBaseSchema.extend({
  lastCheck: z.coerce.date(),
  frequency: FrequencyEnumSchema,
})

export const ProductivityResponseSchema = ProductivityBaseSchema.extend({
  id: z.number(),
  lastCheck: z.date(),
})

export type FrequencyEnum = z.infer<typeof FrequencyEnumSchema>
export type ProductivityForm = z.infer<typeof ProductivityFormSchema>
export type ProductivityRequest = z.infer<typeof ProductivityRequestSchema>
export type ProductivityResponse = z.infer<typeof ProductivityResponseSchema>
