import { ZodIssue } from 'zod'

export class DatabaseNotFoundError extends Error {}

class ValidationError extends Error {
  errorIssues: ZodIssue[]

  constructor(
    errorIssues: ZodIssue[],
    ...params: ConstructorParameters<typeof Error>
  ) {
    super(...params)
    this.errorIssues = errorIssues
  }
}

export class BodyValidationError extends ValidationError {}
export class QueryValidationError extends ValidationError {}
export class RouterParamIdValidationError extends ValidationError {}
