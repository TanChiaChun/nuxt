import { ProductivityPostSchema } from '#shared/schemas/productivities'
import { createProductivity } from '#server/services/productivities.services'

export default defineEventHandler(async (event) => {
  const body = await getBody(event, ProductivityPostSchema)

  const inserted = await createProductivity(body)

  setResponseStatus(event, 201)
  return inserted
})
