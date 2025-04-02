import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { getPendingCandidates } from "../../api/candidateApi";
import StatusBadge from "../../components/StatusBadge";
import { verifyUser } from '../../api/verifyApi';

function StaffCandidateList() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const handleRowClick = (candidateId) => {
    navigate(`/candidateProfile/${candidateId}`, {
      state: { context: "staffCandidateProfile" },
    });
  };

  // สำหรับเช็ค role
  useEffect(() => {
      fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
      try {
          const data = await verifyUser();
          setUserRole(data.role)
          setUserEmail(data.email)

          if (data.role !== 'staff') {
                navigate('/login')
            }

      } catch (error) {
          console.error('Fetch Protected Data Error:', error);
      }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getPendingCandidates(); // Fetch only 'รอตรวจเอกสาร' and 'ไม่ผ่าน'
        setCandidates(data);
      } catch (error) {
        console.error("Error:", error);
        setCandidates([]);
      }
    };
    fetchCandidates();
  }, []);
  return (
    <div className="ibm-plex-sans-thai-medium">
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          จัดการผู้สมัคร
        </div>



        <div class="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
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
                    <th
                      scope="row"
                      className="text-center align-middle py-3 px-4 font-medium"
                    >
                      {index + 1}
                    </th>
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
                    <td className="text-center align-middle py-4 px-4">
                      {candidate.priority ? <FaCheck /> : "-"}
                    </td>
                    <td className="text-center align-middle ">
                      <StatusBadge status={candidate.doc_verification_status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center align-middle py-4">
                    ไม่พบรายชื่อผู้สมัคร
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

export default StaffCandidateList;
