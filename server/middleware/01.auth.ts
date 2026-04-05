export default defineEventHandler(async (event) => {
  const excludedPaths = ['/api/auth', '/api/cron']
  const pathname = getRequestURL(event).pathname
  if (!excludedPaths.some(path => pathname.startsWith(path))) {
    const session = await auth.api.getSession({ headers: event.headers })
  
    if (pathname === '/login') {
      if (session) {
        return sendRedirect(event, '/')
      }
    } else {
      if (!session) {
        return sendRedirect(event, '/login')
      }
    }
  }
})
