import request from 'supertest'
import app from '../app'

it('returns a 200 on successfull signout', async () => {
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
      email: 'test@test.com',
      password: '12345',
    })
    .expect(200)
  await request(app).get('/api/auth/signout').expect(200)
})

it('clear cookies after signing out', async () => {
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
      email: 'test@test.com',
      password: '12345',
    })
    .expect(200)
  const response = await request(app)
    .get('/api/auth/signout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  )
})
