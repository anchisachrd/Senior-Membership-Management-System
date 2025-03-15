import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../api/verifyApi';

function History() {

  const navigate = useNavigate();
  
  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

 

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      console.log(data)
      setUserRole(data.role)
      setUserEmail(data.email)
      
      if (data.role !== 'member') {
        navigate('/login')
    }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
    }
  };


  const handleRowClick = () => {
    navigate('/committee_candidateProfile');
  }

  const handlePayClick = () => {
    navigate('/submitPayment');
  }

  return (
    <div className='ibm-plex-sans-thai-medium'>
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">ประวัติการชำระเงิน</div>

        <div class="relative overflow-hidden shadow-xl sm:rounded-lg ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
              <tr>
                <th scope="col" class="px-6 py-3">
                  วัน/เดือน/ปี
                </th>
                <th scope="col" class="px-6 py-3">
                  ศพที่/เลขที่
                </th>
                <th scope="col" class="px-6 py-3">
                  รายชื่อผู้เสียชีวิต
                </th>
                <th scope="col" class="px-6 py-3">
                  เงินบำรุงรักษาศพ
                </th>
                <th scope="col" class="px-6 py-3">
                  สถานะการชำระเงิน
                </th>

              </tr>
            </thead>

            <tbody>
              <tr onClick={handleRowClick} class="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-900">
                <th scope="row" class="px-8 py-4 font-medium">
                  27/01/2568
                </th>
                <td class="px-6 py-4">
                  1/0234
                </td>
                <td class="px-6 py-4">
                  ศรุตา จรูญกีรติโรจน์
                </td>
                <td class="px-6 py-4">
                  100
                </td>
                <td class="px-6 py-4">
                  ชำระสำเร็จ
                </td>

              </tr>

              <tr class="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-900">
                <th scope="row" class="px-8 py-4 font-medium">
                  15/02/2568
                </th>
                <td class="px-6 py-4">
                  2/0999
                </td>
                <td class="px-6 py-4">
                  พอยเบ ง่วงนอนงับ
                </td>
                <td class="px-6 py-4">
                  100
                </td>
                <td class="px-6 py-4">
                  <button onClick={handlePayClick} class="bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 border border-gray-400 rounded-lg shadow">
                    กดปุ่มเพื่อชำระเงิน
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default History