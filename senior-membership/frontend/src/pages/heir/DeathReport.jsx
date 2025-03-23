import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import axios from "axios";
import { getMembersForHeir } from "../../api/heirApi";
import { submitDeathReport } from "../../api/deathApi";
import { validateDeathReport } from "../authen/Validation";
import { Formik, Form } from "formik";
import FileUpload from "../../components/FileUpload";


function StatusPage() {
    return (
        
        <div className="p-12 sm:ml-64">
            <div class="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
                ท่านกรอกฟอร์มแจ้งเสียชีวิตเสร็จสิ้นแล้ว
            </div>

            <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
                <div class="p-6">
                    <div class="flex items-center">
                        <div class="text-base text-black font-bold me-2">สถานะของการแจ้งเสียชีวิต:</div>
                        <div class="text-base text-black">กำลังดำเนินการ</div>
                    </div>
                </div>

            </div>

        </div>
    )
}
function DeathReport() {
  const [isChecked, setIsChecked] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [member, setMember] = useState(null); // Ensure it's initialized as null
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserRoleId(data.role_id);

      if (data.role !== "heir") {
        navigate("/login"); // Redirect if not an heir
      } else {
        fetchMember(data.role_id);
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  const fetchMember = async (heirId) => {
    try {
        // Query your members table for the member linked to this heir
        const fetchedMember = await getMembersForHeir(heirId);
        setMember(fetchedMember || {});  // fallback to empty if none
  
        // Check status: has this heir already submitted a death report?
        const statusRes = await axios.get(
          `http://localhost:3000/api/death-report/check-status/${heirId}`
        );
        // Suppose the response is { alreadySubmitted: boolean }
        setAlreadySubmitted(statusRes.data.alreadySubmitted);
      } catch (error) {
        console.error("Error fetching member / status:", error);
        setMember({});
      } finally {
        setLoading(false);
      }
    };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleFormSubmission = async (values) => {
    try {
      const formData = new FormData();
      formData.append("member_id", member.member_id); // from getMembersForHeir
      formData.append("heir_id", userRoleId);         // numeric heir ID
      formData.append("death_date", values.death_date);
      formData.append("death_certificate", values.death_certificate);
      formData.append("death_house_registration", values.death_house_registration);

      await axios.put("http://localhost:3000/api/death-report/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("แจ้งเสียชีวิตสำเร็จ!");
      setAlreadySubmitted(true); // Immediately show the status page
      // Optionally: navigate("/");
    } catch (error) {
      console.error("Error submitting death report:", error);
      alert("มีข้อผิดพลาดในการแจ้งเสียชีวิต");
    }
  };


  // ✅ **Prevent Render Errors** - Show Loading if `member` is null or empty
  if (!member || Object.keys(member).length === 0) {
    return <div className="text-center p-12 text-xl">กำลังโหลดข้อมูล...</div>;
  }

  if (alreadySubmitted) {
    return <StatusPage />;
  }

  return (
    <div className="p-12 sm:ml-64">
      <div className="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
        ฟอร์มแจ้งเสียชีวิต
      </div>

      <div className="mb-8 overflow-hidden">
        <div className="bg-gray-50 overflow-hidden rounded-xl shadow-xl mt-12">
          <div className="p-12">
            <Formik
              initialValues={{
                death_date: "",
                death_certificate: null,
                death_house_registration: null,
              }}
              validationSchema={validateDeathReport}
              onSubmit={handleFormSubmission}
            >
              {({  values, setFieldValue, errors, touched }) => (
                <Form>
                  {/* Member Details (Readonly) */}
                  <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        เลขรหัสสมาชิก
                      </label>
                      <input
                        type="text"
                        value={member?.member_id || "N/A"}
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
                        value={member?.member_name || "N/A"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        วัน/เดือน/ปี ที่เสียชีวิตตามใบมรณบัตร
                      </label>
                      <input
                        type="date"
                        name="death_date"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                          errors.death_date && touched.death_date
                            ? "border-red-500"
                            : ""
                        }`}
                        onChange={(event) =>
                          setFieldValue("death_date", event.target.value)
                        }
                      />
                      {errors.death_date && touched.death_date && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.death_date}
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="h-px my-8 bg-gray-200 border-0"></hr>

                  {/* File Uploads */}
                  <FileUpload
                    label="สำเนาใบมรณบัตรของผู้เสียชีวิต"
                    name="death_certificate"
                    value={values.death_certificate}
                    onChange={(file) =>
                      setFieldValue("death_certificate", file)
                    }
                    error={errors.death_certificate}
                    touched={touched.death_certificate}
                  />

                  <FileUpload
                    label="สำเนาทะเบียนบ้านของผู้เสียชีวิต ที่ประทับตราคำว่า 'ตาย'"
                    name="death_house_registration"
                    value={values.death_house_registration}
                    onChange={(file) =>
                      setFieldValue("death_house_registration", file)
                    }
                    error={errors.death_house_registration}
                    touched={touched.death_house_registration}
                  />

                  <div className="relative mt-14 flex justify-center items-center">
                    <button
                      type="submit"
                      className="focus:outline-none text-white font-medium rounded-lg text-base px-5 py-2.5 bg-lime-800 hover:bg-lime-700"
                    >
                      ส่งข้อมูล
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeathReport;
