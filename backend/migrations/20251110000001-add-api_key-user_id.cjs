require('dotenv').config();

async function up({ context: queryInterface }) {
  await queryInterface.sequelize.query(`ALTER TABLE IF EXISTS "${process.env.DATABASE_SCHEMA_NAME}".api_keys ADD COLUMN "USER_ID" uuid`);
  await queryInterface.sequelize.query(`ALTER TABLE IF EXISTS "${process.env.DATABASE_SCHEMA_NAME}".api_keys ADD CONSTRAINT "api_keys_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "${process.env.DATABASE_SCHEMA_NAME}".users (id) ON UPDATE CASCADE ON DELETE CASCADE`);
}

async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`ALTER TABLE IF EXISTS "${process.env.DATABASE_SCHEMA_NAME}".api_keys DROP COLUMN "USER_ID";`);
  await queryInterface.sequelize.query(`ALTER TABLE IF EXISTS "${process.env.DATABASE_SCHEMA_NAME}".api_keys DROP CONSTRAINT "api_keys_USER_ID_fkey";`);
}

module.exports = { up, down }
