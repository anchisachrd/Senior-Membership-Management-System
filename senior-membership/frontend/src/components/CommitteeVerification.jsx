import React, { useEffect, useState } from "react";
import {
  getMyCommitteeApproval,
  updateCommitteeApproval,
} from "../api/committeeApi";
import ConfirmModal from "./ConfirmModal";

// #TODO : ทำ committee verification ต่อ
function CommitteeVerification({ candidateId }) {
  const qualification = [
    {
      topic: "1. ใบรับรองแพทย์ยังไม่หมดอายุ",
      failReason: "ใบรับรองแพทย์หมดอายุ",
    },
    {
      topic: "2. เอกสารบางอย่างไม่ครบ",
      failReason: "เอกสารขาด",
    },
  ];

  const [results, setResults] = useState(
    qualification.map(() => ({ status: "", comment: "" }))
  );

  const [approvalId, setApprovalId] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("รอการพิจารณา");
  const [isEditing, setIsEditing] = useState(true);

  //for modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAllSelected = results.every((item) => item.status !== "");

  useEffect(() => {
    const fetchApprovalData = async () => {
      try {
        const data = await getMyCommitteeApproval(candidateId);
        console.log("Fetched approval data:", data);

        if (data && data.approvalId) {
          setApprovalId(data.approvalId);
          setApprovalStatus(data.approvalStatus || "รอการพิจารณา");

          // ✅ Ensure verificationDetails is always an array with default structure
          const filledDetails =
            Array.isArray(data.verificationDetails) &&
            data.verificationDetails.length > 0
              ? data.verificationDetails.map((item) => ({
                  status: item.status || "", // Default empty status
                  comment: item.comment || "", // Default empty comment
                }))
              : qualification.map(() => ({ status: "", comment: "" })); // Create default values

          setResults(filledDetails);
          setIsEditing(data.approvalStatus === "รอการพิจารณา");
        } else {
          // If no approval found, initialize default values
          setApprovalId(null);
          setApprovalStatus("รอการพิจารณา");
          setResults(qualification.map(() => ({ status: "", comment: "" })));
          setIsEditing(true);
        }
      } catch (err) {
        console.error("Error loading committee approval detail:", err);
        setResults(qualification.map(() => ({ status: "", comment: "" }))); // Default fallback
      }
    };

    fetchApprovalData();
  }, [candidateId]);

  function handleRadioChange(index, newStatus) {
    if (!isEditing) return;
    setResults((prev) => {
      const updated = [...prev];
  
      if (newStatus === "fail") {
        updated[index] = {
          status: "fail",
          reason: qualification[index].failReason,
          comment: updated[index].comment || "", // ✅ Preserve previous comment
        };
      } else {
        updated[index] = {
          status: "pass",
          reason: null,
          comment: "", // Reset comment if changed to pass
        };
      }
      return updated;
    });
  }
  

  function handleCommentChange(index, text) {
    if (!isEditing) return;
    setResults((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], comment: text };
      return updated;
    });
  }

  function handleSendData() {
    if (!isAllSelected) {
      alert("กรุณาเลือกผลการตรวจสอบให้ครบทุกหัวข้อ");
      return;
    }

    // If any "fail" has empty comment, you can force them to fill it
    const missingComments = results.some(
      (r) => r.status === "fail" && !r.comment.trim()
    );
    if (missingComments) {
      alert("กรุณากรอกหมายเหตุสำหรับข้อที่ 'ไม่ผ่าน'");
      return;
    }

    setIsSaveModalOpen(true);
  }

  const confirmSaveData = async () => {
    setIsSaveModalOpen(false);

    // Decide final pass/fail for this committee
    const anyFail = results.some((r) => r.status === "fail");
    const finalStatus = anyFail ? "ไม่อนุมัติ" : "อนุมัติ";

    if (!approvalId) {
      alert("No approval row found or none created for this candidate!");
      return;
    }

    try {
      const payload = {
        status: finalStatus,
        verificationDetails: results,
        comment: "", // optional
        isSigned: true,
      };
      const response = await updateCommitteeApproval(approvalId, payload);

      // response.data => { message, data: { ...updatedRow } }
      const updatedRow = response.data; // or response.data.data
      if (updatedRow.approval_id) {
        setApprovalStatus(updatedRow.approval_status);
        setIsEditing(false);
      }
      alert(`เปลี่ยนสถานะสมาชิกเป็น ${updatedRow.approval_status}`);
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  function handleClearAll() {
    setResults(qualification.map(() => ({ status: "", comment: "" })));
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteData = () => {
    setIsDeleteModalOpen(false); // Close modal
    alert("ลบข้อมูล clicked!");
  };

  return (
    <div className="w-full">
      <div className="bg-gray-200 overflow-hidden rounded-xl mt-12 relative p-8">
        {/* Edit button if they've already submitted */}
        {!isEditing &&
          (approvalStatus === "อนุมัติ" || approvalStatus === "ไม่อนุมัติ") && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg px-4 py-2"
            >
              แก้ไขข้อมูล
            </button>
          )}

        <p className="block mt-4 mb-10 text-xl leading-tight font-bold text-grey-600">
          ตรวจสอบเอกสารตามคุณสมบัติ ( โปรดเลือกให้ครบถ้วน )
        </p>

        {qualification.map((item, index) => (
          <div key={index} className="mb-6">
            <p className="block mt-8 mb-4 text-lg leading-tight font-medium text-gray-900">
              {item.topic}
            </p>
            <div className="flex gap-12">
              {/* Pass */}
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  name={`topic_${index}`}
                  disabled={!isEditing}
                  checked={results[index].status === "pass"}
                  onChange={() => handleRadioChange(index, "pass")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label className="ms-2 text-m font-medium text-gray-900">
                  ผ่านคุณสมบัติ
                </label>
              </div>
              {/* Fail */}
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  name={`topic_${index}`}
                  disabled={!isEditing}
                  checked={results[index].status === "fail"}
                  onChange={() => handleRadioChange(index, "fail")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label className="ms-2 text-m font-medium text-gray-900">
                  ไม่ผ่านคุณสมบัติ
                </label>
              </div>
            </div>

            {/* หมายเหตุ text area */}
            {results[index].status === "fail" && (
              <div className="mt-2">
                <label className="block mb-1 text-gray-700">หมายเหตุ:</label>
                <textarea
                 className={`border rounded p-2 w-full transition-colors duration-200
                  ${!isEditing ? "bg-gray-300 text-gray-600" : "bg-white text-black"}
                `}
                  rows={3}
                  disabled={!isEditing}
                  value={results[index].comment || ""} 
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save / Clear / Delete buttons */}
      <div className="relative mt-14 flex justify-center gap-4">
        {(approvalStatus === "รอการพิจารณา" || isEditing) && (
          <>
            <button
              type="button"
              onClick={handleSendData}
              disabled={!isAllSelected}
              className="text-white bg-lime-800 hover:bg-lime-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-5 py-2.5"
            >
              บันทึกข้อมูล
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2.5"
            >
              ล้างการตรวจสอบ
            </button>
          </>
        )}

        {approvalStatus === "ไม่อนุมัติ" && !isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2.5"
          >
            ลบข้อมูล
          </button>
        )}
      </div>

      {/* Confirm Modals */}
      <ConfirmModal
        isOpen={isSaveModalOpen}
        title="ยืนยันการบันทึกข้อมูล"
        description="คุณต้องการบันทึกข้อมูลนี้หรือไม่?"
        onConfirm={confirmSaveData}
        onCancel={() => setIsSaveModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="ยืนยันการลบข้อมูล"
        description="คุณต้องการลบข้อมูลนี้หรือไม่?"
        onConfirm={confirmDeleteData}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

export default CommitteeVerification;
