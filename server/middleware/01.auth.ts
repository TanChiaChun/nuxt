export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  if (!pathname.startsWith('/api/auth')) {
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
