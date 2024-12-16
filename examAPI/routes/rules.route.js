import express  from "express";
import {insertRules} from '../controllers/rules.controller.js'

const router = express.Router()

router.post('/insertRule',insertRules)

export default router