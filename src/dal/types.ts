interface ListFilters {
  isDeleted?: boolean
  includeDeleted?: boolean
}

export interface GetAllStationFilters extends ListFilters {}
export interface GetAllWeatherFilters extends ListFilters {
  isPublished?: boolean
  isNotPublished?: boolean
}

export interface GetAllBatchFilters extends ListFilters {}
