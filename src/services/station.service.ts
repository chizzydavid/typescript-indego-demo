
import { Op } from 'sequelize'
import * as stationDal from '../dal/station.dal'
import * as batchDal from '../dal/batch.dal'
import { StationInput, StationOuput } from '../models/station.model'
import { Station } from '../interfaces/station.interface';
import { NotFoundError } from '../middlewares/error';


export const create = async (payload: StationInput): Promise<StationOuput> => {
  try {
    return await stationDal.create(payload)
  } catch(error) {
    throw error;
  }
}

export const update = async (id: string, payload: Partial<StationInput>): Promise<StationOuput> => {
  try {
    return await stationDal.update(id, payload)
  } catch(error) {
    throw error;
  }
}

export const findById = (id: string): Promise<StationOuput> => {
  const station = stationDal.findById(id)
  return station;
}

export const deleteById = (id: string): Promise<boolean> => {
  try {
    return stationDal.deleteById(id)
  } catch(error) {
    throw error;
  }
}

/**
 * Retrieves the latest Station Snapshots for the passed timestamp
 *
 */
const findAll = async (atTime: string): Promise<Station[]> => {
  const earliestBatch = await batchDal.findAll({
    where: {
      createdAt: { [Op.gte]: atTime }
    },
    order: [['createdAt', 'DESC']],
    raw: true
  });
  if (!earliestBatch || earliestBatch.length === 0) {
    throw new NotFoundError('No Stations found for specified time');
  }
  const data = await stationDal.findAll({
    where: { 
      batchId: earliestBatch[0].batchId 
    },
    attributes: { exclude: ['stationId', 'batchId', 'updatedAt'] }
  });
  return data;
}

/**
 * Retrieves latest Snapshot for a Single Station
 *
 */
const findOne = async (kioskId: number, atTime: string) => {
  // wrap in try catch, catch 404 error and send a more descriptive error message
  const data = await stationDal.findOne({
    where: {
      kioskId,
      createdAt: {
        [Op.gte]: atTime
      }
    },
    attributes: { exclude: ['stationId', 'batchId', 'updatedAt'] },
    order: [['createdAt', 'DESC']]
  });
  return data;
}

export default {
  create,
  update,
  findById,
  deleteById,
  findOne,
  findAll
}


