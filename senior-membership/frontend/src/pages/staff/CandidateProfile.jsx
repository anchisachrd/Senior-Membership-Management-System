import React, { useState, useEffect } from "react";
import {
  getCandidateAndHeirById,
  updateVerificationStatus,
  sendToCommittee,
  updateApprovalStatus,
} from "../../api/candidateApi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DocumentPreview from "../../components/DocumentPreview";
import ConfirmModal from "../../components/ConfirmModal";
import CommitteeVerification from "../../components/CommitteeVerification";
// import { verifyUser } from "../../api/verifyApi";

function Information_personal({ data }) {
  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob =
      dobFromData.getFullYear() +
      543 +
      "-" +
      (dobFromData.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      dobFromData.getDate().toString().padStart(2, "0");
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
    <div>
      {/* กล่อง 1 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
            1. ข้อมูลส่วนตัวของผู้สมัคร
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
                value={data.title}
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
                value={data.first_name}
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
                value={data.last_name}
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
                value={data.national_id}
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
                value={onChangeDate(data.dob)}
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
                value={onChangeGender(data.gender)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                for="job_member"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                อาชีพ
              </label>
              <input
                id="job_member"
                value={data.occupation}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="phone_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                หมายเลขโทรศัพท์
              </label>
              <input
                type="text"
                value={data.phone}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="email_member"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              อีเมล
            </label>
            <input
              type="text"
              value={data.email}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
              readOnly
            />
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>

          {/* ที่อยู่ */}
          <p class="block mb-5 mt-0 text-base leading-tight font-bold text-grey-600">
            ที่อยู่ปัจจุบัน
          </p>

          <div class="grid gap-6 mb-5 md:grid-cols-3">
            <div>
              <label
                for="home_number_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                บ้านเลขที่
              </label>
              <input
                type="text"
                value={data.address.house_num}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="moo_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                หมู่ที่
              </label>
              <input
                type="text"
                value={data.address.moo}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="soi_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ซอย
              </label>
              <input
                type="text"
                value={data.address.soi}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                for="road_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ถนน
              </label>
              <input
                type="text"
                value={data.address.street}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="sub_district_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ตำบล/แขวง
              </label>
              <input
                type="text"
                value={data.address.subdistrict}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="district_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                อำเภอ/เขต
              </label>
              <input
                type="text"
                value={data.address.district}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="province_member"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                จังหวัด
              </label>
              <input
                id="province_member"
                value={data.address.province}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label
                for="zip_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                รหัสไปรษณีย์
              </label>
              <input
                type="text"
                value={data.address.postal_code}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* กล่อง */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
            2. เอกสารของผู้สมัคร
          </p>

          <DocumentPreview
            label="สำเนาทะเบียนบ้าน"
            docPath={data.documents?.house_registration}
          />

          <DocumentPreview
            label="สำเนาบัตรประชาชน"
            docPath={data.documents?.id_card}
          />

          <DocumentPreview
            label="ใบเปลี่ยนชื่อ"
            docPath={data.documents?.rename_doc}
          />

          <DocumentPreview
            label="ใบรับรองแพทย์"
            docPath={data.documents?.med_certification}
          />
        </div>
      </div>
    </div>
  );
}

