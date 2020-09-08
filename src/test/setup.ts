import request from 'supertest'
import app from '../app'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

beforeAll(async () => {
  let _bearer

  await request(app).post('/api/auth/signup').send({
    userName: 'User1',
    email: 'test@test.com',
    password: '12345',
    firstName: 'User',
    lastName: 'One',
  })
  const response = await request(app).post('/api/auth/signin').send({
    email: 'test@test.com',
    password: '12345',
  })

  _bearer = response.body._bearer
})

beforeEach(async () => {})

afterAll(async () => {})
