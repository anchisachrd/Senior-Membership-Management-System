import axios from 'axios';

// Base URL for API
const apiUrl = 'http://localhost:3000/api/members';

export const verifySlip = async (slipFile, memberId, amount, deathId) =>{
  try {
    const formData = new FormData();
    formData.append('slip', slipFile); // Field name must match backend
    formData.append('memberId', memberId);
    formData.append('amount', amount);
    formData.append('deathId', deathId);

    console.log('✅ Sending Data:', { memberId, amount, deathId });

    // Send request to backend
    const response = await axios.post(`${apiUrl}/verify-slip`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    console.log('✅ Upload Success:', response.data);
    return response.data;
} catch (error) {
    console.error('❌ Upload Failed:', error);
    throw error; 
}
} 

export const getAllSlipHistory = async () => {
  try {
      const res = await axios.get(`${apiUrl}/slip`);
      return res.data;
  } catch (error) {
      console.error('Error fetching slip histories:', error);
      throw error;
  }
};

