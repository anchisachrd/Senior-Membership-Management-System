import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveMembers } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";
import StatusBadge from "../../components/StatusBadge"


function MemberList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

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

  useEffect(() => {
    fetchUserProfile();

  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)

      if (data.role !== "staff") {
        navigate("/login");
      }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveMembers();
        console.log("Fetched Members:", data);
        setMembers(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error loading members:", error);
        setMembers([]);
      }
    };
    fetchData();
  }, [userRole]);

  // MemberList.js
  const handleRowClick = (memberId) => {
    navigate(`/member/${memberId}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.member_id.toString().includes(searchTerm);

    const matchesCategory =
      categoryFilter === "" || member.member_status === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">รายชื่อสมาชิกปัจจุบัน</div>

        <div class="mb-8 overflow-hidden">
          <div class="grid gap-6 md:grid-cols-3">
            <form className="col-span-2 w-full" onSubmit={(e) => e.preventDefault()}>
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

            {/* Category Filter (2 ส่วน) */}
            <select
              className="col-span-1 w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">สถานะสมาชิกทั้งหมด</option>
              <option value="ใช้งานอยู่">ใช้งานอยู่</option>
              <option value="เสียชีวิต">เสียชีวิต</option>
            </select>
          </div>
        </div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="text-center align-middle py-4 px-4">No.</th>
                <th className="text-center align-middle py-4 px-4">รหัสสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">ชื่อสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">เลขบัตรประชาชน</th>
                <th className="text-center align-middle py-4 px-4">เบอร์โทรศัพท์</th>
                <th className="text-center align-middle py-4 px-4">วันที่เริ่มเป็นสมาชิก</th>
                <th className="text-center align-middle py-4 px-4">สถานะสมาชิก</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr
                    key={member.member_id}
                    className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                    onClick={() => handleRowClick(member.member_id)}
                  >
                    <td className="text-center py-4 px-4 font-medium">{index + 1}</td>
                    <td className="text-center py-4 px-4">{member.member_id}</td>
                    <td className="text-center py-4 px-4">
                      {member.title} {member.first_name} {member.last_name}
                    </td>
                    <td className="text-center py-4 px-4">{member.national_id}</td>
                    <td className="text-center py-4 px-4">{member.phone}</td>
                    <td className="text-center py-4 px-4">{onChangeDate(member.start_date)}</td>
                    <td className="text-center">
                      <StatusBadge status={member.member_status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">ไม่พบรายชื่อสมาชิก</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


}


export default MemberList;
