import { Sequelize } from 'sequelize';
import APP_CONFIG from '../../config/app.config';
import logger from '../logger';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_OPTIONS: options } = APP_CONFIG;


export const sequelizeConnection = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  options,
)

export default async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    sequelizeConnection.authenticate().then(() => {
      logger.info('Database connection established successfully');
      resolve();
    })
    .catch((error: any) => {
      logger.error(`Unable to connect to  the  database, ${error}`)
      reject();
    })
  });
}

