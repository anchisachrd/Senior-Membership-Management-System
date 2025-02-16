import * as candidateModel from "../models/candidateModel.js";
import * as accountModel from '../models/accountModel.js'
import * as memberModel from '../models/memberModel.js'
import * as approvalModel from '../models/approvalModel.js'
import { query } from "../db.js"            // your Postgres pool.
import { pool } from "../db.js";
import { addMember } from "../models/memberModel.js";

export const modifyDocVerificationStatus = async (candidateId) => {
  return await candidateModel.updateDocVerificationStatus(candidateId, "ผ่านการตรวจสอบ");
};

export const sendCandidateToCommittee = async (candidateId) => {
    return await candidateModel.updateApprovalStatus(candidateId, 'รอการตรวจสอบ');
  };

export const fetchAllVerifiedDocsCandidates = async () => {
  try {
    const candidates = await candidateModel.getCandidateByDocVerification('ผ่านการตรวจสอบ');
    return candidates;  // Always returns an array
  } catch (error) {
    throw new Error('Error fetching verified docs candidates');
  }
};

export const fetchAllApprovalStatusCandidates = async () => {
  try {
    const candidates = await candidateModel.getCandidateByApprovalStatus(['รอการตรวจสอบ', 'ไม่ผ่านการตรวจสอบ', 'ผ่านการตรวจสอบ']);
    return candidates;  // Always returns an array
  } catch (error) {
    throw new Error('Error fetching verified docs candidates');
  }
};

export const removeCandidate = async (candidateId) => {
  return await candidateModel.deleteCandidateById(candidateId);}



