import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDeathMemberList } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";
import StatusBadge from "../../components/StatusBadge";

function DeathMemberList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [amountStaff, SetAmountStaff] = useState("")
  const [selectedMember, setSelectedMember] = useState([]);


  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role !== "staff") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate('/login')
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDeathMemberList();
        console.log("Fetched Members:", data);
        setMembers(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error loading members:", error);
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

  const handleRowClick = (memberId, heirId) => {
    navigate(`/member/${memberId}`, {
      state: { context: "heirProof" , heirId: heirId },
    });
  };

  const addClubExpense = async (payload) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/club/add-club-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add club expense");
      }

      return await response.json();
    } catch (err) {
      console.error("Add Club Expense Error:", err);
      throw err;
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredMembers = members.filter((member) => {
    const statusText =
      member.is_finalized === null
        ? "ยังไม่ส่งข้อมูล"
        : member.is_finalized === false
          ? "รอการจ่ายเงิน"
          : "จ่ายแล้ว";

    return (
      (searchTerm === "" ||
        member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.member_id.toString().includes(searchTerm)) &&
      (categoryFilter === "" || categoryFilter === statusText)
    );
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (member) => {
    setIsModalOpen(!isModalOpen);
    setSelectedMember(member);
  };



  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          รายละเอียดผู้เสียชีวิต
        </div>

        <div class="mb-8 overflow-hidden">
          <div class="grid gap-6 md:grid-cols-3">
            <form
              className="col-span-2 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="ค้นหาโดยใช้รหัสสมาชิกหรือชื่อสมาชิก"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <select
              className="col-span-1 w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">สถานะการจ่ายเงินสงเคราะห์ทั้งหมด</option>
              <option value="ยังไม่ส่งข้อมูล">ยังไม่ส่งข้อมูล</option>
              <option value="รอการจ่ายเงิน">รอการจ่ายเงิน</option>
              <option value="จ่ายแล้ว">จ่ายแล้ว</option>
            </select>
          </div>
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
                  ชื่อผู้เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  วัน/เดือน/ปี ที่เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  วัน/เดือน/ปี ที่เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  สาเหตุที่เสียชีวิต
                </th>
                <th className="text-center align-middle py-4 px-4">
                  สถานะการส่งคำร้อง
                </th>
                <th className="text-center align-middle py-4 px-4">
                  สถานะการจ่ายเงินสงเคราะห์
                </th>
                <th className="text-center align-middle py-4 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member.member_id}
                  onClick={() => handleRowClick(member.member_id, member.heir_id)}
                  className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                >
                  <td className="text-center py-4 px-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="text-center py-4 px-4">{member.member_id}</td>
                  <td className="text-center py-4 px-4">{`${member.title} ${member.first_name} ${member.last_name}`}</td>
                  <td className="text-center py-4 px-4">
                    {onChangeDate(member.end_date)}
                  </td>
                  <td className="text-center py-4 px-4">
                    {onChangeDate(member.death_date)}
                  </td>
                  <td className="text-center py-4 px-4">
                    {member.leaving_reason}
                  </td>
                  <td className="text-center py-4 px-4">
                    <StatusBadge
                      status={member.is_requested ? "ส่งแล้ว" : "ยังไม่ส่ง"}
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <StatusBadge
                      status={
                        member.is_finalized === null
                          ? "ยังไม่ส่งข้อมูล"
                          : member.is_finalized === false
                            ? "รอการจ่ายเงิน"
                            : "จ่ายแล้ว"
                      }
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <button
                      disabled={
                        !member.is_requested || member.is_finalized !== null
                      }
                      className={`px-3 py-1 rounded-lg shadow text-white font-medium 
                        ${!member.is_requested || member.is_finalized !== null
                          ? "bg-gray-400 cursor-not-allowed"
                          :
                          "bg-blue-600 hover:bg-blue-800"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModal(member)
                      }}
                    >
                      ส่งข้อมูล
                    </button>

                    {isModalOpen && selectedMember && (
                      <div
                        id="popup-modal"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}

                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
                      >
                        <div className="relative p-1 w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
                            <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>

                            <div className="p-4 md:p-5 text-center">
                              <svg
                                className="mx-auto mt-4 mb-4 text-gray-800 w-12 h-12"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <p className="mb-1 text-lg font-bold text-gray-800">ระบุจำนวนเงินที่โอนค่าเงินสงเคราะห์</p>
                              <p className="text-sm font-normal text-gray-800">โปรดกรอกจำนวนเงิน</p>
                            </div>

                            <div className="px-5 pb-5">
                              <input
                                type="text"
                                value={amountStaff}
                                onChange={(e) => SetAmountStaff(e.target.value)}
                                name="amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                              />

                            </div>

                            <div className="relative flex justify-center items-center">
                              <button
                                type="button"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    await addClubExpense({
                                      amount: amountStaff,
                                      paid_by: null,
                                      proof_path: null,
                                      death_report_id: selectedMember.report_id, // ใช้ selectedMember
                                      paid_to_heir_id: selectedMember.heir_id, // ใช้ selectedMember
                                      expense_type: "โอนเงินสงเคราะห์",
                                      note: null,
                                      paid_at: null,
                                    });
                                    alert("เพิ่มรายการสำเร็จ");
                                    toggleModal();
                                    navigate(`/death/member-list`);
                                  } catch (error) {
                                    alert("เกิดข้อผิดพลาดในการเพิ่มรายการ");
                                  }
                                }}
                                disabled={isNaN(amountStaff) || amountStaff === ""}
                                className={`text-white rounded-lg px-5 py-2.5 text-sm mb-5 ${(isNaN(amountStaff) || amountStaff === "")
                                  ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                                  : "bg-lime-800 hover:bg-lime-700"
                                  }`}
                              >
                                เสร็จสิ้น
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default DeathMemberList;