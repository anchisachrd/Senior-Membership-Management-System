import * as clubServices from "../services/clubServices.js"
import * as clubExpenseService from "../services/clubExpenseService.js"

export const getClubAccount = async (req, res) => {
  try {
    const account = await clubServices.getClubAccount();
    res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching death report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const dashboardController = async (req, res) => {
    const { year = "ทั้งหมด", range = "1y", month } = req.query;
  
    try {
      const data = await clubServices.getDashboardFilteredData({ year, range, month: month ? parseInt(month) : undefined });
      res.json(data);
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ message: "Failed to load dashboard data" });
    }
  };

  export const addClubExpense = async (req, res) => {
    
      const data = {
        amount: req.body.amount,
        paid_by: req.body.paid_by,
        proof_path: req.body.proof_path,
        death_report_id: req.body.death_report_id,
        paid_to_heir_id: req.body.paid_to_heir_id,
        expense_type: req.body.expense_type,
        status: req.body.status,
        note: req.body.note,
        paid_at: req.body.paid_at
      }

    try {

      const result = await clubExpenseService.addClubExpense(data)
      res.status(200).json({ message: "Add Club Expense", data: result });
    } catch (error) {
      console.error("Add Club Expense error:", error);
      res.status(500).json({ message: "Failed to add club expense data" });
    }
  };
  