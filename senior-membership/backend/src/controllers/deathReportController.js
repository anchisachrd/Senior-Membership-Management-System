import * as deathReportService from "../services/deathReportService.js";
import * as deathModel from "../models/deathReport.js";
import * as deathApprovalService from "../services/deathApprovalService.js";
import { query } from "../db.js";

export const createDeathReport = async (req, res) => {
  try {
    console.log("✅ Request Body:", req.body); // Log form fields
    console.log("📂 Uploaded Files:", req.files);
    const { member_id, heir_id, death_date } = req.body;
    const deathCertFile = req.files.death_certificate?.[0];
    const deathhouseRegFile = req.files.death_house_registration?.[0];

    if (!member_id || !heir_id) {
      return res
        .status(400)
        .json({ message: "Member ID and Heir ID are required" });
    }

    const deathReport = {
      member_id: member_id,
      heir_id: heir_id,
      death_date: death_date,
      documents: {
        death_certificate: deathCertFile, // e.g. “src/uploads/death-docs/<file>.pdf”
        house_registration: deathhouseRegFile, // or null if not uploaded
      },
    };

    if (!deathReport.member_id) {
      return res.status(400).json({ message: "Missing member_id" });
    }
    // e.g. if you need death_date or heir_id, check them too

    // 5) Call the service
    const result = await deathReportService.creatDeathReport(deathReport);

    return res.status(201).json({
      message: "Death report submitted successfully",
      result,
    });
  } catch (error) {
    console.error("❌ Death report submission error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkDeathReportStatus = async (req, res) => {
  try {
    const { heirId } = req.params;
    const report = await deathModel.getDeathReportByHeirId(heirId);

    if (report) {
      res.json({ alreadySubmitted: true, deathReport: report });
    } else {
      res.json({ alreadySubmitted: false });
    }
  } catch (error) {
    console.error("Error checking death report status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeathReportDetails = async (req, res) => {
  try {
    const { memberId } = req.params;
    const deathReport = await deathModel.getDeathReportDetails(memberId);
    res.status(200).json(deathReport);
  } catch (error) {
    console.error("Error fetching death report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getDeathReportName = async (req, res) => {
  try {
    const { reportId } = req.params;
    const deathReport = await deathModel.getDeathReportDetailsbyReportId(reportId);
    res.status(200).json(deathReport);
  } catch (error) {
    console.error("Error fetching death report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDeathReportDocuments = async (req, res) => {
  try {
    const { reportId } = req.params;
    const deathDocs = await deathModel.getDeathReportDocuments(reportId);

    const docObject = {};

    for (const doc of deathDocs) {
      docObject[doc.doc_type] = doc.doc_path;
    }

    res.status(200).json(docObject);
  } catch (error) {
    console.error("Error fetching death report documents:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateReviewDeathReport = async (req, res) => {
  try {
    const { reportId } = req.params; // Get report ID from URL
    const { staffId, status, comment } = req.body; // Get data from frontend

    if (!reportId || !staffId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await deathReportService.updateReviewDeathReport(
      reportId,
      staffId,
      status,
      comment
    );
    res.json({ alreadySubmitted: exists }); // true/false
  } catch (error) {
    console.error("Error checking death report status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeathPendingApprovals = async (req, res) => {
  try {
    // Suppose you extracted committeeId from the user's token/session
    const { committeeId } = req.params;
    const pending = await deathReportService.listPendingDeathApprovals(
      committeeId
    );
    return res.json(pending);
  } catch (error) {
    console.error("❌ Error get pending death approval:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const approveDeathReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { committeeId, status, comment } = req.body;
    const updated = await deathApprovalService.checkCommitteesVote(
      reportId,
      committeeId,
      status,
      comment
    );
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error update death approval:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeathApprovalDetail = async (req, res) => {
  try {
    const { reportId } = req.params;

    const data = await deathApprovalService.getFinalDeathApproval(reportId);

    res.json(data);
  } catch (error) {
    console.error("getDeathApprovalDetail Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const recheckApproval = async (req, res) => {
  try {
    const { reportId } = req.params;
    const status = "รอการแก้ไข";

    const data = await deathApprovalService.sendToRecheck(reportId, status);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPaymentSlips = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { memberId, leavingReason } = req.body;

    console.log("✅ Confirm Death Input:", { reportId, memberId, leavingReason });

    // 🔍 Get current final_approval status
    const { rows } = await query(
      `SELECT final_approval FROM death_reports WHERE report_id = $1`,
      [reportId]
    );
    const finalStatus = rows[0]?.final_approval;

    if (!finalStatus) {
      return res.status(400).json({ message: "ยังไม่ได้รับผลการอนุมัติ" });
    }

    if (finalStatus === "ไม่อนุมัติ") {
      // ❌ Just update sent_to_heir and final_comment
      await query(
        `UPDATE death_reports
         SET sent_to_heir = true,
             final_comment = $1
         WHERE report_id = $2`,
        [leavingReason, reportId]
      );

      return res.json({ message: "อัปเดตข้อมูลสำหรับสถานะไม่อนุมัติเรียบร้อยแล้ว" });
    }

    if (finalStatus === "อนุมัติ") {
      // ✅ Update sent_to_heir and generate slips
      await query(
        `UPDATE death_reports
         SET sent_to_heir = true
         WHERE report_id = $1`,
        [reportId]
      );

      const data = await deathReportService.createSlipsForActiveMembers(
        reportId,
        memberId,
        leavingReason
      );

      return res.json({ message: "สร้างข้อมูลการชำระเงินเรียบร้อย", data });
    }

   
    return res.status(400).json({ message: "สถานะการอนุมัติไม่ถูกต้อง" });
  } catch (error) {
    console.error("❌ Error in createPaymentSlips:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markIsRequested = async (req, res) => {
  try {
    const { reportId } = req.params;
   
    await query(
      `UPDATE death_reports
       SET is_requested = true
       WHERE report_id = $1`,
      [reportId]
    );
    res.status(200).json({ message: "is_requested is now TRUE" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update is_requested" });
  }
};


