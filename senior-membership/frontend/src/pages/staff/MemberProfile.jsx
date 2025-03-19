import React, { useState, useEffect } from "react";
import {
    getMemberInfo,
} from "../../api/memberApi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import CommitteeVerification from "../../components/CommitteeVerification";
import MemberPaymentHistory from "../../components/MemberPaymentHistory";
import HeirInfo from "../../components/HeirInfo";
import CandidateInfo from "../../components/CandidateInfo";
// import { verifyUser } from "../../api/verifyApi";

function MemberProfile() {
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

  // สำหรับเช็ค role
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role != "staff" || data.role != "committee") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  

  useEffect(() => {
    const fetchCandidateAndHeirData = async () => {
      try {
        console.log("Candidate ID:", id);
        const data = await getMemberInfo(id);
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
        
  
            <li className="me-2">
              <button
                onClick={() => setActiveTab("memberPaymentHistory")}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === "memberPaymentHistory"
                    ? "text-white bg-gray-600"
                    : "text-gray-500 bg-gray-300"
                }`}
              >
                ประวัติการชำระเงิน
              </button>
            </li>
        
        </ul>

        {/* Tab Content */}
        <div className="mb-8 overflow-hidden">
          {activeTab === "personalInfo" && candidate && (
            <CandidateInfo data={candidate} />
          )}
          {activeTab === "heirInfo" && heir && <HeirInfo data={heir} />}
          {activeTab === "candidateVerification" &&
            context === "committeeCandidateProfile" && (
              <CommitteeVerification candidateId={id} />
            )}
          {activeTab === "memberPaymentHistory" &&
            context === "committeeCandidateProfile" && <MemberPaymentHistory />}
        </div>

        {/* condition ว่าถ้าเจออันไหนให้เรนเดอร์ปุ่มนั้น โดยค่าจะส่งมากจากแต่ละไฟล์ที่ใช้ */}
       
      </div>
    </div>
  );
}
export default MemberProfile;
