// backend/src/routes/candidateRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadRegisterDocs } from '../middlewares/uploadRegisterDocs.js'
import * as candidateController from '../controllers/candidateController.js';

const router = express.Router();


// route อัปโหลด "เอกสารผู้สมัคร"
router.post('/', uploadRegisterDocs, candidateController.createCandidateData);

router.get('/verified', candidateController.getVerifiedCandidates); 
router.get('/candidate-list', candidateController.getWaitingApproveCandidates);
router.get('/:id', candidateController.getCandidateandHeirById);
router.put('/:id/verify', candidateController.updateDocStatus);
router.put('/send-to-committee/:candidateId', candidateController.sendToCommittee);

router.post("/", candidateController.createCandidateData);
router.get('/', candidateController.getCandidates);
router.delete('/:candidateId', candidateController.deleteCandidate);




export default router;
