import User, { associate as associateUser } from './user'
import File, { associate as associateFile } from './file'
import RefreshToken, {
  associate as associateRefreshToken,
} from './refreshToken'

export * from './sequelize'

const db = {
  User,
  RefreshToken,
  File,
}

export type dbType = typeof db

associateUser(db)
