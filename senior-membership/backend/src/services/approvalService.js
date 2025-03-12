import * as approvalModel from '../models/approvalModel.js'
import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from '../models/accountModel.js'
import * as memberModel from '../models/memberModel.js'
import { query } from "../db.js"            // your Postgres pool.
import { pool } from "../db.js";

export const approvalStatusUpdate = async (
  candidateId,
  committeeId,
  verificationDetails
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // ✅ Automatically compute approval status
    const hasFail = verificationDetails.some(detail => detail.status === "fail");
    const approvalStatus = hasFail ? "ไม่ผ่านการตรวจสอบ" : "ผ่านการตรวจสอบ";


    // Check if record exists
    const exist = await approvalModel.findOneApproval(candidateId, committeeId);
    
    if (!exist) {
      console.log("Creating new approval record...");
      await approvalModel.createApprovalRecord(candidateId, committeeId, {
        verificationDetails,
        approvalStatus
      });
    } else {
      console.log("Updating existing approval record...");
      await approvalModel.updateApprovalRecord(candidateId, committeeId, {
        verificationDetails,
        approvalStatus
      });
    }

    await client.query("COMMIT");
    console.log("✅ Approval status successfully updated:", approvalStatus);

    return { success: true, message: "Approval details updated", approvalStatus };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ ERROR in approvalStatusUpdate:", error);
    throw error;
  } finally {
    client.release();
  }
};




export const getVerificationDetail = async (candidateId, committeeId) => {
  try {
    return await approvalModel.getVerificationDetails(candidateId, committeeId);
  } catch (error) {
    console.error("❌ ERROR in getVerificationDetail:", error);
    throw error;
  }
};



export const updateVerificationDetail = async (candidateId, details)=>{
  try{
    const updateDetail = await approvalModel.updateVerificationDetails(candidateId,  details);
    return updateDetail;
  } catch (error) {
    console.error("Error update details:", error);
  }
}

export const getCandidatesForCommittee = async (committeeId) => {
  try {
    return await approvalModel.getCandidatesForCommittee(committeeId);
  } catch (error) {
    console.error("❌ ERROR in getCandidatesForCommittee:", error);
    throw error;
  }
};

export const getCandidateApprovalSummary = async (candidateId) => {
  try {
    const committeeDecisions = await approvalModel.getCandidateApprovalSummary(candidateId);
    
    if (!committeeDecisions || committeeDecisions.length === 0) {
      return null; // If no records, return null
    }

    // 🔹 Count votes for "ผ่านการตรวจสอบ" and "ไม่ผ่านการตรวจสอบ"
    let passCount = 0;
    let failCount = 0;

    committeeDecisions.forEach(decision => {
      if (decision.approval_status === "ผ่านการตรวจสอบ") {
        passCount++;
      } else if (decision.approval_status === "ไม่ผ่านการตรวจสอบ") {
        failCount++;
      }
    });

    // 🔹 Determine final status based on majority vote
    const finalApprovalStatus = passCount > failCount ? "ผ่านการตรวจสอบ" : "ไม่ผ่านการตรวจสอบ";

    return {
      candidateId,
      finalApprovalStatus,
      details: committeeDecisions
    };
  } catch (error) {
    console.error("❌ ERROR in getCandidateApprovalSummary:", error);
    throw error;
  }
};

