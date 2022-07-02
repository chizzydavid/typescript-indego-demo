import WeatherService from "../services/weather.service"
import { Response, NextFunction, Request } from 'express';


/**
 * Fetches Weather Snapshot for Passed Timestamp
 *
 */
const getWeatherSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { at: atTime } = req.query;
    const weather = await WeatherService.findOne(atTime as string);
    if (!weather) {
      return res.status(404).json({ 
        error: 'weather at specified timestamp not found' 
      });
    }
    res.status(200).json({ 
      data: {
        at: weather.createdAt,
        weather
      }
     });
  } catch(error) {
    next(error) 
  }
}

export default {
  getWeatherSnapshot
}

