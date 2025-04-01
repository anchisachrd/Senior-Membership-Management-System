import React, { useState, useEffect, } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";


function ManageEmployee() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState("");
    const [userEmail, setUserEmail] = useState('')
       
    
        useEffect(() => {
            fetchUserProfile();
        }, [userEmail]);
    
        const fetchUserProfile = async () => {
            try {
                const data = await verifyUser();
                setUserRole(data.role)
                setUserEmail(data.email)

                if (data.role !== 'admin') {
                    navigate('/login');
                  }
                
    
            } catch (error) {
                console.error('Fetch Protected Data Error:', error);
                navigate('/login');
            }
        };
   


    const handleRowClick = (employeeId) => {
        navigate(`/employee-detail/${employeeId}`);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/employee/emp-all-info`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error:", error);
                setEmployees([]);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <div class="ibm-plex-sans-thai-medium">
            <div class="p-12 sm:ml-64">
                <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">จัดการพนักงาน</div>
                {/* search */}
                <div class="mb-8 overflow-hidden">
                    <div class="grid gap-6 md:grid-cols-1">
                        <form class="max-w-3xl">
                            <label
                                for="default-search"
                                class="mb-2 text-sm font-medium text-gray-200 sr-only dark:text-white">
                                ค้นหา
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    placeholder=""
                                    required
                                />
                                <button
                                    type="submit"
                                    class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    ค้นหา
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <button
                    type="button"
                    class="focus:outline-none text-white focus:ring-gray-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mb-7">
                    <Link to='/add-employee'>เพิ่มพนักงาน</Link>
                </button>


                <div class="relative overflow-hidden shadow-xl sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-base text-gray-300 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-900">
                            <tr>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    No.
                                </th>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    รหัสพนักงาน
                                </th>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    ชื่อพนักงาน
                                </th>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    ตำแหน่ง
                                </th>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    เบอร์โทรศัพท์
                                </th>
                                <th scope="col" class="text-center align-middle py-4 px-4">
                                    อีเมล
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee, index) => (
                                    <tr
                                        key={employee.employee_id}
                                        onClick={() => handleRowClick(employee.employee_id)}
                                        class="cursor-pointer bg-white border-b hover:bg-gray-50 text-gray-900">
                                        <th
                                            scope="row"
                                            class="text-center align-middle py-3 px-4 font-medium">
                                            {index + 1}
                                        </th>
                                        <td class="text-center align-middle py-4 px-4">
                                            {employee.employee_id}
                                        </td>
                                        <td class="text-center align-middle py-4 px-4">
                                            {employee.first_name} {employee.last_name}
                                        </td>
                                        <td class="text-center align-middle py-4 px-4">
                                            {employee.position === 'staff' ? (
                                                <div>เจ้าหน้าที่</div>
                                            ) : (
                                                <div>กรรมการ</div>
                                            )}
                                        </td>
                                        <td class="text-center align-middle py-4 px-4">
                                            {employee.phone}
                                        </td>
                                        <td class="text-center align-middle py-4 px-4">
                                            {employee.email}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" class="text-center align-middle py-4">
                                        ไม่พบรายชื่อพนักงาน
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageEmployee