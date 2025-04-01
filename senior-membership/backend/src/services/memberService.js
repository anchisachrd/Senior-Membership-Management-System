import * as memberModel from "../models/memberModel.js";
import { fetchAllCandidateAndHeirData } from "./registerService.js";
import * as slipModel from "../models/slipModel.js"

export const fetchActiveMembers = async () => {
  return await memberModel.getMemberByStatus("ใช้งานอยู่");
};

export const fetchDeathMembers = async () => {
  return await memberModel.getNotificationListByStatusAndReason("เสียชีวิต", "NULL");
};


export const fetchDeathMemberList = async () => {
  return await memberModel.getNotificationListByStatusAndReason("เสียชีวิต", "NOTNULL");
};

export const fetchQuitMembers = async () => {
  return await memberModel.getNotificationListByStatus("ขอลาออก");
};

export const fetchMemberDetails = async (memberId) => {
  const memberData = await memberModel.getMemberById(memberId);
  if (!memberData) {
    return null; // or throw an error
  }

  const candidateId = memberData.candidate_id;
  const candidateData = await fetchAllCandidateAndHeirData(candidateId);

  // const slipHistory = await slipModel.getHistoryByMemberId(memberId)

  const memberInfo = {
    ...candidateData,

    member_id: memberData.member_id,
    start_date: memberData.start_date,
    end_date: memberData.end_date,
    leaving_reason: memberData.leaving_reason,
    member_status: memberData.member_status,

    // slip_history: slipHistory,
  };
  return memberInfo;
};


