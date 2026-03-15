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

export class RouterParamIdValidationError extends ValidationError {}
