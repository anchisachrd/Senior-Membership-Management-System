import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoNotificationsCircleOutline,
  IoPeopleOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { LuPiggyBank } from "react-icons/lu";
import { MdOutlineDashboard, MdLogout, MdOutlinePaid, MdOutlineFilePresent } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FaRegCircleCheck, FaUserTie } from "react-icons/fa6";
import { Link } from "react-router";
import { verifyUser } from "../api/verifyApi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GrContactInfo } from "react-icons/gr";


function SidebarStaff() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userThaiRole, setUserThaiRole] = useState("");
  const [userPaymentInfo, setUserPaymentInfo] = useState({
    is_pay: false,
    type_payment: "",
  });

  const [notiStaff, setNotiStaff] = useState({
    waiting_verification: '',
    waiting_list: '',
    waiting_staff: '',
    result_death: '',
    heir_wait_transfer: ''
  });

  const [notiCommittee, setNotiCommittee] = useState({
    waiting_approval: '',
    waiting_committee: ''
  });

  // Dropdown states (each dropdown has its own state)
  const [openExample, setOpenExample] = useState(false); // For "อนุมัติเอกสาร" (committee)
  const [openNotify, setOpenNotify] = useState(false); // For "การแจ้งเตือน" (staff)
  const [openCandidate, setOpenCandidate] = useState(false); // For "จัดการผู้สมัคร" (staff)

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserTitle(data.info.title);
      setUserFirstName(data.info.first_name);
      setUserLastName(data.info.last_name);


      if (data.role === "staff") {
        setUserThaiRole("เจ้าหน้าที่");
        fetchNotiStaff();
      }
      if (data.role === "committee") {
        setUserThaiRole("กรรมการ");
        setUserPaymentInfo({
          is_pay: data.info.is_pay,
          type_payment: data.info.type_payment,
        });
        fetchNotiCommittee();
      }

    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    console.log("Logged out!");
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/login");
    setUserRole("");
    setUserEmail("");
  };

  const fetchNotiStaff = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/noti/noti-staff", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setNotiStaff({
        waiting_verification: data.waiting_verification,
        waiting_list: data.waiting_list,
        waiting_staff: data.waiting_staff,
        result_death: data.result_death,
        heir_wait_transfer: data.heir_wait_transfer
      });


    } catch (error) {
      console.error("Fetch Data Error:", error);
    }
  };

  const fetchNotiCommittee = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/noti/noti-committee", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setNotiCommittee({
        waiting_approval: data.waiting_approval,
        waiting_committee: data.waiting_committee
      })
      


    } catch (error) {
      console.error("Fetch Data Error:", error);
    }
  };



  return (
    <div className="ibm-plex-sans-thai-medium">
      {/* Mobile Toggle Button */}
      <button
        // Removed data attributes used by Flowbite
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-100 flex flex-col">
          <a href="" className="flex items-center mb-3">
            <img src="logo.png" className="h-auto max-w-full" alt="Logo" />
          </a>

          <div className="flex justify-center items-center rounded-lg dark:text-gray-700 group mb-0">
            <span className="font-bold">สำหรับ {userThaiRole}</span>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium flex-grow mt-4">
            {/* === If user role is NOT staff (committee or something else) === */}
            {userRole !== "staff" ? (
              <div>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      Dashboard
                    </span>
                  </Link>
                </li>

                {/* === "อนุมัติเอกสาร" DROPDOWN === */}
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenExample(!openExample)}
                    className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <TiDocumentText className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 mt-1 text-left whitespace-nowrap dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white">
                      อนุมัติเอกสาร
                    </span>
                    {parseInt(notiCommittee.waiting_approval) + parseInt(notiCommittee.waiting_committee) !== 0 && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full me-5">
                        {parseInt(notiCommittee.waiting_committee) + parseInt(notiCommittee.waiting_approval)}
                      </span>
                    )}
                    <svg
                      className={`w-3 h-3 ml-auto transition-transform  text-gray-400${openExample ? "rotate-180" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* Toggle hidden/block based on state */}
                  <ul
                    className={`py-3 space-y-2 ${openExample ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link
                        to="/committee_candidateList"
                        className="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span className="ms-2 mt-1 dark:group-hover:text-white">
                          เอกสารการสมัคร
                        </span>
                        {notiCommittee.waiting_approval !== '0' && (
                          <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                            {notiCommittee.waiting_approval}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/committee/death-list"
                        className="flex items-center p-2 ml-11 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span className=" ms-2 mt-1 dark:group-hover:text-white">
                          เอกสารการเสียชีวิต
                        </span>
                        {notiCommittee.waiting_committee !== '0' && (
                          <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                            {notiCommittee.waiting_committee}
                          </span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/final-approval"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <IoDocumentTextOutline className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      สรุปผลการอนุมัติ
                    </span>
                  </Link>
                </li>

                {(userPaymentInfo.is_pay === true && userPaymentInfo.type_payment === "ค่าใช้จ่ายทั่วไปในชมรม") && (
                  <li>
                    <Link
                      to="/club-expense"
                      className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                    >
                      <MdOutlinePaid className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                      <span className="ms-3 mt-1 dark:group-hover:text-white">
                        แจ้งชำระค่าใช้จ่ายทั่วไป
                      </span>
                    </Link>
                  </li>
                )}


              </div>
            ) : (
              /* === If user role is STAFF === */
              <div>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/club-account"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <LuPiggyBank className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      บัญชีชมรม
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/staff_checkPayment"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <FaRegCircleCheck className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      การตรวจสอบสลิป
                    </span>
                  </Link>
                </li>

                {/* === "การแจ้งเตือน" DROPDOWN === */}
                <li>
                  <Link
                    to="/member-list/notify-death"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <MdOutlineFilePresent className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      แจ้งเสียชีวิต
                    </span>
                    {parseInt(notiStaff.waiting_staff) + parseInt(notiStaff.result_death) !== 0 && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-3">
                        {parseInt(notiStaff.waiting_staff) + parseInt(notiStaff.result_death)}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/death/member-list"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <GrContactInfo className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      ข้อมูลสมาชิกที่เสียชีวิต
                    </span>
                    {notiStaff.heir_wait_transfer !== '0' && (
                          <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {notiStaff.heir_wait_transfer}
                          </span>
                        )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/member-list"
                    className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                  >
                    <IoMdInformationCircleOutline className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 mt-1 dark:group-hover:text-white">
                      ข้อมูลสมาชิกปัจจุบัน
                    </span>
                  </Link>
                </li>

                {/* === "จัดการผู้สมัคร" DROPDOWN === */}
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenCandidate(!openCandidate)}
                    className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <IoPeopleOutline className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 mt-1 text-left whitespace-nowrap dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white">
                      จัดการผู้สมัคร
                    </span>
                    {parseInt(notiStaff.waiting_verification) + parseInt(notiStaff.waiting_list) !== 0 && (
                      <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full me-4">
                        {parseInt(notiStaff.waiting_verification) + parseInt(notiStaff.waiting_list)}
                      </span>
                    )}

                    <svg
                      className={`w-3 h-3 ml-auto transition-transform text-gray-400 ${openCandidate ? "rotate-180" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`py-3 space-y-2 ${openCandidate ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link
                        to="/staff_candidateList"
                        className="flex items-center ml-10 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span className="ms-3 mt-1 p-2 dark:group-hover:text-white">
                          ตรวจสอบข้อมูลสมัคร
                        </span>
                        {notiStaff.waiting_verification !== '0' && (
                          <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full me-2">
                            {notiStaff.waiting_verification}
                          </span>
                        )}

                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/staff_cadidateWaitingList"
                        className="flex items-center ml-10 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span className="ms-3 mt-1 p-2 dark:group-hover:text-white">
                          แถวคอยการสมัคร
                        </span>

                        {notiStaff.waiting_list !== '0' && (
                          <span className="bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full ms-1">
                          {notiStaff.waiting_list}
                        </span>
                        )}

                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/staff_candidateList"
                        className="flex items-center ml-10 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group"
                      >
                        <span className="ms-3 mt-1 p-2 dark:group-hover:text-white">
                          ไม่ผ่านการอนุมัติ
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
            )}
          </ul>

          {/* ปุ่มออกจากระบบ */}
          <div className="mt-auto">
            <div className="flex items-center px-3 py-2 rounded-lg dark:text-gray-600 group mb-1">
              <FaUserTie className="w-3 h-3 text-gray-600" />
              <span className="ms-3 mt-1">
                คุณ{userFirstName} {userLastName}
              </span>
            </div>

            <a
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg dark:text-gray-500 dark:hover:bg-gray-700 group cursor-pointer"
            >
              <MdLogout className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3 mt-1 dark:group-hover:text-white">
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
