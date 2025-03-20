import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveMembers } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";
import MemberTable from "../../components/MemberTable";

function MemberList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");


  useEffect(() => {
    fetchUserProfile();

  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)

      if (data.role != "committee") {
        navigate("/login");
      }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
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


  return <MemberTable members={members} title="รายชื่อสมาชิกปัจจุบัน"  handleRowClick={handleRowClick} notFoundText="ไม่พบรายชื่อสมาชิก"/>;
}
    

export default MemberList;
