import * as clubModel from "../models/clubSummaryModel.js";
import dayjs from "dayjs";
import { query } from "../db.js";
import isBetween from "dayjs/plugin/isBetween.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";

// Extend dayjs with the plugin
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export async function getClubAccount(start, end) {
  const rows = await clubModel.getClubAccountDetail(start, end);

  let totalIncome = 0;
  let totalExpense = 0;

  for (const row of rows) {
    if (row.type === "รายรับ") {
      totalIncome += Number(row.amount);
    } else {
      totalExpense += Number(row.amount);
    }
  }

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
  try {
    // 1) Get the latest year from DB
    const latestYearResult = await query(`
      SELECT MAX(EXTRACT(YEAR FROM trans_date)) AS year
      FROM slip_history
    `);

    // Log what the DB returned
    console.log("latestYearResult:", latestYearResult.rows);

    // If we have no rows or the value is null, handle it
    let latestYearCE = null;
    let latestYearBE = null;
    if (!latestYearResult.rows.length || latestYearResult.rows[0].year == null) {
      // slip_history might be empty, or no valid trans_date
      console.warn("No valid year found in slip_history. Using current year as fallback.");
      latestYearCE = new Date().getFullYear(); // e.g., 2025
      latestYearBE = latestYearCE + 543;
    } else {
      // We got a valid year from the DB
      latestYearCE = parseInt(latestYearResult.rows[0].year, 10); // e.g., 2023
      latestYearBE = latestYearCE + 543; // 2566
    }

    // Log them
    console.log("latestYearCE:", latestYearCE, "latestYearBE:", latestYearBE);

    // 2) Convert the selected year from BE to CE (if not "ทั้งหมด")
    let selectedYearCE = null;
    if (year && year !== "ทั้งหมด") {
      selectedYearCE = parseInt(year, 10) - 543;
    }

    // Log user’s choice
    console.log(`User input year: ${year}, range: ${range}, month: ${month}`);
    console.log("selectedYearCE:", selectedYearCE);

    let rangeStart = null;
    let rangeEnd = null;

    // 3) Determine the date filter
    if (selectedYearCE && !isNaN(selectedYearCE)) {
      if (range === "1y") {
        // "ทั้งปี"
        rangeStart = dayjs(`${selectedYearCE}-01-01`).startOf("day");
        rangeEnd   = dayjs(`${selectedYearCE}-12-31`).endOf("day");
      } else if (range === "custom" && typeof month === "number") {
        // "เลือกเดือน"
        const targetMonth = month + 1; // front-end is zero-based
        const startString = `${selectedYearCE}-${targetMonth}-01`;
        rangeStart = dayjs(startString).startOf("month");
        rangeEnd   = dayjs(startString).endOf("month");
      }
    }

    // Log the final range
    console.log("rangeStart:", rangeStart?.format(), "rangeEnd:", rangeEnd?.format());

    // 4) Get raw data
    const raw = await clubModel.getDashboardRawData();
    const latestRaw = await clubModel.getDashboardRawData();

    // 5) Build base filtered object
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

    // 6) Basic summaries
    filtered.summary.verification      = raw.verificationSummary;
    filtered.summary.candidateApproval = raw.candidateApprovalSummary;
    filtered.summary.memberStatus      = raw.memberStatusSummary;
    filtered.summary.deathReport       = raw.deathReportSummary;
    filtered.summary.heirTransfer      = raw.heirTransferSummary;

    // 7) Filter transactions by date range
    const income = raw.transactions.filter((item) => {
      if (item.type !== "รายรับ") return false;
      if (!rangeStart || !rangeEnd) return true; // "ทั้งหมด" or no valid filter
      const date = dayjs(item.datetime);
      return date.isBetween(rangeStart, rangeEnd, "day", "[]");
    });

    const expense = raw.transactions.filter((item) => {
      if (item.type !== "รายจ่าย") return false;
      if (!rangeStart || !rangeEnd) return true;
      const date = dayjs(item.datetime);
      return date.isBetween(rangeStart, rangeEnd, "day", "[]");
    });

    // 8) Totals
    const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = expense.reduce((sum, t) => sum + Number(t.amount), 0);
    const currentBalance = totalIncome - totalExpense;

    filtered.summary.totalIncome = totalIncome;
    filtered.summary.totalExpense = totalExpense;
    filtered.summary.currentBalance = currentBalance;

    // 9) Latest 10 transactions
    filtered.latestTransactions = latestRaw.transactions
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      .slice(0, 10);

    // 10) Build monthly data
    const monthlyData = [];
    if (rangeStart && rangeEnd) {
      let cursor = rangeStart.startOf("month");
      while (cursor.isSameOrBefore(rangeEnd, "month")) {
        const monthBE = cursor.year() + 543;
        const thisMonthIncome = income.filter((t) =>
          dayjs(t.datetime).isSame(cursor, "month")
        );
        const thisMonthExpense = expense.filter((t) =>
          dayjs(t.datetime).isSame(cursor, "month")
        );

        monthlyData.push({
          month: cursor.format("MMMM") + " " + monthBE,
          รายรับ: thisMonthIncome.reduce((sum, i) => sum + Number(i.amount), 0),
          รายจ่าย: thisMonthExpense.reduce((sum, i) => sum + Number(i.amount), 0),
        });

        cursor = cursor.add(1, "month");
      }
    }

    filtered.lineChart = monthlyData;
    filtered.barChart  = monthlyData;

    // Final log before returning
    console.log("Returning dashboard data:", {
      ...filtered,
      latestYear: latestYearBE,
    });

    // 11) Return the final data
    return {
      ...filtered,
      latestYear: latestYearBE,
    };
  } catch (error) {
    console.error("Error in getDashboardFilteredData:", error);
    // rethrow or return an error
    throw error;
  }
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
