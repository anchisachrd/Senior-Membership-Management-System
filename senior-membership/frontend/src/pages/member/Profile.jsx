import React, { useState, useEffect } from 'react'
import { verifyUser } from '../../api/verifyApi';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';


function Profile() {

    const [userEmail, setUserEmail] = useState('')
    const [userAccountId, setUserAccountId] = useState('')

    const [address, setAddress] = useState({
        house_number: "",
        moo: "",
        soi: "",
        street: "",
        province: "",
        district: "",
        subdistrict: "",
        postal_code: "",
    });
    const [info, setInfo] = useState({
        title: "",
        first_name: "",
        last_name: "",
        national_id: "",
        dob: "",
        phone: "",
        gender: "",
        occupation: ""
    });

    useEffect(() => {
        fetchUserProfile();
    }, [userEmail]);

    const fetchUserProfile = async () => {
        try {
            const data = await verifyUser();
            setUserEmail(data.email)
            setUserAccountId(data.accountId)

            if (data.role !== 'member' && data.role !== 'heir') {
                navigate('/login');
              }

            if (data.role === "member") {
                const response = await fetch(`http://localhost:3000/api/auth/get_address?memberId=${data.role_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่");
                }
    
                const data2 = await response.json();
                // console.log(data2)
                setAddress({
                    house_number: data2.house_number,
                    moo: data2.moo,
                    soi: data2.soi,
                    street: data2.street,
                    province: data2.province,
                    district: data2.district,
                    subdistrict: data2.subdistrict,
                    postal_code: data2.postal_code,
                });
    
                const response2 = await fetch(`http://localhost:3000/api/auth/get_info?memberId=${data.role_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (!response2.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว");
                }
    
                const data3 = await response2.json();
                console.log(data3)
                setInfo({
                    title: data3.title,
                    first_name: data3.first_name,
                    last_name: data3.last_name,
                    national_id: data3.national_id,
                    dob: data3.dob,
                    phone: data3.phone,
                    gender: data3.gender,
                    occupation: data3.occupation
                });
            }

            if (data.role === "heir") {
                const response = await fetch(`http://localhost:3000/api/auth/get_address_heir?heirId=${data.role_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่");
                }
    
                const data2 = await response.json();
                // console.log(data2)
                setAddress({
                    house_number: data2.house_number,
                    moo: data2.moo,
                    soi: data2.soi,
                    street: data2.street,
                    province: data2.province,
                    district: data2.district,
                    subdistrict: data2.subdistrict,
                    postal_code: data2.postal_code,
                });
    
                const response2 = await fetch(`http://localhost:3000/api/auth/get_info_heir?heirId=${data.role_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (!response2.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว");
                }
    
                const data3 = await response2.json();
                console.log(data3)
                setInfo({
                    title: data3.title,
                    first_name: data3.first_name,
                    last_name: data3.last_name,
                    national_id: data3.national_id,
                    dob: data3.dob,
                    phone: data3.phone,
                    gender: data3.gender,
                    occupation: data3.occupation
                });
            }

        } catch (error) {
            console.error('Fetch Protected Data Error:', error);
            navigate('/login');
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

    const onChangeDate = (data_date) => {
        const dobFromData = new Date(data_date);
        const filterDob = dobFromData.getDate().toString().padStart(2, "0") + "-" +(dobFromData.getMonth() + 1).toString().padStart(2, "0") + "-" + (dobFromData.getFullYear() + 543)
        return filterDob;
      };
    
      const onChangeGender = (data_gender) => {
        var filterGender = "";
    
        if (data_gender === "F") {
          filterGender = "หญิง";
        } else {
          filterGender = "ชาย";
        }
        return filterGender;
      };

    return (
        <div className='ibm-plex-sans-thai-medium'>
            <div class="p-12 sm:ml-64">
                <div class="text-2xl text-black mx-3 mt-5 mb-8 font-bold">โปรไฟล์ </div>

                <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
                    <div class="p-8">
                        <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
                            ข้อมูลส่วนตัว
                        </p>

                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div>
                                <label
                                    for="title_name_member"
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    คำนำหน้า
                                </label>

                                <input
                                    type="text"
                                    value={info.title}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="first_name_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    ชื่อจริง
                                </label>
                                <input
                                    type="text"
                                    value={info.first_name}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="last_name_member"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    นามสกุล
                                </label>
                                <input
                                    type="text"
                                    value={info.last_name}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    placeholder="กรอกนามสกุลของผู้สมัคร"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="id_number_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    เลขบัตรประชาชน
                                </label>
                                <input
                                    type="text"
                                    value={info.national_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="birth_day_member"
                                    class="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    วัน/เดือน/ปี เกิด
                                </label>
                                <input
                                    id="birth_day_member"
                                    type="text"
                                    value={onChangeDate(info.dob)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="sex_member"
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    เพศ
                                </label>
                                <input
                                    id="sex_member"
                                    value={onChangeGender(info.gender)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div class="grid gap-6 mb-4 md:grid-cols-2">
                            <div>
                                <label
                                    for="job_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    อาชีพ
                                </label>
                                <input
                                    id="job_member"
                                    value={info.occupation}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="phone_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    หมายเลขโทรศัพท์
                                </label>
                                <input
                                    type="text"
                                    value={info.phone}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <label
                                for="email_member"
                                class="block mb-2 text-sm font-medium text-gray-900">
                                อีเมล
                            </label>
                            <input
                                type="text"
                                value={userEmail}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
                    <div class="p-8">
                        <p class="block mb-5 mt-0 text-xl leading-tight font-bold text-grey-600">
                            ที่อยู่ปัจจุบัน
                        </p>

                        <div class="grid gap-6 mb-5 md:grid-cols-3">
                            <div>
                                <label
                                    for="home_number_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    บ้านเลขที่
                                </label>
                                <input
                                    type="text"
                                    value={address.house_number}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="moo_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    หมู่ที่
                                </label>
                                <input
                                    type="text"
                                    value={address.moo}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="soi_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    ซอย
                                </label>
                                <input
                                    type="text"
                                    value={address.soi}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div class="grid gap-6 mb-4 md:grid-cols-2">
                            <div>
                                <label
                                    for="road_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    ถนน
                                </label>
                                <input
                                    type="text"
                                    value={address.street}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="sub_district_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    ตำบล/แขวง
                                </label>
                                <input
                                    type="text"
                                    value={address.subdistrict}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="district_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    อำเภอ/เขต
                                </label>
                                <input
                                    type="text"
                                    value={address.district}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label
                                    for="province_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    จังหวัด
                                </label>
                                <input
                                    id="province_member"
                                    value={address.province}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div class="grid gap-6 mb-3 md:grid-cols-2">
                            <div>
                                <label
                                    for="zip_member"
                                    class="block mb-2 text-sm font-medium text-gray-900">
                                    รหัสไปรษณีย์
                                </label>
                                <input
                                    type="text"
                                    value={address.postal_code}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>
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




export default Profile