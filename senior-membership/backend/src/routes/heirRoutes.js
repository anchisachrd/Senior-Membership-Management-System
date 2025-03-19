import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadRegisterDocs } from '../middlewares/uploadRegisterDocs.js'
import * as heirController from '../controllers/heirController.js';

const router = express.Router();

router.get("/:heirId/member", heirController.getMembersForHeir);
// router.post("/submit", submitDeathReport);

export default router;