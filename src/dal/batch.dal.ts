import { Op, FindOptions } from 'sequelize'
import { BatchInput, BatchOuput, Batch } from '../models/batch.model'
import { GetAllBatchFilters } from './types'
import { NotFoundError } from '../middlewares/error';


export const create = async (): Promise<BatchOuput> => {
  const batch = await Batch.create({})
  return batch;
}

// export const findOrCreate = async (payload: BatchInput): Promise<BatchOuput> => {
//   const [batch] = await Batch.findOrCreate({
//     where: { },
//     defaults: payload
//   })

//   return batch
// }

// export const update = async (id: string, payload: Partial<BatchInput>): Promise<BatchOuput> => {
//   const batch = await Batch.findByPk(id)

//   if (!batch) {
//     throw new NotFoundError(`Batch with id: ${id} not found`);
//   }
//   return await batch.update(payload);
// }

// export const findById = async (id: string): Promise<BatchOuput> => {
//   const batch = await Batch.findByPk(id)

//   if (!batch) {
//     throw new NotFoundError(`Batch with id: ${id} not found`);
//   }
//   return batch
// }

export const findOne = async (options?: FindOptions<BatchInput>): Promise<BatchOuput> => {
  const batch = await Batch.findOne({ ...options })

  if (!batch) {
    throw new NotFoundError(`Batch not found`);
  }
  return batch
}

// export const deleteById = async (id: string): Promise<boolean> => {
//   const deletedBatchCount = await Batch.destroy({
//     where: { batchId: id }
//   });

//   return !!deletedBatchCount;
// }

export const findAll = async (options?: FindOptions<BatchInput>): Promise<BatchOuput[]> => { 
  return Batch.findAll({ ...options });
}

