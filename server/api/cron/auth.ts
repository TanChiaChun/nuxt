import 'dotenv/config'
import { clearExpiredSessions } from '#server/services/auth'

export default defineEventHandler(async (event) => {
  if (
    getRequestHeader(event, 'Authorization') !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    throw createError({ status: 401, statusText: 'Unauthorized' })
  }

  const expiredSessions = await clearExpiredSessions()
  console.log(`Cleared ${expiredSessions.length} sessions`)

  setResponseStatus(event, 204)
})
