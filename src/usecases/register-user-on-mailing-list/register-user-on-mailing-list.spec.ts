import { UserData } from '../../entities/user-data'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'John Doe'
    const email = 'john.doe@test.com'
    // TODO: replace registerUserOnMailingList with perform method
    const response = await usercase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe(name)
    expect(response.value.name).toBe(name)
  })
})
