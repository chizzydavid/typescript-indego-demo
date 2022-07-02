import { Optional } from "sequelize/types"
import { WeatherInput } from '../models/weather.model';

export interface CreateWeatherDTO extends WeatherInput {}

export interface UpdateWeatherDTO extends Optional<CreateWeatherDTO, 'name'> {}

export interface FilterWeathersDTO {
  isDeleted?: boolean
  includeDeleted?: boolean
}
