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
    checkUserRole();
  }, [userEmail]);

  const checkUserRole = async () => {
    if (userRole != 'staff') {
      navigate('/login')
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
    }
  };


  const handleRowClick = (historyId) => {
    // ไปหน้า detail พร้อมส่ง historyId
    navigate(`/staff_detailCheckPayment/${historyId}`);
  };

  //FIXME - แก้สีตาราง

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">การตรวจสอบสลิป</div>

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">History ID</th>
                <th className="px-6 py-3">Member ID</th>
                <th className="px-6 py-3">สถานะการตรวจสอบ</th>
                <th className="px-6 py-3">เวลา</th>
              </tr>
            </thead>
            <tbody>
              {slips.map((slip, index) => (
                <tr
                  key={slip.history_id}
                  onClick={() => handleRowClick(slip.history_id)}
                  className="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-900"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{slip.history_id}</td>
                  <td className="px-6 py-4">{slip.member_id}</td>
                  <td className={`px-6 py-4 ${slip.slip_data?.success ? "text-green-600" : "text-red-600"
                    }`}>
                    {slip.slip_data?.success ? 'สลิปโอนเงินถูกต้อง' : slip.error_msg}
                  </td>
                  <td className="px-6 py-4">{slip.created_at}</td>
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
