import { Response, NextFunction, Request } from 'express';
import moment from 'moment';

/**
 * Validator Middleware for ISO String
 *
 */
export const validateISOFormat = (req: Request, res: Response, next: NextFunction) => {
  const { at } = req.query;
  if (!at) {
    return res.status(400).json({ 
      error: "Timestamp for snapshot is required"
    })
  } 
  const isValid = moment(at as string, moment.ISO_8601).isValid()
  if (!isValid) {
    return res.status(400).json({ 
      error: "Time format must be a valid ISO String"
    })
  }
  next();
}

/**
 * Validator Middleware for Valid Integers
 *
 */
export const validateNumber = (req: Request, res: Response, next: NextFunction) => {
  const { kioskId } = req.params;  
  if (isNaN(Number(kioskId))) {
    return res.status(400).json({ 
      error: "KioskId must be a valid Integer"
    })
  }
  next();
}

