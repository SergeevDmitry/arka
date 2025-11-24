const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
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
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  }, {
    schema: process.env.DATABASE_SCHEMA_NAME,
  })
}
async function down({ context: queryInterface }) {
  await queryInterface.dropTable({
    tableName: 'users',
    schema: process.env.DATABASE_SCHEMA_NAME,
  })
}

module.exports = { up, down }
