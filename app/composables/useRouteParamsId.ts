export function useRouteParamsId() {
  const route = useRoute()
  const id = route.params.id

  if (!id) {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }

  const idNumber = Number(Array.isArray(id) ? id[0] : id)
  if (Number.isNaN(idNumber)) {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }

  return idNumber
}
