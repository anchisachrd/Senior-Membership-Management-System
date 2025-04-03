import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import { getPaymentHistory } from "../../api/memberApi";

function History() {
  const navigate = useNavigate();
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

      if (data.role !== "member") {
        navigate("/login");
      } else {
        const history = await getPaymentHistory(data.role_id);
        setHistoryData(history);
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate("/login");
    }
  };

  const handleRowClick = (reportId, memberId) => {
    navigate(`/payment/detail/${reportId}?memberId=${memberId}`);
  };

  const handlePayClick = (reportId) => {
    navigate(`/submitPayment/${reportId}`);
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          ประวัติการชำระเงิน
        </div>

        <div class="relative overflow-hidden shadow-xl sm:rounded-lg ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
              
                <th scope="col" class="px-6 py-3">
                  No.
                </th>

                <th scope="col" class="px-6 py-3">
                  วัน/เดือน/ปี
                </th>
                <th scope="col" class="px-6 py-3">
                  รหัสสมาชิกที่เสียชีวิต
                </th>
                <th scope="col" class="px-6 py-3">
                  รายชื่อผู้เสียชีวิต
                </th>
                <th scope="col" class="px-6 py-3">
                  เงินสงเคราะห์
                </th>
                <th scope="col" class="px-6 py-3">
                  สถานะการชำระเงิน
                </th>
                <th scope="col" class="px-6 py-3">
                  ปุ่ม
                </th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((item, index) => (
                <tr
                  key={item.history_id}
                  onClick={() => {
                    if (item.status !== "unpaid") {
                      handleRowClick(item.report_id, userRoleId);
                    }
                  }}
                  className={`bg-white border-b text-gray-900 ${
                    item.status !== "unpaid"
                      ? "hover:bg-gray-50 cursor-pointer"
                      : ""
                  }`}
                >
                  <th scope="row" className="px-8 py-4 font-medium">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4">{item.death_member_id}</td>
                  <td className="px-6 py-4">{item.death_name}</td>
                  <td className="px-6 py-4">{item.amount}</td>

                  {/* ✅ สถานะการชำระเงิน */}
                  <td className="px-6 py-4">
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

                  {/* ✅ ปุ่ม */}
                  <td className="px-6 py-4">
                    {item.status === "unpaid" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayClick(item.report_id);
                        }}
                        className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 rounded-lg shadow"
                      >
                        ชำระเงิน
                      </button>
                    ) : item.status === "fail" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayClick(item.report_id);
                        }}
                        className="bg-orange-600 hover:bg-orange-800 text-white py-1 px-2 rounded-lg shadow"
                      >
                        ชำระเงินใหม่
                      </button>
                    ) : null}
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

export default History;
