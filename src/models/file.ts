import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'

class File extends Model {
  public readonly id!: number
  public originalName!: string
  public extension!: string
  public mimeType!: string
  public size!: number
  public path!: string
  public uploadedAt!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

File.init(
  {
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

export const associate = (db: dbType) => {}

export default File
