

// backend/src/routes/candidateRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadRegisterDocs } from '../middlewares/uploadRegisterDocs.js'
import * as candidateController from '../controllers/candidateController.js';
import * as verificationController from '../controllers/verificationController.js'

const router = express.Router();

router.get("/pending-candidates", candidateController.getPendingCandidates);
// route อัปโหลด "เอกสารผู้สมัคร"
router.post("/register", uploadRegisterDocs, candidateController.register);

 router.get('/verified', candidateController.getVerifiedCandidates); 
router.get('/candidate-list', candidateController.getWaitingApproveCandidates);
router.get('/:id', candidateController.getCandidateAndHeirById);
router.post('/verification/:candidateId/update', verificationController.updateVerificationStatus)
// router.put('/:id/verify', candidateController.updateDocStatus);
router.put('/send-to-committee/:candidateId', candidateController.sendToCommittee);

// router.post("/", candidateController.createCandidateData);
// router.get('/', candidateController.getCandidates);
// router.delete('/:candidateId', candidateController.deleteCandidate);




export default router;