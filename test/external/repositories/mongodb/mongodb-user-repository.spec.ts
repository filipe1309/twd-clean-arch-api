import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

describe('Mongodb user repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'John Doe',
      email: 'john.doe@test.com'
    }
    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })

  test('find all users should return all users', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'John Doe',
      email: 'john.doe@test.com'
    }
    await userRepository.add(user)
    const user2 = {
      name: 'John Doe 2',
      email: 'john.doe2@test.com'
    }
    await userRepository.add(user2)
    const users = await userRepository.findAllUsers()
    expect(users).toHaveLength(2)
    expect(users[0].name).toBe('John Doe')
    expect(users[1].name).toBe('John Doe 2')
  })
})
