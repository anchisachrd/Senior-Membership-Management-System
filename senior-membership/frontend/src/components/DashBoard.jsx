import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const [summary, setSummary] = useState(null);
  const [lineChart, setLineChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [latestYear, setLatestYear] = useState(null);

  // Year, Range, and Month states
  const [selectedYear, setSelectedYear] = useState("2568");
  const [range, setRange] = useState("1y"); // "1y" or "custom"
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = January, 1 = February, etc.

  // Chart type toggle
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    fetchDashboard();
  }, [selectedYear, range, selectedMonth]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/club/dashboard/staff", {
        params: {
          year: selectedYear,
          range,
          month: selectedMonth, // only relevant if range === 'custom'
        },
      });
      setSummary(res.data.summary);
      setLineChart(res.data.lineChart);
      setBarChart(res.data.barChart);
      setTransactions(res.data.latestTransactions);
      setLatestYear(res.data.latestYear);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  if (!summary) return <div className="p-12 sm:ml-64">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">แดชบอร์ดภาพรวม</h1>

        {/* Example Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
          <SummaryCard
            title="จำนวนสมาชิกที่ใช้งานอยู่"
            value={summary.memberStatus.active}
            bgColor="green"
          />
          <SummaryCard
            title="จำนวนสมาชิกที่เสียชีวิต"
            value={summary.deathReport.committeeApproved}
            bgColor="red"
          />
          <SummaryCard
            title="สมาชิกที่ค้างชำระ"
            value={summary.memberStatus.unpaid}
          />
          <SummaryCard
            title="ค้างชำระเงินสงเคราะห์"
            value={summary.heirTransfer.waitingTransfer}
          />
        </div>

        {/* Grouped Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <GroupedSummaryCard
            title="ข้อมูลผู้สมัคร"
            items={[
              {
                label: "รอการตรวจสอบ",
                value: summary.verification.waiting,
                color: "yellow",
              },
              {
                label: "รอกรรมการพิจารณา/แก้ไข",
                value: summary.candidateApproval.waiting,
                color: "orange",
              },
              {
                label: "กรรมการไม่อนุมัติ",
                value: summary.candidateApproval.rejected,
                color: "red",
              },
            ]}
          />
          <GroupedSummaryCard
            title="ข้อมูลการแจ้งเสียชีวิต"
            items={[
              {
                label: "รอการตรวจสอบ",
                value: summary.deathReport.staffWaiting,
                color: "yellow",
              },
              {
                label: "รอกรรมการพิจารณา/แก้ไข",
                value: summary.deathReport.committeeWaiting,
                color: "orange",
              },
              {
                label: "กรรมการไม่อนุมัติ",
                value: summary.deathReport.committeeRejected,
                color: "red",
              },
            ]}
          />
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2 mt-8">
          <label className="text-sm text-gray-700">เลือกปี:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2568">2568</option>
            <option value="2567">2567</option>
            <option value="2566">2566</option>
            <option value="ทั้งหมด">ทั้งหมด</option>
          </select>
        </div>

        {/* Income/Expense Totals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
          <SummaryCard
            title="รายรับรวม"
            value={`฿${Number(summary.totalIncome).toLocaleString()}`}
            highlight="green"
          />
          <SummaryCard
            title="รายจ่ายรวม"
            value={`฿${Number(summary.totalExpense).toLocaleString()}`}
            highlight="red"
          />
          <SummaryCard
            title="ยอดเงินสุทธิ"
            value={`฿${Number(summary.currentBalance).toLocaleString()}`}
          />
        </div>

        {/* Range (both-year or single-month) & Chart Toggle */}
        <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
          {/* Range Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRange("1y")}
              className={`px-4 py-1 rounded-full text-sm border ${
                range === "1y"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              ทั้งปี
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
                className="border rounded px-2 py-1 text-sm"
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

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType("line")}
              className={`px-4 py-1 rounded-full text-sm border ${
                chartType === "line"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              กราฟเส้น
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-4 py-1 rounded-full text-sm border ${
                chartType === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              กราฟแท่ง
            </button>
          </div>
        </div>

        {/* Charts */}
        {chartType === "line" ? (
          <div className="bg-white p-6 shadow-sm border rounded-xl mt-5">
            <h2 className="text-lg font-semibold mb-4">แนวโน้มรายรับ-รายจ่าย</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
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
        ) : (
          <div className="bg-white p-6 shadow-lg rounded-xl mt-5">
            <h2 className="text-lg font-semibold mb-4">กราฟแท่งรายรับ-รายจ่าย</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChart}>
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
        )}

        {/* Latest Transactions */}
        <div className="bg-white p-6 shadow-lg rounded-xl mt-5">
          <h2 className="text-lg font-semibold mb-4">
            รายการล่าสุด (ปี {latestYear})
          </h2>
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
                {transactions.slice(0, 5).map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      item.type === "รายรับ" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <td className="px-4 py-2">
                      {new Date(item.datetime).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "medium",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "รายรับ"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.detail}</td>
                    <td className="px-4 py-2 text-right">
                      {parseFloat(item.amount).toLocaleString()} บาท
                    </td>
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

function SummaryCard({ title, value, highlight, bgColor }) {
  const textColor =
    highlight === "green"
      ? "text-green-600"
      : highlight === "red"
      ? "text-red-500"
      : highlight === "yellow"
      ? "text-yellow-400"
      : highlight === "orange"
      ? "text-orange-400"
      : "text-gray-700";
  const bg =
    bgColor === "green"
      ? "bg-green-100"
      : bgColor === "red"
      ? "bg-red-100"
      : "bg-gray-100";

  return (
    <div className={`${bg} p-4 shadow-sm rounded-xl flex flex-col justify-between`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-xl font-bold text-right ${textColor}`}>{value}</p>
    </div>
  );
}

function GroupedSummaryCard({ title, items }) {
  const getTextColor = (color) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-500";
      case "yellow":
        return "text-yellow-400";
      case "orange":
        return "text-orange-400";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="bg-white p-4 border shadow-sm rounded-xl h-full">
      <p className="text-base font-semibold mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center divide-x">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center px-2">
            <span className="text-gray-500 mt-1">{item.label}</span>
            <span
              className={`text-xl font-bold my-3 ${getTextColor(item.color)}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