function Information_heir({ data }) {
  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob =
      dobFromData.getFullYear() +
      543 +
      "-" +
      (dobFromData.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      dobFromData.getDate().toString().padStart(2, "0");
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
    <div>
      {/* กล่อง  3 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
            3. ข้อมูลส่วนตัวของทายาท
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                for="title_name_heir"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                คำนำหน้า
              </label>
              <input
                value={data.title}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="first_name_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ชื่อจริง
              </label>
              <input
                type="text"
                id="first_name_heir"
                value={data.first_name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="last_name_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                นามสกุล
              </label>
              <input
                type="text"
                id="last_name_heir"
                value={data.last_name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="id_number_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                เลขบัตรประชาชน
              </label>
              <input
                type="text"
                id="id_number_heir"
                value={data.national_id}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="birth_day_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                วัน/เดือน/ปี เกิด
              </label>
              <input
                id="birth_day_heir"
                type="text"
                value={onChangeDate(data.dob)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="sex_heir"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <input
                id="sex_heir"
                type="text"
                value={onChangeGender(data.gender)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label
                for="job_heir"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                อาชีพ
              </label>
              <input
                id="job_heir"
                value={data.occupation}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="relationship_heir"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ความเกี่ยวข้อง
              </label>
              <input
                id="relationship_heir"
                value={data.relationship}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>

            <div>
              <label
                for="phone_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                หมายเลขโทรศัพท์
              </label>
              <input
                type="text"
                value={data.phone}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="email_heir"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                อีเมล
              </label>
              <input
                type="text"
                value={data.email}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>

          {/* ที่อยู่ */}
          <p class="block mb-5 mt-0 text-base leading-tight font-bold text-grey-600">
            ที่อยู่ปัจจุบัน
          </p>

          <div class="grid gap-6 mb-5 md:grid-cols-3">
            <div>
              <label
                for="home_number_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                บ้านเลขที่
              </label>
              <input
                type="text"
                value={data.address.house_num}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="moo_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                หมู่ที่
              </label>
              <input
                type="text"
                value={data.address.moo}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="soi_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ซอย
              </label>
              <input
                type="text"
                value={data.address.soi}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                for="road_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ถนน
              </label>
              <input
                type="text"
                value={data.address.street}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="sub_district_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                ตำบล/แขวง
              </label>
              <input
                type="text"
                value={data.address.subdistrict}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="district_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                อำเภอ/เขต
              </label>
              <input
                type="text"
                value={data.address.district}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>

            <div>
              <label
                for="province_member"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                จังหวัด
              </label>
              <input
                value={data.address.province}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2"
                readOnly
              />
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label
                for="zip_member"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                รหัสไปรษณีย์
              </label>
              <input
                type="text"
                value={data.address.postal_code}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* กล่อง 4 */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-14">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl leading-tight font-bold text-grey-600">
            4. เอกสารของทายาท
          </p>

          <DocumentPreview
            label="สำเนาทะเบียนบ้าน"
            docPath={data.documents?.house_registration}
          />

          <DocumentPreview
            label="สำเนาบัตรประชาชน"
            docPath={data.documents?.id_card}
          />

          <DocumentPreview
            label="ใบเปลี่ยนชื่อ"
            docPath={data.documents?.rename_doc}
          />
        </div>
      </div>
    </div>
  );
}
function CandidateProfile() {
  const { id } = useParams();
  const location = useLocation();
  const { context } = location.state || { context: null };

  const [candidate, setCandidate] = useState(null);
  const [heir, setHeir] = useState(null);

  const [activeTab, setActiveTab] = useState("personalInfo");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => {});
  const navigate = useNavigate();

  // สำหรับ Modal ตรวจเอกสารไม่ผ่าน
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [failButton, setFailButton] = useState("");
  const [failNote, setFailNote] = useState("");

  // สำหรับเช็ค role
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // useEffect(() => {
  //   fetchUserProfile();
  //   checkUserRole();
  // }, [userEmail]);

  // const checkUserRole = async () => {
  //   if (userRole != 'staff' || userRole!= 'committee') {
  //     navigate('/login')
  //   }
  // };

  // const fetchUserProfile = async () => {
  //   try {
  //     const data = await verifyUser();
  //     setUserRole(data.role)
  //     setUserEmail(data.email)

  //   } catch (error) {
  //     console.error('Fetch Protected Data Error:', error);
  //   }
  // };

  const toggleModal2 = () => {
    setIsModal2Open(!isModal2Open);
  };

  const handleNoteChange = (e) => {
    setFailNote(e.target.value);
  };

  const handleModal2 = async () => {
    try {
      await updateVerificationStatus(id, {
        status: "ไม่ผ่าน",
        comments: failNote,
        reason: failButton,
      });

      // 3) Show success
      alert("สถานะเอกสารถูกเปลี่ยนเป็น 'ไม่ผ่านการตรวจสอบ'");

      // 4) Navigate back
      navigate("/staff_candidateList");
    } catch (error) {
      console.error("Error updating verification:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  useEffect(() => {
    const fetchCandidateAndHeirData = async () => {
      try {
        console.log("Candidate ID:", id);
        const data = await getCandidateAndHeirById(id);
        setCandidate(data);
        setHeir(data.heir);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };
    fetchCandidateAndHeirData();
  }, [id]);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const openModal = (title, description, confirmCallback) => {
    setModalTitle(title);
    setModalDescription(description);
    setOnConfirmAction(() => confirmCallback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApproveCandidate = async () => {
    try {
      await updateVerificationStatus(id, {
        status: "ผ่าน",
        comments: "",
      });
      alert("สถานะเอกสารถูกเปลี่ยนเป็น 'ผ่านการตรวจสอบ'");
      navigate("/staff_candidateList");
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
      console.error(error);
    }
  };

  const handleSentdata = async () => {
    try {
      await sendToCommittee(id);
      alert("ส่งข้อมูลเรียบร้อย");
      navigate("/staff_cadidateWaitingList");
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูลไปที่กรรมการ");
      console.error(error);
    }
  };

  // 1. If ANY question is fail → set "ไม่ผ่านการตรวจสอบ"
  const handleSubmitFail = async (failReasons) => {
    try {
      await updateApprovalStatus(id, "ไม่ผ่านการตรวจสอบ", failReasons);
      alert("สถานะผู้สมัครถูกเปลี่ยนเป็น 'ไม่ผ่านการตรวจสอบ'");
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  // 2. If ALL are pass → set "ผ่านการตรวจสอบ" or maybe "รอการอนุมัติ"
  const handleSubmitPass = async () => {
    try {
      await updateApprovalStatus(id, "ผ่านการตรวจสอบ");
      alert("สถานะผู้สมัครถูกเปลี่ยนเป็น 'ผ่านการตรวจสอบ'");
      navigate("/committee_candidateList"); // or wherever you want to go next
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      {/* Reusable Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={modalTitle}
        description={modalDescription}
        onConfirm={() => {
          onConfirmAction();
          closeModal();
        }}
        onCancel={closeModal}
      />

      <div className="p-12 sm:ml-64 overflow-hidden">
        {/* Tabs */}
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li className="me-2">
            <button
              onClick={() => setActiveTab("personalInfo")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "personalInfo"
                  ? "text-white bg-gray-600"
                  : "text-gray-500 bg-gray-300"
              }`}
            >
              ข้อมูลส่วนตัว
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("heirInfo")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "heirInfo"
                  ? "text-white bg-gray-600"
                  : "text-gray-500 bg-gray-300"
              }`}
            >
              ข้อมูลทายาท
            </button>
          </li>
          {context === "committeeCandidateProfile" && (
            <li className="me-2">
              <button
                onClick={() => setActiveTab("candidateVerification")}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === "candidateVerification"
                    ? "text-white bg-gray-600"
                    : "text-gray-500 bg-gray-300"
                }`}
              >
                ตรวจสอบคุณสมบัติ
              </button>
            </li>
          )}
        </ul>

        {/* Tab Content */}
        <div className="mb-8 overflow-hidden">
          {activeTab === "personalInfo" && candidate && (
            <Information_personal data={candidate} />
          )}
          {activeTab === "heirInfo" && heir && <Information_heir data={heir} />}
          {activeTab === "candidateVerification" &&
            context === "committeeCandidateProfile" && (
              <CommitteeVerification candidateId={id} />
            )}
        </div>

        {/* condition ว่าถ้าเจออันไหนให้เรนเดอร์ปุ่มนั้น โดยค่าจะส่งมากจากแต่ละไฟล์ที่ใช้ */}
        {context === "waitingCandidateProfile" && candidate && (
          <div className="relative mt-14 flex justify-center items-center gap-4">
            <button
              type="button"
              onClick={() =>
                openModal(
                  "ยืนยันการส่งข้อมูล",
                  "คุณต้องการส่งข้อมูลไปที่กรรมการหรือไม่?",
                  () => handleSentdata()
                )
              }
              disabled={
                candidate.final_approval_status !== "ยังไม่ได้ส่งพิจารณา"
              }
              className={`text-white rounded-lg px-4 py-2 ${
                candidate.final_approval_status !== "ยังไม่ได้ส่งพิจารณา"
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              ส่งข้อมูล
            </button>
            <button
              type="button"
              onClick={() =>
                openModal(
                  "ยืนยันการลบ",
                  "คุณต้องการลบข้อมูลผู้สมัครหรือไม่?",
                  () => alert("ลบข้อมูล clicked!")
                )
              }
              className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
            >
              ลบข้อมูล
            </button>
          </div>
        )}

        {context === "staffCandidateProfile" && (
          <div className="relative mt-14 flex justify-center items-center gap-4">
            <button
              type="button"
              onClick={() =>
                openModal(
                  "ยืนยันการตรวจสอบ",
                  "โปรดตรวจสอบความถูกต้องและครบถ้วนของเอกสารก่อนกดยืนยัน",
                  () => handleApproveCandidate()
                )
              }
              className="text-white bg-lime-800 hover:bg-lime-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-5 py-2.5"
            >
              ผ่านการตรวจสอบ
            </button>

            <button
              type="button"
              onClick={toggleModal2}
              className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2.5"
            >
              ไม่ผ่านการตรวจสอบ
            </button>

            {/* modal ไม่ผ่านการตรวจสอบ */}
            {isModal2Open && (
              <div
                id="popup-modal"
                class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
              >
                <div class="relative p-1 w-full max-w-md max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-100">
                    <button
                      type="button"
                      onClick={toggleModal2}
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
                      <svg
                        class="mx-auto mt-4 mb-4 text-gray-800 w-12 h-12 dark:text-gray-800"
                        aria-hidden="true"
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
                      <p class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-800">
                        ไม่ผ่านการตรวจสอบ
                      </p>
                      <p class="mb-5 text-sm font-normal text-gray-800 dark:text-gray-800">
                        โปรดเลือกปุ่มสาเหตุและกรอกหมายเหตุ
                      </p>
                      <button
                        onClick={() => setFailButton("ไม่ถูกต้อง")}
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-3"
                      >
                        ไม่ถูกต้อง
                      </button>
                      <button
                        onClick={() => setFailButton("ไม่ครบถ้วน")}
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-3"
                      >
                        ไม่ครบถ้วน
                      </button>
                      <button
                        onClick={() => setFailButton("ไม่ถูกต้องและไม่ครบถ้วน")}
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        ทั้งคู่
                      </button>
                    </div>

                    <div class="px-5 pb-5">
                      <label class="block mb-2 text-base font-medium text-black ">
                        ไม่ผ่านการตรวจสอบเพราะ <b>{failButton}</b>
                      </label>
                      <label class="block mb-2 text-sm font-medium text-black ">
                        หมายเหตุ:{" "}
                      </label>
                      <textarea
                        rows="4"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                        placeholder="กรอกหมายเหตุ"
                        value={failNote}
                        onChange={handleNoteChange}
                      />
                    </div>

                    <div class="relative flex justify-center items-center">
                      <button
                        type="button"
                        onClick={handleModal2}
                        disabled={!(failNote && failButton)}
                        class="text-white bg-lime-800 hover:bg-lime-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-5 py-2.5 text-sm mb-5"
                      >
                        เสร็จสิ้น
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
  );
}

export default CandidateProfile;