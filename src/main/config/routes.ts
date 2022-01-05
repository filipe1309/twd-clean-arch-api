import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const pathToRoutes = path.join(__dirname, '..', 'routes')

  console.log(`Loading routes from ${pathToRoutes}`)

  readdirSync(pathToRoutes)
    .map(async file => { (await import(pathToRoutes + `/${file}`)).default(router) })
}
