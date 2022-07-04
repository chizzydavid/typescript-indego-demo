import { station, createdStation, updatedStation } from '../../data/station';
import { weather, createdWeather } from '../../data/weather';
import { createdBatch } from '../../data/batch';
import { request } from '../../helper';
import * as stationDal from '../../../src/dal/station.dal';
import * as weatherDal from '../../../src/dal/weather.dal';
import * as batchDal from '../../../src/dal/batch.dal';
import { Station } from '../../../src/interfaces';


describe('Station Test Suite', () => {

  describe('Create Station Snapshot', () => {
    it('Successful given a valid payload', async () => {
      const mockCreateStationDal = jest
          .spyOn(stationDal, 'create')
          .mockResolvedValueOnce(createdStation)

      const res = await request.post('/api/v1/stations').send(station);

      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.body.data.stationId).toBeDefined()
      expect(mockCreateStationDal).toBeCalledWith(station);
      expect(mockCreateStationDal).toBeCalledTimes(1);
    });

    it('Returns error given an invalid payload', async () => {
      const error = "null value in column \"batchId\" of relation \"Station\" violates not-null constraint";
      const invalidStation = { ...station, batchId: undefined };
      const mockCreateStation = jest.fn((passed): any => {
        if (!passed.batchId) {
          throw new Error(error)
        }
      });

      jest
        .spyOn(stationDal, 'create')
        .mockImplementationOnce(() => mockCreateStation(invalidStation))

      const res = await request.post('/api/v1/stations').send(invalidStation);
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBeDefined()
      expect(res.body.error.message).toEqual(error)
    });
  });


  describe('Update Station Snapshot', () => {
    it('Successful given a valid payload', async () => {
      const { stationId } = updatedStation;
      const mockUpdateStation = jest
          .spyOn(stationDal, 'update')
          .mockResolvedValueOnce(updatedStation)

      const res = await request
          .put(`/api/v1/stations/${stationId}`)
          .send({ name: "Fortlette Plaza Updated" });

      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.body.data.name).toEqual(updatedStation.name)
      expect(mockUpdateStation).toBeCalledWith(stationId, { name: updatedStation.name});
      expect(mockUpdateStation).toBeCalledTimes(1);
    });
  });


  describe('Get One Station Snapshot', () => {
    it('Successful given a valid kioskId', async () => {
      const { kioskId } = createdStation;
      const mockFindStation = jest
          .spyOn(stationDal, 'findOne')
          .mockResolvedValueOnce(createdStation)

      const mockFindWeather = jest
          .spyOn(weatherDal, 'findOne')
          .mockResolvedValueOnce(createdWeather)

      const res = await request
          .get(`/api/v1/stations/${kioskId}/?at=2022-06-23T15:30:50.858Z`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.at).toBe(createdStation.createdAt.toISOString())
      // expect(res.body.data.station).toEqual<Station>(createdStation)
      // expect(res.body.data.station).toMatchObject(createdStation)
      expect(res.body.data.weather).toBeDefined()
      expect(mockFindStation).toBeCalledTimes(1);
      expect(mockFindWeather).toBeCalledTimes(1);
    });

    it('Returns error given an invalid kioskId', async () => {
      const res = await request.get(`/api/v1/stations/aabb}`);      

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("KioskId must be a valid Integer")
    });       

    it('Returns error given no timestamp', async () => {
      const { kioskId } = createdStation;
      const res = await request.get(`/api/v1/stations/${kioskId}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("Timestamp for snapshot is required")
    });


    it('Returns error given invalid timestamp', async () => {
      const { kioskId } = createdStation;
      const res = await request.get(`/api/v1/stations/${kioskId}/?at=2022::06::23`);    
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("Time format must be a valid ISO String")
    });        
  });


  describe('Get All Stations Snapshot', () => {
    it('Successful given a valid timestamp', async () => {
      const mockFindStations = jest
          .spyOn(stationDal, 'findAll')
          .mockResolvedValueOnce([createdStation])
      jest
          .spyOn(weatherDal, 'findOne')
          .mockResolvedValueOnce(createdWeather)
      const mockFindBatch = jest
          .spyOn(batchDal, 'findAll')
          .mockResolvedValueOnce([createdBatch])

      const res = await request.get(`/api/v1/stations/?at=2022-06-23T15:30:50.858Z`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.at).toBe(createdStation.createdAt.toISOString())      
      expect(Array.isArray(res.body.data.stations)).toBeTruthy();
      expect(res.body.data.stations.length).toEqual(1);  
      expect(res.body.data.weather).toBeDefined()
      expect(mockFindStations).toBeCalledTimes(1);
      expect(mockFindBatch).toBeCalledTimes(1)
    });

    it('Returns error given invalid timestamp', async () => {
      jest
          .spyOn(batchDal, 'findAll')
          .mockResolvedValueOnce([])

      const res = await request.get(`/api/v1/stations/?at=2026-06-23T15:30:50.858Z`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error.message).toEqual("No Stations found for specified time")
    });    
  });


  describe('Delete Station Snapshot', () => {
    it('Successful given a valid stationId', async () => {
      const { stationId } = createdStation;
      const mockDeleteStation = jest
          .spyOn(stationDal, 'deleteById')
          .mockResolvedValueOnce(true)

      const res = await request.delete(`/api/v1/stations/${stationId}`);

      expect(res.statusCode).toBe(204);
      expect(mockDeleteStation).toBeCalledWith(stationId);
      expect(mockDeleteStation).toBeCalledTimes(1);
    });
  });
  
});



