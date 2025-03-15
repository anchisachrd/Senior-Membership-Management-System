import * as candidateService from "../services/candidateService.js";


export const updateVerificationStatus = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const { status, comments, reason } = req.body;
        const staffId = 1;
    

        // 🔹 Call service to update verification status
        const updatedVerification = await candidateService.modifyDocVerificationStatus(
            candidateId,
            staffId,
            status,
            comments,
            reason
        );

        return res.status(200).json(updatedVerification);
    } catch (error) {
        console.error("Error updating verification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getCandidateByDocVerification = async (status) => {
  const { rows } = await query(
      `SELECT * FROM document_verification WHERE verification_status = $1`,
      [status]
  );
  return rows;
};