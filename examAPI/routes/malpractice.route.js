import express  from "express";
import {insertMalpractice} from '../controllers/malpractice.controller.js'

const router = express.Router()

router.post('/insertMalpractice',insertMalpractice)

export default router