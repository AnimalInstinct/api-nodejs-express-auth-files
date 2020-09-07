import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'

class RefreshToken extends Model {
  public readonly id!: number

  public userId!: number

  public email!: string

  public token!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

export const associate = (db: dbType) => {}

export default RefreshToken
