
import { create as createStation } from '../dal/station.dal'
import { create as createWeather } from '../dal/weather.dal'
import { fetchIndegoStations, fetchWeatherData } from './data.service';
import logger from '../utils/logger';

export const getStationSnapshot = async () => {
  try {
    const stations = await fetchIndegoStations();
    const snapshots = stations.map(async (station: any) => {
      await createStation(
        { ...station.properties }
      );
    });
    await Promise.all(snapshots);
    logger.info('<========> Stations Snapshot Retrieved!!!')
  } catch(error) {
    logger.error(error as string)
  }
}

export const getWeatherSnapshot = async () => {
  try {
    const data = await fetchWeatherData();
    await createWeather({ ...data });
    logger.info('<========> Weather Snapshot Retrieved!!!')
  } catch(error) {
    logger.error(error as string)
  }
}

export default {
  getStationSnapshot,
  getWeatherSnapshot
}


