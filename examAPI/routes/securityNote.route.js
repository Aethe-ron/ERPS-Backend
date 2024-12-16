import express  from "express";
import   {insertSecNote} from '../controllers/securityNote.controller.js'

const router = express.Router()

router.post('/insertSecNote',insertSecNote);

export default router