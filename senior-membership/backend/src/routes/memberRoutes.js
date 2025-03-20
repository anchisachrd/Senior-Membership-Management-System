import * as memberController from "../controllers/memberController.js";
import {uploadSlip} from '../middlewares/uploadSlip.js'
import { slipController } from '../controllers/slipController.js';
import * as slipFunction from '../controllers/slipController.js';
import express from "express";
const router = express.Router();


router.get("/active", memberController.getActiveMembers);
router.get("/notify/death", memberController.getDeathMembers);
router.get("/notify/quit", memberController.getQuitMembers);
router.get("/:memberId", memberController.getMemberInfo);


router.post('/verify-slip', uploadSlip,slipController.verifyAndSaveSlip );
router.get('/slip', slipController.getAllSlipHistories);
router.get('/history/:memberId', slipController.getSlipHistoriesByMember);

router.get('/slip/summary', slipFunction.getAccountSummary);
router.get('/slip/passed', slipFunction.getAllPassedSlips);

export default router;