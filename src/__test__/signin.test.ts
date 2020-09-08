import request from 'supertest'
import app from '../app'

it('got bearer and refresh token on successfull signin', async () => {
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
  expect(response.body._bearer).toBeDefined()
  expect(response.body.refreshToken).toBeDefined()
})

it('got 404 on non existing user', async () => {
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
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test1231@test.com',
      password: '12345',
    })
    .expect(404)
})

it('got 400 on incorrect login (not email)', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'tasdom',
      password: '12345',
    })
    .expect(400)
})

it('got 400 on incorrect password', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'tasdom',
      password: '1',
    })
    .expect(400)
})

it('got 400 on no login', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      password: '12345',
    })
    .expect(400)
})

it('got 400 on no password', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
    })
    .expect(400)
})
