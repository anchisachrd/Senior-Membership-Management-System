import * as heirModel from "../models/heirModel.js";
import * as memberModel from "../models/memberModel.js"
import * as deathReportModel from "../models/deathReport.js";
import * as documentModel from "../models/documentModel.js"
import * as employeeModel from "../models/employeeModel.js"
import path from "path";
import { query } from '../db.js'



export const creatDeathReport = async (deathReport) => {
    const { member_id, heir_id, death_date, documents } = deathReport
    const newReport = await deathReportModel.createReport(member_id, heir_id, death_date)

    await memberModel.updateMemberStatus(member_id, "เสียชีวิต");



    if (deathReport.documents) {
          for (const [docType, fileObj] of Object.entries(
            deathReport.documents
          )) {
            if (fileObj) {
              const fileName = path.basename(fileObj.path);
              console.log(`📂 Uploading death Document: ${docType} → ${fileName}`);
    
              await documentModel.uploadDocument(
                fileName,
                docType, // Store docType in English
                newReport.report_id,
                "death_report"
              );
            }
          }
        }
    
    
      return newReport;
}


export const hasDeathReport = async (heirId) => {
    // e.g. SELECT from your death_reports table
    const result = await query(
      `SELECT report_id FROM death_reports WHERE heir_id = $1`,
      [heirId]
    );
    return result.rows.length > 0;
  };

export const updateReviewDeathReport = async (reportId, employeeId) => {
  await deathReportModel.updateDeathReportStatus(reportId, employeeId, 'ผ่าน', '');

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
  };


export const listPendingDeathApprovals = async (committeeId) => {
  return deathReportModel.getPendingDeathApprovalsByCommittee(committeeId)
};


  