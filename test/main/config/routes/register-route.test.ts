import request from 'supertest'
import app from '@/main/config/app'

describe('Register route', () => {
  test('should return an account on success', async () => {
    app.post('/api/register', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'John Doe',
        email: 'john.doe@test.com'
      })
      .expect(201)
  })
})
