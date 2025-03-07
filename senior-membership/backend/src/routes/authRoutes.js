import express from 'express';
import multer from 'multer';
import path from 'path';

import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post("/", authController.loginUserByEmail);

export default router;