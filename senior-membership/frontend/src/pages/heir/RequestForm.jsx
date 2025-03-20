import React, { useEffect, useState } from 'react'
import { verifyUser } from '../../api/verifyApi';
import { getMembersForHeir } from "../../api/heirApi"

function Form1({ isChecked, setIsChecked, infoHeir, infoMember }) {

  return (
    <div>

      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
        <div class="p-8 text-center">
          <p class="block mt-1 text-xl font-bold text-black">
            ฟอร์มคำร้องขอรับเงินค่าจัดการศพเบื้องต้น
          </p>
        </div>
        <div class='px-8'>
          <p class="block mt-1 mb-7 text-l leading-tight font-bold text-black">
            1. ข้อมูลผู้เสียชีวิต
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
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
                value={infoMember.member_id}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกเลข"
              />
            </div>

            <div>
              <label
                htmlFor="full_name_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ชื่อผู้เสียชีวิต
              </label>
              <input
                type="text"
                id="full_name_member"
                value={infoMember.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกชื่อของผู้สมัคร"
              />
            </div>

            <div>
              <label
                htmlFor="death_day_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                วัน/เดือน/ปี ที่เสียชีวิตตามใบมรณบัตร
              </label>
              <input
                id="death_day_member"
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="เลือกวันเกิด"
              />
            </div>

          </div>
        </div>

        <hr class="h-px mx-8 my-8 bg-gray-200 border-0 dark:bg-gray-500" />

        <div class="px-8">
          <p class="block mt-1 mb-7 text-l leading-tight font-bold text-black">
            2. ข้อมูลทายาท
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                for="title_name_member"
                class="block mb-2 text-sm font-medium text-black"
              >
                คำนำหน้า
              </label>

              <input
                type="text"
                value={infoHeir.title}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="first_name_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                ชื่อจริง
              </label>
              <input
                type="text"
                value={infoHeir.first_name}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="last_name_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                นามสกุล
              </label>
              <input
                type="text"
                value={infoHeir.last_name}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกนามสกุลของผู้สมัคร"
                readOnly
              />
            </div>

            <div>
              <label
                for="id_number_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                เลขบัตรประชาชน
              </label>
              <input
                type="text"
                value={infoHeir.national_id}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
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
            onChange={(e) => setIsChecked(e.target.checked)}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            ข้าพเจ้ายอมรับในการยื่นคำร้องขอรับเงินค่าจัดการศพเบื้องต้น
          </label>
        </div>
      </div>
    </div >
  )
}

function Form2({ isChecked, setIsChecked, infoHeir, infoMember }) {

  return (
    <div>

      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
        <div class="p-8 text-center">
          <p class="block mt-1 text-xl font-bold text-black">
            ฟอร์มคำร้องขอรับเงินสงเคราะห์
          </p>
        </div>
        <div class='px-8'>
          <p class="block mt-1 mb-7 text-l leading-tight font-bold text-black">
            1. ข้อมูลผู้เสียชีวิต
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
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
                value={infoMember.member_id}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกเลข"
              />
            </div>

            <div>
              <label
                htmlFor="full_name_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ชื่อผู้เสียชีวิต
              </label>
              <input
                type="text"
                id="full_name_member"
                value={infoMember.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกชื่อของผู้สมัคร"
              />
            </div>

            <div>
              <label
                htmlFor="death_day_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                วัน/เดือน/ปี ที่เสียชีวิตตามใบมรณบัตร
              </label>
              <input
                id="death_day_member"
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="เลือกวันเกิด"
              />
            </div>

          </div>
        </div>

        <hr class="h-px mx-8 my-8 bg-gray-200 border-0 dark:bg-gray-500" />

        <div class="px-8">
          <p class="block mt-1 mb-7 text-l leading-tight font-bold text-black">
            2. ข้อมูลทายาท
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                for="title_name_member"
                class="block mb-2 text-sm font-medium text-black"
              >
                คำนำหน้า
              </label>

              <input
                type="text"
                value={infoHeir.title}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="first_name_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                ชื่อจริง
              </label>
              <input
                type="text"
                value={infoHeir.first_name}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="last_name_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                นามสกุล
              </label>
              <input
                type="text"
                value={infoHeir.last_name}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                placeholder="กรอกนามสกุลของผู้สมัคร"
                readOnly
              />
            </div>

            <div>
              <label
                for="id_number_member"
                class="block mb-2 text-sm font-medium text-black "
              >
                เลขบัตรประชาชน
              </label>
              <input
                type="text"
                value={infoHeir.national_id}
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
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
            onChange={(e) => setIsChecked(e.target.checked)}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            ข้าพเจ้ายอมรับในการยื่นคำร้องขอรับเงินสงเคราะห์
          </label>
        </div>
      </div>
    </div >
  )
}

function RequestForm() {

  const [userEmail, setUserEmail] = useState('')
  const [userRoleId, setUserRoleId] = useState('')
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [member, setMember] = useState([]);

  const [infoHeir, setInfoHeir] = useState({
    title: "",
    first_name: "",
    last_name: "",
    national_id: "",
  });

  const [infoMember, setInfoMember] = useState({
    name: "",
    member_id: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);


  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserEmail(data.email)
      setUserRoleId(data.role_id)
      if (data.role !== 'heir') {
        navigate('/login');
      }

      const response = await fetch(`http://localhost:3000/api/auth/get_info_heir?heirId=${data.role_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }

      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว");
      }

      const data2 = await response.json();
      // console.log(data2)
      setInfoHeir({
        title: data2.title,
        first_name: data2.first_name,
        last_name: data2.last_name,
        national_id: data2.national_id,
      });

      const data3 = await getMembersForHeir(data.role_id);
      setInfoMember({
        name: data3.member_name,
        member_id: data3.member_id,
      });

    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
      navigate('/login');
    }
  };

 

  return (
    <div class='ibm-plex-sans-thai-medium'>
      <div class="p-12 sm:ml-64">
        <div class="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
          ฟอร์มคำร้อง
        </div>

        {step === 1 && <Form1 isChecked={isChecked1} setIsChecked={setIsChecked1} infoHeir={infoHeir} infoMember={infoMember} />}
        {step === 2 && <Form2 isChecked={isChecked2} setIsChecked={setIsChecked2} infoHeir={infoHeir} infoMember={infoMember} />}

        <div class="mt-14">
          <div class="w-full max-w-md mx-auto bg-gray-100 border-2 border-gray-200 rounded-md">
            <div class="flex items-center justify-between gap-3 p-3 bg-white rounded">
              {/* Back Button (Hidden on Step 1) */}
              {step !== 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                >
                  <svg
                    class="rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  ย้อนกลับ
                </button>
              ) : (
                <div style={{ width: "95px" }}></div>
              )}

              {/* Step Indicators */}
              <ul class="flex gap-1 items-center">
                <li
                  class={`w-2 h-2 rounded-full ${step === 1 ? "bg-gray-600" : "bg-gray-300"
                    }`}
                ></li>
                <li
                  class={`w-2 h-2 rounded-full ${step === 2 ? "bg-gray-600" : "bg-gray-300"
                    }`}
                ></li>
              </ul>

              {/* Next or Finish Button */}
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!isChecked1}
                  style={{ opacity: isChecked1 ? 1 : 0.5 }}
                  class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600">
                  หน้าถัดไป
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => {

                      if (step === 2) {
                        setIsModalOpen(true)
                      }

                    }}
                    class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                    disabled={!isChecked2}
                    style={{ opacity: isChecked2 ? 1 : 0.5 }}
                  >
                    เสร็จสิ้น
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                    >
                      <path
                        d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Confirmation Modal */}
                  {isModalOpen && (
                    <div
                      id="popup-modal"
                      class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                      <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-100">

                          <button
                            type="button"
                            class="absolute top-3 end-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                            onClick={() => setIsModalOpen(false)}
                          >
                            <svg
                              class="w-3 h-3"
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
                            <svg
                              class="mx-auto mb-4 text-gray-800 w-12 h-12"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <p class="mb-1 text-lg font-bold text-gray-800">
                              ยืนยันการยื่นคำร้องขอรับเงิน
                            </p>
                            <p class="mb-5 text-base font-normal text-gray-800">
                              โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน
                            </p>

                            <button
                              type="submit"
                              class="text-gray-900 bg-white border border-lime-200 hover:bg-lime-100 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                              ยืนยัน
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white border border-red-200 hover:bg-red-100 rounded-lg"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RequestForm