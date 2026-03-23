import { getProductivityById } from '#server/services/productivities'

export default defineProtectedEventHandler(async (event) => {
  const id = await validateRouterParamId(event)

  return getProductivityById(id)
})
