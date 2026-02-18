import { productivitySchema } from '#shared/schemas/productivities'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, productivitySchema.safeParse)

  if (!result.success) {
    console.error(result.error.issues)
    throw createError({
      status: 400,
      statusText: 'Validation Error',
      data: result.error.issues,
    })
  }

  setResponseStatus(event, 201)
  return result.data
})
