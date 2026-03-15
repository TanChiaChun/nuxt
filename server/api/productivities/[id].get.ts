import { getProductivityById } from '#server/services/productivities.services'

export default defineSafeEventHandler(async (event) => {
  const id = await getRouterParamId(event)

  return getProductivityById(id)
})
