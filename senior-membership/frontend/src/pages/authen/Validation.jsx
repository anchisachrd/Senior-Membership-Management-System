// validationSchemas.js
import * as Yup from 'yup';

// Allowed file types
const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

// Reusable validation for file uploads
const fileValidation = Yup.mixed()
  .required('กรุณาอัพโหลดไฟล์')
  .test(
    "fileType",
    "เฉพาะไฟล์ประเภท PDF, JPG, และ PNG เท่านั้น",
    (value) => value && allowedFileTypes.includes(value.type) // Check MIME type
  )
  // .test(
  //   "fileSize",
  //   "ขนาดไฟล์ต้องไม่เกิน 2MB",
  //   (value) => value && value.size <= 2 * 1024 * 1024 // Check file size 
  // );

// Validation schema for Step 1: Candidate Information
export const validationSchemaStep1 = Yup.object({
//  candidate_title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
//   candidate_first_name: Yup.string().required('กรุณากรอกชื่อ'),
//   candidate_last_name: Yup.string().required('กรุณากรอกนามสกุล'),
//   candidate_national_id: Yup.string()
//     .matches(/^\d{13}$/, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง (13 หลัก)')
//     .required('กรุณากรอกเลขบัตรประชาชน'),
//    candidate_dob: Yup.date().required('กรุณากรอกวันเดือนปีเกิด'),
//   candidate_gender: Yup.string().required('กรุณาเลือกเพศ'),
//   candidate_occupation: Yup.string().required('กรุณาเลือกอาชีพ'),
//   candidate_phone: Yup.string()
//     .matches(/^\d{10,}$/, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
//     .required('กรุณากรอกหมายเลขโทรศัพท์'),
//   candidate_email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
//   candidate_password: Yup.string()
//     .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
//     .required('กรุณากรอกรหัสผ่าน'),
//   candidate_confirm_password: Yup.string()
//     .oneOf([Yup.ref('candidate_password'), null], 'รหัสผ่านไม่ตรงกัน')
//     .required('กรุณายืนยันรหัสผ่าน'),
//   // Address Fields
//   candidate_subdistrict: Yup.string().required('กรุณากรอกตำบล/แขวง'),
//   candidate_district: Yup.string().required('กรุณากรอกอำเภอ/เขต'),
//   candidate_province: Yup.string().required('กรุณาเลือกจังหวัด'),
//   candidate_postal_code: Yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
//   // Document Uploads
//   candidate_house_registration: fileValidation, 
//   candidate_id_card: fileValidation, 
//   candidate_med_certification: fileValidation,
});

// Validation schema for Step 2: Heir Information
export const validationSchemaStep2 = Yup.object({
//   heir_title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
//   heir_first_name: Yup.string().required('กรุณากรอกชื่อของทายาท'),
//   heir_last_name: Yup.string().required('กรุณากรอกนามสกุลของทายาท'),
//   heir_national_id: Yup.string()
//     .matches(/^\d{13}$/, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง (13 หลัก)')
//     .required('กรุณากรอกเลขบัตรประชาชน'),
//   heir_dob: Yup.date().required('กรุณากรอกวันเดือนปีเกิดของทายาท'),
//   heir_gender: Yup.string().required('กรุณาเลือกเพศของทายาท'),
//   heir_occupation: Yup.string().required('กรุณาเลือกอาชีพของทายาท'),
//   heir_relationship: Yup.string().required('กรุณาระบุความสัมพันธ์กับสมาชิก'),
//   heir_phone: Yup.string()
//     .matches(/^\d{10,}$/, 'กรุณากรอกเบอร์โทรศัพท์ของทายาทให้ถูกต้อง')
//     .required('กรุณากรอกหมายเลขโทรศัพท์ของทายาท'),
//   heir_email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมลของทายาท'),
//   // Conditional Address Fields based on sameAddress
//   heir_house_number: Yup.string().required('กรุณากรอกบ้านเลขที่'),
//   heir_moo: Yup.string(),
//   heir_soi: Yup.string(),
//   heir_street: Yup.string(),
//   heir_subdistrict: Yup.string().required('กรุณากรอกตำบล/แขวง'),
//   heir_district: Yup.string().required('กรุณากรอกอำเภอ/เขต'),
//   heir_province: Yup.string().required('กรุณาเลือกจังหวัด'),
//   heir_postal_code: Yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
//   // Document Uploads
//   heir_house_registration: fileValidation, 
//   heir_id_card: fileValidation, 
//   // 'heir_rename_doc' is optional
// });

// export const loginValidationSchema = Yup.object({
//   heir_title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
//   heir_first_name: Yup.string().required('กรุณากรอกชื่อของทายาท'),
//   heir_last_name: Yup.string().required('กรุณากรอกนามสกุลของทายาท'),
//   heir_national_id: Yup.string()
//     .matches(/^\d{13}$/, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง (13 หลัก)')
//     .required('กรุณากรอกเลขบัตรประชาชน'),
//   heir_dob: Yup.date().required('กรุณากรอกวันเดือนปีเกิดของทายาท'),
//   heir_gender: Yup.string().required('กรุณาเลือกเพศของทายาท'),
//   heir_occupation: Yup.string().required('กรุณาเลือกอาชีพของทายาท'),
//   heir_relationship: Yup.string().required('กรุณาระบุความสัมพันธ์กับสมาชิก'),
//   heir_phone: Yup.string()
//     .matches(/^\d{10,}$/, 'กรุณากรอกเบอร์โทรศัพท์ของทายาทให้ถูกต้อง')
//     .required('กรุณากรอกหมายเลขโทรศัพท์ของทายาท'),
//   heir_email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมลของทายาท'),
//   // Conditional Address Fields based on sameAddress
//   heir_house_number: Yup.string().required('กรุณากรอกบ้านเลขที่'),
//   heir_moo: Yup.string(),
//   heir_soi: Yup.string(),
//   heir_street: Yup.string(),
//   heir_subdistrict: Yup.string().required('กรุณากรอกตำบล/แขวง'),
//   heir_district: Yup.string().required('กรุณากรอกอำเภอ/เขต'),
//   heir_province: Yup.string().required('กรุณาเลือกจังหวัด'),
//   heir_postal_code: Yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
//   // Document Uploads
//   heir_house_registration: fileValidation, 
//   heir_id_card: fileValidation, 
//   // 'heir_rename_doc' is optional
});

export const validateDeathReport = Yup.object({
  death_date: Yup.date().required('กรุณาระบุวันเสียชีวิต'),
  death_certificate: fileValidation,
  death_house_registration: fileValidation
  });