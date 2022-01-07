import { Either, Right, right } from '@/shared'
import { EmailServiceError } from '@/usecases/errors'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'
import { SendEmail } from '@/usecases/send-email'

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

describe('Send email to user', () => {
  test('should email user with valid name and email address', async () => {
    const emailServiceStub = new EmailServiceStub()
    const usercase = new SendEmail(emailOptions, emailServiceStub)
    const response = await usercase.perform({ name: toName, email: toEmail })
    expect(response).toBeInstanceOf(Right)
    // expect(response.value.to).toBe(emailOptions.to)
  })
})
