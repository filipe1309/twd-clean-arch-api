import { User, UserData } from '@/entities'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'
import { Either, left, right } from '@/shared'
import { UseCase } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { SendEmail } from '@/usecases/send-email'
import { EmailServiceError } from '@/usecases/errors'

export class RegisterAndSendEmail implements UseCase {
  private registerUserOnMailingList: RegisterUserOnMailingList
  private sendEmail: SendEmail

  constructor (registerUserOnMailingList: RegisterUserOnMailingList, sendEmail: SendEmail) {
    this.registerUserOnMailingList = registerUserOnMailingList
    this.sendEmail = sendEmail
  }

  async perform (userData: UserData): Promise<Either<InvalidNameError | InvalidEmailError | EmailServiceError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(userData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user: User = userOrError.value

    await this.registerUserOnMailingList.perform(user)
    const result = await this.sendEmail.perform(user)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(userData)
  }
}
