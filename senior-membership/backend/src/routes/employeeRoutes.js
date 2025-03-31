import express from 'express';
import * as employeeController from '../controllers/employeeController.js';

const router = express.Router();

router.post("/emp-register", employeeController.registerEmployee);
router.delete("/emp-delete", employeeController.deleteEmployee);
router.get("/emp-all-info", employeeController.getAllEmployee);
router.get("/emp-detail-info/:employeeId", employeeController.getDetailEmployee);
router.put("/emp-update-info", employeeController.updateEmployee);

export default router;