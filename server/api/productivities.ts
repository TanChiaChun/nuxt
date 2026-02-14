import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'

export default defineEventHandler(async (event) => {
  return await db.select().from(productivitiesTable)
})
