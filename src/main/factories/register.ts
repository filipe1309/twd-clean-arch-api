import { RegisterAndSendEmailController } from '@/controllers'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'

export const makeRegisterUserController = (): RegisterAndSendEmailController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongodbUserRepository)
  return new RegisterAndSendEmailController(registerUserOnMailingListUseCase)
}
