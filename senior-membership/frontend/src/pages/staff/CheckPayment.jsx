// CheckPayment.jsx (โค้ดสั้น ๆ)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSlipHistory } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";

function CheckPayment() {
  const navigate = useNavigate();
  const [slips, setSlips] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // เรียก API มาดึงรายการ slip ทั้งหมด
    const fetchSlips = async () => {
      try {
        const data = await getAllSlipHistory();
        setSlips(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSlips();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role != "staff") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  const handleRowClick = (reportId, memberId) => {
    // ไปหน้า detail พร้อมส่ง historyId
    navigate(`/staff/payment/detail/${reportId}?memberId=${memberId}`);
  };

  const formatThaiDateTime = (datetimeStr) => {
    if (!datetimeStr) return "-";
    const date = new Date(datetimeStr);
  
    const thaiDate = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  
    const thaiTime = date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return `${thaiDate} เวลา ${thaiTime} น.`;
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          การตรวจสอบสลิป
        </div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900 ">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">วันที่/เวลาชำระเงิน</th>
                <th className="px-6 py-3">รหัสสมาชิก</th>
                <th className="px-6 py-3">ชื่อสมาชิก</th>
                <th className="px-6 py-3">ชื่อผู้เสียชีวิต</th>
                <th className="px-6 py-3">จำนวนเงิน</th>
                <th className="px-6 py-3">สถานะการตรวจสอบสลิป</th>
              </tr>
            </thead>
            <tbody>
              {slips.map((slip, index) => (
                <tr
                  key={slip.history_id}
                  onClick={() => handleRowClick(slip.report_id, slip.member_id)}
                  className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {formatThaiDateTime(slip.trans_date)}
                  </td>
                  <td className="px-6 py-4">{slip.member_id}</td>
                  <td className="px-6 py-4">{slip.member_name}</td>
                  <td className="px-6 py-4">{slip.death_name}</td>
                  <td className="px-6 py-4">{slip.amount}</td>
                  <td className="px-6 py-4">
                    {slip.status === "fail" ? (
                      <span className="text-red-600">
                        {slip.error_msg || "ชำระเงินไม่สำเร็จ"}
                      </span>
                    ) : slip.status === "unpaid" ? (
                      <span className="text-yellow-600">ยังไม่ได้ชำระเงิน</span>
                    ) : slip.status === "pass" ? (
                      <span className="text-green-600">สลิปโอนเงินถูกต้อง</span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckPayment;
