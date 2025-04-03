import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import { verifyUser } from "../../api/verifyApi";

function ClubExpense() {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => {});

  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role);
      setUserEmail(data.email);
      setUserRoleId(data.role_id);

      if (data.role !== "committee") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch Protected Data Error:", error);
      navigate("/login");
    }
  };

  const openModal = (title, description, confirmCallback) => {
    setModalTitle(title);
    setModalDescription(description);
    setOnConfirmAction(() => confirmCallback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddClubExpenseSchema = Yup.object().shape({
    proof_path: Yup.mixed().required('กรุณาแนบหลักฐาน'),
    expense_type: Yup.string().required("กรุณาเลือกประเภทการชำระเงิน"),
    note: Yup.string().when("expense_type", {
      is: (expense_type) => expense_type === "ค่าอื่นๆ",
      then: (schema) =>
        schema.required("กรุณากรอกหมายเหตุเมื่อเลือกค่าใช้จ่ายประเภทอื่น ๆ"),
      otherwise: (schema) => schema.notRequired(),
    }),
    amount: Yup.string().required("กรุณากรอกจำนวนเงิน"),
    paid_at: Yup.string().required("กรุณากรอกเวลา"),
  });

  const handleAddClubExpense = async (values, { setErrors }) => {
    try {
      const formData = new FormData();

      formData.append("proof_path", values.proof_path); // file
      formData.append("expense_type", values.expense_type);
      formData.append(
        "note",
        values.expense_type === "ค่าอื่นๆ" ? values.note : ""
      );
      formData.append("amount", values.amount);
      formData.append("paid_at", values.paid_at);
      formData.append("paid_by", userRoleId);

      const response = await fetch(
        "http://localhost:3000/api/club/add-club-expense",
        {
          method: "POST",
          body: formData, // 👈 Important: use FormData directly here
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "เกิดข้อผิดพลาดในการเพิ่มค่าใช้จ่ายทั่วไป"
        );
      }

      alert("เพิ่มค่าใช้จ่ายทั่วไปเรียบร้อยแล้ว!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Add Club Expense Error:", error.message);
      setErrors({ apiError: error.message });
    }
  };

  return (
    <div class="ibm-plex-sans-thai-medium">
      <div class="p-12 sm:ml-64">
        <div class="text-xl text-black mx-3 mt-5 mb-8 font-bold">
          แจ้งชำระค่าใช้จ่ายทั่วไป
        </div>

        <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative mt-8">
          <div class="p-8">
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

            <Formik
              initialValues={{
                proof_path: null,
                amount: "",
                paid_at: "",
                note: null,
                expense_type: "",
              }}
              validationSchema={AddClubExpenseSchema}
              onSubmit={(values, { setErrors }) =>
                openModal(
                  "ยืนยันการแจ้งชำระค่าใช้จ่ายทั่วไป",
                  "โปรดตรวจสอบความถูกต้องและครบถ้วนของข้อมูลก่อนกดยืนยัน",
                  () => handleAddClubExpense(values, { setErrors })
                )
              }
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ values, errors, touched,  setFieldValue }) => {
                return (
                  <Form>
                    <div class="grid gap-6 md:grid-cols-2 mb-5">
                      <div>
                        <label
                          htmlFor="proof_path"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          ไฟล์หลักฐานการชำระเงิน
                        </label>
                        <input
                          type="file"
                          name="proof_path"
                          id="proof_path"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("proof_path", file); // ✅ This is important!
                          }}
                          className={`bg-light ${
                            errors.proof_path && touched.proof_path
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />

                        <ErrorMessage
                          name="proof_path"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="expense_type"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          ประเภทค่าใช้จ่าย
                        </label>
                        <Field
                          as="select"
                          name="expense_type"
                          id="expense_type"
                          class={`bg-light border border-gray-400 ${
                            errors.expense_type && touched.expense_type
                              ? " bg-red-100 text-gray-500"
                              : values.expense_type === ""
                              ? "text-gray-400"
                              : "text-black"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        >
                          <option value="" hidden>
                            เลือกประเภทค่าใช้จ่าย
                          </option>
                          <option value="ค่าสถานที่">ค่าสถานที่</option>
                          <option value="ค่าสาธารณูปโภค">ค่าสาธารณูปโภค</option>
                          <option value="ค่าบำรุงชมรม">ค่าบำรุงชมรม</option>
                          <option value="ค่าอื่นๆ">ค่าอื่นๆ</option>
                        </Field>
                        <ErrorMessage
                          name="expense_type"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>

                    {values.expense_type === "ค่าอื่นๆ" && (
                      <div class="grid gap-6 md:grid-cols-1 mb-5">
                        <div>
                          <label
                            htmlFor="note"
                            class="block mb-2 text-xs font-medium text-gray-600"
                          >
                            หมายเหตุ:
                          </label>
                          <Field
                            type="text"
                            name="note"
                            id="note"
                            placeholder="กรอกหมายเหตุสำหรับค่าอื่น ๆ"
                            class={`bg-light ${
                              errors.note && touched.note
                                ? "bg-red-100"
                                : "border border-gray-400"
                            } text-gray-900 text-xs rounded-lg w-full p-1.5`}
                          />
                          <ErrorMessage
                            name="note"
                            component="div"
                            class="text-red-600 text-xs mt-1"
                          />
                        </div>
                      </div>
                    )}
                    <div class="grid gap-6 md:grid-cols-2 mb-5">
                      <div>
                        <label
                          htmlFor="amount"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          จำนวนเงินที่โอน
                        </label>
                        <Field
                          type="text"
                          name="amount"
                          id="amount"
                          class={`bg-light ${
                            errors.amount && touched.amount
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="amount"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="paid_at"
                          class="block mb-2 text-sm font-medium text-black"
                        >
                          เวลาในการชำระเงิน (เวลาจากหลักฐานการชำระเงิน)
                        </label>
                        <Field
                          type="datetime-local"
                          name="paid_at"
                          id="paid_at"
                          class={`bg-light ${
                            errors.paid_at && touched.paid_at
                              ? "bg-red-100"
                              : "border border-gray-400"
                          } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage
                          name="paid_at"
                          component="div"
                          class="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>

                    {errors.apiError && (
                      <div class="text-red-500 text-sm mt-2 text-center">
                        {errors.apiError}
                      </div>
                    )}
                    <div class="flex justify-center space-x-2 mt-8">
                      <button
                        type="submit"
                        class="text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm"
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubExpense;
