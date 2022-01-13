import { User, UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repositories'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'John Doe'
    const email = 'john.doe@test.com'
    const user = User.create({ name, email }).value as User
    const response = await usercase.perform(user)
    const addedUser = repo.findUserByEmail(email)
    expect((await addedUser).name).toBe(name)
    expect(response.name).toBe(name)
  })
})
