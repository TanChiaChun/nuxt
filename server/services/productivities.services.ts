import { eq, sql } from 'drizzle-orm'
import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'
import type { ProductivityRequest } from '#shared/schemas/productivities'
import { DatabaseNotFoundError } from '#server/errors/errors'

export async function createProductivity(productivity: ProductivityRequest) {
  const [newProductivity] = await db
    .insert(productivitiesTable)
    .values(productivity)
    .returning()

  return newProductivity
}

export async function deleteProductivity(id: number) {
  const [deletedProductivity] = await db
    .delete(productivitiesTable)
    .where(eq(productivitiesTable.id, id))
    .returning()

  if (!deletedProductivity) {
    throw new DatabaseNotFoundError(`Productivity ID ${id} not found`)
  }
}

export function getProductivities() {
  return db.select({
    id: productivitiesTable.id,
    name: productivitiesTable.name,
    lastCheck: productivitiesTable.lastCheck,
  }).from(productivitiesTable).orderBy(productivitiesTable.id)
}

export async function getProductivityById(id: number) {
  const [productivity] = await db
    .select()
    .from(productivitiesTable)
    .where(eq(productivitiesTable.id, id))
    .limit(1)

  if (!productivity) {
    throw new DatabaseNotFoundError(`Productivity ID ${id} not found`)
  }

  return productivity
}

export async function updateProductivity(
  id: number,
  productivity: ProductivityRequest,
) {
  await updateProductivityPartial(id, productivity)
}

export async function updateProductivityPartial(
  id: number,
  productivity: Partial<ProductivityRequest> &
    Pick<ProductivityRequest, 'lastCheck'>,
) {
  const [updatedProductivity] = await db
    .update(productivitiesTable)
    .set({
      previousLastCheck: sql`
      CASE
        WHEN last_check <> ${productivity.lastCheck} THEN last_check
        ELSE previous_last_check
      END
      `,
      ...productivity,
    })
    .where(eq(productivitiesTable.id, id))
    .returning()

  if (!updatedProductivity) {
    throw new DatabaseNotFoundError(`Productivity ID ${id} not found`)
  }
}
