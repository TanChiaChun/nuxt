import { deleteProductivity } from "#server/services/productivities"

export default defineSafeEventHandler(async (event) => {
  const id = await validateRouterParamId(event)

  await deleteProductivity(id)

  setResponseStatus(event, 204)
})
