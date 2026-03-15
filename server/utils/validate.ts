import { z } from 'zod'
import type { H3Event } from '#imports'
import { RouterParamIdValidationError } from '../errors/errors'

export async function getBody<T extends z.ZodTypeAny>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const result = await readValidatedBody(event, schema.safeParse)

  if (!result.success) {
    console.error(result.error.issues)
    throw createError({
      status: 400,
      statusText: 'Validation Error',
      data: result.error.issues,
    })
  }

  return result.data
}

export async function getRouterParamId(event: H3Event) {
  const params = await getValidatedRouterParams(
    event,
    z.object({ id: z.coerce.number() }).safeParse,
  )

  if (!params.success) {
    throw new RouterParamIdValidationError(
      params.error.issues,
      'Invalid router param ID'
    )
  }

  return params.data.id
}
