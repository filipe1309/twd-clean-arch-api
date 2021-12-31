import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { RegisterUserController } from '@/controllers/register-user-controller'
import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@test/usercases/register-user-on-mailing-list/repository'

describe('Register user with web controller', () => {
  test('should return status code 201 when request contains a valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@test.com'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const controller: RegisterUserController = new RegisterUserController(
      usecase
    )
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(request.body)
  })
})
