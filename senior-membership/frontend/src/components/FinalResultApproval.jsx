import React, { useState, useEffect } from "react";
import { getFinalApprovalList } from "../api/committeeApi";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FinalResultApproval() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinalResults = async () => {
      try {
        const data = await getFinalApprovalList();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching final results:", error);
      }
    };
    fetchFinalResults();
  }, []);

  return (
    <div className="p-12">
      <h2 className="text-xl font-bold mb-4">ผลการพิจารณาทั้งหมด</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No.</th>
            <th className="border p-2">รหัสผู้สมัคร</th>
            <th className="border p-2">ชื่อผู้สมัคร</th>
            <th className="border p-2">สรุปผลการอนุมัติ</th>
            <th className="border p-2">ดูผลสรุป</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={candidate.candidate_id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{candidate.candidate_id}</td>
                <td className="border p-2">
                  {candidate.first_name} {candidate.last_name}
                </td>
                <td className="border p-2">
                  {candidate.final_approval_status }
                </td>
                <td className="border p-2">
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      candidate.final_approval_status === 'รอการพิจารณา' ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white" 
                    }`}
                    disabled={candidate.final_approval_status === 'รอการพิจารณา'}
                    onClick={() => navigate(`/committee/final-detail/${candidate.candidate_id}`)}
                  >
                    <FaFileAlt className="inline-block" /> ดูผล
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center">
                ไม่มีผลการพิจารณา
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FinalResultApproval;
