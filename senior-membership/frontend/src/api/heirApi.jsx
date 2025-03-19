import axios from "axios";

// Base URL for API
const apiUrl = "http://localhost:3000/api/heirs";

export const getMembersForHeir = async (heirId) => {
    try {
      const res = await axios.get(`${apiUrl}/${heirId}/member`);
      return res.data;
    } catch (error) {
      console.error("Error fetching members for heir:", error);
      throw error;
    }
  };