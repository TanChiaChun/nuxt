import { ProductivityRequestSchema } from '#shared/schemas/productivities'
import { createProductivity } from '#server/services/productivities.services'

export default defineSafeEventHandler(async (event) => {
  const body = await getBody(event, ProductivityRequestSchema)

  await createProductivity(body)

  setResponseStatus(event, 204)
})
