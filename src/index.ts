import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import connectToDatabase from './utils/database';
import cronScheduler from './utils/crons/scheduler';
import CRON_CONFIG from './config/cron.config';
// import { getStationSnapshot, getWeatherSnapshot } from './services/cron.service';
import logger from './utils/logger';
import app from './app';


const server = http.createServer(app);

const normalizePort = (val: string | undefined): number => {
  if (!val) return 5000;
  const port = parseInt(val)

  if (isNaN(port)) {
    return 5000
  } 
  return port;
}

const PORT: number = normalizePort(process.env.PORT);

server.listen(PORT);

server.on('listening', async () => {
  logger.info(`Application is listening on port ${PORT}`);
  await connectToDatabase();
  cronScheduler(CRON_CONFIG);
});

server.on('close', () => {
  logger.info('Application server closed');
});

