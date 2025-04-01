import * as heirModel from "../models/heirModel.js";
import * as memberModel from "../models/memberModel.js";
import * as deathReportModel from "../models/deathReport.js";
import * as documentModel from "../models/documentModel.js";
import * as employeeModel from "../models/employeeModel.js";
import * as slipModel from "../models/slipModel.js";
import * as candidateModel from "../models/candidateModel.js";
import path from "path";
import { query } from "../db.js";

export const creatDeathReport = async (deathReport) => {
  const { member_id, heir_id, death_date, documents } = deathReport;

  // 🔍 1. Check if report already exists
  const existing = await deathReportModel.findByHeirAndMember(heir_id, member_id);

  let reportId;

  if (existing) {
    console.log("♻️ Updating existing death report:", existing.report_id);
    // ✅ 2. Update the existing report
    await deathReportModel.updateDeathReport({
      reportId: existing.report_id,
      death_date,
      death_certificate: documents?.death_certificate,
      death_house_registration: documents?.house_registration,
    });
    reportId = existing.report_id;
  } else {
    console.log("🆕 Creating new death report");
    // 🆕 3. Create new report
    const newReport = await deathReportModel.createReport(
      member_id,
      heir_id,
      death_date
    );
    reportId = newReport.report_id;

    // 🟡 Set member status to 'เสียชีวิต'
    await memberModel.updateMemberStatus(member_id, "เสียชีวิต");
  }

  // 4. Upload files
  if (documents) {
    for (const [docType, fileObj] of Object.entries(documents)) {
      if (fileObj) {
        const fileName = path.basename(fileObj.path);
        console.log(`📂 Uploading death document: ${docType} → ${fileName}`);

        await documentModel.uploadDocument(
          fileName,
          docType,
          reportId,
          "death_report"
        );
      }
    }
  }

  return { report_id: reportId };
};


export const updateReviewDeathReport = async (
  reportId,
  employeeId,
  status,
  comment
) => {
  // Always update the report status first
  await deathReportModel.updateDeathReportStatus(
    reportId,
    employeeId,
    status,
    comment
  );

  if (status === "ผ่าน") {
    const committeeMembers = await employeeModel.findAllByPosition("committee");

    const promises = committeeMembers.map((report) => {
      return deathReportModel.createDeathApproval(
        reportId,
        report.employee_id,
        "รอการพิจารณา"
      );
    });

    const results = await Promise.all(promises);
    return results;
  } else {
    return { message: "Updated without creating committee approvals" };
  }
};

export const listPendingDeathApprovals = async (committeeId) => {
  return deathReportModel.getPendingDeathApprovalsByCommittee(committeeId);
};

export const createSlipsForActiveMembers = async (
  reportId,
  memberId,
  reason
) => {
  const activeMembers = await memberModel.getMemberByStatus("ใช้งานอยู่");

  await memberModel.setMemberLeft(memberId, reason);

  await candidateModel.updateIsMemberbyMemberId(memberId);

  const payment = activeMembers.map((payment) => {

    return slipModel.createSlipHistory(payment.member_id, reportId, "unpaid");
  });

  const results = await Promise.all(payment);
  return results;
};
