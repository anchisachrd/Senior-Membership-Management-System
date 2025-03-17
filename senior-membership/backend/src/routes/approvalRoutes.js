import * as candidateController from "../controllers/candidateController.js";
import * as approvalController from "../controllers/approvalController.js";
import express from "express";
const router = express.Router();

// GET the currently logged-in committee's pending approvals
router.get(
  "/committee/:committeeId/pending",
  // isCommitteeMiddleware,
  approvalController.getPendingApprovals
);

// GET the single approval detail for the logged-in committee + candidate
router.get(
  "/candidate/:candidateId/my",
  // isCommitteeMiddleware,
  approvalController.getMyApprovalDetail
);

router.get("/committee/final-results", approvalController.getFinalApprovalList);
router.get("/committee/final-detail/:candidateId", approvalController.getFinalApprovalDetail);

// router.put("/:candidateId/approval-status", approvalController.updateCandidateApprovalStatus);
// router.put(
//   "/:candidateId/committees/:committeeId/approval-status", 
//   approvalController.updateCandidateApprovalStatus
// );

// PUT update the pass/fail & verification details
router.put(
  "/:approvalId",
  // isCommitteeMiddleware,
  approvalController.updateApprovalDetail
);

// Optionally, get all committees' approvals for a candidate
router.get(
  "/candidates/:candidateId/approvals",
  approvalController.getCandidateApprovals
);

export default router;
