import request from 'supertest'
import app from '../app'

it('returns bearer token on refresh token provided', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      userName: 'User1',
      email: 'test@test.com',
      password: '12345',
      firstName: 'User',
      lastName: 'One',
    })
    .expect(201)
  const response = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(200)
  expect(response.body.refreshToken).toBeDefined()
  const refreshToken = response.body.refreshToken
  const response2 = await request(app)
    .post('/api/auth/new_token')
    .send({ refreshToken })
    .expect(200)
  expect(response2.body._bearer).toBeDefined()
})
