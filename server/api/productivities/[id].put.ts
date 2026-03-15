import { ProductivityRequestSchema } from "#shared/schemas/productivities"
import { updateProductivity } from "#server/services/productivities.services"

export default defineSafeEventHandler(async (event) => {
  const id = await getRouterParamId(event)
  const body = await getBody(event, ProductivityRequestSchema)

  await updateProductivity(id, body)

  setResponseStatus(event, 204)
})
