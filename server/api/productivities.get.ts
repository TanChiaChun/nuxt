import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'

export default defineEventHandler((event) => {
  return queryDb(() => db.select().from(productivitiesTable))
})
