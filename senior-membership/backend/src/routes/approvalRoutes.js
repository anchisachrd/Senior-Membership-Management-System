
import * as candidateController from '../controllers/candidateController.js';
import * as approvalController from '../controllers/approvalController.js'
import express from 'express';
const router = express.Router();

//ไว้ดูเอกสาร
router.get("/:candidateId/committees/:committeeId",  approvalController.getVerificationDetail);
router.get("/candidates/:committeeId", approvalController.getCandidatesForCommittee)
router.get("/summary/:candidateId", approvalController.getCandidateApprovalSummary)

// router.put("/:candidateId/approval-status", approvalController.updateCandidateApprovalStatus);
router.put(
  "/:candidateId/committees/:committeeId/approval-status", 
  approvalController.updateCandidateApprovalStatus
);



/**
 * 6) GET /api/candidates/:id
 */


export default router;
