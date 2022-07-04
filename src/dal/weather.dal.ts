import { FindOptions } from 'sequelize'
import { WeatherInput, WeatherOuput, Weather } from '../models/weather.model'
import { NotFoundError } from '../middlewares/error';


export const create = async (payload: WeatherInput): Promise<WeatherOuput> => {
  const weather = await Weather.create(payload)
  return weather
}

// export const findOrCreate = async (payload: WeatherInput): Promise<WeatherOuput> => {
//   const [weather] = await Weather.findOrCreate({
//     where: {
//       name: payload.name
//     },
//     defaults: payload
//   })

//   return weather
// }

// export const update = async (id: string, payload: Partial<WeatherInput>): Promise<WeatherOuput> => {
//   const weather = await Weather.findByPk(id)

//   if (!weather) {
//     throw new NotFoundError(`Weather with id: ${id} not found`);
//   }
//   return await weather.update(payload);
// }

// export const findById = async (id: string): Promise<WeatherOuput> => {
//   const weather = await Weather.findByPk(id)

//   if (!weather) {
//     throw new NotFoundError(`Weather with id: ${id} not found`);
//   }
//   return weather
// }

export const findOne = async (options?: FindOptions<WeatherInput>): Promise<WeatherOuput> => {
  const weather = await Weather.findOne({ ...options })

  if (!weather) {
    throw new NotFoundError(`Weather for condition not found`);
  }
  return weather
}

// export const deleteById = async (id: string): Promise<boolean> => {
//   const deletedWeatherCount = await Weather.destroy({
//     where: { weatherId: id }
//   });

//   return !!deletedWeatherCount;
// }

export const findAll = async (options?: FindOptions<WeatherInput>): Promise<WeatherOuput[]> => { 
  return Weather.findAll({ ...options });
}


