import express from 'express';
import *  as notiController from '../controllers/notiController.js'

const router = express.Router();

router.get('/noti-staff', notiController.getNotiStaff);
router.get('/noti-committee', notiController.getNotiCommittee);
router.get('/noti-heir', notiController.getNotiHeir);
router.get('/noti-member', notiController.getNotiMember);

export default router;