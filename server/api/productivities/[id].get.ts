import { z } from 'zod'
import { getProductivityById } from '#server/services/productivities.services'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({ id: z.coerce.number() }).safeParse,
  )

  if (!params.success) {
    console.error(params.error.issues)
    throw createError({
      status: 400,
      statusText: 'Invalid ID',
    })
  }

  return getProductivityById(params.data.id)
})
