import { EmailOptions } from '@/usecases/send-email/ports'

const attachments = [{
  filename: 'clean-architecture.pdf',
  path: 'https://otaviolemos.github.io/clean-architecture.pdf',
  contentType: 'text/plain'
}]

export function getEmailOptions (): EmailOptions {
  return {
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from: 'Filipe <filipe1309@gmail.com>',
    to: '',
    subject: 'Test subject',
    text: 'Test body',
    html: '<h1>Test body</h1>',
    attachments
  }
}
