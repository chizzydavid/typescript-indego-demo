const APP_CONFIG = require('./app.config')

const {
  DB_HOST,
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  DB_DIALECT,
  DB_OPTIONS
} = APP_CONFIG;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  
  // test: {
  //   username: root,
  //   password: null,
  //   database: database_test,
  //   host: 127.0.0.1,
  //   dialect: mysql
  // },
  // production: {
  //   username: root,
  //   password: null,
  //   database: database_production,
  //   host: 127.0.0.1,
  //   dialect: mysql
  // }
}
