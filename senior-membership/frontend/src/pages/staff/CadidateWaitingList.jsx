import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import {
  getVerifiedCandidates,
  sendToCommittee,
  deleteCandidate,
} from "../../api/candidateApi";
import ConfirmModal from "../../components/ConfirmModal";
import StatusBadge from "../../components/StatusBadge";
import { verifyUser } from "../../api/verifyApi";

function CadidateWaitingList() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => {});
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const handleRowClick = (candidateId) => {
    navigate(`/candidateProfile/${candidateId}`, {
      state: { context: "waitingCandidateProfile" },
    });
  };

  const fetchCandidates = async () => {
    try {
      const data = await getVerifiedCandidates();
      console.log("🎯 Candidate Data:", data);
      setCandidates(data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  const handleSentdata = async (candidateId) => {
    try {
      await sendToCommittee(candidateId);

      await fetchCandidates();
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูลไปที่กรรมการ");
      console.error(error);
    }
  };

  const openModal = (title, description, action) => {
    setModalTitle(title);
    setModalDescription(description);
    setOnConfirmAction(() => action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // บังคับเข้าหน้า

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
    }
  };

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

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
    const filteredCandidates = candidates.filter((candidate) => {
      const matchesSearch =
        candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.candidate_id.toString().includes(searchTerm);
  
      const matchesCategory =
        categoryFilter === "" || candidate.final_approval_status === categoryFilter;
  
      return matchesSearch && matchesCategory;
    });
  

  return (
    <div className="ibm-plex-sans-thai-medium">
      {/* Confirmation Modal*/}
      <ConfirmModal
        isOpen={isModalOpen}
        title={modalTitle}
        description={modalDescription}
        onConfirm={() => {
          onConfirmAction();
          closeModal();
        }}
        onCancel={closeModal}
      />
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          แถวคอยการสมัคร
        </div>

        <div class="mb-8 overflow-hidden">
          
        <div class="grid gap-6 md:grid-cols-3">
            <form className="col-span-2 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="ค้นหา..."
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
              <option value="">สถานะอนุมัติการเป็นสมาชิกทั้งหมด</option>
              <option value="อนุมัติ">อนุมัติ</option>
              <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
              <option value="รอการแก้ไข">รอการแก้ไข</option>
              <option value="รอการพิจารณา">รอการพิจารณา</option>
              <option value="ยังไม่ส่งพิจารณา">ยังไม่ส่งพิจารณา</option>
            </select>
          </div>

        </div>

        <div class="relative overflow-hidden shadow-xl sm:rounded-lg ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-700 ">
              <tr>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  No.
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  รหัสผู้สมัคร
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  ชื่อผู้สมัคร
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  เลขบัตรประชาชน
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  เบอร์โทรศัพท์
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  ได้รับสิทธิ์ก่อน
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  วันที่ตรวจสอบเอกสาร
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  อนุมัติการเป็นสมาชิก
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, index) => (
                  <tr
                    key={candidate.candidate_id}
                    onClick={() => handleRowClick(candidate.candidate_id)}
                    className="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900"
                  >
                    <td className="text-center align-middle py-4 px-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.candidate_id}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.first_name} {candidate.last_name}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.national_id}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.phone}
                    </td>
                    <td className="text-center align-middle">
                      {candidate.priority ? <FaCheck /> : "-"}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {onChangeDate(candidate.verified_at)}
                    </td>
                    <td className="text-center ">
                      <StatusBadge status={candidate.final_approval_status} />
                    </td>
                    <td className="text-center align-middle py-4 px-4 space-x-4">
                      {candidate.final_approval_status ===
                      "ยังไม่ส่งพิจารณา" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 stop the row click
                            if (
                              candidate.final_approval_status ===
                              "ยังไม่ส่งพิจารณา"
                            ) {
                              openModal(
                                "ยืนยันการส่งข้อมูล",
                                "คุณต้องการส่งข้อมูลไปที่กรรมการหรือไม่?",
                                () => handleSentdata(candidate.candidate_id)
                              );
                            }
                          }}
                          disabled={
                            candidate.final_approval_status !==
                            "ยังไม่ส่งพิจารณา"
                          }
                          className={`text-white rounded-lg px-4 py-2 ${
                            candidate.final_approval_status ===
                            "ยังไม่ส่งพิจารณา"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          ส่งข้อมูล
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/final-approval/detail/${candidate.candidate_id}`,
                              {
                                state: { fromStaff: true }, // Pass state to identify the page source
                              }
                            );
                          }}
                          className="bg-blue-700 hover:bg-blue-600 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                        >
                          ดูผล
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center align-middle py-3 px-4 text-center text-gray-600"
                  >
                    ไม่มีข้อมูลผู้สมัครที่ผ่านการตรวจสอบ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CadidateWaitingList;
