export function assertExists<T>(
  data: T,
  consoleErrorMessage: string,
): asserts data is NonNullable<T> {
  if (!data) {
    console.error(consoleErrorMessage)
    throw createError({
      status: 404,
      statusText: 'Not Found',
    })
  }
}

export async function queryDb<T>(queryFn: () => Promise<T>): Promise<T> {
  try{
    return await queryFn()
  } catch (e) {
    console.error(e)
    throw createError({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
