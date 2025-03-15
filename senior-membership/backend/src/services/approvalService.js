import * as approvalModel from '../models/approvalModel.js'
import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from '../models/accountModel.js'
import * as memberModel from '../models/memberModel.js'
import * as employeeModel from "../models/employeeModel.js"
import { query } from "../db.js"            // your Postgres pool.
import { pool } from "../db.js";


const checkIfAllCommitteesVoted = async (candidateId) => {
  const approvals = await approvalModel.getApprovalsByCandidate(candidateId);

  // Are there any still 'รอการพิจารณา'?
  const anyPending = approvals.some(ad => ad.approval_status === 'รอการพิจารณา');
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
  return approvalModel.getApprovalsByCandidate
};


// Get all final approvals (for the summary page)
export const getAllFinalApprovals = async () => {
  return await approvalModel.getAllFinalApprovals();
};

// Get detailed approvals for a specific candidate
export const getFinalApprovalDetail = async (candidateId) => {
  return await approvalModel.getApprovalsByCandidate(candidateId);
};








