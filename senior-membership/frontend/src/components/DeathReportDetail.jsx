import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentPreview from "./DocumentPreview";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DeathDocPreview from "./DeathDocPreview";
import { submitStaffReview, approveDeathReport } from "../api/deathApi";
import { verifyUser } from "../api/verifyApi";

function DeathReportDetail() {
  const { memberId } = useParams(); // Get the heirId from URL params
  const navigate = useNavigate()
  const [deathReport, setDeathReport] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  useEffect(() => {
    fetchDeathReport();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserRoleId(data.role_id);

      if (data.role !== "staff" && data.role !== "committee") {
        navigate("/login");
      } else {
        fetchDeathReport(data.role_id);
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  const fetchDeathReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/death-report/member/${memberId}`
      );
      console.log("data: ", response.data);
      setDeathReport(response.data);

      // Fetch related documents (death certificate & house registration)
      fetchDocuments(response.data.report_id);
    } catch (error) {
      console.error("Error fetching death report:", error);
    }
  };

  const fetchDocuments = async (reportId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/death-report/${reportId}`
      );
      console.log("data: ", response.data);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  if (!deathReport) {
    return (
      <div className="text-center p-12">
        <p className="text-xl text-red-600">❌ ไม่พบข้อมูลการแจ้งเสียชีวิต</p>
      </div>
    );
  }

  const handleApproveReview = async () => {
    try {
      await submitStaffReview(deathReport.report_id, userRoleId);
      alert("✅ ผ่านการตรวจสอบเรียบร้อยแล้ว");
      navigate("/member-list/notify-death");
    } catch (error) {
      alert("❌ มีข้อผิดพลาดในการส่งผลการตรวจสอบ");
    }
  };

  const handleRejectReview = async() => {
    alert("❌ ไม่ผ่านการตรวจสอบ กรุณาตรวจสอบเอกสารอีกครั้ง");
  };

  const handleCommitteeApprove= async () => {
    try{
    await approveDeathReport(deathReport.report_id)
    alert("✅ ผ่านการตรวจสอบเรียบร้อยแล้ว");
    }catch(error){
      alert("❌ มีข้อผิดพลาดในการส่งผลการตรวจสอบ");
    }
    
  };

  const handleCommitteeReject= () => {
    alert("❌ ไม่ผ่านการตรวจสอบ กรุณาตรวจสอบเอกสารอีกครั้ง");
  };

  const onChangeDate = (data_date) => {
    const dobFromData = new Date(data_date);
    const filterDob = dobFromData.getDate().toString().padStart(2, "0") + "-" +(dobFromData.getMonth() + 1).toString().padStart(2, "0") + "-" + (dobFromData.getFullYear() + 543)
    return filterDob;
  };

  return (
    <div className="w-full">
      <div className="mt-10 mb-8 overflow-hidden">
        <div className="bg-gray-50 overflow-hidden rounded-xl shadow-xl ">
          <div className="p-12">
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  เลขรหัสสมาชิก
                </label>
                <input
                  type="text"
                  value={deathReport?.member_id || "N/A"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  ชื่อผู้เสียชีวิต
                </label>
                <input
                  type="text"
                  value={deathReport?.member_name || "N/A"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  วัน/เดือน/ปี ที่เสียชีวิตตามใบมรณบัตร
                </label>
                <input
                  ttype="text"
                  value={onChangeDate(deathReport?.death_date)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  readOnly
                />
              </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0"></hr>

            <div className="mt-5">
              <DeathDocPreview
                label="สำเนาใบมรณบัตรของผู้เสียชีวิต"
                docPath={documents.death_certificate}
              />
            </div>

            <div className="mt-5">
              <DeathDocPreview
                label='สำเนาทะเบียนบ้านของผู้เสียชีวิต ที่ประทับตราคำว่า "ตาย"'
                docPath={documents.house_registration}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          {userRole === "staff" && (
            <>
              <button onClick={handleApproveReview} className="px-6 py-2 text-white bg-green-600 rounded-lg">ผ่านการตรวจสอบ</button>
              <button onClick={handleRejectReview} className="px-6 py-2 text-white bg-red-600 rounded-lg">ไม่ผ่านการตรวจสอบ</button>
            </>
          )}

          {userRole === "committee" && (
            <>
              <button onClick={handleCommitteeApprove} className="px-6 py-2 text-white bg-green-600 rounded-lg">ผ่านอนุมัติ</button>
              <button onClick={handleCommitteeReject} className="px-6 py-2 text-white bg-red-600 rounded-lg">ไม่ผ่านอนุมัติ</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeathReportDetail;
