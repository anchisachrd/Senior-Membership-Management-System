import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getFinalApprovalDetail,
  sendBackForRevision,
  sentResultMembership
} from "../api/committeeApi";
import StatusBadge from "./StatusBadge";
import ConfirmModal from "./ConfirmModal";

function FinalResultDetail() {
  const { candidateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [committeeVotes, setCommitteeVotes] = useState([]);
  const fromStaff = location.state?.fromStaff || false; // Check if navigated from staff
  const [staffNote, setStaffNote] = useState(""); // Staff's rejection note
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [handleConfirmAction, setHandleConfirmAction] = useState(() => {});

  console.log("Location State:", location.state);
  console.log("Final Approval Status:", candidateInfo?.final_approval_status);

  const handleRejectForRevision = async () => {
    try {
      await sendBackForRevision(candidateId);
      alert("ส่งกลับเพื่อแก้ไขแล้ว");
      navigate("/staff_cadidateWaitingList");
    } catch (error) {
      console.error("Error sending back:", error);
    }
  };

  const handleSentResultMembership = async () => {
    try {
      await sentResultMembership(candidateId, fromStaff);
      alert("ยืนยันการสมัครสมาชิกสำเร็จ");
      navigate("/staff_cadidateWaitingList");
    } catch (error) {
      console.error("Error confirming membership:", error);
    }
  };

  const confirmSaveData = async () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const data = await getFinalApprovalDetail(candidateId);
        console.log("📌 API Response:", data);
        if (data) {
          setCandidateInfo(data.candidateInfo);
          setCommitteeVotes(data.committeeVotes);
        }
      } catch (error) {
        console.error("Error fetching committee results:", error);
      }
    };
    fetchVotes();
  }, [candidateId]);

  const openModal = (title, description, action) => {
    setModalTitle(title);
    setModalDescription(description);
    setHandleConfirmAction(() => action);
    setIsModalOpen(true);
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12">

      <ConfirmModal
          isOpen={isModalOpen}
          title={modalTitle}
          description={modalDescription}
          onConfirm={() => {
            handleConfirmAction(); 
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />


        <div className="p-8 bg-gray-100 rounded-lg">
          {candidateInfo && (
            <h2 className="text-xl  mb-4">
              <strong>ผลการพิจารณาสำหรับผู้สมัคร:</strong> {candidateInfo.title}{" "}
              {candidateInfo.first_name} {candidateInfo.last_name}
            </h2>
          )}

          <div className="border border-gray-300 p-4">
            {committeeVotes.map((vote, index) => {
              // Filter out null or empty reasons

              return (
                <div key={index} className="border-b border-gray-300 py-3">
                  <div className="flex justify-between">
                    <p className="text-lg  font-bold">
                      {vote.title} {vote.first_name} {vote.last_name}
                    </p>
                    <p>
                      <StatusBadge status={vote.approval_status} />
                    </p>
                  </div>

                  {/* Only show "เนื่องจาก" if there are valid reasons */}
                  {vote.verification_details.length > 0 &&
                    vote.approval_status === "ไม่อนุมัติ" && (
                      <div className="ml-6">
                        <p className="text-lg font-semibold mt-2 mb-2">
                          เนื่องจาก:
                        </p>
                        {vote.verification_details.length === 1 ? (
                          // Single reason (No numbering)
                          <>
                            <p className="ml-4 mt-2 text-base">
                              {vote.verification_details[0].reason}
                            </p>
                            {vote.verification_details[0].comment && (
                              <p className="ml-6 mt-1 text-base text-gray-600">
                                หมายเหตุ: {vote.verification_details[0].comment}
                              </p>
                            )}
                          </>
                        ) : (
                          // Multiple reasons (With numbering)
                          vote.verification_details.map((detail, i) => (
                            <div key={i} className="ml-4 mt-2 text-base">
                              <p>
                                {i + 1}. {detail.reason}
                              </p>
                              {detail.comment && (
                                <p className="ml-6 mt-1 text-base text-gray-600">
                                  หมายเหตุ: {detail.comment}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {candidateInfo && (
            <div
              className={`mt-6 p-4 rounded-lg border font-semibold text-center ${
                candidateInfo.final_approval_status === "อนุมัติ"
                  ? "text-green-600 border-green-600"
                  : candidateInfo.final_approval_status === "ไม่อนุมัติ"
                  ? "text-red-500 border-red-500"
                  : "text-yellow-600 border-yellow-500"
              }`}
            >
              <h3 className="text-xl">
                {candidateInfo.final_approval_status === "อนุมัติ"
                  ? "ผู้สมัครได้รับการอนุมัติให้เป็นสมาชิก"
                  : candidateInfo.final_approval_status === "ไม่อนุมัติ"
                  ? "ผู้สมัครไม่ได้รับการอนุมัติให้เป็นสมาชิก"
                  : "กรรมการกำลังตรวจสอบข้อมูลใหม่"}
              </h3>
            </div>
          )}
        </div>

        {fromStaff && candidateInfo && (
          <div className="mt-6 flex flex-col items-center">
            {/* Show "หมายเหตุ" input only if "ไม่อนุมัติ" */}
            {candidateInfo.final_approval_status === "ไม่อนุมัติ" && (
              <div className="mt-4 p-8 w-full rounded-lg bg-gray-100">
                <label className="block text-gray-700 text-center">
                  หมายเหตุ (เหตุผลที่ไม่ผ่านการอนุมัติ):
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                  rows="3"
                  value={staffNote}
                  onChange={(e) => setStaffNote(e.target.value)}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4 justify-center">
              <button
                onClick={() =>
                  openModal(
                    "ยืนยันการตรวจสอบใหม่",
                    "คุณต้องการส่งข้อมูลให้คณะกรรมการทั้งหมด\nตรวจสอบใหม่อีกครั้งหรือไม่",
                    handleRejectForRevision
                  )
                }
                className={` ${candidateInfo.final_approval_status === "รอการแก้ไข" ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-yellow-600 text-white"} px-4 py-2 rounded-lg`}
                disabled={candidateInfo.final_approval_status === "รอการแก้ไข"}
              >
                ตรวจสอบใหม่
              </button>

              <button
              onClick={() =>
                openModal(
                  "ยืนยันการส่งผลอนุมัติให้ผู้สมัคร",
                  "คุณต้องการส่งข้อมูลผลอนุมัติให้ผู้สมัครหรือไม่",
                  handleSentResultMembership
                )
              }
                className={`px-4 py-2 rounded-lg ${
                 ( candidateInfo.final_approval_status === "ไม่อนุมัติ" || candidateInfo.final_approval_status === "รอการแก้ไข") &&
                  !staffNote.trim()
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 text-white"
                }`}
                disabled={
                  (candidateInfo.final_approval_status === "ไม่อนุมัติ" || candidateInfo.final_approval_status === "รอการแก้ไข") &&
                  !staffNote.trim()
                }
              >
                ส่งข้อมูลยืนยัน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalResultDetail;
