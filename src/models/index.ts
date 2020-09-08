import User, { associate as associateUser } from './user'
import Session, { associate as associateSession } from './session'
import File, { associate as associateFile } from './file'

export * from './sequelize'

const db = {
  User,
  Session,
  File,
}

export type dbType = typeof db

associateUser(db)
