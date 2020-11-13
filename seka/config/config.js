require('dotenv/config');


const {
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  PG_HOST,
  PG_DATABASE_TEST,
} = process.env;

module.exports = {
  development: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    seederStorage: 'sequelize',
  },
  test: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE_TEST,
    host: PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    seederStorage: 'sequelize',
  },
  production: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    seederStorage: 'sequelize',
  },
};
