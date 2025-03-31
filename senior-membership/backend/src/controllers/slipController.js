// controllers/slipController.js
import fs from 'fs';
import { slipService } from '../services/slipService.js';
import * as slipModel from '../models/slipModel.js';
import { getErrorMessage } from '../utils/erroMessage.js';

// Controller object
export const slipController = {
  verifyAndSaveSlip: async (req, res) => {
    try {
      const { memberId, reportId } = req.body;
      const filePath = req.file.path;

      //TODO - แก้ให้ amount ยังไม่บันทึกถ้า slip ยังไม่ถูกต้อง
      const amount = 1; // Suppose we fix the amount

      // We'll store these so we can create or update in one place
      let slipDataForDb = null;      // JSON.stringify(...) later
      let status = 'pass';           // default if success
      let errorCode = null;
      let errorMsg = null;

      // 1) Call SlipOK
      try {
        const slipOkData = await slipService.verifySlipByFile(filePath, amount);
        slipDataForDb = JSON.stringify(slipOkData);
      } catch (error) {
        status = 'fail';
        errorCode = error.errorCode;      // from slipOk’s error
        // If you have a local mapped message, use it;
        // otherwise fallback to the slipOk error:
        errorMsg = getErrorMessage(errorCode) || error.errorMessage;
        slipDataForDb = JSON.stringify(error.errorResponse || {});
      }

      // 2) Check existing slip for (memberId, reportId)
      const existingSlip = await slipModel.getSlipHistoryByMemberAndDeath(memberId, reportId);

      // 3) No existing record => just insert
      if (!existingSlip) {
        const newSlip = await slipModel.createSlipHistory(
          memberId,
          reportId,
          amount,
          slipDataForDb,
          filePath, 
          status,
          errorCode,
          errorMsg
        );
        return res.status(200).json({ message: `Slip processed (${status})`, data: newSlip });
      }

      // 4) If there IS an existing record, handle pass/fail logic:
      if (existingSlip.status === 'pass') {
        // Already has a successful slip in DB => 
        // Option A: Disallow any new submission
        return res.status(400).json({
          message: 'ส่งสลิปสำเร็จ ไม่สามารถส่งใหม่ได้'
        });

        // Or Option B: Overwrite with the new slip if you want to allow updates.
      }

      // existingSlip.status === 'fail'
      // Now check if the new slip is 'pass' or 'fail'
      if (status === 'fail') {
        // Compare slipDataForDb to existingSlip.slip_data if you want to see “same slip or not”
        if (slipDataForDb === existingSlip.slip_data) {
          // The slip is exactly the same as the last fail
          return res.status(400).json({
            message: 'สลิปเดิมถูกส่งมาแล้ว โปรดตรวจสอบก่อนแนบสลิปใหม่'
          });
        } else {
          // It's a different fail slip => update
          const updatedSlip = await slipModel.updateSlipHistory(
            memberId,
            reportId,
            amount,
            slipDataForDb,
            filePath,
            status,
            errorCode,
            errorMsg
          );
          return res.status(200).json({
            message: 'สลิปใหม่ (fail) ถูกอัปเดตสำเร็จ',
            data: updatedSlip
          });
        }
      } else {
        // status === 'pass' => user finally uploaded a correct slip
        const updatedSlip = await slipModel.updateSlipHistory(
          memberId,
          reportId,
          slipDataForDb,
          filePath,
          'pass',     // we know it's pass
          null,       // pass => no errorCode
          null        // pass => no errorMsg
        );
        return res.status(200).json({
          message: 'อัปโหลดสลิปสมบูรณ์แล้ว',
          data: updatedSlip
        });
      }
    } catch (error) {
      console.error('❌ Server Error:', error);
      return res.status(500).json({
        errorCode: 5000,
        message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง'
      });
    }
  },

  getAllSlipHistories: async (req, res) => {
    try {
      const histories = await slipModel.getAllHistory();
      return res.status(200).json(histories);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  },

  getSlipHistoriesByMember: async (req, res) => {
    try {
      const { memberId } = req.params;
      const histories = await slipModel.getHistoryByMemberId(memberId);
      return res.status(200).json(histories);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
  },
};

export const getAccountSummary = async (req, res) => {
  try {
    const totalPassed = await slipModel.getTotalPassedAmount();
    return res.status(200).json({ total: totalPassed });
  } catch (error) {
    console.error('❌ getAccountSummary Error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getAllPassedSlips = async (req, res) => {
  try {
    const slips = await slipModel.getAllPassedSlips();
    return res.status(200).json(slips);
  } catch (error) {
    console.error('❌ getAllPassedSlips Error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
