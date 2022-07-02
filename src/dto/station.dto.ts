import { Optional } from "sequelize/types"
import { StationInput } from '../models/station.model';


// TODO:: Update Create/Update DTO's to explicitly state their own properties
export interface CreateStationDTO extends StationInput {}

export interface UpdateStationDTO extends Optional<CreateStationDTO, 'name' | 'bikes'> {}

export interface FilterStationsDTO {
  isDeleted?: boolean
  includeDeleted?: boolean
}
