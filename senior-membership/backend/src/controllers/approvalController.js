import * as approvalService from '../services/approvalService.js'
import * as candidateService from '../services/candidateService.js'
import * as registerService from '../services/registerService.js'

  
export const updateApprovalDetail = async (req, res) => {
  try {
    const { approvalId } = req.params;
    // Typically, you'd also verify that the logged-in user is the correct committee
    const updateData = req.body; // e.g. { status, verificationDetails, comment, isSigned }

    const updated = await approvalService.updateCommitteeApproval(approvalId, updateData);
    return res.json({
      message: 'ApprovalDetail updated successfully',
      data: updated
    });
  } catch (error) {
    console.error("❌ Error update approval details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyApprovalDetail = async (req, res) => {
  try{
    const { candidateId } = req.params;
    const committeeId = 3;

    const row = await approvalService.getCommitteeApprovalDetail(candidateId, committeeId);
    if (!row) {
      return res.status(404).json({ message: "No approval detail found for this candidate & user" });
    }

    return res.json({
      approvalId: row.approval_id,
      approvalStatus: row.approval_status,
      verificationDetails: row.verification_details || [],
      comment: row.comment,
      isSigned: row.is_signed,
      signed_at: row.signed_at
    });
  }catch (error){
    console.error("❌ Error getMyApprovalDetail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


//  Show all candidates that are 'รอการพิจารณา' for the logged-in committee.
export const getPendingApprovals = async (req, res) => {
  try {
    // Suppose you extracted committeeId from the user's token/session
    const committeeId = 3;
    const pending = await approvalService.listPendingApprovals(committeeId);
    return res.json(pending);
  } catch (error) {
    console.error("❌ Error get pending approval:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCandidateApprovals = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const approvals = await approvalService.listApprovalsForCandidate(candidateId);
    return res.json(approvals);
  } catch (error) {
    console.error("❌ Error fetching candidate approval:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommitteeSummaryApprovalList = async (req, res) => {
  try {
    const committeeId = 3; // Extracted from logged-in user's session/token
    const results = await approvalService.getCommitteeApprovalList(committeeId);
    return res.json(results);
  } catch (error) {
    console.error("❌ Error fetching committee approvals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getFinalApprovalDetail = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const results = await approvalService.getFinalApprovalDetail(candidateId);
    return res.json(results);
  } catch (error) {
    console.error("❌ Error fetching final approval detail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const comitteeRevision = async (req, res) => {
  try{
    const {candidateId} = req.params
    const results = await approvalService.sendBackForRevision(candidateId);
    return res.json(results);

  }catch(error){
    console.error("❌ Error send back for revision:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sentResultMembership = async (req, res) => {
  try{
    const { candidateId } = req.params;
    const { reason } = req.body;
    const results = await registerService.sendEmailMembership(candidateId, reason);
    return res.json(results);

  }catch(error){
    console.error("❌ Error send back for revision:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}







  