// CheckPayment.jsx (โค้ดสั้น ๆ)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSlipHistory } from '../../api/memberApi'
import { verifyUser } from '../../api/verifyApi';


function CheckPayment() {
  const navigate = useNavigate();
  const [slips, setSlips] = useState([]);

  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // เรียก API มาดึงรายการ slip ทั้งหมด
    const fetchSlips = async () => {
      try {
        const data = await getAllSlipHistory();
        setSlips(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSlips();

  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  
  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)

      if (data.role != 'staff') {
        navigate('/login')
      }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
    }
  };


  const handleRowClick = (historyId) => {
    // ไปหน้า detail พร้อมส่ง historyId
    navigate(`/staff_detailCheckPayment/${historyId}`);
  };

  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob = dobFromData.getDate().toString().padStart(2, "0") + "-" +(dobFromData.getMonth() + 1).toString().padStart(2, "0") + "-" + (dobFromData.getFullYear() + 543)
    return filterDob;
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">การตรวจสอบสลิป</div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">วันที่/เวลา</th>
                <th className="px-6 py-3">ชื่อสมาชิก</th>
                <th className="px-6 py-3">ชื่อผู้เสียชีวิต</th>
                <th className="px-6 py-3">จำนวนเงิน</th>
                <th className="px-6 py-3">สถานะการตรวจสอบสลิป</th>
              </tr>
            </thead>
            <tbody>
              {slips.map((slip, index) => (
                <tr
                  key={slip.history_id}
                  onClick={() => handleRowClick(slip.history_id)}
                  className="bg-white border-b hover:bg-gray-50 text-gray-900 cursor-pointer"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4"> {onChangeDate(slip.updated_at)}</td>
                  <td className="px-6 py-4">{slip.member_name}</td>
                  <td className="px-6 py-4">{slip.death_name}</td>
                  <td className="px-6 py-4">{slip.amount}</td>
                  <td className={`px-6 py-4 ${slip.slip_data?.success ? "text-green-600" : "text-red-600"
                    }`}>
                    {slip.slip_data?.success ? 'สลิปโอนเงินถูกต้อง' : slip.error_msg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckPayment;
