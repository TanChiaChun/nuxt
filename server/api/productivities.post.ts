import { productivitySchema } from '#shared/schemas/productivities'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, productivitySchema.safeParse)

  setResponseStatus(event, 201)
  return result.data
})
