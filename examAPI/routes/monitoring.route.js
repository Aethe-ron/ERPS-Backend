import express  from "express";
import   {insertMonitoring} from '../controllers/monitoring.controller.js'

const router = express.Router()

router.post('/insertMonitoring',insertMonitoring);

export default router