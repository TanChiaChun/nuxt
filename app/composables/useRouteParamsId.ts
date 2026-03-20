export function useRouteParamsId() {
  const route = useRoute()

  const resolvedId = Number(useRequiredRouteParam(route.params.id))
  if (Number.isNaN(resolvedId)) {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }

  return resolvedId
}
