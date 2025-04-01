import *  as clubModel from "../models/clubSummaryModel.js"
import dayjs from "dayjs";

export async function getClubAccount() {
    // 1) Fetch the raw rows
    const rows = await clubModel.getClubAccountDetail();
  
    // 2) Calculate totals
    let totalIncome = 0;
    let totalExpense = 0;
  
    for (const row of rows) {
      if (row.type === 'รายรับ') {
        totalIncome += Number(row.amount);
      } else {
        totalExpense += Number(row.amount);
      }
    }
  
    // 3) Return data 
    return {
      records: rows,
      totals: {
        totalIncome,
        totalExpense,
        currentBalance: totalIncome - totalExpense
      }
    };
  }

  export const getDashboardFilteredData = async ({ year, range, month }) => {
    const raw = await clubModel.getDashboardRawData(); // ดึงข้อมูลทั้งหมดจาก DB แบบไม่กรอง
  
    const filtered = {
      summary: {
        verification: {},
        candidateApproval: {},
        memberStatus: {},
        deathReport: {},
        heirTransfer: {},
        totalMembers: 0,
        totalDeaths: 0,
        totalIncome: 0,
        totalExpense: 0,
        currentBalance: 0,
      },
      lineChart: [],
      barChart: [],
      latestTransactions: [],
    };
  
    // ✅ รวม summary
    filtered.summary.verification = raw.verificationSummary;
    filtered.summary.candidateApproval = raw.candidateApprovalSummary;
    filtered.summary.memberStatus = raw.memberStatusSummary;
    filtered.summary.deathReport = raw.deathReportSummary;
    filtered.summary.heirTransfer = raw.heirTransferSummary;
    console.log(raw.memberStatusSummary)
  
    // 🔧 แปลงปี พ.ศ. -> ค.ศ.
    const selectedYearCE = year !== "ทั้งหมด" ? parseInt(year) - 543 : null;
  
    // 🔧 สร้างช่วงเวลา filter (rangeStart - rangeEnd)
    let rangeStart = null;
    let rangeEnd = null;
  
    if (selectedYearCE) {
      const now = dayjs();
      if (range === "3m") {
        rangeEnd = now.endOf("month");
        rangeStart = now.subtract(3, "month").startOf("month");
      } else if (range === "6m") {
        rangeEnd = now.endOf("month");
        rangeStart = now.subtract(6, "month").startOf("month");
      } else if (range === "1y") {
        rangeStart = dayjs(`${selectedYearCE}-01-01`);
        rangeEnd = dayjs(`${selectedYearCE}-12-31`).endOf("day");
      } else if (range === "custom" && typeof month === "number") {
        rangeStart = dayjs(`${selectedYearCE}-${month + 1}-01`);
        rangeEnd = rangeStart.endOf("month");
      }
    }
  
    // 🧠 Filter รายรับ/รายจ่าย ตามช่วงเวลา
    const income = raw.transactions.filter((item) => {
      if (item.type !== "รายรับ") return false;
      const date = dayjs(item.datetime);
      return !rangeStart || (date.isAfter(rangeStart.subtract(1, "day")) && date.isBefore(rangeEnd.add(1, "day")));
    });
  
    const expense = raw.transactions.filter((item) => {
      if (item.type !== "รายจ่าย") return false;
      const date = dayjs(item.datetime);
      return !rangeStart || (date.isAfter(rangeStart.subtract(1, "day")) && date.isBefore(rangeEnd.add(1, "day")));
    });
  
    // 💰 คำนวณยอดรวม
    const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = expense.reduce((sum, t) => sum + Number(t.amount), 0);
    const currentBalance = totalIncome - totalExpense;
  
    filtered.summary.totalIncome = totalIncome;
    filtered.summary.totalExpense = totalExpense;
    filtered.summary.currentBalance = currentBalance;
    filtered.latestTransactions = [...income, ...expense]
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      .slice(0, 10); // รายการล่าสุด
  
    // 📊 Chart รายเดือน (ทั้งปี)
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const monthStart = dayjs(`${selectedYearCE}-${i + 1}-01`).startOf("month");
      const monthEnd = monthStart.endOf("month");
  
      const monthIncome = income.filter((t) => {
        const d = dayjs(t.datetime);
        return d.isAfter(monthStart) && d.isBefore(monthEnd);
      });
  
      const monthExpense = expense.filter((t) => {
        const d = dayjs(t.datetime);
        return d.isAfter(monthStart) && d.isBefore(monthEnd);
      });
  
      return {
        month: monthStart.format("MMMM"),
        รายรับ: monthIncome.reduce((sum, i) => sum + Number(i.amount), 0),
        รายจ่าย: monthExpense.reduce((sum, i) => sum + Number(i.amount), 0),
      };
    });
  
    filtered.lineChart = monthly;
    filtered.barChart = monthly;
  
    return filtered;
  };
  