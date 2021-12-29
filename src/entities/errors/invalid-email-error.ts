export class InvalidEmailError extends Error {
  public readonly name = 'InvalidEmailError'

  constructor (email: string) {
    super(`Invalid e-mail: ${email}`)
  }
}
