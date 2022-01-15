import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

describe('Register route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

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
      .expect(200)
  })
})
