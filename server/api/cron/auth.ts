import { clearExpiredSessions } from '#server/services/auth'

export default defineEventHandler(async (event) => {
  const expiredSessions = await clearExpiredSessions()
  console.log(`Cleared ${expiredSessions.length} sessions`)

  setResponseStatus(event, 204)
})
