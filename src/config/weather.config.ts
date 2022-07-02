const { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } = process.env;

export default {
  BASE_URL: OPEN_WEATHER_BASE_URL,
  API_KEY: OPEN_WEATHER_API_KEY,
  CITY_COORDINATES: {
    lat: 39.9509,
    long: -75.1575
  }
};
