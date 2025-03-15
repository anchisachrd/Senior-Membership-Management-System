import express from 'express';
import multer from 'multer';
import path from 'path';

import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router();

// router.post("/", authController.loginUserByEmail);


// เชื่อม middleware
router.post("/login", authController.loginUserByEmail, (req, res) => {
    res.json({
      message: "Login successful",
      token: req.token,
    });
  });


router.get('/verify', authMiddleware.verifyJWT, (req, res) => {
    res.json({
      message: 'You have accessed a protected route!',
      user: req.user, // นำข้อมูลที่ middleware เก็บมาใช้
    });
});

router.put('/change_password', authController.ChangePassword, (req, res) => {
  res.json({
    message: 'Change password success'
  });
});

export default router;