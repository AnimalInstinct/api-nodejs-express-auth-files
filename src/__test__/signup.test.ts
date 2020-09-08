import request from 'supertest'
import app from '../app'

it('returns a 201 on successfull signup', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({
      userName: 'User1',
      email: 'test@test.com',
      password: '12345',
      firstName: 'User',
      lastName: 'One',
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({
      email: 'asdasdasd',
      password: 'password',
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: '1',
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com' })
    .expect(400)
  return request(app)
    .post('/api/auth/signup')
    .send({ password: 'password' })
    .expect(400)
})

it('got bearer and refresh token on signup', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      userName: 'User1',
      email: 'test@test.com',
      password: '12345',
      firstName: 'User',
      lastName: 'One',
    })
    .expect(201)
  expect(response.body.bearer).toBeDefined()
  expect(response.body.refreshToken).toBeDefined()
})
