import * as clubModel from "../models/clubSummaryModel.js";
import dayjs from "dayjs";
import { query } from "../db.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";


// เปิดใช้ plugin ก่อนใช้งาน
dayjs.extend(isSameOrBefore);


export async function getClubAccount() {
  // 1) Fetch the raw rows
  const rows = await clubModel.getClubAccountDetail();

  // 2) Calculate totals
  let totalIncome = 0;
  let totalExpense = 0;

  for (const row of rows) {
    if (row.type === "รายรับ") {
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
      currentBalance: totalIncome - totalExpense,
    },
  };
}

export const getDashboardFilteredData = async ({ year, range, month }) => {


  const latestYearResult = await query(
    `SELECT MAX(EXTRACT(YEAR FROM trans_date)) AS year FROM slip_history`
  );
  const latestYearCE = latestYearResult.rows[0].year;
  const latestYearBE = parseInt(latestYearCE) + 543;

  const selectedYearCE = year !== "ทั้งหมด" ? parseInt(year) - 543 : null;
  const today = dayjs();
  const now = parseInt(year) === latestYearBE ? today : dayjs(`${selectedYearCE}-12-31`);

  let rangeStart = null;
  let rangeEnd = null;

  if (selectedYearCE) {
    if (range === "3m") {
      rangeEnd = now.endOf("month");
      rangeStart = now.subtract(2, "month").startOf("month");
    } else if (range === "6m") {
      rangeEnd = now.endOf("month");
      rangeStart = now.subtract(5, "month").startOf("month");
    } else if (range === "1y") {
      rangeStart = dayjs(`${selectedYearCE}-01-01`);
      rangeEnd = dayjs(`${selectedYearCE}-12-31`).endOf("day");
    } else if (range === "custom" && typeof month === "number") {
      rangeStart = dayjs(`${selectedYearCE}-${month + 1}-01`);
      rangeEnd = rangeStart.endOf("month");
    }
  }

  const raw = await clubModel.getDashboardRawData(
    rangeStart?.format("YYYY-MM-DD"),
    rangeEnd?.format("YYYY-MM-DD")
  );

  const latestRaw = await clubModel.getDashboardRawData(
    dayjs(`${latestYearCE}-01-01`).format("YYYY-MM-DD"),
    dayjs(`${latestYearCE}-12-31`).endOf("day").format("YYYY-MM-DD")
  );
  

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

  filtered.summary.verification = raw.verificationSummary;
  filtered.summary.candidateApproval = raw.candidateApprovalSummary;
  filtered.summary.memberStatus = raw.memberStatusSummary;
  filtered.summary.deathReport = raw.deathReportSummary;
  filtered.summary.heirTransfer = raw.heirTransferSummary;





  // 🧠 Filter รายรับ/รายจ่าย ตามช่วงเวลา
  const income = raw.transactions.filter((item) => {
    if (item.type !== "รายรับ") return false;
    const date = dayjs(item.datetime);
    return (
      !rangeStart ||
      (date.isAfter(rangeStart.subtract(1, "day")) &&
        date.isBefore(rangeEnd.add(1, "day")))
    );
  });

  const expense = raw.transactions.filter((item) => {
    if (item.type !== "รายจ่าย") return false;
    const date = dayjs(item.datetime);
    return (
      !rangeStart ||
      (date.isAfter(rangeStart.subtract(1, "day")) &&
        date.isBefore(rangeEnd.add(1, "day")))
    );
  });

  // 💰 คำนวณยอดรวม
  const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = expense.reduce((sum, t) => sum + Number(t.amount), 0);
  const currentBalance = totalIncome - totalExpense;

  filtered.summary.totalIncome = totalIncome;
  filtered.summary.totalExpense = totalExpense;
  filtered.summary.currentBalance = currentBalance;
  filtered.latestTransactions = latestRaw.transactions
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    .slice(0, 10);

  // 📊 Chart รายเดือน (ทั้งปี)
  const monthly = [];
if (rangeStart && rangeEnd) {
  let cursor = rangeStart.startOf("month");

  while (cursor.isSameOrBefore(rangeEnd)) {
    const monthBE = cursor.year() + 543;

    const thisMonthIncome = income.filter((t) =>
      dayjs(t.datetime).isSame(cursor, "month")
    );

    const thisMonthExpense = expense.filter((t) =>
      dayjs(t.datetime).isSame(cursor, "month")
    );

    monthly.push({
      month: cursor.format("MMMM") + " " + monthBE,
      รายรับ: thisMonthIncome.reduce((sum, i) => sum + Number(i.amount), 0),
      รายจ่าย: thisMonthExpense.reduce((sum, i) => sum + Number(i.amount), 0),
    });

    cursor = cursor.add(1, "month");
  }
}


  filtered.lineChart = monthly;
  filtered.barChart = monthly;

  return {
    ...filtered,
    latestYear: latestYearBE,
  };
};


export const getClubSummaryByYear = async (year) => {

  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];
  

  
  const yearCE = parseInt(year) - 543;
  const all = await clubModel.getAllClubTransactions();

  const filtered = all.filter((t) =>
    dayjs(t.datetime).year() === yearCE
  );

  const months = thaiMonths.map((monthName) => ({
    month: monthName,
    income: 0,
    expense: 0,
    net: 0,
  }));

  filtered.forEach((t) => {
    const monthIdx = dayjs(t.datetime).month();
    const amount = parseFloat(t.amount);
    if (t.type === "รายรับ") months[monthIdx].income += amount;
    else months[monthIdx].expense += amount;
  });

  // calculate cumulative net
  months.forEach((m, i) => {
    const net = m.income - m.expense;
    if (i === 0) {
      m.net = net;
    } else {
      m.net = months[i - 1].net + net;
    }
  });

  const totals = months.reduce(
    (acc, m) => {
      acc.income += m.income;
      acc.expense += m.expense;
      acc.net = m.net;
      return acc;
    },
    { income: 0, expense: 0, net: 0 }
  );

  return {
    monthly: months,
    totals,
  };
};
