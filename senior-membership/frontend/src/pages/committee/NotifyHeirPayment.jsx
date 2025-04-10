import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDeathMemberList } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";
import StatusBadge from "../../components/StatusBadge";

function NotifyHeirPayment() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role !== "committee") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/club/payment/death-list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMembers([]);
      }
    };

    fetchData();
  }, [userRole]);

  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob =
      dobFromData.getDate().toString().padStart(2, "0") +
      "-" +
      (dobFromData.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      (dobFromData.getFullYear() + 543);
    return filterDob;
  };

  const handleRowClick = (memberId) => {
    navigate(`/member/${memberId}`, {
      state: { context: "heirPayment" },
    });
  };

  //http://localhost:3000/api/club/payment/death-list

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          แจ้งโอนเงินสงเคราะห์
        </div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="text-center align-middle py-4 px-4">No.</th>
                <th className="text-center align-middle py-4 px-4">
                  รหัสผู้เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  รายชื่อผู้เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  วัน/เดือน/ปี ที่เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  สาเหตุที่เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  ชื่อทายาทผู้รับเงินสงเคราะห์
                </th>
                <th className="text-center align-middle py-4 px-4">
                  สถานะการจ่ายเงินสงเคราะห์
                </th>
              </tr>
            </thead>

            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    ไม่มีการแจ้งเตือนโอนเงินค่าสงเคราะห์
                  </td>
                </tr>
              ) : (
                members.map((member, index) => (
                  <tr
                    key={member.death_member_id}
                    onClick={() => handleRowClick(member.death_member_id)}
                    className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                  >
                    <td className="text-center py-4 px-4 font-medium">{index + 1}</td>
                    <td className="text-center py-4 px-4">
                      {member.death_member_id}
                    </td>
                    <td className="text-center py-4 px-4">
                      {member.deceased_full_name}
                    </td>
                    <td className="text-center py-4 px-4">
                      {onChangeDate(member.date_of_death)}
                    </td>
                    <td className="text-center py-4 px-4">
                      {member.cause_of_death}
                    </td>
                    <td className="text-center py-4 px-4">
                      {member.heir_full_name || "–"}
                    </td>
                    <td className="text-center py-4 px-4">
                      <StatusBadge
                        status={
                          member.paid_status === true
                            ? "จ่ายแล้ว"
                            : "รอการจ่ายเงิน"
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default NotifyHeirPayment;
