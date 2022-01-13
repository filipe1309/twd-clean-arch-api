import { MissingParamError } from '@/controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { RegisterAndSendEmailController } from '@/controllers/register-and-send-email-controller'
import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, right } from '@/shared'
import { EmailServiceError } from '@/usecases/errors'
import { UseCase } from '@/usecases/ports'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repositories'
import { SendEmail } from '@/usecases/send-email'
import { EmailService, EmailOptions } from '@/usecases/send-email/ports'

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

class EmailServiceStub implements EmailService {
  send (emailOptions: EmailOptions): Promise<Either<EmailServiceError, EmailOptions>> {
    return Promise.resolve(right(emailOptions))
  }
}

describe('Register user with web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const registerUsercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
  const emailServiceStub = new EmailServiceStub()
  const sendEmailUsercase: SendEmail = new SendEmail(emailOptions, emailServiceStub)
  const registerAndSendEmailUsercase = new RegisterAndSendEmail(registerUsercase, sendEmailUsercase)
  const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(registerAndSendEmailUsercase)

  class ErrorThrowingUseCaseStub implements UseCase {
    public async perform (request: HttpRequest): Promise<HttpResponse> {
      throw new Error('server error')
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 201 when request contains a valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@test.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains a invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'J',
        email: 'john.doe@test.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains a invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'John Doe',
        email: '@test.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'john.doe@test.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingName)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: name')
  })

  test('should return status code 400 when request is missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'John Doe'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: email')
  })

  test('should return status code 400 when request is missing user name and email', async () => {
    const requestWithMissingNameAndEmail: HttpRequest = {
      body: {}
    }
    const response: HttpResponse = await controller.handle(requestWithMissingNameAndEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: name email')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@test.com'
      }
    }
    const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
