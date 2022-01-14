import { Either, left, right } from '@/shared'
import { EmailServiceError } from '@/usecases/errors'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'
import * as nodemailer from 'nodemailer'

export class NodeMailerEmailService implements EmailService {
  async send (emailOptions: EmailOptions): Promise<Either<EmailServiceError, EmailOptions>> {
    try {
      const trasporter = nodemailer.createTransport({
        host: emailOptions.host,
        port: emailOptions.port,
        auth: {
          user: emailOptions.username,
          pass: emailOptions.password
        }
      })

      await trasporter.sendMail({
        from: emailOptions.from,
        to: emailOptions.to,
        subject: emailOptions.subject,
        text: emailOptions.text,
        html: emailOptions.html,
        attachments: emailOptions.attachments
      })
    } catch (error) {
      return left(new EmailServiceError())
    }

    return right(emailOptions)
  }
}
