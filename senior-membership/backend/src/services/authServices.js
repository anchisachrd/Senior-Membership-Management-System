// import * as accountModel from "../models/accountModel.js";
// import * as employeeModel from "../models/employeeModel.js"; 

// export const loginByEmail = async (email) => {
//   const account = await accountModel.getAccountByEmail(email);
//   if (!account) return null;

//   let committeeId = null;
//   let staffId = null;
//   let adminId = null;
//   let heirId = null;
//   let memberId = null;

//   // Fetch additional data based on role
//   if (account.role === "committee") {
//     const committee = await employeeModel.getCommitteeByAccountId(account.account_id);
//     committeeId = committee ? committee.employee_id : null;
//   } else if (account.role === "staff") {
//     const staff = await employeeModel.getStaffByAccountId(account.account_id);
//     staffId = staff ? staff.employee_id : null;
//   } else if (account.role === "admin") {
//     const admin = await employeeModel.getAdminByAccountId(account.account_id);
//     adminId = admin ? admin.employee_id : null;
//   } else if (account.role === "heir") {
//     const heir = await accountModel.getHeirByAccountId(account.account_id);
//     heirId = heir ? heir.heir_id : null;
//   } else if (account.role === "member") {
//     const member = await accountModel.getMemberByAccountId(account.account_id);
//     memberId = member ? member.member_id : null;
//   }

//   return { ...account, committeeId, staffId, adminId, heirId, memberId };
// };
