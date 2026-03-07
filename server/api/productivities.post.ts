import { ProductivityPostSchema } from '#shared/schemas/productivities'
import { db } from '#server/db/client'
import { productivitiesTable } from '../db/schema/productivities'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    ProductivityPostSchema.safeParse,
  )

  if (!result.success) {
    console.error(result.error.issues)
    throw createError({
      status: 400,
      statusText: 'Validation Error',
      data: result.error.issues,
    })
  }

  const [inserted] = await queryDb(() => 
    db.insert(productivitiesTable).values(result.data).returning(),
  )

  setResponseStatus(event, 201)
  return inserted
})
