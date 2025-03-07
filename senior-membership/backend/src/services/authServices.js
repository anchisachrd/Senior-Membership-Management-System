import * as accountModel from "../models/accountModel.js"

export const loginByEmail = async (email) => {
  return await accountModel.getAccountByEmail(email);}
