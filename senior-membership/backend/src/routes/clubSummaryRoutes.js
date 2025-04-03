import express from 'express';
import * as clubController from "../controllers/clubController.js"
import { uploadProof } from '../middlewares/uploadDeathPayment.js';

const router = express.Router();

router.get("/account-balance",clubController.getClubAccount);
router.get("/dashboard/staff",clubController.dashboardController);
router.get("/summary-report",clubController.getClubSummaryReport);
router.get("/payment/death-list",clubController.getHeirPaymentList);


router.post("/add-club-expense",clubController.addClubExpense);
router.post("/payment/upload-proof", uploadProof, clubController.uploadProof);
router.post("/add-club-general-expense",clubController.addClubGeneralExpense);


export default router;