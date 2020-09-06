import express from 'express'
import cors from 'cors'

import IndexRouter from './routes/index'
import UserRouter from './routes/user'
import RefreshTokenRouter from './routes/refreshToken'

import cookieSession from 'cookie-session'

import dotenv from 'dotenv'

dotenv.config()

class App {
  public app!: express.Application

  constructor() {
    this.app = express()

    this.app.use(cors())
    this.app.use(express.json())

    this.app.use(
      cookieSession({
        signed: false,
        secure: false,
      })
    )
    this.app.use(express.urlencoded({ extended: false }))

    this.app.use('/api/auth/newtoken', RefreshTokenRouter)

    this.app.use('/api/auth', UserRouter)

    this.app.use('/secured', IndexRouter)
  }
}

export default new App().app
