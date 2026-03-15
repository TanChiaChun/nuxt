import {
  BodyValidationError,
  DatabaseNotFoundError,
  RouterParamIdValidationError,
} from "#server/errors/errors"

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
      } else if (e instanceof RouterParamIdValidationError) {
        console.error(e.errorIssues)
        throw createError({ status: 400, statusText: 'Invalid ID' })
      } else if (e instanceof BodyValidationError) {
        console.error(e.errorIssues)
        throw createError({
          status: 400,
          statusText: 'Validation Error',
          data: e.errorIssues,
        })
      }
      throw createError({ status: 500, statusText: 'Server Error' })
    }
  })
}
