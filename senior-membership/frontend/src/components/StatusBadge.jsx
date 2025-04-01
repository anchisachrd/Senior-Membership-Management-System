import React from "react";

const statusColors = {
  "อนุมัติ": "bg-green-600 text-white",
  "ไม่อนุมัติ": "bg-red-500 text-white",
  "รอการพิจารณา": "bg-yellow-400 text-gray-800",
  "รอการแก้ไข": "bg-orange-400 text-gray-800",
  "ผ่าน": "bg-green-600 text-white",
  "ไม่ผ่าน": "bg-red-500 text-white",
  "รอตรวจเอกสาร": "bg-yellow-400 text-gray-800",
  "ใช้งานอยู่": "bg-green-600 text-white",
  "เสียชีวิต":  "bg-red-600 text-white",
  "ยังไม่ส่ง": "bg-red-500 text-white",
  "ส่งแล้ว": "bg-green-600 text-white",
  "รอการจ่ายเงิน": "bg-red-500 text-white",
  "จ่ายแล้ว": "bg-green-600 text-white",
};

function StatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[status] || "bg-gray-300 text-black"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
