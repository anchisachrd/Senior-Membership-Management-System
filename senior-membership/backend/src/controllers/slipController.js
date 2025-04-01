// controllers/slipController.js
import path from "path";
import { slipService } from "../services/slipService.js";
import * as slipModel from "../models/slipModel.js";
import { getErrorMessage } from "../utils/erroMessage.js";
import { bankName } from "../utils/bankCode.js";

// Controller object
export const slipController = {
  verifyAndSaveSlip: async (req, res) => {
    try {
      const { memberId, reportId } = req.body;
      const fileName = req.file.filename; // ได้ชื่อไฟล์จาก multer โดยตรง
      const filePath = `/slips/${fileName}`; // ✅ เก็บใน DB
      const fullPath = path.join(
        process.cwd(),
        "src",
        "uploads",
        "slips",
        fileName
      );

      //TODO - แก้ให้ amount ยังไม่บันทึกถ้า slip ยังไม่ถูกต้อง
      const correctAmount = 100; // Suppose we fix the amount

      // We'll store these so we can create or update in one place
      let slipDataForDb = null; // JSON.stringify(...) later
      let status = "pass"; // default if success
      let errorCode = null;
      let errorMsg = null;
      let senderDisplayName = null;
      let sendingBankName = null;
      let transTime = null;
      let userAmount = null;

      // 1) Call SlipOK
      try {
        const slipOkData = await slipService.verifySlipByFile(
          fullPath,
          correctAmount
        );
        slipDataForDb = JSON.stringify(slipOkData);

        const { sender, sendingBank, transTimestamp, amount } = slipOkData;

        

        senderDisplayName = sender?.displayName;
        //api ให้เป็นรหัสธนาคารมา เอามาแมพเอง

        sendingBankName = bankName[sendingBank];
        transTime = new Date(transTimestamp);
        userAmount = amount;
      } catch (error) {
        const slipData = error?.errorResponse?.data || error?.errorResponse || {};
        slipDataForDb = JSON.stringify(slipData);
        const { sender, sendingBank, transTimestamp, amount } = slipData;

      

        status = "fail";
        errorCode = error.errorCode;
        userAmount = error.amount;
        errorMsg = getErrorMessage(errorCode) || error.errorMessage;
        senderDisplayName = sender?.displayName;
        //api ให้เป็นรหัสธนาคารมา เอามาแมพเอง

        sendingBankName = bankName[sendingBank];
        transTime = new Date(transTimestamp);

        userAmount = amount;
      }

      // 2) Check existing slip for (memberId, reportId)
      const existingSlip = await slipModel.getSlipHistoryByMemberAndDeath(
        memberId,
        reportId
      );

      // 3) No existing record => just insert
      if (!existingSlip) {
        const newSlip = await slipModel.createSlipHistory(
          memberId,
          reportId,
          status
        );
        return res
          .status(200)
          .json({ message: `Slip processed (${status})`, data: newSlip });
      }

      // 4) If there IS an existing record, handle pass/fail logic:
      if (existingSlip.status === "pass") {
        // Already has a successful slip in DB =>
        // Option A: Disallow any new submission
        return res.status(400).json({
          message: "ส่งสลิปสำเร็จ ไม่สามารถส่งใหม่ได้",
        });

        // Or Option B: Overwrite with the new slip if you want to allow updates.
      }

      // existingSlip.status === 'fail'
      // Now check if the new slip is 'pass' or 'fail'
      if (status === "fail") {
        // Compare slipDataForDb to existingSlip.slip_data if you want to see “same slip or not”
        if (slipDataForDb === existingSlip.slip_data) {
          // The slip is exactly the same as the last fail
          return res.status(400).json({
            message: "สลิปเดิมถูกส่งมาแล้ว โปรดตรวจสอบก่อนแนบสลิปใหม่",
          });
        } else {
          // It's a different fail slip => update
          const updatedSlip = await slipModel.updateSlipHistory(
            memberId,
            reportId,
            slipDataForDb,
            filePath,
            status,
            errorMsg,
            senderDisplayName,
            sendingBankName,
            transTime,
            userAmount
          );
          return res.status(200).json({
            message: "สลิปใหม่ (fail) ถูกอัปเดตสำเร็จ",
            data: updatedSlip,
          });
        }
      } else {
        // status === 'pass' => user finally uploaded a correct slip
        const updatedSlip = await slipModel.updateSlipHistory(
          memberId,
          reportId,
          slipDataForDb,
          filePath,
          status, // we know it's pass
          errorMsg,
          senderDisplayName,
          sendingBankName,
          transTime,
          userAmount
        );
        return res.status(200).json({
          message: "อัปโหลดสลิปสมบูรณ์แล้ว",
          data: updatedSlip,
        });
      }
    } catch (error) {
      console.error("❌ Server Error:", error);
      return res.status(500).json({
        errorCode: 5000,
        message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง",
      });
    }
  },

  getAllSlipHistories: async (req, res) => {
    try {
      const histories = await slipModel.getAllHistory();
      return res.status(200).json(histories);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  },

  getSlipHistoriesByMember: async (req, res) => {
    try {
      const { memberId } = req.params;
      const histories = await slipModel.getHistoryByMemberId(memberId);
      return res.status(200).json(histories);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  },
};

export const getAccountSummary = async (req, res) => {
  try {
    const totalPassed = await slipModel.getTotalPassedAmount();
    return res.status(200).json({ total: totalPassed });
  } catch (error) {
    console.error("❌ getAccountSummary Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getAllPassedSlips = async (req, res) => {
  try {
    const slips = await slipModel.getAllPassedSlips();
    return res.status(200).json(slips);
  } catch (error) {
    console.error("❌ getAllPassedSlips Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getSlipDetailByMemberAndReport = async (req, res) => {
  try {
    const {  reportId, memberId } = req.params;
  
    const data = await slipModel.getSlipByMemberAndReport(memberId, reportId);

    if (!data) {
      return res.status(404).json({ message: "ไม่พบข้อมูลสลิป" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ getSlipDetailByMemberAndReport Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};


