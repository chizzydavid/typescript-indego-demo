import crypto from 'crypto';


export const weather = {
  "coord": {
    "lon": -75.1575,
    "lat": 39.9509
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 25.26,
    "feels_like": 26.09,
    "temp_min": 23.8,
    "temp_max": 26.21,
    "pressure": 1013,
    "humidity": 86
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.12,
    "deg": 230
  },
  "clouds": {
    "all": 100
  },
  "dt": 1656761628,
  "sys": {
    "type": 2,
    "id": 2037403,
    "country": "US",
    "sunrise": 1656754563,
    "sunset": 1656808380
  },
  "timezone": -14400,
  "id": 4560349,
  "name": "Philadelphia",
  "cod": 200
}

export const createdWeather = {
  ...weather,
  weatherId:  crypto.randomUUID(),
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "deletedAt": null
}
