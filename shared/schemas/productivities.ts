import { z } from 'zod'

const ProductivityBaseSchema = z.object({
  name: z.string().min(1, 'Name required').max(256),
})

export const ProductivityFormSchema = ProductivityBaseSchema.extend({
  lastCheck: z.date(),
})

export const ProductivityPostSchema = ProductivityBaseSchema.extend({
  lastCheck: z.coerce.date(),
})

export type ProductivityForm = z.infer<typeof ProductivityFormSchema>
