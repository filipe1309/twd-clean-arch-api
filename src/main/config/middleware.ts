import { Express } from 'express'
import { bodyParser } from '@/main/config/middleware/body-parser'
import { cors } from '@/main/config/middleware/cors'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
}
