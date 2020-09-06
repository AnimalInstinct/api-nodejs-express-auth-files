import request from 'supertest'
import app from '../app'

// adding signin function to the global scope
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
    }
  }
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongo: any

beforeAll(async () => {})

beforeEach(async () => {})

afterAll(async () => {})

// init global sign in function that returns cookie with user's details
// global.signin = async () => {
//   const email = 'test@test.com'
//   const password = 'password'

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({ email, password })
//     .expect(201)

//   const cookie = response.get('Set-Cookie')

//   return cookie
// }
