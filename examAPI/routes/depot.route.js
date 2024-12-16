import express  from "express";
import   {depotKeepers} from '../controllers/depot.controller.js'

const router = express.Router()

router.post('/depotKeepers',depotKeepers);

export default router