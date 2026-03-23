export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch)

  if (to.path === '/login') {
    if (session.value) {
      return navigateTo('/')
    }
  } else {
    if (!session.value) {
      return navigateTo('/login')
    }
  }
})
