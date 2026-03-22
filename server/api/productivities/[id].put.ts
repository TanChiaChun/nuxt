import { ProductivityRequestSchema } from "#shared/schemas"
import { updateProductivity } from "#server/services/productivities.services"

export default defineSafeEventHandler(async (event) => {
  const id = await validateRouterParamId(event)
  const body = await validateBody(event, ProductivityRequestSchema)

  await updateProductivity(id, body)

  setResponseStatus(event, 204)
})
