import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { verifyUser } from '../../api/verifyApi';



function HomeStaff() {
  return (
    <div class='mx-3'>
      Home Staff
    </div>
  )
}

function HomeCommittee() {
  return (
    <div class='mx-3'>
      Home Committee
    </div>
  )
}


function HomeForStaff() {

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')

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

  return (

    <div className='ibm-plex-sans-thai-medium'>
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">หน้าแรก</div>

        {userRole === 'staff' && <HomeStaff />}
        {userRole === 'committee' && <HomeCommittee />}

      </div>
    </div>
  )
}

export default HomeForStaff