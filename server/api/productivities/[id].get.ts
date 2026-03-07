import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'

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

  const [productivity] = await queryDb(() =>
    db
      .select()
      .from(productivitiesTable)
      .where(eq(productivitiesTable.id, params.data.id))
      .limit(1),
  )
  if (!productivity) {
    console.error(`Productivity ID ${params.data.id} not found`)
    throw createError({
      status: 404,
      statusText: 'Not Found',
    })
  }

  return productivity
})
