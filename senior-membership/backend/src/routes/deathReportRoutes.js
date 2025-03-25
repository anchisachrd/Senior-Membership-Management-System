import * as deathReportController from "../controllers/deathReportController.js"
import multer from "multer";
import { uploadDeathDocs } from '../middlewares/uploadDeathDocs.js'
import express from 'express';

const router = express.Router();

router.get("/:reportId", deathReportController.getDeathReportDocuments);
router.get("/committee/:committeeId/pending", deathReportController.getDeathPendingApprovals);
router.get("/member/:memberId", deathReportController.getDeathReportDetails);
router.get("/check-status/:heirId", deathReportController.checkDeathReportStatus);
router.put("/submit", uploadDeathDocs ,deathReportController.createDeathReport);
router.put("/staff/review/:reportId", deathReportController.updateReviewDeathReport);
router.put("/committee/death-approval/:reportId", deathReportController.approveDeathReport)

export default router;
