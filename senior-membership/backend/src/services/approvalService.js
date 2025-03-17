import * as approvalModel from '../models/approvalModel.js'
import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from '../models/accountModel.js'
import * as memberModel from '../models/memberModel.js'
import * as employeeModel from "../models/employeeModel.js"
import * as emailService from "../utils/emailService.js";
import { query } from "../db.js"            // your Postgres pool.
import { pool } from "../db.js";


const checkIfAllCommitteesVoted = async (candidateId) => {
  const approvals = await approvalModel.getApprovalsByCandidate(candidateId);

  // Are there any still 'รอการพิจารณา'?
  const anyPending = approvals.some(ad => ad.approval_status === 'รอการพิจารณา' ||ad.approval_status === 'รอการแก้ไข' );
  if (anyPending) {
    return; // Do nothing if any committee hasn't voted
  }

  // Everyone has voted -> do majority vote logic
  let passCount = 0;
  let failCount = 0;
  approvals.forEach(ad => {
    if (ad.approval_status === 'อนุมัติ') passCount++;
    else if (ad.approval_status === 'ไม่อนุมัติ') failCount++;
  });

  let finalStatus = 'ไม่อนุมัติ'; // Default to fail
  if (passCount > failCount) {
    finalStatus = 'อนุมัติ';
  }

  // ✅ **Update `final_approval_status` in `candidates` table**
  await candidateModel.updateFinalApprovalStatus(candidateId, finalStatus);
};


//return  pending approval base on committeeID
export const listPendingApprovals = async (committeeId) => {
  return approvalModel.getPendingApprovalsByCommittee(committeeId)
};

//return approval detail ของ 1 committee
export const getCommitteeApprovalDetail= async (candidateId, committeeId) => {
  return approvalModel.getApprovalDetail(candidateId, committeeId);
}

// update verification detail  {status, verificationDetails, comment, isSigned }
export const updateCommitteeApproval = async (approvalId, updateData) => {
  const updated = await approvalModel.updateApprovalDetail(approvalId, updateData);

  // ✅ Check if all committees have voted & update final approval status
  if (updated && updated.candidate_id) {
    await checkIfAllCommitteesVoted(updated.candidate_id);
  }

  return updated;
};


//Return all committees approvals for a candidate
export const listApprovalsForCandidate = async (candidateId) => {
  return approvalModel.getApprovalsByCandidate(candidateId)
};


// Get all final approvals (for the summary page)
export const getCommitteeApprovalList = async (committeeId) => {
  return await approvalModel.getCommitteeFinalApprovals(committeeId);
};

// Get detailed approvals for a specific candidate
export const getFinalApprovalDetail = async (candidateId) => {
  const rawResults = await approvalModel.getFinalApprovalDetail(candidateId);

  if (!rawResults.length) return null; // No data found

  // Extract candidate info once
  const candidateInfo = {
    title: rawResults[0].candidate_title,
    first_name: rawResults[0].candidate_first_name,
    last_name: rawResults[0].candidate_last_name,
    final_approval_status: rawResults[0].final_approval_status, 
  };

  // Process committee results
  const processedResults = rawResults.map((result) => {
    let parsedDetails = [];

    try {
      if (typeof result.verification_details === "string") {
        parsedDetails = JSON.parse(result.verification_details);
      } else if (Array.isArray(result.verification_details)) {
        parsedDetails = result.verification_details;
      }
    } catch (error) {
      console.error("Error parsing verification details:", error);
    }

    // Filter out null/empty reasons
    const filteredDetails = parsedDetails.filter(detail => detail.reason);

    return {
      approval_id: result.approval_id,
      title: result.committee_title,
      first_name: result.committee_first_name,
      last_name: result.committee_last_name,
      approval_status: result.approval_status,
      verification_details: filteredDetails,
      comment: result.comment,
    };
  });

  return { candidateInfo, committeeVotes: processedResults };
};


export const sendBackForRevision = async (candidateId) => {
 await approvalModel.clearVerificationDetail(candidateId)
 await candidateModel.updateFinalApprovalStatus(candidateId, 'รอการแก้ไข')
};








