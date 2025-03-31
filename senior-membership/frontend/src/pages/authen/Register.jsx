import React, { useState } from "react";
import { FaCircleCheck, FaRegEye, FaRegFile } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { LuFile } from "react-icons/lu";
import { Link } from "react-router";
// Import the API helper
import { createCandidate } from "../../api/candidateApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaStep1, validationSchemaStep2 } from "./Validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../../components/FileUpload";

// Define the provinces as a reusable array
const provinces = [
  "กระบี่",
  "กรุงเทพมหานคร",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงราย",
  "เชียงใหม่",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บึงกาฬ",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พะเยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยโสธร",
  "ยะลา",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อำนาจเจริญ",
  "อุดรธานี",
  "อุตรดิตถ์",
  "อุทัยธานี",
  "อุบลราชธานี",
];

const jobs = [
  "ข้าราชการ",
  "พนักงานราชการ",
  "พนักงานกระทรวง",
  "ลูกจ้างชั่วคราว",
  "อื่นๆ",
];

const relationships = [
  "บุตร",
  "คู่สมรส",
  "บิดา",
  "มารดา",
  "พี่น้องร่วมบิดามารดาเดียวกัน",
];

// =============== STEP 1: Candidate Page ===============
function RegisterPage1({ values, errors, touched, setFieldValue }) {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFieldValue(name, files[0]);
  };

  return (
    <div>
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl font-bold text-grey-600">
            1. ข้อมูลส่วนตัวของผู้สมัคร
          </p>

          <div class="grid gap-6 mb-6 md:grid-cols-3">
            {/* Title */}
            <div>
              <label
                htmlFor="candidate_title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                คำนำหน้า
              </label>
              <Field
                as="select"
                name="candidate_title"
                id="candidate_title"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.candidate_title && touched.candidate_title
                      ? "border-none bg-red-100 text-gray-500"
                      : values.candidate_title === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="" hidden>
                  เลือกคำนำหน้า
                </option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </Field>
              <ErrorMessage
                name="candidate_title"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* First Name */}
            <div>
              <label
                htmlFor="candidate_first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ชื่อจริง
              </label>
              <Field
                type="text"
                name="candidate_first_name"
                id="candidate_first_name"
                className={`bg-light ${
                  errors.candidate_first_name && touched.candidate_first_name
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกชื่อของผู้สมัคร"
              />
              <ErrorMessage
                name="candidate_first_name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="candidate_last_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                นามสกุล
              </label>
              <Field
                type="text"
                name="candidate_last_name"
                id="candidate_last_name"
                className={`bg-light ${
                  errors.candidate_last_name && touched.candidate_last_name
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกนามสกุลของผู้สมัคร"
              />
              <ErrorMessage
                name="candidate_last_name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* National ID */}
            <div>
              <label
                htmlFor="candidate_national_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                เลขบัตรประชาชน
              </label>
              <Field
                type="text"
                name="candidate_national_id"
                id="candidate_national_id"
                className={`bg-light ${
                  errors.candidate_national_id && touched.candidate_national_id
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกเลขบัตรประชาชน"
              />
              <ErrorMessage
                name="candidate_national_id"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* DOB */}
            <div>
              <label
                htmlFor="candidate_dob"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                วัน/เดือน/ปี เกิด
              </label>
              <Field
                type="date"
                name="candidate_dob"
                id="candidate_dob"
                className={`bg-light ${
                  errors.candidate_dob && touched.candidate_dob
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              {/* <Field name="candidate_dob">
                {({ field, form }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      form.setFieldValue("candidate_dob", date)
                    }
                    placeholderText="วว/ดด/ปป"
                    dateFormat="dd/MM/yyyy"
                    class={`bg-light  text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
          ${form.errors.candidate_dob && form.touched.candidate_dob
                        ? "bg-red-100"
                        : "border border-gray-400 text-black"
                      }`}
                  />
                )}
              </Field> */}
              <ErrorMessage
                name="candidate_dob"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="candidate_gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <Field
                as="select"
                name="candidate_gender"
                id="candidate_gender"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.candidate_dob && touched.candidate_dob
                      ? "border-none bg-red-100 text-gray-500"
                      : values.candidate_dob === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="" hidden>
                  เลือกเพศ
                </option>
                <option value="M">ชาย</option>
                <option value="F">หญิง</option>
              </Field>
              <ErrorMessage
                name="candidate_gender"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* Occupation & Phone */}
          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="candidate_occupation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                อาชีพ
              </label>
              <Field
                as="select"
                name="candidate_occupation"
                id="candidate_occupation"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.candidate_occupation && touched.candidate_occupation
                      ? "border-none bg-red-100 text-gray-500"
                      : values.candidate_occupation === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="" hidden>
                  เลือกอาชีพ
                </option>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="candidate_occupation"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="candidate_phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                หมายเลขโทรศัพท์
              </label>
              <Field
                type="text"
                name="candidate_phone"
                id="candidate_phone"
                className={`bg-light ${
                  errors.candidate_phone && touched.candidate_phone
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกหมายเลขโทรศัพท์"
              />
              <ErrorMessage
                name="candidate_phone"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="candidate_email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              อีเมล
            </label>
            <Field
              type="email"
              name="candidate_email"
              id="candidate_email"
              className={`bg-light ${
                errors.candidate_email && touched.candidate_email
                  ? "bg-red-100"
                  : "border border-gray-400"
              } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="กรอกอีเมลของผู้สมัคร"
            />
            <ErrorMessage
              name="candidate_email"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          {/* Password / Confirm Password */}
          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="candidate_password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                รหัสผ่าน
              </label>
              <Field
                type="password"
                name="candidate_password"
                id="candidate_password"
                className={`bg-light ${
                  errors.candidate_password && touched.candidate_password
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกรหัสผ่าน"
              />
              <ErrorMessage
                name="candidate_password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="candidate_confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ยืนยันรหัสผ่าน
              </label>
              <Field
                type="password"
                name="candidate_confirm_password"
                id="candidate_confirm_password"
                className={`bg-light ${
                  errors.candidate_confirm_password &&
                  touched.candidate_confirm_password
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกรหัสผ่านให้ตรงกัน"
              />
              <ErrorMessage
                name="candidate_confirm_password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

          {/* Address */}
          <p className="block mb-5 text-base font-bold text-grey-600">
            ที่อยู่ปัจจุบัน
          </p>

          {/* HouseNumber, Moo, Soi */}
          <div class="grid gap-6 mb-5 md:grid-cols-3">
            <div>
              <label
                htmlFor="candidate_house_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                บ้านเลขที่
              </label>
              <Field
                type="text"
                name="candidate_house_number"
                id="candidate_house_number"
                className={`bg-light ${
                  errors.candidate_house_number &&
                  touched.candidate_house_number
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_house_number"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="candidate_moo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                หมู่ที่
              </label>
              <Field
                type="text"
                name="candidate_moo"
                id="candidate_moo"
                className={`bg-light ${
                  errors.candidate_moo && touched.candidate_moo
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_moo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="candidate_soi"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ซอย
              </label>
              <Field
                type="text"
                name="candidate_soi"
                id="candidate_soi"
                className={`bg-light ${
                  errors.candidate_soi && touched.candidate_soi
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_soi"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* Street, Subdistrict, District, Province, Postal */}
          <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="candidate_street"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ถนน
              </label>
              <Field
                type="text"
                name="candidate_street"
                id="candidate_street"
                className={`bg-light ${
                  errors.candidate_street && touched.candidate_street
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_street"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="candidate_subdistrict"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำบล/แขวง
              </label>
              <Field
                type="text"
                name="candidate_subdistrict"
                id="candidate_subdistrict"
                className={`bg-light ${
                  errors.candidate_subdistrict && touched.candidate_subdistrict
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_subdistrict"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="candidate_district"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                อำเภอ/เขต
              </label>
              <Field
                type="text"
                name="candidate_district"
                id="candidate_district"
                className={`bg-light ${
                  errors.candidate_district && touched.candidate_district
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_district"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="candidate_province"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                จังหวัด
              </label>
              <Field
                as="select"
                name="candidate_province"
                id="candidate_province"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.candidate_province && touched.candidate_province
                      ? "border-none bg-red-100 text-gray-500"
                      : values.candidate_province === ""
                      ? "text-gray-500"
                      : "text-black"
                  }`}
              >
                <option value="">เลือกจังหวัด</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="candidate_province"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* Postal Code */}
          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label
                htmlFor="candidate_postal_code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                รหัสไปรษณีย์
              </label>
              <Field
                type="text"
                name="candidate_postal_code"
                id="candidate_postal_code"
                className={`bg-light ${
                  errors.candidate_postal_code && touched.candidate_postal_code
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="candidate_postal_code"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* House Registration Upload */}
          <FileUpload
            label="สำเนาทะเบียนบ้าน"
            name="candidate_house_registration"
            value={values.candidate_house_registration}
            onChange={(file) =>
              setFieldValue("candidate_house_registration", file)
            }
            error={errors.candidate_house_registration}
            touched={touched.candidate_house_registration}
          />

          {/* ID Card Upload */}
          <FileUpload
            label="สำเนาบัตรประชาชน"
            name="candidate_id_card"
            value={values.candidate_id_card}
            onChange={(file) =>
              setFieldValue("candidate_id_card", file)
            }
            error={errors.candidate_id_card}
            touched={touched.candidate_id_card}
          />

          {/* Rename Document Upload */}
          <FileUpload
            label="ใบเปลี่ยนชื่อ (ถ้ามี)"
            name="candidate_rename_doc"
            value={values.candidate_rename_doc}
            onChange={(file) =>
              setFieldValue("candidate_rename_doc", file)
            }
            error={errors.candidate_rename_doc}
            touched={touched.candidate_rename_doc}
          />

          {/* Medical Certificate Upload */}
          <FileUpload
            label="ใบรับรองแพทย์"
            name="candidate_med_certification"
            value={values.candidate_med_certification}
            onChange={(file) =>
              setFieldValue("candidate_med_certification", file)
            }
            error={errors.candidate_med_certification}
            touched={touched.candidate_med_certification}
          />
        </div>
      </div>
    </div>
  );
}

// =============== STEP 2: Heir Page ===============
function RegisterPage2({ values, setFieldValue, errors, touched }) {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFieldValue(name, files[0]);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFieldValue(name, checked);

    if (name === "sameAddress" && checked) {
      // Copy address from candidate to heir
      setFieldValue("heir_house_number", values.candidate_house_number);
      setFieldValue("heir_moo", values.candidate_moo);
      setFieldValue("heir_soi", values.candidate_soi);
      setFieldValue("heir_street", values.candidate_street);
      setFieldValue("heir_subdistrict", values.candidate_subdistrict);
      setFieldValue("heir_district", values.candidate_district);
      setFieldValue("heir_province", values.candidate_province);
      setFieldValue("heir_postal_code", values.candidate_postal_code);
    } else if (name === "sameAddress" && !checked) {
      // Clear heir address fields
      setFieldValue("heir_house_number", "");
      setFieldValue("heir_moo", "");
      setFieldValue("heir_soi", "");
      setFieldValue("heir_street", "");
      setFieldValue("heir_subdistrict", "");
      setFieldValue("heir_district", "");
      setFieldValue("heir_province", "");
      setFieldValue("heir_postal_code", "");
    }
  };

  return (
    <div>
      {/* Personal Information of Heir */}
      <div class="bg-gray-50 overflow-hidden rounded-xl shadow-xl">
        <div class="p-8">
          <p class="block mt-1 mb-7 text-xl font-bold text-grey-600">
            3. ข้อมูลส่วนตัวของทายาท
          </p>

          {/* Heir Title, First Name, Last Name */}
          <div class="grid gap-6 mb-6 md:grid-cols-3">
            {/* Heir Title */}
            <div>
              <label
                htmlFor="heir_title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                คำนำหน้า
              </label>
              <Field
                as="select"
                name="heir_title"
                id="heir_title"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.heir_title && touched.heir_title
                      ? "border-none bg-red-100 text-gray-500"
                      : values.heir_title === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option className="text-gray-100" value="">
                  เลือกคำนำหน้า
                </option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </Field>
              <ErrorMessage
                name="heir_title"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir First Name */}
            <div>
              <label
                htmlFor="heir_first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ชื่อจริง
              </label>
              <Field
                type="text"
                name="heir_first_name"
                id="heir_first_name"
                className={`bg-light ${
                  errors.heir_first_name && touched.heir_first_name
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกชื่อของทายาท"
              />
              <ErrorMessage
                name="heir_first_name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Last Name */}
            <div>
              <label
                htmlFor="heir_last_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                นามสกุล
              </label>
              <Field
                type="text"
                name="heir_last_name"
                id="heir_last_name"
                className={`bg-light ${
                  errors.heir_last_name && touched.heir_last_name
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกนามสกุลของทายาท"
              />
              <ErrorMessage
                name="heir_last_name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir National ID */}
            <div>
              <label
                htmlFor="heir_national_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                เลขบัตรประชาชน
              </label>
              <Field
                type="text"
                name="heir_national_id"
                id="heir_national_id"
                className={`bg-light ${
                  errors.heir_national_id && touched.heir_national_id
                    ? " bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="กรอกเลขบัตรประชาชน"
              />
              <ErrorMessage
                name="heir_national_id"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir DOB */}
            <div>
              <label
                htmlFor="heir_dob"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                วัน/เดือน/ปี เกิด
              </label>
              <Field
                type="date"
                name="heir_dob"
                id="heir_dob"
                className={`bg-light ${
                  errors.heir_dob && touched.heir_dob
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage
                name="heir_dob"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Gender */}
            <div>
              <label
                htmlFor="heir_gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <Field
                as="select"
                name="heir_gender"
                id="heir_gender"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.heir_gender && touched.heir_gender
                      ? "border-none bg-red-100 text-gray-500"
                      : values.heir_gender === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="">เลือกเพศ</option>
                <option value="M">ชาย</option>
                <option value="F">หญิง</option>
              </Field>
              <ErrorMessage
                name="heir_gender"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* Heir Occupation, Relationship, Phone, Email */}
          <div class="grid gap-6 mb-3 md:grid-cols-2">
            {/* Heir Occupation */}
            <div>
              <label
                htmlFor="heir_occupation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                อาชีพ
              </label>
              <Field
                as="select"
                name="heir_occupation"
                id="heir_occupation"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.heir_occupation && touched.heir_occupation
                      ? "border-none bg-red-100 text-gray-500"
                      : values.heir_occupation === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="">เลือกอาชีพ</option>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="heir_occupation"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Relationship */}
            <div>
              <label
                htmlFor="heir_relationship"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ความเกี่ยวข้อง
              </label>
              <Field
                as="select"
                name="heir_relationship"
                id="heir_relationship"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.heir_relationship && touched.heir_relationship
                      ? "border-none bg-red-100 text-gray-500"
                      : values.heir_relationship === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
              >
                <option value="">เลือกความเกี่ยวข้อง</option>
                {relationships.map((relationship) => (
                  <option key={relationship} value={relationship}>
                    {relationship}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="heir_relationship"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Phone */}
            <div>
              <label
                htmlFor="heir_phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                หมายเลขโทรศัพท์
              </label>
              <Field
                type="text"
                name="heir_phone"
                id="heir_phone"
                className={`bg-light ${
                  errors.heir_phone && touched.heir_phone
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="หมายเลขโทรศัพท์"
              />
              <ErrorMessage
                name="heir_phone"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Email */}
            <div>
              <label
                htmlFor="heir_email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                อีเมล
              </label>
              <Field
                type="email"
                name="heir_email"
                id="heir_email"
                className={`bg-light ${
                  errors.heir_email && touched.heir_email
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="อีเมล"
              />
              <ErrorMessage
                name="heir_email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />

          {/* Heir Address */}
          <p className="block mb-5 text-base font-bold text-grey-600">
            ที่อยู่ปัจจุบัน
          </p>

          {/* Checkbox - same address */}
          <div class="mb-5">
            <label class="inline-flex items-center">
              <Field
                type="checkbox"
                name="sameAddress"
                checked={values.sameAddress}
                onChange={handleCheckboxChange}
                class="mr-2"
              />
              <span class="text-sm font-bold text-gray-900">
                ที่อยู่ปัจจุบันเหมือนกับผู้สมัคร
              </span>
            </label>
          </div>

          {/* Heir Address Fields */}
          <div class="grid gap-6 mb-5 md:grid-cols-3">
            {/* Heir House Number */}
            <div>
              <label
                htmlFor="heir_house_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                บ้านเลขที่
              </label>
              <Field
                type="text"
                name="heir_house_number"
                id="heir_house_number"
                className={`bg-light ${
                  errors.heir_house_number && touched.heir_house_number
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_house_number"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Moo */}
            <div>
              <label
                htmlFor="heir_moo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                หมู่ที่
              </label>
              <Field
                type="text"
                name="heir_moo"
                id="heir_moo"
                className={`bg-light ${
                  errors.heir_moo && touched.heir_moo
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_moo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Soi */}
            <div>
              <label
                htmlFor="heir_soi"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ซอย
              </label>
              <Field
                type="text"
                name="heir_soi"
                id="heir_soi"
                className={`bg-light ${
                  errors.heir_soi && touched.heir_soi
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_soi"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <div class="grid gap-6 mb-4 md:grid-cols-2">
            {/* Heir Street */}
            <div>
              <label
                htmlFor="heir_street"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ถนน
              </label>
              <Field
                type="text"
                name="heir_street"
                id="heir_street"
                className={`bg-light ${
                  errors.heir_street && touched.heir_street
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_street"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Subdistrict */}
            <div>
              <label
                htmlFor="heir_subdistrict"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำบล/แขวง
              </label>
              <Field
                type="text"
                name="heir_subdistrict"
                id="heir_subdistrict"
                className={`bg-light ${
                  errors.heir_subdistrict && touched.heir_subdistrict
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_subdistrict"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir District */}
            <div>
              <label
                htmlFor="heir_district"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                อำเภอ/เขต
              </label>
              <Field
                type="text"
                name="heir_district"
                id="heir_district"
                className={`bg-light ${
                  errors.heir_district && touched.heir_district
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_district"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Heir Province */}
            <div>
              <label
                htmlFor="heir_province"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                จังหวัด
              </label>
              <Field
                as="select"
                name="heir_province"
                id="heir_province"
                className={`bg-light border border-gray-400 text-sm rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500
                  ${
                    errors.heir_province && touched.heir_province
                      ? "border-none bg-red-100 text-gray-500"
                      : values.heir_province === ""
                      ? "text-gray-400"
                      : "text-black"
                  }`}
                disabled={values.sameAddress}
              >
                <option value="">เลือกจังหวัด</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="heir_province"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          <div class="grid gap-6 mb-3 md:grid-cols-2">
            {/* Heir Postal Code */}
            <div>
              <label
                htmlFor="heir_postal_code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                รหัสไปรษณีย์
              </label>
              <Field
                type="text"
                name="heir_postal_code"
                id="heir_postal_code"
                className={`bg-light ${
                  errors.heir_postal_code && touched.heir_postal_code
                    ? "bg-red-100"
                    : "border border-gray-400"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                disabled={values.sameAddress}
              />
              <ErrorMessage
                name="heir_postal_code"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>

          {/* House Registration Upload */}
          <FileUpload
            label="สำเนาทะเบียนบ้าน"
            name="heir_house_registration"
            value={values.heir_house_registration}
            onChange={(file) => setFieldValue("heir_house_registration", file)}
            error={errors.heir_house_registration}
            touched={touched.heir_house_registration}
          />

          {/* ID Card Upload */}
          <FileUpload
            label="สำเนาบัตรประชาชน"
            name="heir_id_card"
            value={values.heir_id_card}
            onChange={(file) => setFieldValue("heir_id_card", file)}
            error={errors.heir_id_card}
            touched={touched.heir_id_card}
          />

          {/* Rename Document Upload */}
          <FileUpload
            label="ใบเปลี่ยนชื่อ (ถ้ามี)"
            name="heir_rename_doc"
            value={values.heir_rename_doc}
            onChange={(file) => setFieldValue("heir_rename_doc", file)}
            error={errors.heir_rename_doc}
            touched={touched.heir_rename_doc}
          />
        </div>
      </div>
    </div>
  );
}

// =============== STEP 3: Confirm Page ===============
function Confirm() {
  return (
    <div className="p-8">
      <div className="max-w-screen-lg mx-auto md:max-w-3xl place-items-center">
        <div className="p-10 bg-white border border-lime-200 rounded-lg shadow dark:bg-lime-600 dark:border-lime-500 overflow-hidden">
          <div className="grid gap-6 md:grid-cols-1 place-items-center">
            <FaCircleCheck
              className="mt-1 w-10 h-10 text-white"
              aria-hidden="true"
            />
            <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              คุณลงทะเบียนชมรมผู้สูงอายุสำเร็จเรียบร้อยแล้ว
            </p>
            <p className="mb-2 font-normal text-white">
              ผลการลงทะเบียนชมรมผู้สูงอายุของคุณ
              ทางชมรมจะแจ้งไปยังอีเมลที่คุณได้กรอกลงไป
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-1 place-items-center">
            <button
              type="button"
              class="text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center me-2 mb-2 mt-5"
            >
              <Link to="/login">กลับไปยังหน้าเข้าสู่ระบบ</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
   
  );
}

// =============== MAIN REGISTER COMPONENT ===============
function Register() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    // Step 1 Fields
    candidate_title: "",
    candidate_first_name: "",
    candidate_last_name: "",
    candidate_national_id: "",
    candidate_dob: "",
    candidate_gender: "",
    candidate_occupation: "",
    candidate_phone: "",
    candidate_email: "",
    candidate_password: "",
    candidate_confirm_password: "",
    candidate_house_number: "",
    candidate_moo: "",
    candidate_soi: "",
    candidate_street: "",
    candidate_subdistrict: "",
    candidate_district: "",
    candidate_province: "",
    candidate_postal_code: "",
    candidate_house_registration: null,
    candidate_id_card: null,
    candidate_rename_doc: null,
    candidate_med_certification: null,

    // Step 2 Fields
    heir_title: "",
    heir_first_name: "",
    heir_last_name: "",
    heir_national_id: "",
    heir_dob: "",
    heir_gender: "",
    heir_occupation: "",
    heir_relationship: "",
    heir_phone: "",
    heir_email: "",
    heir_house_number: "",
    heir_moo: "",
    heir_soi: "",
    heir_street: "",
    heir_subdistrict: "",
    heir_district: "",
    heir_province: "",
    heir_postal_code: "",
    heir_house_registration: null,
    heir_id_card: null,
    heir_rename_doc: null,
    sameAddress: false,
  };

  // Determine current validation schema based on step
  const currentValidationSchema = () => {
    switch (step) {
      case 1:
        return validationSchemaStep1;
      case 2:
        return validationSchemaStep2;
      default:
        return validationSchemaStep1;
    }
  };

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    try {
      const candidateData = {
        title: values.candidate_title,
        first_name: values.candidate_first_name,
        last_name: values.candidate_last_name,
        national_id: values.candidate_national_id,
        dob: values.candidate_dob,
        phone: values.candidate_phone,
        gender: values.candidate_gender,
        occupation: values.candidate_occupation,
        address: {
          house_number: values.candidate_house_number,
          moo: values.candidate_moo,
          soi: values.candidate_soi,
          street: values.candidate_street,
          subdistrict: values.candidate_subdistrict,
          district: values.candidate_district,
          province: values.candidate_province,
          postal_code: values.candidate_postal_code,
        },
        document: {
          house_registration: values.candidate_house_registration,
          id_card: values.candidate_id_card,
          rename_doc: values.candidate_rename_doc,
          med_certification: values.candidate_med_certification,
        },
        account: {
          email: values.candidate_email,
          password: values.candidate_password,
        },
      };

      const heirData = {
        title: values.heir_title,
        first_name: values.heir_first_name,
        last_name: values.heir_last_name,
        national_id: values.heir_national_id,
        dob: values.heir_dob,
        phone: values.heir_phone,
        gender: values.heir_gender,
        occupation: values.heir_occupation,
        relationship: values.heir_relationship,
        address: {
          house_number: values.heir_house_number,
          moo: values.heir_moo,
          soi: values.heir_soi,
          street: values.heir_street,
          subdistrict: values.heir_subdistrict,
          district: values.heir_district,
          province: values.heir_province,
          postal_code: values.heir_postal_code,
        },
        document: {
          house_registration: values.heir_house_registration,
          id_card: values.heir_id_card,
          rename_doc: values.heir_rename_doc,
        },
        account: {
          email: values.heir_email,
          // password: "1235",
        },
        sameAddress: values.sameAddress,
      };

      await createCandidate(candidateData, heirData);
      setStep(3); // Move to confirmation step
    } catch (error) {
      console.error("Error during registration:", error);

      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav class="bg-white">
        <div class="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src="logo.png" class="h-16" alt="Logo" />
        </div>
      </nav>

      {/* Formik Form */}
      {step !== 3 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            validateForm,
            setTouched,
          }) => (
            <Form class="p-8">
              <div class="max-w-screen-lg mx-auto md:max-w-3xl place-items-center">
                <div class="2xl:flex">
                  <div class="ibm-plex-sans-thai-medium">
                    {/* Form Title */}
                    <div class="text-center text-3xl text-black mb-8 font-bold">
                      ลงทะเบียนชมรมผู้สูงอายุ
                    </div>

                    {/* Render Current Step */}
                    {step === 1 && (
                      <RegisterPage1
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {step === 2 && (
                      <RegisterPage2
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                      />
                    )}

                    {/* Navigation Buttons */}
                    <div class="mt-14">
                      <div class="w-full max-w-md mx-auto bg-gray-100 border-2 border-gray-200 rounded-md">
                        <div class="flex items-center justify-between gap-3 p-3 bg-white rounded">
                          {/* Back Button (Hidden on Step 1) */}
                          {step !== 1 ? (
                            <button
                              type="button"
                              onClick={() => setStep(step - 1)}
                              class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                            >
                              <svg
                                class="rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="23"
                                viewBox="0 0 22 23"
                                fill="none"
                              >
                                <path
                                  d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              ย้อนกลับ
                            </button>
                          ) : (
                            <div style={{ width: "95px" }}></div>
                          )}

                          {/* Step Indicators */}
                          <ul class="flex gap-1 items-center">
                            <li
                              className={`w-2 h-2 rounded-full ${
                                step === 1 ? "bg-gray-600" : "bg-gray-300"
                              }`}
                            ></li>
                            <li
                              className={`w-2 h-2 rounded-full ${
                                step === 2 ? "bg-gray-600" : "bg-gray-300"
                              }`}
                            ></li>
                          </ul>

                          {/* Next or Finish Button */}
                          {step < 2 ? (
                            <button
                              type="button"
                              onClick={() => {
                                validateForm().then((errors) => {
                                  // Extract relevant errors for the current step
                                  const stepErrors = Object.keys(errors).filter(
                                    (key) =>
                                      step === 1
                                        ? key.startsWith("candidate")
                                        : key.startsWith("heir")
                                  );
                                  if (stepErrors.length === 0) {
                                    setStep(step + 1);
                                  } else {
                                    // Mark all fields as touched to display errors
                                    setTouched(
                                      Object.keys(errors).reduce((acc, key) => {
                                        acc[key] = true;
                                        return acc;
                                      }, {})
                                    );
                                  }
                                });
                              }}
                              class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                            >
                              หน้าถัดไป
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="23"
                                viewBox="0 0 22 23"
                                fill="none"
                              >
                                <path
                                  d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          ) : (
                            <div>
                              <button
                                type="button"
                                onClick={() => {
                                  validateForm().then((errors) => {
                                    const step2Errors = Object.keys(
                                      errors
                                    ).filter((key) => key.startsWith("heir"));
                                    if (step2Errors.length === 0) {
                                      setIsModalOpen(true);
                                    } else {
                                      setTouched(
                                        Object.keys(errors).reduce(
                                          (acc, key) => {
                                            if (key.startsWith("heir"))
                                              acc[key] = true;
                                            return acc;
                                          },
                                          {}
                                        )
                                      );
                                    }
                                  });
                                }}
                                class="flex items-center gap-1.5 text-base font-medium py-2.5 text-gray-700 hover:text-gray-600"
                              >
                                เสร็จสิ้น
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="23"
                                  viewBox="0 0 22 23"
                                  fill="none"
                                >
                                  <path
                                    d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              {/* Confirmation Modal */}
                              {isModalOpen && (
                                <div
                                  id="popup-modal"
                                  class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                                >
                                  <div class="relative p-4 w-full max-w-md max-h-full">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-100">
                                      {/* Close Button */}
                                      <button
                                        type="button"
                                        class="absolute top-3 end-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                                        onClick={() => setIsModalOpen(false)}
                                      >
                                        <svg
                                          class="w-3 h-3"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 14 14"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                          />
                                        </svg>
                                        <span className="sr-only">
                                          Close modal
                                        </span>
                                      </button>
                                      {/* Modal Content */}
                                      <div class="p-4 md:p-5 text-center">
                                        <svg
                                          class="mx-auto mb-4 text-gray-800 w-12 h-12"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                          />
                                        </svg>
                                        <p class="mb-1 text-lg font-bold text-gray-800">
                                          ยืนยันการลงทะเบียน
                                        </p>
                                        <p class="mb-5 text-base font-normal text-gray-800">
                                          โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน
                                        </p>
                                        {/* Confirm Button */}
                                        <button
                                          type="submit"
                                          class="text-gray-900 bg-white border border-lime-200 hover:bg-lime-100 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                          ยืนยัน
                                        </button>
                                        {/* Cancel Button */}
                                        <button
                                          type="button"
                                          onClick={() => setIsModalOpen(false)}
                                          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white border border-red-200 hover:bg-red-100 rounded-lg"
                                        >
                                          ยกเลิก
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Optional: Display global form submission errors */}
              {errors.global && (
                <div className="mt-4 text-red-500 text-center">
                  {errors.global}
                </div>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <Confirm />
      )}
    </div>
  );
}

export default Register;
