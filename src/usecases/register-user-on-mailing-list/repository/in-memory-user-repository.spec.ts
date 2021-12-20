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
})
