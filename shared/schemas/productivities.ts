import { z } from 'zod'

export const productivitySchema = z.object({
  name: z.string().min(1, 'Name required').max(256),
})
