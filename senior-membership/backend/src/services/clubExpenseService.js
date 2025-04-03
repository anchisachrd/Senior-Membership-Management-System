import * as clubExpenseModel from '../models/clubExpenseModel.js'
import * as employeeModel from '../models/employeeModel.js'
import * as deathReports from '../models/deathReport.js'

export const addClubExpense = async (data) => {
    return await clubExpenseModel.createClubExpense(data);
  };

export const addIsPayCommittee =  async (data) => {
  const getIsPayCommittee = await employeeModel.findCommitteeIsPay(); 
  await deathReports.updateIsFinalized(data.death_report_id, false)
  await deathReports.updateFinalApprovalStatus(data.death_report_id, );

  if (!getIsPayCommittee || getIsPayCommittee.length === 0) {
    throw new Error("No committee with is_pay = true found");
  }

  const committeeId = getIsPayCommittee[0].employee_id;

  const payload = {
    ...data,
    paid_by: committeeId,
  };

  const result = await clubExpenseModel.createClubExpense(payload);
  return result;
}

export const fetchNotifyDeathPayment = async () => {
  return await clubExpenseModel.getHeirPaymentList();
};

export const addProof = async (proof_path, paid_at, expense_id, report_id) => {
  
  await clubExpenseModel.updateProof(proof_path, paid_at, expense_id);
  await deathReports.updateIsFinalized(report_id, true)

};

