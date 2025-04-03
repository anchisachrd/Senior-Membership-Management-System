import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import {
  getFinalDeathApprovalDetail,
  sendToRecheck,
  confirmDeathResult,
} from "../../api/deathApi";
import StatusBadge from "../../components/StatusBadge";
import ConfirmModal from "../../components/ConfirmModal";
import ConfirmRejectModal from "../../components/ConfirmRejectModal";

function DeathFinalApprovalDeatil() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [finalApproval, setFinalApproval] = useState("");
  const [member, setMember] = useState("");
  const [sentToHeir, setSentToHeir] = useState(false)
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [leavingReason, setLeavingReason] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const openRecheckModal = () => setIsModalOpen(true);
  const closeRecheckModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role !== "staff") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate('/login')
    }
  };

  const handleRecheckApproval = async () => {
    await sendToRecheck(reportId);
    navigate("/member-list/notify-death");
  };

  const handleConfirmApproval = async () => {
    setIsRejectModalOpen(true);
  };

  useEffect(() => {
    const fetchCommitteeApprovals = async () => {
      try {
        const data = await getFinalDeathApprovalDetail(reportId);

        console.log("👉 data:", data);
        setMember(data.memberInfo);
        setApprovals(data.approvals);
        setFinalApproval(data.final_approval);
        setSentToHeir(data.sent_to_heir)
      } catch (error) {
        console.error("Error fetching committee approvals:", error);
      }
    };
    fetchCommitteeApprovals();
  }, [userRole]);

  const handleConfirmFinalApproval = async () => {
    try {
      await confirmDeathResult(reportId, member.member_id, leavingReason);

      alert("ส่งข้อมูลผลการอนุมัติสำเร็จ");
      navigate("/member-list/notify-death");
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <ConfirmRejectModal
        isOpen={isRejectModalOpen}
        comment={leavingReason}
        setComment={setLeavingReason}
        onCancel={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmFinalApproval}
        title="ระบุสาเหตุการเสียชีวิต"
      />
      <ConfirmModal
        isOpen={isModalOpen}
        title="ยืนยันการตรวจสอบใหม่"
        description="คุณต้องการส่งข้อมูลนี้กลับไปให้กรรมการตรวจสอบอีกครั้งหรือไม่?"
        onConfirm={() => {
          closeRecheckModal();
          handleRecheckApproval();
        }}
        onCancel={closeRecheckModal}
      />
      <div className="p-12">
        <div className="p-8 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center text-xl mb-4">
            <div>
              <strong>ผลการอนุมัติการแจ้งเสียชีวิตของสมาชิก:</strong>
              <span> {member.death_name}</span>
            </div>
            <span className="text-gray-700">
              <strong>รหัสสมาชิก:</strong> {member.member_id}
            </span>
          </div>

          <div className="border border-gray-300 p-4">
            {approvals.map((item, index) => {
              const committeeName = `${item.title} ${item.first_name} ${item.last_name}`;
              return (
                <div
                  key={item.approval_id}
                  className="border-b border-gray-300 py-3"
                >
                  <div className="flex justify-between">
                    <p className="text-lg  font-bold">{committeeName}</p>
                    <p>
                      <StatusBadge status={item.approval_status} />
                    </p>
                  </div>
                  {item.approval_status === "ไม่อนุมัติ" && (
                    <div className="ml-6">
                      <p className="ml-6 mt-1 text-lg text-gray-600">
                        หมายเหตุ: {item.comment}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg border font-semibold text-center ${
            finalApproval === "อนุมัติ"
              ? "text-green-600 border-green-600"
              : finalApproval === "ไม่อนุมัติ"
              ? "text-red-500 border-red-500"
              : "text-yellow-600 border-yellow-500"
          }`}
        >
          <h3 className="text-xl">
            {finalApproval === "อนุมัติ"
              ? "อนุมัติการแจ้งเสียชีวิต"
              : finalApproval === "ไม่อนุมัติ"
              ? "ไม่อนุมัติการแจ้งเสียชีวิต"
              : "กรรมการกำลังตรวจสอบข้อมูล"}
          </h3>
        </div>
      </div>

      {!sentToHeir && (
        <div className="flex space-x-4 mt-4 justify-center">
          <button
            onClick={openRecheckModal}
            disabled={finalApproval === "รอการพิจารณา" || finalApproval === "รอการแก้ไข"}
            className={`px-4 py-2 rounded-lg ${
              (finalApproval === "รอการพิจารณา" || finalApproval === "รอการแก้ไข")
              ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
              : "bg-yellow-600 text-white"
            }`}
          >
            ตรวจสอบใหม่
          </button>

          <button
            onClick={handleConfirmApproval}
            disabled={finalApproval === "รอการพิจารณา" || finalApproval === "รอการแก้ไข"}
            className={`px-4 py-2 rounded-lg ${
              (finalApproval === "รอการพิจารณา" || finalApproval === "รอการแก้ไข")
              ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
              : "bg-green-600 text-white"
            }`}
          >
            ส่งข้อมูลผลการอนุมัติ
          </button>
        </div>
      )}
    </div>
  );
}

export default DeathFinalApprovalDeatil;
