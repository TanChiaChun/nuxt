import { ProductivityPostSchema } from '#shared/schemas/productivities'
import { createProductivity } from '#server/services/productivities.services'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    ProductivityPostSchema.safeParse,
  )

  if (!result.success) {
    console.error(result.error.issues)
    throw createError({
      status: 400,
      statusText: 'Validation Error',
      data: result.error.issues,
    })
  }

  const inserted = await createProductivity(result.data)

  setResponseStatus(event, 201)
  return inserted
})
