export function useRequiredRouteParam(param: string | string[] | undefined) {
  const resolvedParam = Array.isArray(param) ? param[0] : param
  if (!resolvedParam) {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }

  return resolvedParam
}
