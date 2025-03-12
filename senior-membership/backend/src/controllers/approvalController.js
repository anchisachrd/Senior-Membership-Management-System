import * as approvalService from '../services/approvalService.js'
import * as candidateService from '../services/candidateService.js'

export const updateCandidateApprovalStatus = async (req, res) => {
  try {
    const { candidateId, committeeId } = req.params;
    const { verificationDetails } = req.body;

    console.log("Updating candidate approval:");
    console.log("Candidate ID:", candidateId);
    console.log("Committee ID:", committeeId);
 
    console.log("Verification Details:", verificationDetails);
 

    // Call service function
    const updated = await approvalService.approvalStatusUpdate(
      candidateId,
      committeeId,
      verificationDetails,
    );

    return res.status(200).json({
      message: "Approval status updated",
      approvalRecord: updated,
    });
  } catch (error) {
    console.error("❌ ERROR updating approval status:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message, // Send error details in response (optional)
    });
  }
};

  
export const getVerificationDetail = async (req, res) => {
  try {
    const { candidateId, committeeId } = req.params;

    const details = await approvalService.getVerificationDetail(candidateId, committeeId);

    if (!details) {
      return res.status(404).json({ message: "Verification details not found" });
    }

    res.json(details);
  } catch (error) {
    console.error("❌ Error fetching verification details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getCandidatesForCommittee = async (req, res) => {
  try {
    const { committeeId } = req.params;

    if (!committeeId) {
      return res.status(400).json({ message: "Committee ID is required" });
    }

    const candidates = await approvalService.getCandidatesForCommittee(committeeId);
    res.json(candidates);
  } catch (error) {
    console.error("❌ Error fetching candidates for committee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCandidateApprovalSummary = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const summary = await approvalService.getCandidateApprovalSummary(candidateId);

    if (!summary) {
      return res.status(404).json({ message: "No approval data found for this candidate" });
    }

    res.json(summary);
  } catch (error) {
    console.error("❌ Error fetching candidate approval summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




  