import { Express } from 'express'
import { bodyParser, cors, contentType } from '@/main/middleware'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
