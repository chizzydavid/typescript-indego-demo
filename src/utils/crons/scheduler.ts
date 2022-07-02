import cron from 'node-cron';
import logger from '../logger';

const initCronJobs = async (config: any) => {
  Object.keys(config).forEach((key) => {
    logger.info(config[key].taskName + ' ::: scheduled');
    cron.schedule((config[key].taskFrequency).toString(), async () => {
      logger.info(config[key].taskName + ' task::: started');
      await config[key].taskHandler();
      logger.info(config[key].taskName + ' task::: stopped');
    })
  })
}

export default initCronJobs;

