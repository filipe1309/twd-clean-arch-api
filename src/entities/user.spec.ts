import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid-email'
    const error = User.create({ name: 'John Doe', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name', () => {
    const invalidName = '0      '
    const error = User.create({ name: invalidName, email: 'john.doe@test.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with a large name', () => {
    const invalidName = '0'.repeat(257)
    const error = User.create({ name: invalidName, email: 'john.doe@test.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create user with valid data', () => {
    const validName = 'John Doe'
    const validEmail = 'john.doe@test.com'
    const user: User = User.create({ name: validName, email: validEmail }).value as User
    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
