import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [summary, setSummary] = useState(null);
  const [lineChart, setLineChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [range, setRange] = useState("6m");
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2568");

  useEffect(() => {
    fetchDashboard();
  }, [selectedYear]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/club/dashboard/staff",
        {
          params: { year: selectedYear },
        }
      );
      setSummary(res.data.summary);
      setLineChart(res.data.lineChart);
      setBarChart(res.data.barChart);
      setTransactions(res.data.latestTransactions);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  const getFilteredChartData = (data) => {
    if (range === "3m") return data.slice(-3);
    if (range === "6m") return data.slice(-6);
    if (range === "1y") return data;
    if (range === "custom") return [data[selectedMonth]];
    return data;
  };

  if (!summary) return <div className="p-12 sm:ml-64">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-800">แดชบอร์ดภาพรวม</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
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
            title="ยอดเงินปัจจุบัน"
            value={`฿${Number(summary.currentBalance).toLocaleString()}`}
          />
        </div>

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
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <GroupedSummaryCard
            title="ข้อมูลผู้สมัคร"
            items={[
              {
                label: "รอการตรวจสอบ",
                value: summary.verification.waiting,
                color: 'yellow'
              },
              {
                label: "รอกรรมการพิจารณา/แก้ไข",
                value: summary.candidateApproval.waiting,
                color: 'orange'
              },
              {
                label: "กรรมการไม่อนุมัติ",
                value: summary.candidateApproval.rejected,
                color: 'red'
              },
            ]}
          />
          <GroupedSummaryCard
            title="ข้อมูลการแจ้งเสียชีวิต"
            items={[
              {
                label: "รอการตรวจสอบ",
                value: summary.deathReport.staffWaiting,
                color: 'yellow'
              },
              {
                label: "รอกรรมการพิจารณา/แก้ไข",
                value: summary.deathReport.committeeWaiting,
                color: 'orange'
              },
              {
                label: "กรรมการไม่อนุมัติ",
                value: summary.deathReport.committeeRejected,
                color: 'red'
              },
            ]}
          />
        </div>

        {/* Filter */}
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
        <div className="bg-white p-6 shadow-lg rounded-xl mt-5">
          <h2 className="text-lg font-semibold mb-4">แนวโน้มรายรับ-รายจ่าย</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getFilteredChartData(lineChart)}>
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

        {/* Bar Chart */}
        <div className="bg-white p-6 shadow-lg rounded-xl mt-5">
          <h2 className="text-lg font-semibold mb-4">กราฟแท่งรายรับ-รายจ่าย</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getFilteredChartData(barChart)}>
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

        {/* Latest Transactions */}
        <div className="bg-white p-6 shadow-lg rounded-xl mt-5">
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
                    <td className="px-4 py-2">
                      {new Date(item.datetime).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "medium",
                      })}
                    </td>
                    <td className="px-4 py-2">{item.type}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.detail}</td>
                    <td className="px-4 py-2">
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
    <div
      className={`${bg} p-4 shadow-sm rounded-xl flex flex-col justify-between`}
    >
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
            <span className={`text-xl font-bold my-3 ${getTextColor(item.color)}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Dashboard;
