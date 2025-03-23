import * as deathReportService from "../services/deathReportService.js";
import * as deathModel from "../models/deathReport.js";
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
    // Query: does a row exist for that member in `death_reports`?
    const exists = await deathReportService.hasDeathReport(heirId);
    res.json({ alreadySubmitted: exists }); // true/false
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
      const { staffId} = req.body; // Get data from frontend

      if (!reportId || !staffId ) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const exists = await deathReportService.updateReviewDeathReport(reportId, staffId);
      res.json({ alreadySubmitted: exists }); // true/false
    } catch (error) {
      console.error("Error checking death report status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getDeathPendingApprovals = async (req, res) => {
    try {
      // Suppose you extracted committeeId from the user's token/session
      const {committeeId} = req.params;
      const pending = await deathReportService.listPendingDeathApprovals(committeeId);
      return res.json(pending);
    } catch (error) {
      console.error("❌ Error get pending death approval:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
