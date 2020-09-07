import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'

class User extends Model {
  public readonly id!: number

  public userName!: string

  public email!: string

  public password!: string

  public firstName!: string

  public lastName!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(50),
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
    password: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

export const associate = (db: dbType) => {}

export default User
