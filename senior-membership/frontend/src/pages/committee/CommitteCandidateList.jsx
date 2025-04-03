import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getCommitteePendingApprovals } from "../../api/committeeApi";
import { verifyUser } from "../../api/verifyApi";
import StatusBadge from "../../components/StatusBadge";

function CommitteCandidateList() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRoleId, setUserRoleId] = useState('')



  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();

      setUserRole(data.role)
      setUserEmail(data.email)
      setUserRoleId(data.role_id)

      if (data.role !== 'committee') {
        navigate('/login');
      }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUserProfile();

  }, [userEmail]);

  const handleRowClick = (candidateId) => {
    console.log("Navigating to:", candidateId); // Debugging log
    navigate(`/candidateProfile/${candidateId}`, {
      state: { context: "committeeCandidateProfile" },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This calls GET /api/committee/pending
        const data = await getCommitteePendingApprovals(userRoleId);
        console.log("Pending Approvals API Response:", data);
        // console.log(userRoleId)
        setCandidates(data);
      } catch (error) {
        console.error("Error loading pending approvals:", error);
        setCandidates([]);
      }
    };
    fetchData();
  }, [userRoleId]);

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          อนุมัติการสมัครสมาชิก
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
                  สถานะการอนุมัติ
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
                      className="text-center align-middle py-4 px-4 font-medium"
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
                    <td className="text-center align-middle">
                      <StatusBadge status={candidate.approval_status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center align-middle py-4">
                    ไม่พบรายชื่อผู้สมัครที่รอการพิจารณา
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

export default CommitteCandidateList;
