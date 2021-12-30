import { User } from '../../src/entities/user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid-email'
    const error = User.create({ name: 'John Doe', email: invalidEmail }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual(`Invalid e-mail: ${invalidEmail}`)
  })

  test('should not create user with invalid name (too few chars)', () => {
    const invalidName = '0      '
    const error = User.create({ name: invalidName, email: 'john.doe@test.com' }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${invalidName}`)
  })

  // test('should not create user with invalid name (too large)', () => {
  //   const invalidName = '0'.repeat(257)
  //   const error = User.create({ name: invalidName, email: 'john.doe@test.com' })
  //   expect(error).toEqual(left(new InvalidNameError()))
  // })

  test('should create user with valid data', () => {
    const validName = 'John Doe'
    const validEmail = 'john.doe@test.com'
    const user: User = User.create({ name: validName, email: validEmail }).value as User
    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
