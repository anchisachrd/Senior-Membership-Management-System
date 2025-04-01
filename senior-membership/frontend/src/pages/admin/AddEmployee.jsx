import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import ConfirmModal from '../../components/ConfirmModal';
import { verifyUser } from "../../api/verifyApi";

function AddEmployee() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => { });

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState('')


  useEffect(() => {
    fetchUserProfile();
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const data = await verifyUser();
      setUserRole(data.role)
      setUserEmail(data.email)


      if (data.role !== 'admin') {
        navigate('/login');
      }


    } catch (error) {
      console.error('Fetch Protected Data Error:', error);
      navigate('/login');
    }
  };

  const AddEmployeeSchema = Yup.object().shape({
    title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
    first_name: Yup.string().required('กรุณากรอกชื่อจริง'),
    last_name: Yup.string().required('กรุณากรอกนามสกุล'),
    position: Yup.string().required('กรุณาตำแหน่งงาน'),
    national_id: Yup.string().required('กรุณากรอกบัตรประชาชน'),
    phone: Yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
    email: Yup.string().required('กรุณากรอกอีเมล'),
  });

  const handleAddEmployee = async (values, { setErrors }) => {

    const data = {
      "title": values.title,
      "first_name": values.first_name,
      "last_name": values.last_name,
      "position": values.position,
      "national_id": values.national_id,
      "phone": values.phone,
      "email": values.email,
      "is_pay": false,
      "type_payment": null
    }

    try {
      const response = await fetch("http://localhost:3000/api/employee/emp-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "เกิดข้อผิดพลาดในการเพิ่มพนักงาน");
      }

      if (response.ok) {
        alert("เพิ่มพนักงานเรียบร้อยแล้ว!");
        navigate('/manage-employee')
      }


    } catch (error) {
      console.error("Add Employee Error:", error.message);
      setErrors({ apiError: error.message });
    }

  }

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
    <div class="ibm-plex-sans-thai-medium">
      <div class="p-12 sm:ml-64">
        <div class="relative mt-8 flex justify-center items-center text-2xl text-black font-bold">
          ฟอร์มเพิ่มพนักงาน
        </div>

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
            title: '',
            first_name: '',
            last_name: '',
            position: '',
            national_id: '',
            phone: '',
            email: '',

          }}
          validationSchema={AddEmployeeSchema}
          onSubmit={(values, { setErrors }) =>
            openModal(
              "ยืนยันการเพิ่มพนักงาน",
              "โปรดตรวจสอบความถูกต้องและครบถ้วนของข้อมูลก่อนกดยืนยัน",
              () => handleAddEmployee(values, { setErrors })
            )}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, isValid, dirty }) => {

            return (
              <Form>
                <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl relative mt-8">
                  <div class='p-12'>
                    <div class="grid gap-6 md:grid-cols-3">
                      <div>
                        <label htmlFor="title" class="block mb-2 text-sm font-medium text-black">
                          คำนำหน้า
                        </label>
                        <Field
                          as='select'
                          name="title"
                          id="title"
                          class={`bg-light border border-gray-400 ${errors.title && touched.title
                            ? " bg-red-100 text-gray-500"
                            : values.title === ""
                              ? "text-gray-400"
                              : "text-black"
                            } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        >
                          <option value="" hidden>
                            เลือกคำนำหน้า
                          </option>
                          <option value="นาย">นาย</option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว">นางสาว</option>
                        </Field>
                        <ErrorMessage name="title" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-black">
                          ชื่อจริง
                        </label>
                        <Field
                          type="text"
                          name="first_name"
                          id="first_name"
                          class={`bg-light ${errors.first_name && touched.first_name ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage name="first_name" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="last_name" class="block mb-2 text-sm font-medium text-black">
                          นามสกุล
                        </label>
                        <Field
                          type="text"
                          name="last_name"
                          id="last_name"
                          class={`bg-light ${errors.last_name && touched.last_name ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage name="last_name" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="national_id" class="block mb-2 text-sm font-medium text-black">
                          เลขบัตรประชาชน
                        </label>
                        <Field
                          type="text"
                          name="national_id"
                          id="national_id"
                          class={`bg-light ${errors.national_id && touched.national_id ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage name="national_id" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="phone" class="block mb-2 text-sm font-medium text-black">
                          เบอร์โทรศัพท์
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          class={`bg-light ${errors.phone && touched.phone ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage name="phone" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="email" class="block mb-2 text-sm font-medium text-black">
                          อีเมล
                        </label>
                        <Field
                          type="text"
                          name="email"
                          id="email"
                          class={`bg-light ${errors.email && touched.email ? "bg-red-100" : "border border-gray-400"} text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        />
                        <ErrorMessage name="email" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="position" class="block mb-2 text-sm font-medium text-black">
                          ตำแหน่ง
                        </label>
                        <Field
                          as='select'
                          name="position"
                          id="position"
                          class={`bg-light border border-gray-400 ${errors.position && touched.position
                            ? " bg-red-100 text-gray-500"
                            : values.position === ""
                              ? "text-gray-400"
                              : "text-black"
                            } text-gray-900 text-sm rounded-lg w-full p-2.5`}
                        >
                          <option value="" hidden>
                            เลือกตำแหน่ง
                          </option>
                          <option value="staff">เจ้าหน้าที่</option>
                          <option value="committee">กรรมการ</option>
                        </Field>
                        <ErrorMessage name="position" component="div" class="text-red-600 text-xs mt-1" />
                      </div>

                    </div>
                    {errors.apiError && (
                      <div class="text-red-500 text-sm mt-2 text-center">{errors.apiError}</div>
                    )}
                  </div>
                </div>
                <div class="flex justify-center space-x-2 p-8 mt-2">
                  <button type="submit" class={`text-white bg-lime-800 hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm 
                                    ${!isValid || !dirty ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!isValid || !dirty}
                  >

                    ยืนยัน
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>

    </div>

  )
}

export default AddEmployee