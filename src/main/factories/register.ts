import { RegisterUserController } from '@/controllers'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongodbUserRepository)
  return new RegisterUserController(registerUserOnMailingListUseCase)
}
