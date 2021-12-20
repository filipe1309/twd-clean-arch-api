import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const email = 'john.doe@test.com'
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
  })

  test('should return user if user is found', async () => {
    const name = 'John Doe'
    const email = 'john.doe@test.com'
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    await repo.add({ name, email })
    const user = await repo.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  test('should return all users', async () => {
    const users: UserData[] = [{ name: 'user 1', email: 'user1@test.com' }, { name: 'user 2', email: 'user2@test.com' }]
    const repo: UserRepository = new InMemoryUserRepository(users)
    const returnedUsers = await repo.findAllUsers()
    expect(returnedUsers.length).toBe(users.length)
  })
})
