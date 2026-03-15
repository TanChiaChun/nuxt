import { DatabaseNotFoundError } from "#server/errors/errors"

export function defineSafeEventHandler<
  Request extends EventHandlerRequest,
  Response,
>(handler: EventHandler<Request, Response>): EventHandler<Request, Response> {
  return defineEventHandler<Request>(async (event) => {
    try {
      return await handler(event)
    } catch (e) {
      console.error(e)

      if (e instanceof DatabaseNotFoundError) {
        throw createError({ status: 404, statusText: 'Not Found' })
      }
      throw createError({ status: 500, statusText: 'Server Error' })
    }
  })
}
