import express from 'express'
import cors from 'cors'
import UserRouter from './routes/user'
import FilesRouter from './routes/file'
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
    this.app.use('/api/files', FilesRouter)
  }
}

export default new App().app
