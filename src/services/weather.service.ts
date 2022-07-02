
import { Op } from 'sequelize'
import * as weatherDal from '../dal/weather.dal'
import { WeatherInput, WeatherOuput } from '../models/weather.model'
import { Weather } from '../interfaces/weather.interface';
import { NotFoundError } from '../middlewares/error';


export const create = async (payload: WeatherInput): Promise<WeatherOuput> => {
  try {
    return weatherDal.create(payload)
  } catch(error) {
    throw error;
  }
}

export const update = async (id: string, payload: Partial<WeatherInput>): Promise<WeatherOuput> => {
  try {
    return weatherDal.update(id, payload)
  } catch(error) {
    throw error;
  }
}

export const findById = (id: string): Promise<WeatherOuput> => {
  const weather = weatherDal.findById(id)
  return weather;
}

export const deleteById = (id: string): Promise<boolean> => {
  try {
    return weatherDal.deleteById(id)
  } catch(error) {
    throw error;
  }
}

/**
 * Retrieves latest Snapshot for a Single Weather
 *
 */
const findOne = async (atTime: string): Promise<Weather> => {
  const data = await weatherDal.findOne({
    where: {
      createdAt: {
        [Op.gte]: atTime
      }
    },
    attributes: { exclude: ['weatherId'] },
    order: [['createdAt', 'DESC']]
  });
  return data;
}

export default {
  create,
  findById,
  deleteById,
  findOne,
}


