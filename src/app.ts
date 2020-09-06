import express from 'express'
import * as bodyParser from 'body-parser'
import router from './router'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('trust proxy', true)

const corsMiddleware = cors({ origin: '*', preflightContinue: true })
app.use(corsMiddleware)
app.options('*', corsMiddleware)

router(app)

export default app
