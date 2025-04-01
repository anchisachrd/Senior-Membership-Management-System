import * as clubServices from "../services/clubServices.js"

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
  
  