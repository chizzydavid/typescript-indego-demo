import axios from 'axios';
import INDEGO_CONFIG from '../config/indego.config';
import WEATHER_CONFIG from '../config/weather.config';
import { create as createBatch } from '../dal/batch.dal'
import { Station } from '../interfaces/station.interface';
import { Weather } from '../interfaces/weather.interface';

const headers = {
  'Content-Type': 'application/json'
}

export const fetchIndegoStations = async (): Promise<Station[]> => {
  try {
    const { BASE_URL: INDEGO_URL } = INDEGO_CONFIG; 
    const { batchId } = await createBatch();

    const result = await axios.get('/phl', {
      baseURL: INDEGO_URL,
      headers
    });

    const data: Station[] = result.data.features.map((station: any) => {
      station.properties.batchId = batchId;
      return station as Station;
    });
    return data; 
  } catch(err: any) {
    const error = err.response.data.message ?? err.message
    throw new Error(`Failed to get stations data ${error}`)
  }
}

export const fetchWeatherData = async (): Promise<Weather> => {
  try {
    const { 
      BASE_URL: WEATHER_URL, 
      API_KEY, 
      CITY_COORDINATES: { lat, long } 
    } =  WEATHER_CONFIG;

    const result = await axios.get('/data/2.5/weather', {
      baseURL: WEATHER_URL,
      params: {
        lat: lat,
        lon: long,
        appid: API_KEY,
        units: 'metric',
      },
      headers
    });

    return result.data as Weather;
  } catch(err: any) {
    const error = err.response.data.message ?? err.message
    throw new Error(`Failed to get weather data ${error}`)
  }
}

