import axios from 'axios';
import FormData from 'form-data'
import 'dotenv'
import fs from 'fs';


export const slipService = {
 // เรียก SlipOK API
     apiUrl: process.env.API_URL,
     apiKey:process.env.API_KEY,

     verifySlipByFile: async (filePath, amount) => {
        try {
          
          //  อ่านไฟล์เป็น ReadStream
          const fileStream = fs.createReadStream(filePath); 
    
          //เตรียม FormData
          const formData = new FormData();
          formData.append('files', fileStream, { filename: 'slip.jpg' }); // 👈 ใช้ ReadStream
          formData.append('log', 'true');
          if (amount) formData.append('amount', amount);
    
        
          const res = await axios.post(slipService.apiUrl, formData, {
            headers: {
              'x-authorization': slipService.apiKey,
              ...formData.getHeaders(),
            },
          });
    
          console.log('✅ SlipOK API Response:', res.data);
          return res.data.data; 
        } catch (error) {
          const errorResponse = error?.response?.data || {};
          const errorCode = error?.response?.data?.code ?? 'UNKNOWN_ERROR';
          const errorMessage = error?.response?.data?.message ?? 'Unknown Error';
      
          console.error('❌ SlipOK API Error:', error);
          throw { errorCode, errorMessage, errorResponse };
        }
      },
    
      verifySlipByQR: async (qrString, amount) => {
        try {
    
          const body = {
            data: qrString,
            log: true,
          };
          if (amount) {
            body.amount = amount;
          }
    
          const res = await axios.post(slipService.apiUrl, body, {
            headers: {
              'x-authorization': slipService.apiKey,
            },
          });
    
          return res.data.data;
        } catch (error) {
          throw error;
        }
      },

      verifySlipByUrl: async ( slipUrl, amount) => {
        try {
          // เตรียม body สำหรับส่งไปยัง SlipOK
          const body = {
            url: slipUrl, // บอกว่าใช้ url ของรูปสลิป
            log: true,
          };
    
          if (amount) {
            body.amount = amount; // ถ้าต้องการตรวจสอบจำนวนเงิน
          }
    
    
          const res = await axios.post(slipService.apiUrl, body, {
            headers: {
              'x-authorization': slipService.apiKey,
            },
          });
    
          // หากสำเร็จ SlipOK จะส่งข้อมูลสลิปที่ตรวจสอบแล้วมาใน res.data.data
          return res.data.data;
        } catch (error) {
          throw error; // ให้ Controller จัดการต่อ
        }
      },
}