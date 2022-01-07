import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { UserData } from '@/entities'
import { created, badRequest, serverError } from '@/controllers/util'
import { MissingParamError } from './errors/missing-param-error'
import { UseCase } from '@/usecases/ports'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!(request.body.name) || !(request.body.email)) {
        let missingParam = !(request.body.name) ? 'name ' : ''
        missingParam += !(request.body.email) ? 'email' : ''
        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const userOrError = await this.usecase.perform(userData)

      if (userOrError.isLeft()) {
        return badRequest(userOrError.value)
      }

      return created(userOrError.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
