// controllers/slipController.js
import fs from 'fs';
import { slipService } from '../services/slipService.js';
import * as slipModel from '../models/slipModel.js';

// Controller object
export const slipController = {
   badErrorCodes: [ 1006, 1007, 1008, 1011, 1013, 1014],
   notifyErrorCodes: [1005, 1009, 1010,  1012],
   adminErrorCodes:  [1001, 1002, 1003, 1004],
  verifyAndSaveSlip: async (req, res) => {
    try {
    
  
      const { memberId, amount } = req.body;
  
      // 🔥 Debug: เช็คว่า memberId ได้ค่าจริงหรือไม่
      // console.log('✅ memberId:', memberId);
      // console.log('✅ amount:', amount);
  
      // if (!memberId || isNaN(memberId)) {
      //   return res.status(400).json({ message: '❌ Invalid memberId' });
      // }
  
      // if (!req.file) {
      //   return res.status(400).json({ message: '❌ No file provided' });
      // }
  
      const filePath = req.file.path;
      // console.log('✅ File saved at:', filePath);
  
      let slipOkData;
    try {
      slipOkData = await slipService.verifySlipByFile(filePath, amount);
      console.log('✅ SlipOK response:', slipOkData);
    } catch ({ errorCode, errorMessage,  errorResponse }) {  // ✅ Now directly catching structured errors
      console.log(`❌ SlipOK API Error: Code ${errorCode} | Message: ${errorMessage}`);

      // ✅ Record only relevant bad error codes
      if (slipController.badErrorCodes.includes(errorCode)) {
        const failedSlipData = errorResponse || null;
        console.log('⚠️ Saving Bad Slip to DB...');
        await slipModel.createSlipHistory(memberId, failedSlipData, filePath, 'fail', errorCode, errorMessage);
      }

      if (slipController.notifyErrorCodes.includes(errorCode)) {
        console.log(`⚠️ Notify Member: ${errorCode} - ${errorMessage}`);
      }

      if (slipController.adminErrorCodes.includes(errorCode)) {
        console.log(`⚠️ Notify Admin: ${errorCode} - ${errorMessage}`);
      }

      return res.status(400).json({ message: errorMessage });
    }

    // ✅ Save verified slip to DB
    const newHistory = await slipModel.createSlipHistory(memberId, slipOkData, filePath,'pass');
    console.log('✅ Slip saved in DB:', newHistory);

    return res.status(200).json({ message: 'Slip verified successfully', data: newHistory });

  } catch (error) {
    console.error('❌ Server Error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
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
