import { eq } from 'drizzle-orm'
import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'
import type { ProductivityRequest } from '#shared/schemas/productivities'

export async function createProductivity(productivity: ProductivityRequest) {
  const [newProductivity] = await queryDb(() =>
    db.insert(productivitiesTable).values(productivity).returning(),
  )

  return newProductivity
}

export function getProductivities() {
  return queryDb(() => db.select().from(productivitiesTable))
}

export async function getProductivityById(id: number) {
  const [productivity] = await queryDb(() =>
    db
      .select()
      .from(productivitiesTable)
      .where(eq(productivitiesTable.id, id))
      .limit(1),
  )

  if (!productivity) {
    console.error(`Productivity ID ${id} not found`)
    throw createError({
      status: 404,
      statusText: 'Not Found',
    })
  }

  return productivity
}
