import express from 'express'
import cors from 'cors'
import UserRouter from './routes/user'
import FilesRouter from './routes/file'
import { errorHandler } from './middleware'
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
    // this.app.use(express.urlencoded({ extended: false }))
    this.app.use('/api/auth', UserRouter)
    this.app.use('/api/files', FilesRouter)
    this.app.use(errorHandler)
  }
}

export default new App().app
