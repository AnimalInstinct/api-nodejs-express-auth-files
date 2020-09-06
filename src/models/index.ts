import User, { associate as associateUser } from './user'
import RefreshToken, {
  associate as associateRefreshToken,
} from './refreshToken'

export * from './sequelize'

const db = {
  User,
  RefreshToken,
}

export type dbType = typeof db

associateUser(db)
