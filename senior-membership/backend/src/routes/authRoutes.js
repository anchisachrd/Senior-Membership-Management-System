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

router.get('/get_address', authController.getAddressByMemberId);
router.get('/get_info', authController.getInfoPeopleByMemberId);

router.get('/get_address_heir', authController.getAddressByHeirId);
router.get('/get_info_heir', authController.getInfoPeopleByHeirId);

export default router;