import { getProductivityById } from '#server/services/productivities.services'

export default defineSafeEventHandler(async (event) => {
  const id = await validateRouterParamId(event)

  return getProductivityById(id)
})
