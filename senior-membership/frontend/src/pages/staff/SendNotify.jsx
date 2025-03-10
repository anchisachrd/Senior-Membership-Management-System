import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { verifyUser } from '../../api/verifyApi';

function SendNotify() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };




    return (
        <div class="p-12 sm:ml-64">

            <div>
                <div class="relative mt-12 flex justify-center items-center text-3xl text-black font-bold">
                    การส่งแจ้งเตือน
                </div>
                <div class="mb-8 overflow-hidden">
                    <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
                        <div class="p-12">

                            <div class="grid gap-6 mb-6 md:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="type"
                                        class="block mb-2 text-l font-semibold text-gray-900"
                                    >
                                        ประเภทการแจ้งเตือน
                                    </label>
                                    <select
                                        id="type"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                    >
                                        <option selected>เลือกประเภทของการแจ้งเตือน</option>
                                        <option value="info">ข้อมูลข่าวสาร</option>
                                        <option value="donate">เรียกเก็บเงิน</option>
                                    </select>
                                </div>
                            </div>


                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="topic" class="block mb-2 text-l font-semibold text-gray-900 ">หัวข้อการแจ้งเตือน</label>
                                    <input type="text" id="topic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกหัวข้อของการแจ้งเตือน" />
                                </div>
                            </div>

                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="description" class="block mb-2 text-l font-semibold text-gray-900 ">คำอธิบายการแจ้งเตือน</label>
                                    <textarea rows='3' type="text" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5" placeholder="กรอกคำอธิบายของการแจ้งเตือน" />
                                </div>
                            </div>

                            <div class="grid gap-6 mb-6 md:grid-cols-3">
                                <div>
                                    <label htmlFor="target" class="block mb-2 text-l font-semibold text-gray-900"> คนที่ต้องการแจ้งเตือน </label>

                                    <div>
                                        <button
                                            id="dropdownSearchButton"
                                            onClick={toggleDropdown}
                                            className="inline-flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                            type="button"
                                        >
                                            เลือกคนที่ต้องการแจ้งเตือน
                                            <svg
                                                className="w-2.5 h-2.5 ms-auto my-auto"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
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

                                        {isDropdownOpen && (
                                            <div
                                                id="dropdownSearch"
                                                className="z-10 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-300">

                                                <ul className="h-48 px-3 py-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                                    <li>
                                                        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-400">
                                                            <input
                                                                id="checkbox-item-11"
                                                                type="checkbox"
                                                                value="member"
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-700 dark:focus:ring-offset-gray-300 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label htmlFor="checkbox-item-11" className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-900">
                                                                สมาชิก
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-400">
                                                            <input
                                                                id="checkbox-item-11"
                                                                type="checkbox"
                                                                value="comittee"
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-700 dark:focus:ring-offset-gray-300 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label htmlFor="checkbox-item-11" className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-900">
                                                                กรรมการ
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-400">
                                                            <input
                                                                id="checkbox-item-11"
                                                                type="checkbox"
                                                                value="staff"
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-700 dark:focus:ring-offset-gray-300 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label htmlFor="checkbox-item-11" className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-900">
                                                                เจ้าหน้าที่
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-400">
                                                            <input
                                                                id="checkbox-item-11"
                                                                type="checkbox"
                                                                value="heir"
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-700 dark:focus:ring-offset-gray-300 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            <label htmlFor="checkbox-item-11" className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-900">
                                                                ทายาท
                                                            </label>
                                                        </div>
                                                    </li>



                                                </ul>
                                            </div>
                                        )}
                                    </div>





                                </div>
                            </div>





                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SendNotify