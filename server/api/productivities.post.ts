import { ProductivityRequestSchema } from '#shared/schemas'
import { createProductivity } from '#server/services/productivities'

export default defineSafeEventHandler(async (event) => {
  const body = await validateBody(event, ProductivityRequestSchema)

  await createProductivity(body)

  setResponseStatus(event, 204)
})
