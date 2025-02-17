import React from 'react'
import { Outlet } from 'react-router-dom';
import { IoNotificationsOutline, IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router";

function Sidebar() {
  // const role = 'member';
  const role = 'heir';
  return (

    <div className='ibm-plex-sans-thai-medium'>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-100">
          <a href="" class="flex items-center mb-5">
            <img src="logo.png"
              class="h-auto max-w-full" alt="Logo" />
          </a>
          {/* side bar สมาชิก */}
          {role !== 'heir' ? (
            <ul class="space-y-2 font-medium">
            <li>
              <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                <IoHomeOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                <span class="ms-3 mt-1 dark:group-hover:text-white">หน้าแรก</span>
              </a>
            </li>

            <li>
              <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                <IoDocumentTextOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                <span class="ms-3 mt-1 dark:group-hover:text-white">ข้อมูลข่าวสาร</span>
              </a>
            </li>

            <li>
              <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                <AiOutlineHistory class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                <span class="ms-3 mt-1 dark:group-hover:text-white">ประวัติการชำระเงิน</span>
              </a>
            </li>

            <li>
              <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                <FaRegUser class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                <span class="ms-3 mt-1 dark:group-hover:text-white">โปรไฟล์</span>
              </a>
            </li>

          </ul>
          ) : (
            // side bar ทายาท
            <ul class="space-y-2 font-medium">
              <li>
                <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                  <IoNotificationsOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                  <span class="ms-3 mt-1 dark:group-hover:text-white">แจ้งเตือน</span>
                </a>
              </li>

              <li>
                <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                  <IoDocumentTextOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                  <span class="ms-3 mt-1 dark:group-hover:text-white">ฟอร์มแจ้งเสียชีวิต</span>
                </a>
              </li>

              <li>
                <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                  <TiDocumentText class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                  <span class="ms-3 mt-1 dark:group-hover:text-white">ฟอร์มคำร้อง</span>
                </a>
              </li>

              <li>
                <a href="#" class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group">
                  <FaUserPlus class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                  <span class="ms-3 mt-1 dark:group-hover:text-white">สมัครสมาชิก</span>
                </a>
              </li>



            </ul>
          )}
        </div>
      </aside>
      <Outlet />
    </div>

  )
}

export default Sidebar