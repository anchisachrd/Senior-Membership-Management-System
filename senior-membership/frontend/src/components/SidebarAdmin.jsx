import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { FaUsersCog, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";
import { verifyUser } from "../api/verifyApi";

function SidebarAdmin() {
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState("");
    const [userEmail, setUserEmail] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')

    useEffect(() => {
        fetchUserProfile();
    }, [userEmail]);

    const fetchUserProfile = async () => {
        try {
            const data = await verifyUser();
            setUserRole(data.role)
            setUserEmail(data.email)
            setUserFirstName(data.info.first_name)
            setUserLastName(data.info.last_name)

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
                            class="h-auto max-w-full" alt="Logo2" />
                    </a>

                    <div class="flex justify-center items-center rounded-lg dark:text-gray-700 group mb-0">
                        <span class="font-bold">สำหรับ ผู้ดูแลระบบ</span>
                    </div>

                    {/* Sidebar Menu */}
                    <ul class="space-y-2 font-medium flex-grow mt-4">
                        <div>
                            <li>
                                <Link to='/manage-employee' className={`flex items-center p-3 rounded-lg group bg-gray-700 text-white`}>
                                    <FaUsersCog class="w-5 h-5 text-white" />
                                    <span class="ms-3 mt-1 dark:group-hover:text-white">จัดการพนักงาน</span>
                                </Link>
                            </li>
                        </div>
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

export default SidebarAdmin