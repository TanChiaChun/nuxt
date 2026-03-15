import { eq } from 'drizzle-orm'
import { db } from '#server/db/client'
import { productivitiesTable } from '#server/db/schema/productivities'
import type { ProductivityRequest } from '#shared/schemas/productivities'

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

  assertExists(deletedProductivity, `Productivity ID ${id} not found`)
}

export function getProductivities() {
  return db.select().from(productivitiesTable).orderBy(productivitiesTable.id)
}

export async function getProductivityById(id: number) {
  const [productivity] = await db
    .select()
    .from(productivitiesTable)
    .where(eq(productivitiesTable.id, id))
    .limit(1)

  assertExists(productivity, `Productivity ID ${id} not found`)

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
  productivity: Partial<ProductivityRequest>,
) {
  const [updatedProductivity] = await db
    .update(productivitiesTable)
    .set(productivity)
    .where(eq(productivitiesTable.id, id))
    .returning()

  assertExists(updatedProductivity, `Productivity ID ${id} not found`)
}
