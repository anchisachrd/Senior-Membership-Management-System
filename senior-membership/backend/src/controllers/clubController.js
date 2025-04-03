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
  try {
    // Destructure the relevant query params
    const { year = "ทั้งหมด", range = "1y", month = 0 } = req.query;

    const data = await clubServices.getDashboardFilteredData({
      year,
      range,
      month: parseInt(month, 10),
    });
    res.json(data);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

  export const getClubSummaryReport = async (req, res) => {
    try {
      const { year } = req.query;
      const result = await clubServices.getClubSummaryByYear(year);
      res.json(result);
    } catch (err) {
      console.error("Error generating summary report:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน" });
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
        note: req.body.note,
        paid_at: req.body.paid_at
      }

    try {

      const result = await clubExpenseService.addIsPayCommittee(data)
      res.status(200).json({ message: "Add Club Expense", data: result });
    } catch (error) {
      console.error("Add Club Expense error:", error);
      res.status(500).json({ message: "Failed to add club expense data" });
    }
  };

 
  export const getHeirPaymentList = async (req, res) => {
    try {
      const list = await clubExpenseService.fetchNotifyDeathPayment();
      res.status(200).json(list);
    } catch (error) {
      console.error("Error fetching death report:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const uploadProof = async (req, res) => {
    const { paid_at, expense_id, report_id } = req.body;
    const proof_path = req.file?.filename;

    if (!proof_path || !paid_at || !expense_id) {
      return res.status(400).json({ error: "Missing data" });
    }
  

  try {
    const result = await clubExpenseService.addProof(proof_path, paid_at, expense_id, report_id )
    res.status(200).json({ message: "Add proof Expense", data: result });
  } catch (error) {
    console.error("Add Club Expense error:", error);
    res.status(500).json({ message: "Failed to add proof expense data" });
  }
};
  export const addClubGeneralExpense = async (req, res) => {
    
    const data = {
      amount: req.body.amount,
      paid_by: req.body.paid_by,
      proof_path: req.body.proof_path,
      death_report_id: req.body.death_report_id,
      paid_to_heir_id: req.body.paid_to_heir_id,
      expense_type: req.body.expense_type,
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

 
  
