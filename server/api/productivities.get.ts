import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'

export default defineEventHandler(async (event) => {
  try {
    const productivities = await db.select().from(productivitiesTable)
    return productivities
  } catch (e) {
    console.error(e)
    throw createError({
      status: 500,
      statusText: 'Server Error',
    })
  }
})
