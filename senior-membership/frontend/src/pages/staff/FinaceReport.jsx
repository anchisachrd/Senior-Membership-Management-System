import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { verifyUser } from '../../api/verifyApi';


function FinanceReport() {
  const [total, setTotal] = useState(0);
  const [passSlips, setPassSlips] = useState([]);

  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // 1) Fetch total sum of pass amounts
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/members/slip/summary');
        setTotal(res.data.total); // e.g. { total: 500 }
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
  
    useEffect(() => {
      fetchUserProfile();
    }, [userEmail]);
  
    
  
    const fetchUserProfile = async () => {
      try {
        const data = await verifyUser();
        setUserRole(data.role)
        setUserEmail(data.email)

        if (data.role != 'staff') {
          localStorage.removeItem("userToken");
          navigate('/login')
        }
  
      } catch (error) {
        console.error('Fetch Protected Data Error:', error);
      }
    };


    // 2) Fetch all pass slips
    const fetchPassedSlips = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/members/slip/passed');
        setPassSlips(res.data); // e.g. [ {...}, {...} ]
      } catch (error) {
        console.error('Error fetching pass slips:', error);
      }
    };

    fetchSummary();
    fetchPassedSlips();
  }, []);

  //FIXME - แก้สีตาราง + แก้วันที่ + เอาง่วงอีเวนออก
  //TODO - add filter
  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="text-xl text-black mx-3 mt-5 mb-8 font-bold">การตรวจสอบสลิป</div>

        <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4 mb-4">
        <p className="text-xl font-medium">
          ยอดเงินปัจจุบันของชมรม (ง่วงอีเวน) :  {total} บาท
        </p>
      </div> 

        <div className="relative overflow-hidden shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Member Id</th>
                <th className="px-6 py-3">Death Id</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
            {passSlips.map((slip, index) => (
                <tr
                key={slip.id}
                  className="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-900"
                >
                  <td className="px-6 py-4">{index +1}</td>
                  <td className="px-6 py-4">{slip.member_id}</td>
                  <td className="px-6 py-4">{slip.death_id}</td>
                  <td className="px-6 py-4">{slip.amount}</td>
                  <td className="px-6 py-4 text-green-600">{slip.created_at}</td>
  
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FinanceReport