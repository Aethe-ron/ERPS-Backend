import express  from "express";
import {insertNote} from  '../controllers/note.controller.js'

const router = express.Router()

router.post('/insertNote',insertNote )

export default router