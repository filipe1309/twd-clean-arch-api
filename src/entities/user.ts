import { Name, Email, UserData } from './'
import { Either, left, right } from '../shared'
import { InvalidNameError, InvalidEmailError } from './errors'

export class User {
  public readonly name: Name
  public readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    const emailOrError = Email.create(userData.email)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value

    return right(new User(name, email))
  }
}
