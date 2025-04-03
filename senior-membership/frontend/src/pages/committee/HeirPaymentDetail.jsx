import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../api/verifyApi";
import { getHeirDetail } from "../../api/heirApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FileUpload from "../../components/FileUpload";
import ConfirmModal from "../../components/ConfirmModal";

function HeirPaymentDetail() {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const [heir, setHeir] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitFormFunc, setSubmitFormFunc] = useState(null); // store formik submit function

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);

      if (data.role !== "committee") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
    }
  };

  useEffect(() => {
    const fetchHeirName = async () => {
      try {
        const data = await getHeirDetail(memberId);
        setHeir(data);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };
    fetchHeirName();
  }, [userRole]);

  const handleSubmitConfirmed = async (values) => {
    try {
      const formData = new FormData();
      formData.append("proof_path", values.proof_path);
      formData.append("paid_at", values.paid_at);
      formData.append("expense_id", heir.expense_id);
      formData.append("report_id", heir.report_id);

      const response = await fetch(
        "http://localhost:3000/api/club/payment/upload-proof",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Upload success:", result);

      navigate("/notify/death-payment");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="ibm-plex-sans-thai-medium">
      <div className="p-12">
        <div className="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative mt-8">
          <div className="p-8">
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="id_number_heir"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  เลขรหัสทายาท
                </label>
                <input
                  type="text"
                  id="id_number_heir"
                  value={heir?.heir_id || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  htmlFor="full_name_heir"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ชื่อทายาท
                </label>
                <input
                  type="text"
                  id="full_name_heir"
                  value={heir?.heir_name || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  htmlFor="death_day_heir"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ประเภทการชำระเงิน
                </label>
                <input
                  id="death_day_heir"
                  value="โอนเงินสงเคราะห์"
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

            {heir && (
              <Formik
                initialValues={{
                  proof_path: "",
                  amount: heir.amount || "",
                  paid_at: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.proof_path)
                    errors.proof_path = "กรุณาอัปโหลดหลักฐาน";
                  if (!values.paid_at) errors.paid_at = "กรุณาระบุวันเวลา";
                  return errors;
                }}
                onSubmit={(values, formikHelpers) => {
                  // Don't call real submit yet, show modal
                  setSubmitFormFunc(() => () => handleSubmitConfirmed(values));
                  setShowConfirmModal(true);
                }}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form>
                    <div className="grid gap-6 md:grid-cols-1 mb-8">
                      <Field name="proof_path">
                        {() => (
                          <FileUpload
                            label="ไฟล์หลักฐานการชำระเงิน"
                            name="proof_path"
                            value={values.proof_path}
                            onChange={(file) =>
                              setFieldValue("proof_path", file)
                            }
                            error={errors.proof_path}
                            touched={touched.proof_path}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="amount"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          จำนวนเงินค่าสงเคราะห์
                        </label>
                        <Field
                          type="text"
                          name="amount"
                          id="amount"
                          className={`bg-light ${
                            errors.amount && touched.amount
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="paid_at"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          เวลาในการชำระเงิน (เวลาจากหลักฐานการชำระเงิน)
                        </label>
                        <Field
                          type="datetime-local"
                          name="paid_at"
                          id="paid_at"
                          className={`bg-light ${
                            errors.paid_at && touched.paid_at
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="paid_at"
                          component="div"
                          className="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center space-x-2 mt-8">
                      <button
                        type="submit"
                        className={`text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm `}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>

        <ConfirmModal
          isOpen={showConfirmModal}
          title="ยืนยันการชำระเงิน"
          description="โปรดยืนยันว่าคุณต้องการส่งข้อมูลการชำระเงินนี้"
          onConfirm={() => {
            setShowConfirmModal(false);
            if (submitFormFunc) submitFormFunc(); 
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      </div>
    </div>
  );
}

export default HeirPaymentDetail;
