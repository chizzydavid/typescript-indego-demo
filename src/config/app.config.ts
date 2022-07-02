import { Dialect } from "sequelize/types";

const { 
  NODE_ENV, 
  DB_HOST,
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  DB_URI,
  DB_DIALECT,
  PORT
} = process.env;


export default {
  ENV: NODE_ENV,
  PORT: PORT!,
  DB_USER: DB_USER!,
  DB_HOST: DB_HOST!,
  DB_NAME: DB_NAME!,
  DB_PASSWORD: DB_PASSWORD!,
  DB_DIALECT: DB_DIALECT!,
  DB_OPTIONS: {
    host: DB_HOST!,
    dialect: DB_DIALECT as Dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  DB_URI
}
