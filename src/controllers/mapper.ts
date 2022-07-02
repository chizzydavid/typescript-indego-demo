import { Station } from '../interfaces'
import { StationInput, StationOuput } from '../models/station.model';


export const toStation = (station: StationOuput): Station => {
  return station as Station;
}




