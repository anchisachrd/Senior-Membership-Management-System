import express from 'express';
import * as clubController from "../controllers/clubController.js"

const router = express.Router();

router.get("/account-balance",clubController.getClubAccount);
router.get("/dashboard/staff",clubController.dashboardController);
router.get("/summary-report",clubController.getClubSummaryReport);



export default router;