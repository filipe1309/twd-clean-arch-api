import { UserRepository } from '../../../../src/usecases/register-user-on-mailing-list/ports'
import { UserData } from '../../../../src/entities'
import { InMemoryUserRepository } from './'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const email = 'john.doe@test.com'
    const users: UserData[] = []
    const sut: UserRepository = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail(email)
    expect(user).toBeNull()
  })

  test('should return user if user is found', async () => {
    const name = 'John Doe'
    const email = 'john.doe@test.com'
    const users: UserData[] = []
    const sut: UserRepository = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  test('should return all users', async () => {
    const users: UserData[] = [{ name: 'user 1', email: 'user1@test.com' }, { name: 'user 2', email: 'user2@test.com' }]
    const sut: UserRepository = new InMemoryUserRepository(users)
    const returnedUsers = await sut.findAllUsers()
    expect(returnedUsers.length).toBe(users.length)
  })
})
