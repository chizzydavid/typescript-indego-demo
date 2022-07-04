import express, { Request, Response } from 'express';
import StationController from '../controllers/station.controller';
import { 
  validateISOFormat as validateSnapshotTime,
  validateNumber as validateKioskId,
} from '../middlewares/validator';

const router = express.Router();

router.post(
  "/",
  StationController.createSnapshot
)

router.put(
  "/:stationId",
  StationController.updateSnapshot
)

router.get(
  "/",
  validateSnapshotTime,
  StationController.getAllStationsSnapshot
);

router.get(
  "/:kioskId",
  validateKioskId,
  validateSnapshotTime,
  StationController.getOneStationSnapshot
);

router.delete(
  "/:stationId",
  StationController.deleteSnapshot
)

export default router;

