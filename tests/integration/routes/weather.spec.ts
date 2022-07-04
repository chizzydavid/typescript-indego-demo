import { createdWeather } from '../../data/weather';
import { request } from '../../helper';
import * as weatherDal from '../../../src/dal/weather.dal';


describe('Weather Test Suite', () => {
  describe('Get One Weather Snapshot', () => {
    it('Successful given a valid timestamp', async () => {

      const mockFindWeather = jest
          .spyOn(weatherDal, 'findOne')
          .mockResolvedValueOnce(createdWeather)          

      const res = await request.get(`/api/v1/weather/?at=2022-06-23T15:30:50.858Z`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.at).toBe(createdWeather.createdAt.toISOString())
      expect(res.body.data.weather).toBeDefined()
      expect(mockFindWeather).toBeCalledTimes(1);
    });
    

    it('Returns error given no timestamp', async () => {
      const res = await request.get(`/api/v1/weather/`);      

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("Timestamp for snapshot is required")
    });


    it('Returns error given invalid timestamp', async () => {
      const res = await request.get(`/api/v1/weather/?at=2022::06::23`);    
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("Time format must be a valid ISO String")
    });        
  });
});


