import * as memberController from "../controllers/memberController.js";
import {uploadSlip} from '../middlewares/uploadSlip.js'
import { slipController } from '../controllers/slipController.js';
import * as slipFunction from '../controllers/slipController.js';
import express from "express";
const router = express.Router();


router.get("/active", memberController.getActiveMembers);
router.get("/death", memberController.getDeathMemberList);
router.get("/notify/death", memberController.getDeathMembers);
router.get("/notify/quit", memberController.getQuitMembers);
router.get("/reviewed/death-list", memberController.getReviewdDeathList);

router.get("/slip", slipController.getAllSlipHistories);
router.post("/verify-slip", uploadSlip, slipController.verifyAndSaveSlip);
<<<<<<< HEAD
router.get("/slip/:memberId/:reportId", slipFunction.getSlipDetailByMemberAndReport);
=======
>>>>>>> 764f816cd2a74c76b15eb86f3f574565d8fd663d
router.get("/history/:memberId", slipController.getSlipHistoriesByMember);
router.get("/slip/summary", slipFunction.getAccountSummary);
router.get("/slip/passed", slipFunction.getAllPassedSlips);

// Then put your "/:memberId" route last
router.get("/:memberId", memberController.getMemberInfo);

export default router;