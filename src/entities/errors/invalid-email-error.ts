export class InvalidEmailError extends Error {
  constructor () {
    super('Invalid e-mail address')
  }
}
