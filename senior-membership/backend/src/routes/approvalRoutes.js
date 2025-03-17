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
  "/committee/:committeeId/candidate/:candidateId/my",
  // isCommitteeMiddleware,
  approvalController.getMyApprovalDetail
);

router.get("/committee/:committeeId/final-results", approvalController.getCommitteeSummaryApprovalList);
router.get("/committee/final-detail/:candidateId", approvalController.getFinalApprovalDetail);




// PUT update the pass/fail & verification details
router.put(
  "/:approvalId",
  // isCommitteeMiddleware,
  approvalController.updateApprovalDetail
);

router.put("/committee/:candidateId/send-back", approvalController.comitteeRevision);
router.put("/:candidateId/result-membership", approvalController.sentResultMembership);
// Optionally, get all committees' approvals for a candidate
router.get(
  "/candidates/:candidateId/approvals",
  approvalController.getCandidateApprovals
);

export default router;
