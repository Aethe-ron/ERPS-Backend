import express from 'express';
import {insertInvigilatorEnd} from '../controllers/invigilator.controller.js'

const router = express.Router();

router.post('/insertInvigilatorEnd',insertInvigilatorEnd)

export default router;