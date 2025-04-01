import * as deathReportController from "../controllers/deathReportController.js"
import multer from "multer";
import { uploadDeathDocs } from '../middlewares/uploadDeathDocs.js'
import express from 'express';

const router = express.Router();

router.get("/:reportId", deathReportController.getDeathReportDocuments);
router.get("/committee/:committeeId/pending", deathReportController.getDeathPendingApprovals);
router.get("/member/:memberId", deathReportController.getDeathReportDetails);
router.get("/:reportId/committee-approvals", deathReportController.getDeathApprovalDetail)
router.get("/check-status/:heirId", deathReportController.checkDeathReportStatus);
router.get("/death-detail/:reportId", deathReportController.getDeathReportName);


router.post("/:reportId/create-slips", deathReportController.createPaymentSlips);

router.put("/submit", uploadDeathDocs ,deathReportController.createDeathReport);
router.put("/staff/review/:reportId", deathReportController.updateReviewDeathReport);
router.put("/committee/death-approval/:reportId", deathReportController.approveDeathReport)
router.put("/recheck/:reportId", deathReportController.recheckApproval);

router.put("/:reportId/mark-requested", deathReportController.markIsRequested);

export default router;
