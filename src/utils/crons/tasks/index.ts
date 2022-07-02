import CronService from '../../../services/cron.service';

const fetchStationAndWeatherData = async () => {
  await CronService.getStationSnapshot();
  await CronService.getWeatherSnapshot();
};

export default fetchStationAndWeatherData;
