export function defineSafeEventHandler<
  Request extends EventHandlerRequest,
  Response,
>(handler: EventHandler<Request, Response>): EventHandler<Request, Response> {
  return defineEventHandler<Request>(async (event) => {
    try {
      return await handler(event)
    } catch (e) {
      console.error(e)
      throw createError({
        status: 500,
        statusText: 'Server Error',
      })
    }
  })
}
