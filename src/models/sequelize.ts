import { Sequelize, Options } from 'sequelize'
import config from '../config/database'

const env =
  (process.env.NODE_ENV as 'production' | 'test' | 'development') ||
  'development'
const { database, username, password } = config[env]

const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env] as Options
)

export { sequelize }
export default sequelize
