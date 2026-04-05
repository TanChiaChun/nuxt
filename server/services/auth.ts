import { lt } from 'drizzle-orm'
import { db } from '#server/db/db'
import { session } from '#server/db/schema/auth-schema'

export async function clearExpiredSessions() {
  const deletedSessions = await db
    .delete(session)
    .where(lt(session.expiresAt, new Date()))
    .returning({ id: session.id })

  return deletedSessions
}
