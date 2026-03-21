import { z } from 'zod'
import type { H3Event } from '#imports'
import {
  BodyValidationError,
  QueryValidationError,
  RouterParamIdValidationError,
} from '../errors/errors'

export async function validateBody<T extends z.ZodTypeAny>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const result = await readValidatedBody(event, schema.safeParse)

  if (!result.success) {
    throw new BodyValidationError(result.error.issues, 'Body validation error')
  }

  return result.data
}

export async function validateQuery<T extends z.ZodTypeAny>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const result = await getValidatedQuery(event, schema.safeParse)

  if (!result.success) {
    throw new QueryValidationError(
      result.error.issues,
      'Query validation error',
    )
  }

  return result.data
}

export async function validateRouterParamId(event: H3Event) {
  const result = await getValidatedRouterParams(
    event,
    z.object({ id: z.coerce.number() }).safeParse,
  )

  if (!result.success) {
    throw new RouterParamIdValidationError(
      result.error.issues,
      'Invalid router param ID'
    )
  }

  return result.data.id
}
