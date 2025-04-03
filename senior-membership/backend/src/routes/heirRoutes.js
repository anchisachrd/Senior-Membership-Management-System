import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadRegisterDocs } from '../middlewares/uploadRegisterDocs.js'
import * as heirController from '../controllers/heirController.js';

const router = express.Router();

router.get("/:heirId/member", heirController.getMembersForHeir);
router.get("/detail/:memberId", heirController.getHeirNameForPayment);
// router.post("/submit", submitDeathReport);

export default router;