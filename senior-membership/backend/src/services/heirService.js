import * as heirModel from "../models/heirModel.js";

export const fetchMembersForHeir = async (heirId) => {
    return await heirModel.getMemberByHeirId(heirId);
  };

  export const getHeirName = async (memberId) => {
    return await heirModel.getHeirByMemberId(memberId);
  };
  
  
