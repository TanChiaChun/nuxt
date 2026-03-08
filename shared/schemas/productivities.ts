import { z } from 'zod'

const ProductivityBaseSchema = z.object({
  name: z.string().min(1, 'Name required').max(256).trim(),
})

export const ProductivityFormSchema = ProductivityBaseSchema.extend({
  lastCheck: z.date(),
})

export const ProductivityRequestSchema = ProductivityBaseSchema.extend({
  lastCheck: z.coerce.date(),
})

export const ProductivityResponseSchema = ProductivityBaseSchema.extend({
  id: z.number(),
  lastCheck: z.string().datetime(),
})

export type ProductivityForm = z.infer<typeof ProductivityFormSchema>
export type ProductivityRequest = z.infer<typeof ProductivityRequestSchema>
export type ProductivityResponse = z.infer<typeof ProductivityResponseSchema>
