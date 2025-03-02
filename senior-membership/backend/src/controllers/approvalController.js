import * as approvalService from '../services/approvalService.js'
import * as candidateService from '../services/candidateService.js'

export const updateCandidateApprovalStatus = async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { status, verificationDetails, failReasons } = req.body; // Get data from frontend
  
      // if (!status || !email) {
      //   return res.status(400).json({ message: "Missing required fields" });
      // }
  
      // Process the approval update and send an email
      const updatedCandidate = await approvalService.approvalStatusUpdate(candidateId, status, verificationDetails, failReasons);
  
      return res.status(200).json({ message: "Approval status updated", candidate: updatedCandidate });
    } catch (error) {
      console.error("Error updating candidate status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getVerificationDetails = async (req, res) => {
    try {
      const { candidateId } = req.params;
      const details = await approvalService.getVerificationDetail(candidateId);
      res.json(details);
    } catch (error) {
      res.status(500).json({ message: "Error fetching verification details", error });
    }
  };

  