import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from "../models/accountModel.js";
import * as memberModel from "../models/memberModel.js";
import * as approvalModel from "../models/approvalModel.js";
import * as docVerificationModel from "../models/docVerificationModel.js";
import * as emailService from "../utils/emailService.js";
import * as peopleModel from "../models/peopleModel.js";
import * as employeeModel from "../models/employeeModel.js"
import { query } from "../db.js";
import { pool } from "../db.js";
import { addMember } from "../models/memberModel.js";

export const modifyDocVerificationStatus = async (
  candidateId,
  staffId,
  status,
  comments,
  reason
) => {
  // 🔹 Update verification record
  const updatedVerification = await docVerificationModel.updateVerification(
    candidateId,
    staffId,
    status,
    comments
  );

  // 🔹 If the status is "ไม่ผ่าน", send an email to the candidate
  if (status === "ไม่ผ่าน") {
    const candidateDetails = await candidateModel.getCandidateDetails(
      candidateId
    ); // Fetch all in one query

    const { first_name, email } = candidateDetails;
    const subject = `แจ้งเตือนข้อมูลการสมัครสมาชิกของชมรมผู้สูงอายุ${reason}`;

    if (email) {
      const emailContent = emailService.generateFailVerificationEmail(
        first_name,
        reason,
        comments
      );
      await emailService.sendEmail(email, subject, emailContent);
    }
  }
  return updatedVerification;
};

export const sendCandidateToCommittee = async (candidateId) => {
  await candidateModel.updateApprovalStatus(candidateId, "รอการพิจารณา");
  await docVerificationModel.updateSentTimestamp(candidateId);

  const committeeMembers = await employeeModel.findAllByPosition("committee");

  const promises = committeeMembers.map((member) => {
    return approvalModel.createApprovalDetails(
      candidateId,
      member.employee_id,
      "รอการพิจารณา"
    );
  });
  const results = await Promise.all(promises);
  return results;
};

export const fetchAllVerifiedDocsCandidates = async () => {
  try {
    const candidates =
      await docVerificationModel.getCandidateByDocVerification();
    return candidates; // Always returns an array
  } catch (error) {
    throw new Error("Error fetching verified docs candidates");
  }
};

export const fetchAllApprovalStatusCandidates = async () => {
  try {
    const candidates = await candidateModel.getCandidateByFinalApprovalStatus([
      "รอการพิจารณา",
      "อนุมัติ",
      "ไม่อนุมัติ",
    ]);
    return candidates; // Always returns an array
  } catch (error) {
    throw new Error("Error fetching verified docs candidates");
  }
};

export const removeCandidate = async (candidateId) => {
  return await candidateModel.deleteCandidateById(candidateId);
};