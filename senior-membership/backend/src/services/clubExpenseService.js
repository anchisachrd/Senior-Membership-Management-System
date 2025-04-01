import * as clubExpenseModel from '../models/clubExpenseModel.js'

export const addClubExpense = async (data) => {
    return await clubExpenseModel.createClubExpense(data);
  };