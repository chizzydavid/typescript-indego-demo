import StationService from "../services/station.service"
import WeatherService from "../services/weather.service"
import { Response, NextFunction, Request } from 'express';
import { CreateStationDTO, UpdateStationDTO } from "../dto/station.dto";
import logger from "../utils/logger";

/**
 * Fetches all Station Snapshots for Passed Timestamp
 *
 */
const getAllStationsSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const atTime = req.query.at as string;
    const stations = await StationService.findAll(atTime);
    const weather = await WeatherService.findOne(atTime);
    res.status(200).json({ 
      data: {
        at: stations[0].createdAt,
        stations,
        weather
      }
     });
  } catch(error) {
    next(error)
  }
}  

/**
 * Fetches Snapshot for Single Kiosk/Station
 *
 */
const getOneStationSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const atTime = req.query.at as string;
    const { kioskId } = req.params;  
    const station = await StationService.findOne(parseInt(kioskId), atTime);
    const weather = await WeatherService.findOne(atTime);
    logger.info('retrieved single snapshot')

    res.status(200).json({ 
      data: {
        at: station.createdAt,
        station,
        weather
      }
    });
  } catch(error) {
    logger.error(error as string)
    next(error)
  }
}

const createSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = await StationService.create(req.body as CreateStationDTO);
    res.status(200).json({ 
      data: station
    });
  } catch(error: any) {  
    next(error)
  }
}

const updateSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stationId } = req.params;
    const station = await StationService.update(stationId, req.body as UpdateStationDTO);

    res.status(200).json({ 
      data: station
    });
  } catch(error) {
    next(error)
  }
}

const deleteSnapshot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stationId } = req.params;  
    await StationService.deleteById(stationId);
    res.status(204).send();
  } catch(error) {
    next(error)
  }
}

export default {
  getAllStationsSnapshot,
  getOneStationSnapshot,
  createSnapshot,
  updateSnapshot,
  deleteSnapshot
}


