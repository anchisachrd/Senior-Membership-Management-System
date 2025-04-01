import * as accountModel from "../models/accountModel.js";
import * as employeeModel from "../models/employeeModel.js";
import * as heirModel from "../models/heirModel.js";
import * as memberModel from "../models/memberModel.js";
import * as addressModel from "../models/addressModel.js";
import * as peopleModel from '../models/peopleModel.js';
import * as adminModel from '../models/adminModel.js'
import bcrypt from "bcrypt";


export const loginByEmail = async (email) => {
    return await accountModel.getAccountByEmail(email);
}

// เก็บ employee id ตอน staff or committee login 
export const getEmployeeIdbyAccountId = async (accountId) => {
  return await employeeModel.getInfoByAccountId(accountId);
}

export const getHeirIdbyAccountId = async (accountId) => {
  return await heirModel.getInfoByAccountId(accountId);
}

export const getMemberIdbyAccountId = async (accountId) => {
  return await memberModel.getInfoByAccountId(accountId);
}

export const getAddressByMemberId = async (memberId) => {
  return await addressModel.getAddressByMemberId(memberId);
}

export const getInfoPeopleByMemberId = async (memberId) => {
  return await peopleModel.getInfoByMemberId(memberId);
}

export const getAddressByHeirId = async (heirId) => {
  return await addressModel.getAddressByHeirId(heirId);
}

export const getInfoPeopleByHeirId = async (heirId) => {
  return await peopleModel.getInfoByHeirId(heirId);
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

  export const getAdminIdbyAccountId = async (accountId) => {
    return await adminModel.getInfoByAccountId(accountId);
  }