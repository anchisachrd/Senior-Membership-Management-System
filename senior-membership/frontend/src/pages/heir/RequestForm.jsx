import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import { getMembersForHeir } from "../../api/heirApi";
import ConfirmModal from "../../components/ConfirmModal";
import PaymentProof from "../../components/PaymentProof";

const onChangeDate = (data_date) => {
  const dobFromData = new Date(data_date);
  const filterDob =
    dobFromData.getDate().toString().padStart(2, "0") +
    "-" +
    (dobFromData.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (dobFromData.getFullYear() + 543);
  return filterDob;
};

function Form1({ isChecked, setIsChecked, infoHeir, infoMember }) {
  return (
    <div>
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-5 mb-5">
        <div class="p-8 text-center">
          <p class="block mt-1 text-xl font-bold text-black">
            ฟอร์มคำร้องขอรับเงินค่าจัดการศพเบื้องต้น
          </p>
        </div>
        <div class="px-8">
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
                value={onChangeDate(infoMember.death_date)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
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
    </div>
  );
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
        <div class="px-8">
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
                value={onChangeDate(infoMember.death_date)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
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
    </div>
  );
}

function StatusPage({ isRequested, isFinalized }) {
  return (
    <div>
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
        <div class="p-6">
          <div class="flex items-center">
            <div class="text-base text-black font-bold me-2">
              สถานะของการยื่นคำร้องขอรับเงิน:
            </div>
            <div class="text-base text-black">
              {isRequested && isFinalized
                ? "ดำเนินการเสร็จสิ้น โปรดตรวจสอบหลักฐานการโอนเงินสงเคราะห์"
                : isRequested
                ? "กำลังดำเนินการ"
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [reportId, setReportId] = useState(null);

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
      setUserEmail(data.email);
      setUserRoleId(data.role_id);
      if (data.role !== "heir") {
        navigate("/login");
      }

      const response = await fetch(
        `http://localhost:3000/api/auth/get_info_heir?heirId=${data.role_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว"
        );
      }

      const data2 = await response.json();
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
        leaving_reason: data3.leaving_reason,
        report_id: data3.report_id,
        death_date: data3.death_date,
        is_requested: data3.is_requested,
        is_finalized: data3.is_finalized,
      });

      // ✅ Set to step 3 if request is already submitted and waiting
      if (data3.is_requested) {
        setStep(3);
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate("/login");
    }
  };

  const handleConfirm = async () => {
    try {
      // Example if you have the route:
      // PUT /api/death_reports/:reportId/mark-requested
      await fetch(
        `http://localhost:3000/api/death-report/${infoMember.report_id}/mark-requested`,
        {
          method: "PUT",
        }
      );
      setIsModalOpen(false);
      // Move to step 3 => show status
      setStep(3);
    } catch (error) {
      console.error("Failed to mark is_requested:", error);
    }
  };

  if (infoMember.leaving_reason === null) {
    return (
      <div className="p-12 sm:ml-64">
        <div class="bg-gray-50 overflow-hidden rounded-xl shadow-lg mt-8">
          <div class="p-6">
            <div class="text-base text-center text-black font-bold me-2">
              ไม่สามารถใช้งานฟอร์มคำร้องได้เนื่องจากการแจ้งเสียชีวิตยังไม่สมบูรณ์
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12 sm:ml-64">
        <div className="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
          {step !== 3 ? (
            <p>ฟอร์มคำร้อง</p>
          ) : (
            <p>ท่านกรอกฟอร์มคำร้องเสร็จสิ้นแล้ว</p>
          )}
        </div>

        {step === 1 && (
          <Form1
            isChecked={isChecked1}
            setIsChecked={setIsChecked1}
            infoHeir={infoHeir}
            infoMember={infoMember}
          />
        )}
        {step === 2 && (
          <Form2
            isChecked={isChecked2}
            setIsChecked={setIsChecked2}
            infoHeir={infoHeir}
            infoMember={infoMember}
          />
        )}

        {step !== 3 ? (
          <div className="mt-14">
            <div className="w-full max-w-md mx-auto bg-gray-100 border-2 border-gray-200 rounded-md">
              <div className="flex items-center justify-between gap-3 p-3 bg-white rounded">
                {/* Back Button (Hidden on Step 1) */}
                {step !== 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                  >
                    <svg
                      className="rotate-180"
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
                  <div style={{ width: "95px" }} />
                )}

                {/* Step Indicators */}
                <ul className="flex gap-1 items-center">
                  <li
                    className={`w-2 h-2 rounded-full ${
                      step === 1 ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  ></li>
                  <li
                    className={`w-2 h-2 rounded-full ${
                      step === 2 ? "bg-gray-600" : "bg-gray-300"
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
                    className="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                  >
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
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
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
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <StatusPage
            isRequested={infoMember.is_requested}
            isFinalized={infoMember.is_finalized}
          />
        )}

        {infoMember.is_requested && infoMember.is_finalized && (
          <PaymentProof userRoleId={userRoleId} />
        )}
        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={isModalOpen}
          title="ยืนยันการยื่นคำร้องขอรับเงิน"
          description="โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน"
          onConfirm={handleConfirm}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default RequestForm;
