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
