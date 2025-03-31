import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  2023: [
    { month: "มกราคม", income: 10000, expense: 5000 },
    { month: "กุมภาพันธ์", income: 8500, expense: 2000 },
    { month: "มีนาคม", income: 9000, expense: 6000 },
    { month: "เมษายน", income: 7000, expense: 3500 },
    { month: "พฤษภาคม", income: 6000, expense: 2500 },
    { month: "มิถุนายน", income: 9500, expense: 4000 },
    { month: "กรกฎาคม", income: 8800, expense: 3000 },
    { month: "สิงหาคม", income: 9100, expense: 5000 },
    { month: "กันยายน", income: 9700, expense: 5200 },
    { month: "ตุลาคม", income: 10500, expense: 4800 },
    { month: "พฤศจิกายน", income: 9900, expense: 4300 },
    { month: "ธันวาคม", income: 11000, expense: 4900 },
  ],
};

const SummaryCard = ({ title, value }) => (
  <div className="p-4 border rounded-2xl shadow w-48">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-xl">฿{value.toLocaleString()}</p>
  </div>
);

export default function SummaryReport() {
  const [year, setYear] = useState("2023");
  const [reportData, setReportData] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, net: 0 });

  useEffect(() => {
    const data = mockData[year] || [];
    setReportData(data);

    const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
    const totalExpense = data.reduce((sum, d) => sum + d.expense, 0);
    const net = totalIncome - totalExpense;

    setTotals({ income: totalIncome, expense: totalExpense, net });
  }, [year]);

  return (
    <div className="ibm-plex-sans-thai-medium">
    <div className="p-12 sm:ml-64">
      <h1 className="text-2xl font-bold mb-4">สรุปรายรับรายจ่ายประจำปี</h1>

      <div className="mb-4">
        <label htmlFor="year" className="mr-2 font-medium">
          เลือกปี:
        </label>
        <select
          id="year"
          className="border rounded p-1"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="flex gap-6 mb-6">
        <SummaryCard title="รายรับรวม" value={totals.income} />
        <SummaryCard title="รายจ่ายรวม" value={totals.expense} />
        <SummaryCard title="คงเหลือสุทธิ" value={totals.net} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">กราฟรายรับ - รายจ่ายรายเดือน</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `฿${v.toLocaleString()}`} />
            <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" name="รายรับ" />
            <Bar dataKey="expense" fill="#f87171" name="รายจ่าย" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">ตารางรายละเอียดรายเดือน</h2>
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">เดือน</th>
              <th className="border p-2">รายรับ (บาท)</th>
              <th className="border p-2">รายจ่าย (บาท)</th>
              <th className="border p-2">คงเหลือสุทธิ</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, idx) => (
              <tr key={idx}>
                <td className="border p-2">{row.month}</td>
                <td className="border p-2">{row.income.toLocaleString()}</td>
                <td className="border p-2">{row.expense.toLocaleString()}</td>
                <td className="border p-2">{(row.income - row.expense).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold bg-gray-50">
              <td className="border p-2">รวมทั้งปี</td>
              <td className="border p-2">{totals.income.toLocaleString()}</td>
              <td className="border p-2">{totals.expense.toLocaleString()}</td>
              <td className="border p-2">{totals.net.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    </div>
  );
}
