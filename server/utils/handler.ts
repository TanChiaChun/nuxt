import {
  BodyValidationError,
  DatabaseNotFoundError,
  QueryValidationError,
  RouterParamIdValidationError,
} from "#server/errors"

export function defineProtectedEventHandler<
  Request extends EventHandlerRequest,
  Response,
>(handler: EventHandler<Request, Response>): EventHandler<Request, Response> {
  return defineEventHandler<Request>(async (event) => {
    const session = await auth.api.getSession({ headers: event.headers })
    if (!session) {
      throw createError({ status: 401, statusText: 'Unauthorized' })
    }

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
      } else if (e instanceof QueryValidationError) {
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
