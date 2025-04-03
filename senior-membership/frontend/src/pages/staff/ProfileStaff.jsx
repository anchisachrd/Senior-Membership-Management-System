import React, { useState, useEffect } from 'react'
import { verifyUser } from '../../api/verifyApi';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';


function ProfileStaff() {

    const [userEmail, setUserEmail] = useState('')
    const [userAccountId, setUserAccountId] = useState('')

    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetchUserProfile();
    }, [userEmail]);

    const fetchUserProfile = async () => {
        try {
            const data = await verifyUser();
            setUserEmail(data.email)
            setUserAccountId(data.accountId)

            if (data.role !== 'staff' && data.role !== 'committee') {
                navigate('/login');
            }

            const response = await fetch(`http://localhost:3000/api/employee/emp-detail-info/${data.role_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data2 = await response.json();
            setEmployee(data2)



        } catch (error) {
            console.error('Fetch Protected Data Error:', error);
            navigate('/login')
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const ChangePasswordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('กรุณากรอกรหัสผ่านเก่า').min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
        newPassword: Yup.string().required('กรุณากรอกรหัสผ่านใหม่').min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "รหัสผ่านไม่ตรงกัน")
            .required("กรุณากรอกยืนยันรหัสผ่าน"),
    });

    const handleChangePassword = async (values, { setErrors }) => {

        const data = {
            "accountId": values.accountId,
            "oldPassword": values.oldPassword,
            "newPassword": values.newPassword
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/change_password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
            }
            alert("เปลี่ยนรหัสผ่านของคุณเรียบร้อยแล้ว!");
            toggleModal();
        } catch (error) {
            console.error("Change Password Error:", error.message);
            setErrors({ apiError: error.message });
        }

    }

    const onChangePosition = (position) => {
        return position === 'staff' ? 'เจ้าหน้าที่' : 'กรรมการ';
    }

    const onChangeIsPay = (is_pay) => {
        return is_pay === true ? 'มีสิทธิ์ในการชำระเงิน' : 'ไม่มีสิทธิ์ในการชำระเงิน';
    }

    return (
        <div className='ibm-plex-sans-thai-medium'>
            <div class="p-12 sm:ml-64">
                <div class="text-2xl text-black mx-3 mt-5 mb-8 font-bold">โปรไฟล์</div>

                <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
                    <div class="p-8">
                        <div>
                            <div className="grid gap-6 mb-6 md:grid-cols-3">
                                <div>
                                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">
                                        ตำแหน่ง
                                    </label>
                                    <input
                                        value={onChangePosition(employee.position)}
                                        name="position"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 mb-6 md:grid-cols-3">
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                                        คำนำหน้า
                                    </label>
                                    <input
                                        value={employee.title}
                                        name="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                                        ชื่อจริง
                                    </label>
                                    <input
                                        value={employee.first_name}
                                        name="first_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                                        นามสกุล
                                    </label>
                                    <input
                                        value={employee.last_name}
                                        name="last_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <label htmlFor="national_id" className="block mb-2 text-sm font-medium text-gray-900">
                                        เลขบัตรประชาชน
                                    </label>
                                    <input
                                        value={employee.national_id}
                                        name="national_id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                                        เบอร์โทรศัพท์
                                    </label>
                                    <input
                                        value={employee.phone}
                                        name="phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        อีเมล
                                    </label>
                                    <input
                                        value={employee.email}
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                        readOnly

                                    />
                                </div>
                            </div>

                            {employee.position === 'committee' && (
                                <div>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

                                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                                        <div>
                                            <label htmlFor="is_pay" className="block mb-2 text-sm font-medium text-gray-900">
                                                สิทธิ์ในการชำระเงิน
                                            </label>
                                            <input
                                                value={onChangeIsPay(employee.is_pay)}
                                                name="is_pay"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                                readOnly

                                            />
                                        </div>
                                        {employee.is_pay && (
                                            <div>
                                                <label htmlFor="type_payment" className="block mb-2 text-sm font-medium text-gray-900">
                                                    ประเภทการชำระเงิน
                                                </label>
                                                <input
                                                    value={employee.type_payment}
                                                    name="type_payment"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                                    readOnly

                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>
                </div>


                <button
                    type="button"
                    onClick={toggleModal}
                    className="focus:outline-none text-white focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mb-7">
                    เปลี่ยนรหัสผ่าน
                </button>

                {/* modal เปลี่ยนรหัสผ่าน */}
                {isModalOpen && (
                    <div
                        id="popup-modal"
                        class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
                    >
                        <div class="relative p-1 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-100">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-4 md:p-5 text-center">
                                    <p class="mb-3 text-lg font-bold text-black mt-5">
                                        เปลี่ยนรหัสผ่าน
                                    </p>

                                    <p class="mb-5 text-sm font-normal text-black">
                                        กรุณากรอกรหัสผ่านเก่าและรหัสผ่านใหม่ที่ต้องการเปลี่ยน
                                    </p>


                                    <Formik
                                        initialValues={{
                                            accountId: userAccountId,
                                            oldPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        }}
                                        validationSchema={ChangePasswordSchema}
                                        onSubmit={handleChangePassword}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                <div>
                                                    <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-black">
                                                        รหัสผ่านเก่า
                                                    </label>
                                                    <Field
                                                        type="password"
                                                        name="oldPassword"
                                                        id="oldPassword"
                                                        className={`bg-light ${errors.oldPassword && touched.oldPassword ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                                                    />
                                                    <ErrorMessage name="oldPassword" component="div" className="text-red-600 text-xs mt-1" />
                                                </div>

                                                <div className="mt-5">
                                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-black">
                                                        รหัสผ่านใหม่
                                                    </label>
                                                    <Field
                                                        type="password"
                                                        name="newPassword"
                                                        id="newPassword"
                                                        className={`bg-light ${errors.newPassword && touched.newPassword ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                                                    />
                                                    <ErrorMessage name="newPassword" component="div" className="text-red-600 text-xs mt-1" />
                                                </div>

                                                <div className="mt-5">
                                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-black">
                                                        ยืนยันรหัสผ่านใหม่
                                                    </label>
                                                    <Field
                                                        type="password"
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        className={`bg-light ${errors.confirmPassword && touched.confirmPassword ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                                                    />
                                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs mt-1" />
                                                </div>

                                                {errors.apiError && (
                                                    <div className="text-red-500 text-sm mt-2 text-center">{errors.apiError}</div>
                                                )}

                                                <div className="flex justify-center space-x-2 mt-3">
                                                    <button type="submit" className="text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm">
                                                        ยืนยัน
                                                    </button>
                                                    <button type="button" onClick={toggleModal} className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2.5 text-sm">
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                )}





            </div>
        </div>
    )
}




export default ProfileStaff