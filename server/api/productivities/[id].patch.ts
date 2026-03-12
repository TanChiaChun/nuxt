import { ProductivityRequestSchema } from "#shared/schemas/productivities"
import { updateProductivityPartial } from '#server/services/productivities.services'

export default defineEventHandler(async (event) => {
  const id = await getRouterParamId(event)
  const body = await getBody(event, ProductivityRequestSchema.partial())

  await updateProductivityPartial(id, body)

  setResponseStatus(event, 204)
})
