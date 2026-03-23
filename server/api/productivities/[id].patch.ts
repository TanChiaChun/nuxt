import { ProductivityRequestSchema } from "#shared/schemas"
import { updateProductivityPartial } from '#server/services/productivities'

export default defineProtectedEventHandler(async (event) => {
  const id = await validateRouterParamId(event)
  const body = await validateBody(
    event,
    ProductivityRequestSchema.partial().required({ lastCheck: true }),
  )

  await updateProductivityPartial(id, body)

  setResponseStatus(event, 204)
})
