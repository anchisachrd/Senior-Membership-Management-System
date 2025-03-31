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

  export const submitStaffReview = async (reportId, staffId) => {
    try {
        const res = await axios.put(`${apiUrl}/staff/review/${reportId}`, {staffId });
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

  export const approveDeathReport = async (reportId) => {
    const response = await axios.put(`${apiUrl}/committee/death-approval/${reportId}`)
    return response.data;
  }