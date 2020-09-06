import * as dotenv from 'dotenv'

dotenv.config()
console.log(process.env)
export default {
  development: {
    username: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    host: process.env.MYSQL_HOST!,
    dialect: 'mysql',
    timezone: '+04:00',
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    host: process.env.MYSQL_HOST!,
    dialect: 'mysql',
    timezone: '+04:00',
    logging: false,
  },
  production: {
    username: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    host: process.env.MYSQL_HOST!,
    dialect: 'mysql',
    timezone: '+04:00',
    logging: false,
  },
}
