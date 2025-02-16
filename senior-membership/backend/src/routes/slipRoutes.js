import express from 'express';
import {uploadSlip} from '../middlewares/uploadSlip.js'
import { slipController } from '../controllers/slipController.js';


const router = express.Router();

router.post('/verify-slip', uploadSlip,slipController.verifyAndSaveSlip );
router.get('/slip', slipController.getAllSlipHistories);
router.get('/:memberId', slipController.getSlipHistoriesByMember);

export default router;