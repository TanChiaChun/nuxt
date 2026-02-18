import { productivitySchema } from '#shared/schemas/productivities'
import { db } from '#server/db/client'
import { productivitiesTable } from '../db/schema/productivities'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, productivitySchema.safeParse)

  if (!result.success) {
    console.error(result.error.issues)
    throw createError({
      status: 400,
      statusText: 'Validation Error',
      data: result.error.issues,
    })
  }

  try {
    await db.insert(productivitiesTable).values(result.data)
  } catch (e) {
    console.error(e)
    throw createError({
      status: 500,
      statusText: 'Server Error'
    })
  }

  setResponseStatus(event, 201)
  return result.data
})
