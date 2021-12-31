import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { UserData } from '@/entities'
import { created, badRequest } from '@/controllers/util'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const userOrError = await this.usecase.registerUserOnMailingList(userData)

    if (userOrError.isLeft()) {
      return badRequest(userOrError.value)
    }

    if (userOrError.isRight()) {
      return created(userOrError.value)
    }
  }
}
