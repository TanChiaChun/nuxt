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
