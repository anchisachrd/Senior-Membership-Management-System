import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentHistory } from "../api/memberApi";

import { verifyUser } from "../api/verifyApi";

function MemberPaymentHistory() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [historyData, setHistoryData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      console.log(data);
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserRoleId(data.role_id);

      if (data.role !== "staff" && data.role !== "committee") {
        navigate("/login");
      } else {
        const history = await getPaymentHistory(memberId);
        setHistoryData(history);
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  const handleButtonClick = (reportId, memberId) => {
    navigate(`/death/payment/detail/${reportId}?memberId=${memberId}`);
  };
  return (
    <div class=" w-full ">
      <div class=" mt-10 overflow-hidden border shadow-xl sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
            <tr>
              <th scope="col" class="text-center align-middle py-4 px-4">
                No.
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                วันที่ชำระ
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                รหัสผู้เสียชีวิต
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                ชื่อผู้เสียชีวิต
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                จำนวนเงิน
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                สถานะการชำระเงิน
              </th>
              <th scope="col" class="text-center align-middle py-4 px-4">
                รายละเอียดการชำระเงิน
              </th>
            </tr>
          </thead>

          <tbody>
            {historyData.map((item, index) => (
              <tr
                key={item.history_id}
                className="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900"
              >
                <th scope="row" className="px-8 py-4 font-medium">
                  {index + 1}
                </th>
                <td className="text-center align-middle py-4 px-4">
                  {new Date(item.created_at).toLocaleDateString("th-TH")}
                </td>
                <td className="text-center align-middle py-4 px-4">
                  {item.death_member_id}
                </td>
                <td className="text-center align-middle py-4 px-4">
                  {item.death_name}
                </td>
                <td className="text-center align-middle py-4 px-4">
                  {item.amount}
                </td>
                <td className="text-center px-6 py-4">
                  {item.status === "pass" ? (
                    <span className="text-green-600">ชำระเงินสำเร็จ</span>
                  ) : item.status === "fail" ? (
                    <p className="text-red-600">
                      {item.error_msg || "ชำระเงินไม่สำเร็จ"}
                    </p>
                  ) : (
                    <span className="text-yellow-600">ยังไม่ได้ชำระเงิน</span>
                  )}
                </td>
                <td className="text-center align-middle py-4 px-4">
                  {item.status !== "unpaid" && (
                    <button
                      className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 rounded-lg shadow"
                      onClick={() => {
                        handleButtonClick(item.report_id, memberId)
                      }}
                    >
                      ดูรายละเอียด
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberPaymentHistory;
