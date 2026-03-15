import { ProductivityRequestSchema } from "#shared/schemas/productivities"
import { updateProductivityPartial } from '#server/services/productivities.services'

export default defineSafeEventHandler(async (event) => {
  const id = await getRouterParamId(event)
  const body = await getBody(
    event,
    ProductivityRequestSchema.partial().required({ lastCheck: true }),
  )

  await updateProductivityPartial(id, body)

  setResponseStatus(event, 204)
})
