import { ProductivityRequestSchema } from '#shared/schemas/productivities'
import { createProductivity } from '#server/services/productivities.services'

export default defineSafeEventHandler(async (event) => {
  const body = await getBody(event, ProductivityRequestSchema)

  const inserted = await createProductivity(body)

  setResponseStatus(event, 201)
  return inserted
})
