import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCommitteePendingDeathApprovals } from "../../api/deathApi";
import { verifyUser } from "../../api/verifyApi";
import StatusBadge from "../../components/StatusBadge"
import MemberTable from "../../components/MemberTable";

function CommitteDeathList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userRoleId, setUserRoleId] = useState('')


  useEffect(() => {
    fetchUserProfile();

  }, [userEmail]);

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
    const fetchData = async () => {
      try {
        const data = await getCommitteePendingDeathApprovals(userRoleId);
        console.log("Fetched Members:", data);
        setMembers(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error loading members:", error);
        setMembers([]);
      }
    };
    fetchData();
  }, [userRoleId]);

  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob = dobFromData.getDate().toString().padStart(2, "0") + "-" +(dobFromData.getMonth() + 1).toString().padStart(2, "0") + "-" + (dobFromData.getFullYear() + 543)
    return filterDob;
  };

 // MemberList.js
const handleRowClick = (memberId) => {
  navigate(`/member/${memberId}`);
};
 return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">อนุมัติการแจ้งเสียชีวิต</div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="text-center align-middle py-4 px-4">No.</th>
                <th className="text-center align-middle py-4 px-4">รหัสสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">ชื่อสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">วันที่เสียชีวิต</th>
                <th className="text-center align-middle py-4 px-4">สถานะสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">สถานะอนุมัติเอกสารของฉัน</th>
              </tr>
            </thead>

            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr
                    key={member.member_id}
                    className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                    onClick={() => handleRowClick(member.member_id)}
                  >
                    <td className="text-center py-4 px-4 font-medium">{index + 1}</td>
                    <td className="text-center py-4 px-4">{member.member_id}</td>
                    <td className="text-center py-4 px-4">
                       {member.member_name}
                    </td>
                    <td className="text-center py-4 px-4">{onChangeDate(member.death_date)}</td>
                    <td className="text-center py-4 px-4"><StatusBadge status={member.member_status} /></td>
                    <td className="text-center">
                      <StatusBadge status={member.committee_status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">ไม่มีการแจ้งเสียชีวิต</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


}
    

export default CommitteDeathList;
