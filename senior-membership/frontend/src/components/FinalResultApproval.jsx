import React, { useState, useEffect } from "react";
import { getFinalApprovalList } from "../api/committeeApi";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { verifyUser } from "../api/verifyApi";

function FinalResultApproval() {
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
  
      } catch (error) {
        console.error('Fetch Protected Data Error:', error);
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
    const fetchFinalResults = async () => {
      try {
        const data = await getFinalApprovalList(userRoleId);
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching final results:", error);
      }
    };
    fetchFinalResults();
  }, [userRoleId]);

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
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          ผลการอนุมัติ
        </div>

        <div class="mb-8 grid gap-6 md:grid-cols-3">
            <form className="col-span-2 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="ค้นหาโดยใช้รหัสผู้สมัครหรือชื่อผู้สมัคร"
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
              <option value="">สรุปผลการอนุมัติทั้งหมด</option>
              <option value="อนุมัติ">อนุมัติ</option>
              <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
              <option value="รอการแก้ไข">รอการแก้ไข</option>
              <option value="รอการพิจารณา">รอการพิจารณา</option>
            </select>
          </div>

        <div class="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  ผลการพิจารณาของฉัน
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  สรุปผลการอนุมัติ
                </th>
                <th scope="col" class="text-center align-middle py-4 px-4">
                  ดูผลสรุป
                </th>
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
                     <StatusBadge status= {candidate.approval_status}/>
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                     <StatusBadge status= {candidate.final_approval_status}/>
                    </td>
                    <td className="text-center align-middle py-4 px-4">
                      <button
                        className={`px-4 py-2 rounded-lg ${
                          candidate.final_approval_status === "รอการพิจารณา" || candidate.final_approval_status === "รอการแก้ไข" 
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-700"
                        }`}
                        disabled={
                          candidate.final_approval_status === "รอการพิจารณา" || candidate.final_approval_status === "รอการแก้ไข" 
                        }
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          navigate(`/final-approval/detail/${candidate.candidate_id}`);
                        }}
                      >
                        <FaFileAlt className="inline-block" /> ดูผล
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center align-middle py-4">
                    ไม่มีผลการพิจารณา
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

export default FinalResultApproval;
