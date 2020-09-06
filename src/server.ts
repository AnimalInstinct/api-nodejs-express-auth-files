import 'reflect-metadata'
import dotenv from 'dotenv'

dotenv.config()

import { sequelize } from './models/index'
import app from './app'

// Throw error if JWT not specified in .env
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in .env')
}

// Connect to Mysql or throw Error
sequelize
  .sync()
  .then(() => {
    const PORT: number = +process.env.PORT! || 3000
    app.listen(PORT, () => {
      console.log('Server Start: Listen on port ', PORT)
    })
  })
  .catch(err => {
    console.log('There were some error during sequelize.sync():', err)
  })
