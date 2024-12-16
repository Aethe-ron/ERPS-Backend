import express from "express";
import { findUser,findAllUsers,findAllActiveUsers,findAllInActiveUsers} from '../controllers/users.controller.js'

const router = express.Router()

router.get('/findUser', findUser)
router.get('/findAllUsers', findAllUsers)
router.get('/findAllActiveUsers', findAllActiveUsers)
router.get('/findAllInActiveUsers', findAllInActiveUsers)


export default router;