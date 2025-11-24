import { Sequelize, DataTypes, Model } from 'sequelize'

export class User extends Model {
  public id!: string
  public email!: string
  public password!: string
  public createdAt!: Date
  public updatedAt!: Date
}

export function initializeUserModel(sequelize: Sequelize, schema: string) {
  const initializedUserModel = User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true,
    underscored: true,
    schema,
  })

  return initializedUserModel
}