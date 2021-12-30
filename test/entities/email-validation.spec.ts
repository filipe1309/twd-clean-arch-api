import { Email } from '@/entities'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'john.doe@test.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept email local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@test.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept strings larger than 320 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email domain part larger then 255 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty email local part', () => {
    const email = '@test.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty email domain part', () => {
    const email = 'local@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email domain with each part larger than 63 chars', () => {
    const email = 'local@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email local part with invalid char', () => {
    const email = 'local test@test.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email local part with two dots', () => {
    const email = 'local..test@test.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email local part with ending dot', () => {
    const email = 'local.@test.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email without and at-sign', () => {
    const email = 'localtest.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
