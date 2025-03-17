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
  const [signedAt, setSignedAt] = useState(null);

  //for modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const isAllSelected = results.every(
    (item) =>
      item.status !== "" &&
      (item.status !== "fail" || item.comment.trim() !== "")
  );

  useEffect(() => {
    const fetchApprovalData = async () => {
      try {
        const data = await getMyCommitteeApproval(candidateId, userRoleId);
        console.log("Fetched approval data:", data);

        if (data && data.approvalId) {
          setApprovalId(data.approvalId);
          setApprovalStatus(data.approvalStatus || "รอการพิจารณา");
          setSignedAt(data.signed_at || null);

          // ✅ Ensure verificationDetails is always an array with default structure
          const filledDetails =
            Array.isArray(data.verificationDetails) &&
            data.verificationDetails.length > 0
              ? data.verificationDetails.map((item) => ({
                  status: item.status || "",
                  comment: item.comment || "",
                }))
              : qualification.map(() => ({ status: "", comment: "" }));

          setResults(filledDetails);
        } else {
          setApprovalId(null);
          setApprovalStatus("รอการพิจารณา");
          setSignedAt(null);
          setResults(qualification.map(() => ({ status: "", comment: "" })));
        }
      } catch (err) {
        console.error("Error loading committee approval detail:", err);
        setSignedAt(null);
        setResults(qualification.map(() => ({ status: "", comment: "" })));
      }
    };

    fetchApprovalData();
  }, [candidateId]);

  function handleRadioChange(index, newStatus) {
    if (!(approvalStatus === "รอการพิจารณา" || approvalStatus === "รอการแก้ไข"))
      return; // Disable if already submitted

    setResults((prev) => {
      const updated = [...prev];

      if (newStatus === "fail") {
        updated[index] = {
          status: "fail",
          reason: qualification[index].failReason,
          comment: updated[index].comment || "",
        };
      } else {
        updated[index] = {
          status: "pass",
          reason: null,
          comment: "",
        };
      }
      return updated;
    });
  }

  function handleCommentChange(index, text) {
    if (!(approvalStatus === "รอการพิจารณา" || approvalStatus === "รอการแก้ไข"))
      return;
    setResults((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], comment: text };
      return updated;
    });
  }

  function handleSendData() {
    results.every(
      (item) =>
        item.status !== "" &&
        (item.status !== "fail" || item.comment.trim() !== "")
    );

    setIsSaveModalOpen(true);
  }

  const confirmSaveData = async () => {
    setIsSaveModalOpen(false);

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
        comment: "",
        isSigned: true,
      };
      const response = await updateCommitteeApproval(approvalId, payload);

      const updatedRow = response.data;
      if (updatedRow.approval_id) {
        setApprovalStatus(updatedRow.approval_status);
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gray-200 overflow-hidden rounded-xl mt-12 p-8">
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
                  disabled={
                    !(
                      approvalStatus === "รอการพิจารณา" ||
                      approvalStatus === "รอการแก้ไข"
                    )
                  }
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
                  disabled={
                    !(
                      approvalStatus === "รอการพิจารณา" ||
                      approvalStatus === "รอการแก้ไข"
                    )
                  }
                  checked={results[index].status === "fail"}
                  onChange={() => handleRadioChange(index, "fail")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label className="ms-2 text-m font-medium text-gray-900">
                  ไม่ผ่านคุณสมบัติ
                </label>
              </div>
            </div>

            {results[index].status === "fail" && (
              <div className="mt-2">
                <label className="block mb-1 text-gray-700">หมายเหตุ:</label>
                <textarea
                  className="border rounded p-2 w-full"
                  rows={3}
                  disabled={
                    !(
                      approvalStatus === "รอการพิจารณา" ||
                      approvalStatus === "รอการแก้ไข"
                    )
                  }
                  value={results[index].comment || ""}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {signedAt && (
        <p className="mt-8 text-right text-gray-600">
          <b>บันทึกข้อมูลล่าสุดเมื่อ:</b> {new Date(signedAt).toLocaleString()}
        </p>
      )}

      {/* Save Button (Only shown if still pending) */}
      <div className="relative mt-14 flex justify-center">
        {(approvalStatus === "รอการพิจารณา" ||
          approvalStatus === "รอการแก้ไข") && (
          <button
            type="button"
            onClick={handleSendData}
            disabled={!isAllSelected}
            className="text-white bg-lime-800 hover:bg-lime-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-5 py-2.5"
          >
            บันทึกข้อมูล
          </button>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isSaveModalOpen}
        title="ยืนยันการบันทึกข้อมูล"
        description="หากบันทึกแล้วจะไม่สามารถแก้ไขได้"
        onConfirm={confirmSaveData}
        onCancel={() => setIsSaveModalOpen(false)}
      />
    </div>
  );
}

export default CommitteeVerification;
