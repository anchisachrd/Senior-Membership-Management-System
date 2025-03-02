import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { getVerifiedCandidates, sendToCommittee, deleteCandidate } from "../../api/candidateApi";
import ConfirmModal from "../../components/ConfirmModal";

function CadidateWaitingList() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => {});
  const userRole = localStorage.getItem("userRole")

  const navigate = useNavigate();

  const handleRowClick = (candidateId) => {
    navigate(`/candidateProfile/${candidateId}`, {
      state: { context : 'waitingCandidateProfile' },
    });
  };

  const fetchCandidates = async () => {
    try {
      const data = await getVerifiedCandidates();
      setCandidates(data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
    checkUserRole(); // Fetch initial data 
  }, []);

  const handleSentdata = async (candidateId) => {
    try {
      await sendToCommittee(candidateId);

      await fetchCandidates();
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูลไปที่กรรมการ");
      console.error(error);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      deleteCandidate(candidateId);
      alert('deleted');
      
      await fetchCandidates();
    } catch (error) {
      alert("Failed to delete candidate");
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
  const checkUserRole = async () => {
    if (userRole != 'staff'){
      navigate('/login')
    }
  };
  
 
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
          <div class="grid gap-6 md:grid-cols-4">
            <form class="max-w-3xl">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-200 sr-only dark:text-white"
              >
                ค้นหา
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder=""
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  ค้นหา
                </button>
              </div>
            </form>

            {/* filter */}
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
                  ตรวจสอบเอกสาร
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  อนุมัติการเป็นสมาชิก
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <tr
                    key={candidate.candidate_id}
                    onClick={() => handleRowClick(candidate.candidate_id)}
                    className="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900"
                  >
                    <td className="text-center align-middle py-4 px-4 font-medium">{index + 1}</td>
                    <td className="text-center align-middle py-4 px-4">{candidate.candidate_id}</td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.first_name} {candidate.last_name}
                    </td>
                    <td className="text-center align-middle py-4 px-4">{candidate.national_id}</td>
                    <td className="text-center align-middle py-4 px-4">{candidate.phone}</td>
                    <td className="text-center align-middle">
                      {candidate.priority ? <FaCheck /> : "-"}
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.doc_verification_status}
                    </td>
                    <td className="text-center align-middle py-4 px-4">{candidate.approval_status}</td>
                    <td className="text-center align-middle py-4 px-4 space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(
                            "ยืนยันการส่งข้อมูลกรรมการ",
                            "คุณต้องการส่งข้อมูลไปที่กรรมการหรือไม่?",
                            () => handleSentdata(candidate.candidate_id)
                          );
                        }}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        ส่งข้อมูล
                      </button>
                      <button
                       onClick={(e) => {
                        e.stopPropagation();
                        openModal(
                          "ยืนยันการลบข้อมูล",
                          "คุณต้องการลบข้อมูลผู้สมัครหรือไม่?",
                          () => handleDeleteCandidate(candidate.candidate_id)
                        );
                      }}
                       className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                        นำออก
                      </button>
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
