import express  from "express";
import { insertSignOut } from "../controllers/signout.controller.js";


const router = express.Router();

router.post('/insertSignOut',insertSignOut);

export default router