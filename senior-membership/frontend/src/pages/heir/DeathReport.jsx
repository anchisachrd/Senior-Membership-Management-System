import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../api/verifyApi';

function FormPage({ setStep }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = () => {
        if (isChecked) {
            alert('แบบฟอร์มเสร็จสิ้น!');
            setStep(2);
        }
    };

    return (
        <div>
            <div class="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
                ฟอร์มแจ้งเสียชีวิต
            </div>
            <div class="mb-8 overflow-hidden">
                <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
                    <div class="p-12">
                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="title_name_member"
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    คำนำหน้า
                                </label>
                                <select
                                    id="title_name_member"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                >
                                    <option selected>เลือกคำนำหน้า</option>
                                    <option value="mr">นาย</option>
                                    <option value="miss">นางสาว</option>
                                    <option value="mrs">นาง</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="first_name_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    ชื่อจริง
                                </label>
                                <input
                                    type="text"
                                    id="first_name_member"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    placeholder="กรอกชื่อของผู้สมัคร"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="last_name_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    นามสกุล
                                </label>
                                <input
                                    type="text"
                                    id="last_name_member"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    placeholder="กรอกนามสกุลของผู้สมัคร"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="id_number_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    เลขรหัสสมาชิก
                                </label>
                                <input
                                    type="text"
                                    id="id_number_member"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    placeholder="กรอกเลขบัตรประชาชน"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="birth_day_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    วัน/เดือน/ปี เกิด
                                </label>
                                <input
                                    id="birth_day_member"
                                    type="date"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    placeholder="เลือกวันเกิด"
                                />
                            </div>
                        </div>

                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>

                        <div>
                            <label
                                htmlFor="copy_house_heir"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                สำเนาใบมรณบัตรของผู้เสียชีวิต
                            </label>
                            <input
                                type="file"
                                id="copy_house_heir"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร"
                            />
                        </div>

                        <div class="mt-5">
                            <label
                                htmlFor="copy_id_heir"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                สำเนาทะเบียนบ้านของผู้เสียชีวิต ที่ประทับตราคำว่า "ตาย"
                            </label>
                            <input
                                type="file"
                                id="copy_id_heir"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                placeholder="กรอกหมายเลขโทรศัพท์ของผู้สมัคร"
                            />
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 overflow-hidden rounded-3xl shadow-sm mt-12 mx-14">
                    <div class="flex items-center p-4">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="default-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                        >
                            ข้าพเจ้ายินยอมในการให้ข้อมูลสำหรับการแจ้งเสียชีวิตในครั้งนี้
                        </label>
                    </div>
                </div>

                <div class="relative mt-14 flex justify-center items-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isChecked}
                        class={`focus:outline-none text-white font-medium rounded-lg text-base px-5 py-2.5 me-9 mb-2 disabled:cursor-not-allowed ${isChecked
                            ? 'bg-lime-800 hover:bg-lime-700'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        เสร็จสิ้น
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatusPage() {
    return (
        <div>
            <div class="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
                ท่านกรอกฟอร์มแจ้งเสียชีวิตเสร็จสิ้นแล้ว
            </div>

            <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
                <div class="p-6">
                    <div class="flex items-center">
                        <div class="text-base text-black font-bold me-2">สถานะของการแจ้งเสียชีวิต:</div>
                        <div class="text-base text-black">กำลังดำเนินการ</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

function DeathReport() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    // สำหรับเช็ค role
    const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        fetchUserProfile();
        checkUserRole();
    }, [userEmail]);

    const checkUserRole = async () => {
        if (userRole != 'heir') {
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

    return (
        <div class="p-12 sm:ml-64">
            {step === 1 && <FormPage setStep={setStep} />}
            {step === 2 && <StatusPage />}
        </div>
    );
}

export default DeathReport;
