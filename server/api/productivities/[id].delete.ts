import { deleteProductivity } from "#server/services/productivities.services"

export default defineEventHandler(async (event) => {
  const id = await getRouterParamId(event)

  await deleteProductivity(id)

  setResponseStatus(event, 204)
})
