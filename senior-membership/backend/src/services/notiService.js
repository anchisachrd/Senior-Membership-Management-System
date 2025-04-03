import * as notiModel from '../models/notiModel.js';

export const notiStaff = async () => {
    return await notiModel.notiStaff();
  }

export const notiCommittee = async (committee_id) => {
    return await notiModel.notiCommittee(committee_id);
}

export const notiHeir = async (heir_id) => {
  return await notiModel.notiHeir(heir_id);
}
export const notiMember = async (member_id) => {
  return await notiModel.notiMember(member_id);
}