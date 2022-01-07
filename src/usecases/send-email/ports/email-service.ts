import { Either } from '@/shared'
import { EmailServiceError } from '@/usecases/errors/email-service-errors'

export interface EmailOptions {
  readonly host: string
  readonly port: number
  readonly username: string
  readonly password: string
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html: string
  readonly attachments?: Object[]
}

export interface EmailService {
  send (emailOptions: EmailOptions): Promise<Either<EmailServiceError, EmailOptions>>
}
