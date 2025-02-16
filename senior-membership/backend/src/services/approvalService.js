import * as approvalModel from '../models/approvalModel.js'
import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from '../models/accountModel.js'
import * as memberModel from '../models/memberModel.js'
import { query } from "../db.js"            // your Postgres pool.
import { pool } from "../db.js";

export const approvalStatusUpdate = async (candidateId, status,  failReasons, verificationDetails) => {
   const client = await pool.connect();
  try{
    await client.query("BEGIN");

    await candidateModel.updateApprovalStatus(candidateId, status);
    await approvalModel.createApprovalDetails(candidateId)
    await approvalModel.updateVerificationDetails(candidateId, verificationDetails);
    
    if(status === 'ผ่านการตรวจสอบ'){

        await approvalModel.saveFailReasons(candidateId, []);
    //   const accountId = await candidateModel.getAccountByCandidateId(candidateId);
    //   const candidatEmail = await accountModel.getEmailById(accountId);

    //   await approvalModel.createApprovalDetails(candidateId)
    //   await memberModel.addMember(candidateId)
    //   await accountModel.updateRole(accountId)
    //   await accountModel.activateAccount(accountId)

    }else if(status === 'ไม่ผ่านการตรวจสอบ'){
      await approvalModel.saveFailReasons(candidateId, failReasons);
    }

    // สิ่งที่ต้องทำ
    //
    // ย้าย verification detail, failreason ไปที่ approval_detail
    // แก้ committee verification เยอะ
    // แก้ verification_detail to []
  

    await client.query("COMMIT");
    return { success: true, message: "Approval details updated in one go" };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }finally {
    client.release();
  }
}

export const getVerificationDetail = async (candidateId) =>{
  try{
    const getDetail = await approvalModel.getVerificationDetails(candidateId);
    return getDetail;
  } catch (error) {
    console.error("Error get details:", error);
  }
}

export const updateVerificationDetail = async (candidateId, details)=>{
  try{
    const updateDetail = await approvalModel.updateVerificationDetails(candidateId,  details);
    return updateDetail;
  } catch (error) {
    console.error("Error update details:", error);
  }
}