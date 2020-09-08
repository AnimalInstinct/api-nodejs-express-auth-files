import path from 'path'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const dotenv = require('dotenv')
  const envFound = dotenv.config()
  if (!envFound) {
    throw new Error('Please create .env file')
  }
}

module.exports = {
  logs: {
    level: process.env.LOG_LEVEL || 'short',
  },
  database: require('./database'),
  api: {
    prefix: '/api',
  },
  jwt: {
    accessTokenLifeTime: '10m',
    refreshTokenLifeTime: '2h',
    secret: process.env.JWT_SECRET,
  },
  baseDir: path.resolve(__dirname, '../..'),
}

export const config = () => {}
