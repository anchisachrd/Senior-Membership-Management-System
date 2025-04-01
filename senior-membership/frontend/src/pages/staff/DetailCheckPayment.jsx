import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import { getMemberPaymentDetail } from "../../api/memberApi";

function DetailCheckPayment() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;
  const isFromDeath = currentPath.startsWith("/death/payment/detail");
  const memberId = queryParams.get("memberId");
  const [paymentDetail, setPaymentDetail] = useState(null);

  // สำหรับเช็ค role
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserRoleId(data.role_id);

      if (data.role != "staff" && data.role != "member") {
        alert("คุณไม่สามารถเข้าสู่หน้านี้ได้");
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  useEffect(() => {
    fetchSlipDetail();
  }, [memberId, reportId]);

  const fetchSlipDetail = async () => {
    try {
      const res = await getMemberPaymentDetail(memberId, reportId);
      setPaymentDetail(res);
    } catch (err) {
      console.error("Error fetching slip detail:", err);
    }
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className={`p-12 ${isFromDeath ? "" : "sm:ml-64"}`}>
        <div class="text-xl text-black mx-3 mt-5 font-bold">
          รายละเอียดสลิปโอนเงิน
        </div>

        <div class="mb-8 overflow-hidden">
          <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12 relative">
            <div class="p-12">
              {/* ✅ ปุ่มชำระเงินใหม่ */}
              {paymentDetail?.status === "fail" && !isFromDeath && (
                <button
                  onClick={() => navigate(`/submitPayment/${reportId}`)}
                  className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow"
                >
                  ชำระเงินใหม่
                </button>
              )}

              <img
                src={`http://localhost:3000${paymentDetail?.slip_path}`}
                class="w-96 h-auto mx-auto rounded-lg mb-5"
                alt="slip"
              />

              {/* ✅ ผลการตรวจสอบ */}
              <div class="flex justify-center items-center mb-2">
                <div
                  class={`inline-flex text-xl  font-base rounded p-3 ${
                    paymentDetail?.status === "fail"
                      ? "text-red-600"
                      : "text-lime-600"
                  }`}
                >
                  <b class="me-2">ผลการตรวจสอบ:</b>
                  {paymentDetail?.status === "fail"
                    ? "สลิปโอนเงินไม่ถูกต้องเนื่องจาก " +
                        paymentDetail?.error_msg || "-"
                    : "สลิปโอนเงินถูกต้อง"}
                </div>
              </div>

              {/* ✅ รายละเอียด */}
              <div class="text-lg text-black mx-3 mt-6 font-base">
                <b>ชื่อผู้โอนเงิน: </b> {paymentDetail?.sender + "." || "-"}
              </div>
              <div class="text-lg text-black mx-3 mt-3 font-base">
                <b>ธนาคารผู้โอนเงิน: </b> {paymentDetail?.sending_bank || "-"}
              </div>
              <div class="text-lg text-black mx-3 mt-3 font-base">
                <b>วันที่โอนเงิน: </b>
                {paymentDetail?.trans_date
                  ? new Date(paymentDetail.trans_date).toLocaleDateString(
                      "th-TH"
                    )
                  : "-"}
              </div>
              <div class="text-lg text-black mx-3 mt-3 font-base">
                <b>เวลาที่โอนเงิน: </b>
                {paymentDetail?.trans_date
                  ? new Date(paymentDetail.trans_date).toLocaleTimeString(
                      "th-TH",
                      { hour: "2-digit", minute: "2-digit" }
                    ) + " น."
                  : "-"}
              </div>
              <div class="text-lg text-black mx-3 mt-3 font-base">
                <b>จำนวนเงิน: </b> {paymentDetail?.amount || "-"} บาท
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCheckPayment;
