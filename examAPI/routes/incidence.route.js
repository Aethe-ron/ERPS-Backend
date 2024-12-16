import express  from "express";
import { insertIncidence } from "../controllers/incidence.controller.js";

const router = express.Router()

router.post('/insertIncidence',insertIncidence)

export default router