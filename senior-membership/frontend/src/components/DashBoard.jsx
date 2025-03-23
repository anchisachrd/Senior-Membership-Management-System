import React, { useState } from "react";
import { dashboardMock } from "../mock/dashboardMock";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#f59e0b", "#3b82f6", "#6366f1"];

const monthOptions = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

function Dashboard() {
  const summary = dashboardMock.summary;
  const transactions = dashboardMock.latestTransactions;

  const [range, setRange] = useState("6m");
  const [selectedMonth, setSelectedMonth] = useState(0); // index of selected month

  const fullChartData = [
    { month: "มกราคม", รายรับ: 19000, รายจ่าย: 12000 },
    { month: "กุมภาพันธ์", รายรับ: 21000, รายจ่าย: 15000 },
    { month: "มีนาคม", รายรับ: 18000, รายจ่าย: 14000 },
    { month: "เมษายน", รายรับ: 16000, รายจ่าย: 13000 },
    { month: "พฤษภาคม", รายรับ: 20000, รายจ่าย: 15000 },
    { month: "มิถุนายน", รายรับ: 22000, รายจ่าย: 16000 },
    { month: "กรกฎาคม", รายรับ: 23000, รายจ่าย: 18000 },
    { month: "สิงหาคม", รายรับ: 24000, รายจ่าย: 19000 },
    { month: "กันยายน", รายรับ: 25000, รายจ่าย: 17000 },
    { month: "ตุลาคม", รายรับ: 15000, รายจ่าย: 11000 },
    { month: "พฤศจิกายน", รายรับ: 18000, รายจ่าย: 13000 },
    { month: "ธันวาคม", รายรับ: 20000, รายจ่าย: 16000 },
  ];

  const getFilteredChartData = () => {
    if (range === "3m") return fullChartData.slice(-3);
    if (range === "6m") return fullChartData.slice(-6);
    if (range === "1y") return fullChartData;
    if (range === "custom") return [fullChartData[selectedMonth]];
    return fullChartData;
  };

  const chartData = getFilteredChartData();

  const pieData = [
    { name: "โอนเงินสงเคราะห์", value: 50000 },
    { name: "ค่าสาธารณูปโภค", value: 12000 },
    { name: "ค่าสถานที่", value: 8000 },
    { name: "ค่าบำรุงชมรม", value: 5000 },
    { name: "ค่าอื่นๆ", value: 3000 },
  ];

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-800">แดชบอร์ดภาพรวม</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="สมาชิกทั้งหมด" value={summary.totalMembers} />
          <SummaryCard
            title="สมาชิกที่ยังใช้งานอยู่"
            value={summary.activeMembers}
          />
          <SummaryCard
            title="รายรับรวม"
            value={`฿${summary.totalIncome.toLocaleString()}`}
            highlight="green"
          />
          <SummaryCard
            title="รายจ่ายรวม"
            value={`฿${summary.totalExpense.toLocaleString()}`}
            highlight="red"
          />
          <SummaryCard
            title="ยอดเงินปัจจุบัน"
            value={`฿${summary.currentBalance.toLocaleString()}`}
          />
          <SummaryCard
            title="แจ้งเสียชีวิตรอตรวจ"
            value={summary.pendingDeaths}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-end gap-2 items-center mt-5">
          <button
            onClick={() => setRange("3m")}
            className={`px-4 py-1 rounded-full text-sm border ${
              range === "3m"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            3 เดือน
          </button>
          <button
            onClick={() => setRange("6m")}
            className={`px-4 py-1 rounded-full text-sm border ${
              range === "6m"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            6 เดือน
          </button>
          <button
            onClick={() => setRange("1y")}
            className={`px-4 py-1 rounded-full text-sm border ${
              range === "1y"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            ทั้งปี พ.ศ. 2567
          </button>
          <button
            onClick={() => setRange("custom")}
            className={`px-4 py-1 rounded-full text-sm border ${
              range === "custom"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            เลือกเดือน
          </button>
          {range === "custom" && (
            <select
              className="border rounded px-2 py-1 text-sm ml-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {monthOptions.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 shadow-lg rounded-xl  mt-5">
          <h2 className="text-lg font-semibold mb-4">แนวโน้มรายรับ-รายจ่าย</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="รายรับ"
                stroke="#16a34a"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="รายจ่าย"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 shadow-lg rounded-xl  mt-5">
          <h2 className="text-lg font-semibold mb-4">กราฟแท่งรายรับ-รายจ่าย</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="รายรับ" fill="#16a34a" />
              <Bar dataKey="รายจ่าย" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 shadow-lg rounded-xl  mt-5">
          <h2 className="text-lg font-semibold mb-4">
            สัดส่วนรายจ่ายตามประเภท
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Latest Transactions */}
        <div className="bg-white p-6 shadow-lg rounded-xl  mt-5">
          <h2 className="text-lg font-semibold mb-4">รายการล่าสุด</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-center">วันที่/เวลา</th>
                  <th className="px-4 py-2 text-center">ประเภท</th>
                  <th className="px-4 py-2 text-center">ชื่อผู้เกี่ยวข้อง</th>
                  <th className="px-4 py-2 text-center">รายละเอียด</th>
                  <th className="px-4 py-2 text-center">จำนวนเงิน</th>
                  <th className="px-4 py-2 text-center">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      item.type === "รายรับ" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <td className="px-4 py-2">{item.datetime}</td>
                    <td className="px-4 py-2">{item.type}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.detail}</td>
                    <td className="px-4 py-2">{item.amount.toFixed(2)} บาท</td>
                    <td className="px-4 py-2">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, highlight }) {
    const color = highlight === "green" ? "text-green-600" : highlight === "red" ? "text-red-500" : "text-gray-800";
    return (
      <div className="bg-white p-4 shadow-md rounded-xl">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className={`text-xl font-bold ${color}`}>{value}</p>
      </div>
    );
  }
  
  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded text-sm shadow">
          <p className="font-semibold">เดือน: {label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-gray-700">
              {item.name}: ฿{item.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  }
  
  export default Dashboard;
  
