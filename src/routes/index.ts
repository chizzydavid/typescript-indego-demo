import { Router } from 'express'
import stationRouter from './station.route'
import weatherRouter from './weather.route'

const router = Router()

router.use('/stations', stationRouter)
router.use('/weather', weatherRouter)

export default router
