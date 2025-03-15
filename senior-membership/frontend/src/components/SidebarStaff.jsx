import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoNotificationsCircleOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { LuPiggyBank, LuUserRoundCog } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";

function SidebarStaff() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/login");
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-100 flex flex-col">
          <a href="" class="flex items-center mb-5">
            <img src="public/logo.png" class="h-auto max-w-full" alt="Logo" />
          </a>

          {/* Sidebar Menu */}
          <ul class="space-y-2 font-medium flex-grow">
            {userRole !== "staff" ? (
              <div>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineDashboard
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      Dashboard
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <IoNotificationsOutline
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      แจ้งเตือน
                    </span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    class="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <TiDocumentText
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="flex-1 ms-3 mt-1 text-left rtl:text-right whitespace-nowrap dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white">
                      อนุมัติเอกสาร
                    </span>
                    <svg
                      class="w-3 h-3 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul id="dropdown-example" class="hidden py-3 space-y-2">
                    <li>
                      <Link
                        to="/committee_candidateList"
                        class="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span class="ms-3 mt-1 dark:group-hover:text-white">
                          เอกสารการสมัคร
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span class="ms-3 mt-1 dark:group-hover:text-white">
                          เอกสารการเสียชีวิต
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <TiDocumentText
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      สรุปผลการอนุมัติ
                    </span>
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineDashboard
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      Dashboard
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/finance-report"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <LuPiggyBank
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      บัญชีชมรม
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff_sendNotify"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <IoNotificationsCircleOutline
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      การส่งแจ้งเตือน
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff_checkPayment"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <FaRegCircleCheck
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      การตรวจสอบสลิป
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    class="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <IoPeopleOutline
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="flex-1 ms-3 mt-1 text-left rtl:text-right whitespace-nowrap dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white">
                      จัดการบุคคล
                    </span>
                    <svg
                      class="w-3 h-3 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul id="dropdown-example" class="hidden py-3 space-y-2">
                    <li>
                      <Link
                        to="/staff_candidateList"
                        class="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span class="ms-3 mt-1 dark:group-hover:text-white">
                          จัดการผู้สมัคร
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span class="ms-3 mt-1 dark:group-hover:text-white">
                          จัดการสมาชิก
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span class="ms-3 mt-1 dark:group-hover:text-white">
                          จัดการทายาท
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <IoDocumentTextOutline
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span class="ms-3 mt-1 dark:group-hover:text-white">
                      การแจ้งเสียชีวิต
                    </span>
                  </a>
                </li>
              </div>
            )}
          </ul>

          {/* ปุ่มออกจากระบบ */}
          <div class="mt-auto">
            <a
              onClick={handleLogout}
              class="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
            >
              <MdLogout class="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ms-3 mt-1 dark:group-hover:text-white">
                ออกจากระบบ
              </span>
            </a>
          </div>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default SidebarStaff;
