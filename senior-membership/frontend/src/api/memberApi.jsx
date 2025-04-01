import axios from "axios";

// Base URL for API
const apiUrl = "http://localhost:3000/api/members";

export const verifySlip = async (slipFile, memberId, reportId) => {
  try {
    const formData = new FormData();
    formData.append("slip", slipFile); // Field name must match backend
    formData.append("memberId", memberId);
    formData.append("reportId", reportId);

    console.log("✅ Sending Data:", { memberId, reportId });

    // Send request to backend
    const response = await axios.post(`${apiUrl}/verify-slip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Upload Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Upload Failed:", error);
    throw error;
  }
};

export const getAllSlipHistory = async () => {
  try {
    const res = await axios.get(`${apiUrl}/slip`);
    return res.data;
  } catch (error) {
    console.error("Error fetching slip histories:", error);
    throw error;
  }
};

export const getActiveMembers = async () => {
  try {
    const res = await axios.get(`${apiUrl}/active`);
    return res.data;
  } catch (error) {
    console.error("Error fetching active members:", error);
    throw error;
  }
};

export const getNotifyDeathMembers = async () => {
  try {
    const res = await axios.get(`${apiUrl}/notify/death`);
    return res.data;
  } catch (error) {
    console.error("Error fetching death notification:", error);
    throw error;
  }
};

export const getNotifyQuitMembers = async () => {
  try {
    const res = await axios.get(`${apiUrl}/notify/quit`);
    return res.data;
  } catch (error) {
    console.error("Error fetching quit notification:", error);
    throw error;
  }
};

export const getMemberInfo = async (memberId) => {
  try {
    const res = await axios.get(`${apiUrl}/${memberId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching member info:", error);
    throw error;
  }
};

export const getReviewedDeathList = async () => {
  try {
    const res = await axios.get(`${apiUrl}/reviewed/death-list`);
    return res.data;
  } catch (error) {
    console.error("Error fetching death list:", error);
    throw error;
  }
};

export const getPaymentHistory = async (memberId) => {
  try {
    const res = await axios.get(`${apiUrl}/history/${memberId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching payment list:", error);
    throw error;
  }
};

export const getMemberPaymentDetail = async (memberId, reportId) => {
  try {
    const res = await axios.get(`${apiUrl}/slip/${memberId}/${reportId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching payment list:", error);
    throw error;
  }
};

export const getDeathMemberList = async () => {
  try {
    const res = await axios.get(`${apiUrl}/death`);
    return res.data;
  } catch (error) {
    console.error("Error fetching list:", error);
    throw error;
  }
};



