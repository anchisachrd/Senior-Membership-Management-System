import * as heirModel from "../models/heirModel.js";

export const fetchMembersForHeir = async (heirId) => {
    return await heirModel.getMemberByHeirId(heirId);
  };

  