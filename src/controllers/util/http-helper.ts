import { HttpResponse } from '@/controllers/ports'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
