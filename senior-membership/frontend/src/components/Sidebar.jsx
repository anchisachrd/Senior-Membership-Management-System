import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { IoNotificationsOutline, IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
// import { FaHouseUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaUserPlus, FaUser, FaHouseUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";
import { verifyUser } from "../api/verifyApi";

function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  const [userRole, setUserRole] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userTitle, setUserTitle] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userThaiRole, setUserThaiRole] = useState('')
  const [heirId, setHeirId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [notiHeir, setNotiHeir] = useState({
    rejected_death: '',
    approved_death: ''
  });

  const [notiMember, setNotiMember] = useState({
    unpaid: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);


  useEffect(() => {
    if (userRole === "member" && memberId) {
      fetchNotiMember(memberId);
    } else if (userRole === "heir" && heirId) {
      fetchNotiHeir(heirId);
    }
  }, [userRole, memberId, heirId, notiMember, notiHeir]);


  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)
      setUserTitle(data.info.title)
      setUserFirstName(data.info.first_name)
      setUserLastName(data.info.last_name)

      if (data.role === 'member') {
        setUserThaiRole('สมาชิก');
        setMemberId(data.role_id);
  
      }
      if (data.role === 'heir') {
        setUserThaiRole('ทายาท');
        setHeirId(data.role_id);
      
      }

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    console.log("Logged out!");
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/login");
    setUserRole('');
    setUserEmail('');
  }

  const fetchNotiHeir = async (heir_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/noti/noti-heir?heir_id=${heir_id}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setNotiHeir({
        rejected_death: data.rejected_death,
        approved_death: data.approved_death
      });


    } catch (error) {
      console.error("Fetch Data Error:", error);
    }
  }

  const fetchNotiMember = async (member_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/noti/noti-member?member_id=${member_id}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data)
      setNotiMember({
        unpaid: data.unpaid
      });


    } catch (error) {
      console.error("Fetch Data Error:", error);
    }
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };


  return (

    <div className='ibm-plex-sans-thai-medium'>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-100 flex flex-col">
          <a href="" class="flex items-center mb-3">
            <img src="logo.png"
              class="h-auto max-w-full" alt="Logo" />
          </a>

          <div class="flex justify-center items-center rounded-lg dark:text-gray-700 group mb-0">
            <span class="font-bold">สำหรับ {userThaiRole}</span>
          </div>

          {/* Sidebar Menu */}
          <ul class="space-y-2 font-medium flex-grow mt-4">
            {userRole !== 'heir' ? (
              <div>
                <li>
                  <Link to='/report-summary' onClick={() => handleMenuClick("สรุปการเงินชมรม")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "สรุปการเงินชมรม"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <IoDocumentTextOutline className={`w-5 h-5 ${activeMenu === "สรุปการเงินชมรม"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">สรุปการเงินชมรม</span>
                  </Link>
                </li>
                <li>
                  <Link to='/history' onClick={() => handleMenuClick("ประวัติการชำระเงิน")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "ประวัติการชำระเงิน"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <AiOutlineHistory className={`w-5 h-5 ${activeMenu === "ประวัติการชำระเงิน"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">ประวัติการชำระเงิน</span>
                    {notiMember.unpaid !== '0' && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                        {notiMember.unpaid}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to='/profile' onClick={() => handleMenuClick("โปรไฟล์")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "โปรไฟล์"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <FaHouseUser  className={`w-5 h-5 ${activeMenu === "โปรไฟล์"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}/>
                    <span class="ms-3 mt-1 dark:group-hover:text-white">โปรไฟล์</span>
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to='/deathReport' onClick={() => handleMenuClick("ฟอร์มแจ้งเสียชีวิต")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "ฟอร์มแจ้งเสียชีวิต"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <IoDocumentTextOutline className={`w-5 h-5 ${activeMenu === "ฟอร์มแจ้งเสียชีวิต"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">ฟอร์มแจ้งเสียชีวิต</span>
                    {notiHeir.rejected_death !== '0' && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                        {notiHeir.rejected_death}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to='/request-form' onClick={() => handleMenuClick("ฟอร์มคำร้อง")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "ฟอร์มคำร้อง"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <TiDocumentText className={`w-5 h-5 ${activeMenu === "ฟอร์มคำร้อง"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">ฟอร์มคำร้อง</span>
                    {notiHeir.approved_death !== '0' && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                        {notiHeir.approved_death}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to='/heir_register' onClick={() => handleMenuClick("สมัครสมาชิก")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "สมัครสมาชิก"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <FaUserPlus className={`w-5 h-5 ${activeMenu === "สมัครสมาชิก"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">สมัครสมาชิก</span>
                  </Link>
                </li>
                <li>
                  <Link to='/profile' onClick={() => handleMenuClick("โปรไฟล์")} className={`flex items-center p-3 rounded-lg group 
                  ${activeMenu === "โปรไฟล์"
                    ? "bg-gray-700 text-white" // เมนูที่ถูกคลิกจะมีสีเข้มขึ้น
                    : "dark:text-gray-500 dark:hover:bg-gray-700"
                    }`}>
                    <FaHouseUser className={`w-5 h-5 ${activeMenu === "โปรไฟล์"
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`} />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">โปรไฟล์</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>

          {/* ปุ่มออกจากระบบ */}
          <div class="mt-auto">
            <div class="flex items-center px-3 py-2 rounded-lg dark:text-gray-600 group mb-1">
              <FaUser class="w-3 h-3 text-gray-600 " />
              <span class="ms-3 mt-1">คุณ{userFirstName} {userLastName}</span>
            </div>
            <a onClick={handleLogout} class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
              <MdLogout class="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ms-3 mt-1 dark:group-hover:text-white">ออกจากระบบ</span>
            </a>
          </div>
        </div>
      </aside>
      <Outlet />
    </div>

  )
}

export default Sidebar