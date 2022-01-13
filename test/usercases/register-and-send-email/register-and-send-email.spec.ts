import { UserData } from '@/entities'
import { Either, right } from '@/shared'
import { EmailServiceError } from '@/usecases/errors'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repositories'
import { SendEmail } from '@/usecases/send-email'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'

describe('Register and send email to user', () => {
  const attachmentFilePath = '../resources/attachment_test.txt'
  const fromName = 'John From'
  const fromEmail = 'john.from@test.com'
  const toName = 'John To'
  const toEmail = 'john.to@test.com'
  const subject = 'Test subject'
  const emailBody = 'Test body'
  const emailBodyHtml = '<h1>Test body</h1>'
  const attachment = [{
    filename: attachmentFilePath,
    contentType: 'text/plain'
  }]
  const emailOptions: EmailOptions = {
    host: 'smtp.test.com',
    port: 867,
    username: 'test',
    password: 'test',
    from: `${fromName} <${fromEmail}>`,
    to: `${toName} <${toEmail}>`,
    subject,
    text: emailBody,
    html: emailBodyHtml,
    attachments: attachment
  }

  class EmailServiceMock implements EmailService {
    public timesSendWasCalled = 0
    async send (emailOptions: EmailOptions): Promise<Either<EmailServiceError, EmailOptions>> {
      this.timesSendWasCalled++
      return Promise.resolve(right(emailOptions))
    }
  }

  test('should register user and send email with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const registerUsercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const emailServiceMock = new EmailServiceMock()
    const sendEmailUsercase: SendEmail = new SendEmail(emailOptions, emailServiceMock)
    const registerAndSendEmailUsercase = new RegisterAndSendEmail(registerUsercase, sendEmailUsercase)
    const name = 'John Doe'
    const email = 'john.doe@test.com'
    const response: UserData = (await registerAndSendEmailUsercase.perform({ name, email })).value as UserData
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe(name)
    expect(response.name).toBe(name)
    expect(emailServiceMock.timesSendWasCalled).toBe(1)
  })

  test('should not register user and send email with invalid email', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const registerUsercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const emailServiceMock = new EmailServiceMock()
    const sendEmailUsercase: SendEmail = new SendEmail(emailOptions, emailServiceMock)
    const registerAndSendEmailUsercase = new RegisterAndSendEmail(registerUsercase, sendEmailUsercase)
    const name = 'John Doe'
    const email = 'invalid-email'
    const response = (await registerAndSendEmailUsercase.perform({ name, email })).value as Error
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not register user and send email with invalid name', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const registerUsercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const emailServiceMock = new EmailServiceMock()
    const sendEmailUsercase: SendEmail = new SendEmail(emailOptions, emailServiceMock)
    const registerAndSendEmailUsercase = new RegisterAndSendEmail(registerUsercase, sendEmailUsercase)
    const name = 'J'
    const email = 'john.doetest.com'
    const response = (await registerAndSendEmailUsercase.perform({ name, email })).value as Error
    expect(response.name).toEqual('InvalidNameError')
  })
})
