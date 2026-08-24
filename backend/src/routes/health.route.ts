import express from "express";
import {getHealthRequest, postHealthRequest} from '../controllers/health.controllers.js'

const router = express.Router();

router.get('/', getHealthRequest)
router.post('/', postHealthRequest);
export {router as Router};

