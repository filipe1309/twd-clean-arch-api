import { UserData } from '@/entities'
import { Either } from '@/shared'
import { UseCase } from '@/usecases/ports'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'
import { EmailServiceError } from '@/usecases/errors'

export class SendEmail implements UseCase {
  private readonly emailOptions: EmailOptions
  private readonly emailService: EmailService

  constructor (emailOptions: EmailOptions, emailService: EmailService) {
    this.emailOptions = emailOptions
    this.emailService = emailService
  }

  async perform (userData: UserData): Promise<Either<EmailServiceError, EmailOptions>> {
    const greeting = `Hello <b>${userData.name}!</b>, good?`
    const customHtml = `${greeting} <br><br> ${this.emailOptions.html}`
    const emailInfo: EmailOptions = {
      host: this.emailOptions.host,
      port: this.emailOptions.port,
      username: this.emailOptions.username,
      password: this.emailOptions.password,
      from: this.emailOptions.from,
      to: `${userData.name} <${userData.email}>`,
      subject: this.emailOptions.subject,
      text: this.emailOptions.text,
      html: customHtml,
      attachments: this.emailOptions.attachments
    }
    return await this.emailService.send(emailInfo)
  }
}
