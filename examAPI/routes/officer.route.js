import express  from "express";
import {officersDetail} from '../controllers/officer.controller.js'

const router = express.Router()

router.post('/officersDetail',officersDetail)

export default router