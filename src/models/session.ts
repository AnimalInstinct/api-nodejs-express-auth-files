import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'

class Session extends Model {
  public readonly id!: number
  public userId!: string
  public email!: string
  public refreshToken!: string
  public accessToken!: string
  public expiresAt!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Session.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

export const associate = (db: dbType) => {}

export default Session
