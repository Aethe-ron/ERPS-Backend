import express  from "express";
import {insertPaySheet} from '../controllers/paysheet.controller.js'

const router = express.Router()

router.post('/insertPaySheet',insertPaySheet);

export default router