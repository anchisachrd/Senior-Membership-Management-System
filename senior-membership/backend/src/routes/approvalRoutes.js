
import * as candidateController from '../controllers/candidateController.js';
import * as approvalController from '../controllers/approvalController.js'
import express from 'express';
const router = express.Router();

router.get("/verification/:candidateId",  approvalController.getVerificationDetails);
router.put("/:candidateId/approval-status", approvalController.updateCandidateApprovalStatus);




/**
 * 6) GET /api/candidates/:id
 */


export default router;
