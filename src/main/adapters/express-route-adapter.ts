import { RegisterAndSendEmailController } from '@/controllers'
import { Request, Response } from 'express'
import { HttpRequest } from '@/controllers/ports'

export const adaptRoute = (controller: RegisterAndSendEmailController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
