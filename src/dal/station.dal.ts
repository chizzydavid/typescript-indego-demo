import { FindOptions } from 'sequelize'
import { StationInput, StationOuput, Station } from '../models/station.model'
import { NotFoundError } from '../middlewares/error';


export const create = async (payload: StationInput): Promise<StationOuput> => {
  const station = await Station.create(payload, { logging: false })
  return station
}

export const findOrCreate = async (payload: StationInput): Promise<StationOuput> => {
  const [station] = await Station.findOrCreate({
    where: {
      name: payload.name
    },
    defaults: payload
  })

  return station
}

export const update = async (id: string, payload: Partial<StationInput>): Promise<StationOuput> => {
  const station = await Station.findByPk(id)
  if (!station) {
    throw new NotFoundError(`Station with id: ${id} not found`);
  }
  return await station.update(payload);
}

export const findById = async (id: string): Promise<StationOuput> => {
  const station = await Station.findByPk(id)

  if (!station) {
    throw new NotFoundError(`Station with id: ${id} not found`);
  }
  return station
}

export const findOne = async (options?: FindOptions<StationInput>): Promise<StationOuput> => {
  const station = await Station.findOne({ ...options })

  if (!station) {
    throw new NotFoundError(`Station not found`);
  }
  return station
}

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedStationCount = await Station.destroy({
    where: { stationId: id }
  });

  return !!deletedStationCount;
}

export const findAll = async (options?: FindOptions<StationInput>): Promise<StationOuput[]> => { 
  return Station.findAll({ ...options });
}


