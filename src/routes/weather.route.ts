import express from 'express';
import WeatherController from '../controllers/weather.controller';
import { validateISOFormat as validateSnapshotTime } from '../middlewares/validator';

const router = express.Router();

router.get(
  "/",
  validateSnapshotTime,
  WeatherController.getWeatherSnapshot
);

export default router;

