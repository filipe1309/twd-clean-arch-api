export class EmailServiceError extends Error {
  constructor () {
    super('Email service error')
    this.name = 'EmailServiceError'
  }
}
