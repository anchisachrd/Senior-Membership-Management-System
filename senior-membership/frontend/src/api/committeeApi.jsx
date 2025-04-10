import axios from "axios";

// Base URL for API
const apiUrl = "http://localhost:3000/api/approval-details";

export const getCommitteePendingApprovals = async (committeeId) => {
  const response = await axios.get(`${apiUrl}/committee/${committeeId}/pending`);

  return response.data;
};

export const getMyCommitteeApproval = async (candidateId, committeeId) => {
  const response = await axios.get(`${apiUrl}/committee/${committeeId}/candidate/${candidateId}/my`);

  return response.data;
};

export const updateCommitteeApproval = async (approvalId, payload) => {
  const response = await axios.put(`${apiUrl}/${approvalId}`, payload);

  return response.data;
};

export const  getFinalApprovalList= async (committeeId) => {
    const response = await axios.get(`${apiUrl}/committee/${committeeId}/final-results`);
  
    return response.data;
  };

  export const getFinalApprovalDetail = async (candidateId) => {
    console.log("📤 Fetching final approval detail for Candidate ID:", candidateId);
    const response = await axios.get(`${apiUrl}/committee/final-detail/${candidateId}`);
  
    return response.data;
  };

  export const sendBackForRevision = async (candidateId) => {
    return await axios.put(`${apiUrl}/committee/${candidateId}/send-back`);
};


export const sentResultMembership = async(candidateId, reason) => {
  return await axios.put(`${apiUrl}/${candidateId}/result-membership`, { reason });
}
