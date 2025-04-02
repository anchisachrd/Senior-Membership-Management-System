import express from 'express';
import * as clubController from "../controllers/clubController.js"

const router = express.Router();

router.get("/account-balance",clubController.getClubAccount);
router.get("/dashboard/staff",clubController.dashboardController);
router.get("/summary-report",clubController.getClubSummaryReport);

router.post("/add-club-expense",clubController.addClubExpense);
router.post("/add-club-general-expense",clubController.addClubGeneralExpense);


export default router;