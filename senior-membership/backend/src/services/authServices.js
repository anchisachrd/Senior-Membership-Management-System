import * as accountModel from "../models/accountModel.js";
import * as employeeModel from "../models/employeeModel.js";
import * as heirModel from "../models/heirModel.js";
import bcrypt from "bcrypt";


export const loginByEmail = async (email) => {
    return await accountModel.getAccountByEmail(email);
}

// เก็บ employee id ตอน staff or committee login 
export const getEmployeeIdbyAccountId = async (accountId) => {
  return await employeeModel.getIdByAccountId(accountId);
}

export const getHeirIdbyAccountId = async (accountId) => {
  return await heirModel.getIdByAccountId(accountId);
}

export const changePassword = async (accountId, oldPassword, newPassword) => {
    try {
  
      const userInfo = await accountModel.getAccountById(accountId);
  
      if (!userInfo) {
        return {
          success: false,
          message: 'ไม่พบผู้ใช้งานในระบบ'
        };
      }
  
      const isMatch = await bcrypt.compare(oldPassword, userInfo.password_hash);
      if (!isMatch) {
        return {
          success: false,
          message: 'รหัสผ่านเก่าไม่ถูกต้อง'
        };
      }
  
      const isSamePassword = await bcrypt.compare(newPassword, userInfo.password_hash);
      if (isSamePassword) {
        return {
          success: false,
          message: 'รหัสผ่านใหม่ต้องแตกต่างจากรหัสผ่านเดิม'
        };
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      const updateResult = await accountModel.updatePassword(accountId, hashedNewPassword);
  
      if (!updateResult) {
        return {
          success: false,
          message: 'เกิดข้อผิดพลาดในการอัปเดตรหัสผ่าน'
        };
      }
  
      return {
        success: true,
        message: 'เปลี่ยนรหัสผ่านสำเร็จ'
      };
    } catch (error) {
      console.error('Error changing password:', error.message);
      throw new Error('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน');
    }
  };