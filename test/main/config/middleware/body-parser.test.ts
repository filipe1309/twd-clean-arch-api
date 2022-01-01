import request from 'supertest'
import app from '@/main/config/app'

describe('Body parser middleware', () => {
  test('should parse body as json', () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    return request(app)
      .post('/test_body_parser')
      .send({ name: 'John Doe' })
      .expect(200, { name: 'John Doe' })
  })
})
