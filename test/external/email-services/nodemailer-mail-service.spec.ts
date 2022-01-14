import { NodeMailerEmailService } from '@/external/email-services'
import { EmailServiceError } from '@/usecases/errors'
import { EmailOptions } from '@/usecases/send-email/ports'

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

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

describe('Nodemailer mail service adapter', () => {
  beforeEach(() => {
    sendMailMock.mockClear()
    nodemailer.createTransport.mockClear()
  })

  test('should return 200 if email is sent', async () => {
    const nodeMailer = new NodeMailerEmailService()
    const response = await nodeMailer.send(emailOptions)
    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(emailOptions)
  })

  test('should return error if email is not sent', async () => {
    const nodeMailer = new NodeMailerEmailService()
    sendMailMock.mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await nodeMailer.send(emailOptions)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(EmailServiceError)
  })
})
