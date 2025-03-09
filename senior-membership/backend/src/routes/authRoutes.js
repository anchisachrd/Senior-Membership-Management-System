import express from 'express';
import multer from 'multer';
import path from 'path';

import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router();

// router.post("/", authController.loginUserByEmail);

router.post("/", authController.loginUserByEmail, (req, res) => {
    res.json({
      message: "Login successful",
      token: req.token
    });
  });

// router.get("/profile", authMiddleware.verifyJWT, (req, res) => {
//     res.json({ message: "Profile data", user: req.user });
//   });
router.get('/protected-route', authMiddleware.verifyJWT, (req, res) => {
    console.log(req.headers);  // ตรวจสอบ Headers ที่รับมา
    res.json({ message: "Access Granted" });
});
export default router;