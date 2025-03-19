import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifyDeathMembers } from "../../api/memberApi";
import { verifyUser } from "../../api/verifyApi";
import MemberTable from "../../components/MemberTable";



function NotifyDeathList() {
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
  
      } catch (error) {
        console.error('Fetch Protected Data Error:', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getNotifyDeathMembers();
          console.log("Fetched Members:", data);
          setMembers(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.error("Error loading members:", error);
          setMembers([]);
        }
      };
      fetchData();
    }, [userRole]);
  
    const handleRowClick = (memberId) => {
      navigate(`/memberProfile/${memberId}`);
    };
  
    return <MemberTable members={members} title="การตรวจสอบข้อมูลการแจ้งเสียชีวิต"  handleRowClick={handleRowClick} notFoundText="ไม่มีการแจ้งเสียชีวิต"/>;
  
}

export default NotifyDeathList