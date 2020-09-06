import 'reflect-metadata'
import * as dotenv from 'dotenv'

dotenv.config()

import { sequelize } from './models/index'
import app from './app'

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
