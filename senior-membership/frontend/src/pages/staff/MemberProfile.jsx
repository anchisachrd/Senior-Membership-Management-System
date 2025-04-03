import React, { useState, useEffect } from "react";
import { getMemberInfo } from "../../api/memberApi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import MemberPaymentHistory from "../../components/MemberPaymentHistory";
import HeirInfo from "../../components/HeirInfo";
import CandidateInfo from "../../components/CandidateInfo";
import DeathReportDetail from "../../components/DeathReportDetail";
import { verifyUser } from "../../api/verifyApi";
import HeirPaymentDetail from "../committee/HeirPaymentDetail";

function MemberProfile() {
  const { memberId } = useParams();
  const location = useLocation();
  const { context } = location.state || { context: null };
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [member, setMember] = useState(null);
  const [heir, setHeir] = useState(null);
  
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

  
  useEffect(() => {
    if (context === 'deathData') {
      setActiveTab("memberDeathReport");
    } else if (context === 'heirPayment') {
      setActiveTab("heirPaymentDetail")
    }
    else {
      setActiveTab("personalInfo");
    }
  }, [context]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      console.log("User role:", data.role);

      if (data.role !== "staff" && data.role !== "committee") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchMemberAndHeirData = async () => {
      try {
        console.log("Candidate ID:", memberId);
        const data = await getMemberInfo(memberId);
        setMember(data);
        setHeir(data.heir);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };
    fetchMemberAndHeirData();
  }, [userRole]);

  

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

          {userRole !== "committee" && (
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
          )}

          {context === "deathData" && (
            <li className="me-2">
              <button
                onClick={() => setActiveTab("memberDeathReport")}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === "memberDeathReport"
                    ? "text-white bg-gray-600"
                    : "text-gray-500 bg-gray-300"
                }`}
              >
                ข้อมูลการเสียชีวิต
              </button>
            </li>
          )}

          {context === "heirPayment" && (
            <li className="me-2">
              <button
                onClick={() => setActiveTab("heirPaymentDetail")}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === "heirPaymentDetail"
                    ? "text-white bg-gray-600"
                    : "text-gray-500 bg-gray-300"
                }`}
              >
                อัปโหลดหลักฐานการชำระเงิน
              </button>
            </li>
          )}
        </ul>

        {/* Tab Content */}
        <div className="mb-8 overflow-hidden">
          {activeTab === "personalInfo" && member && (
            <CandidateInfo data={member} />
          )}
          {activeTab === "heirInfo" && heir && <HeirInfo data={heir} />}
          {activeTab === "memberPaymentHistory" && <MemberPaymentHistory />}
          {activeTab === "memberDeathReport" && context === "deathData" && (
            <DeathReportDetail />
          )}
          {activeTab === "heirPaymentDetail" && context === "heirPayment" && (
            <HeirPaymentDetail/>
          )}
        </div>
      </div>
    </div>
  );
}
export default MemberProfile;
