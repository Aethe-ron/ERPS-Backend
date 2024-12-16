import express  from "express";
import { insertAttendance} from "../controllers/attendance.controller.js";

const router = express.Router()
router.post('/insertAttendance',insertAttendance);

export default router