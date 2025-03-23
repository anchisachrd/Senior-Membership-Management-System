import React, { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { verifyUser } from '../../api/verifyApi';

function DetailCheckPayment() {

  const navigate = useNavigate();

  // สำหรับเช็ค role
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

       if (data.role != 'staff' && data.role != 'member' ) {
        localStorage.removeItem("userToken");
        alert("คุณไม่สามารถเข้าสู่หน้านี้ได้")
        navigate('/login')
      }
 
     } catch (error) {
       console.error('Fetch Protected Data Error:', error);
     }
   };

  return (
    <div className='ibm-plex-sans-thai-medium'>
      <div class="p-12 sm:ml-64">

        <div class="text-xl text-black mx-3 mt-5 font-bold">รายละเอียดสลิปโอนเงิน</div>

        <div class="mb-8 overflow-hidden">
          <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
            <div class="p-12">

              <img src="slip.jpg" class="w-96 h-auto mx-auto rounded-lg mb-5" />

              <div class="flex justify-center items-center mb-2">
                <div class="inline-flex text-xl text-black font-base bg-lime-500 rounded p-2">
                  <b class="me-2">ผลการตรวจสอบ:</b> สลิปโอนเงินถูกต้อง
                </div>
              </div>



              <div class="text-lg text-black mx-3 mt-6 font-base"> <b>ชื่อผู้โอนเงิน:</b> นางสาวศรุตา จรูญกีรติโรจน์</div>
              <div class="text-lg text-black mx-3 mt-3 font-base"> <b>ธนาคารผู้โอนเงิน:</b> ธนาคารกสิกรไทย</div>
              <div class="text-lg text-black mx-3 mt-3 font-base"> <b>วันที่โอนเงิน:</b> 27-12-2568</div>
              <div class="text-lg text-black mx-3 mt-3 font-base"> <b>เวลาที่โอนเงิน:</b> 06:22 น.</div>
              <div class="text-lg text-black mx-3 mt-3 font-base"> <b>จำนวนเงิน:</b> 100 บาท</div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailCheckPayment