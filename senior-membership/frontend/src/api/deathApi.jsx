import axios from "axios";

// Base URL for API
const apiUrl = "http://localhost:3000/api/death-report";

export const submitDeathReport = async (memberId, heirId) => {
    try {
        const res = await axios.put(`${apiUrl}/submit`, { memberId, heirId });
        return res.data;
    } catch (error) {
        console.error("Error submit death report:", error);
        throw error;
    }
  };

  export const submitStaffReview = async (reportId, staffId, status, comment) => {
    try {
        const res = await axios.put(`${apiUrl}/staff/review/${reportId}`, {staffId, status, comment });
        return res.data;
    } catch (error) {
        console.error("Error submit death report:", error);
        throw error;
    }
  };

  export const getCommitteePendingDeathApprovals = async (committeeId) => {
    const response = await axios.get(`${apiUrl}/committee/${committeeId}/pending`);
  
    return response.data;
  };

  export const approveDeathReport = async (reportId, committeeId, status, comment) => {
    const response = await axios.put(`${apiUrl}/committee/death-approval/${reportId}`, {committeeId, status, comment})
    return response.data;
  }

  export const getFinalDeathApprovalDetail = async (reportId) => {
    const response = await axios.get(`${apiUrl}/${reportId}/committee-approvals`)
    return response.data;
  }

 

  export const sendToRecheck = async (reportId) => {
    const response = await axios.put(`${apiUrl}/recheck/${reportId}`)
    return response.data;
  }

  export const confirmDeathResult = async (reportId, memberId, leavingReason) => {
    const response = await axios.post(`${apiUrl}/${reportId}/create-slips`, {memberId, leavingReason})
    return response.data;
  }

  export const deathName = async (reportId) => {
    const response = await axios.get(`${apiUrl}/death-detail/${reportId}`)
    return response.data;
  }


 