import request from 'supertest'
import app from '../app'
import sequelize from '../models/sequelize'

beforeEach(async () => {
  await sequelize.sync({ force: true })
})

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

it('got bearer and refresh token on signin', async () => {
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

it('show logged in user information (id)', async () => {
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
  const cookie = response.get('Set-Cookie')
  const response2 = await request(app)
    .get('/api/auth/info')
    .set('Cookie', cookie)
    .expect(200)
  console.log(response2)
  expect(response2.body.id).toBeDefined()
})

it('got 404 on non existing user on SignIn', async () => {
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

it('got 400 on incorrect login (not email)  on SignIn', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'tasdom',
      password: '12345',
    })
    .expect(400)
})

it('got 400 on incorrect password on SignIn', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'tasdom',
      password: '1',
    })
    .expect(400)
})

it('got 400 on no login on SignIn', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      password: '12345',
    })
    .expect(400)
})

it('got 400 on no password on SignIn', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
    })
    .expect(400)
})

it('returns a 400 with an invalid email on signUp', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({
      email: 'asdasdasd',
      password: 'password',
    })
    .expect(400)
})

it('returns a 400 with an invalid password on signUp', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: '1',
    })
    .expect(400)
})

it('returns a 400 with missing email and password on signUp', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com' })
    .expect(400)
  return request(app)
    .post('/api/auth/signup')
    .send({ password: 'password' })
    .expect(400)
})
