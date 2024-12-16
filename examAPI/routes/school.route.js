import express from 'express'
import { regSchool, getSchool,findSchoolCode,findSchoolReg} from '../controllers/school.controller.js'

const router = express.Router();

router.post('/regSchool',regSchool);
router.get('/getSchool', getSchool);
router.post('/findSchoolCode', findSchoolCode);
router.post('/findSchoolReg', findSchoolReg)
//router.delete('/school', school);
//router.patch('/school', school);

export default router;