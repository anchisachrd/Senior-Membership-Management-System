
import multer from 'multer';
import path from 'path';

// 1) กำหนด diskStorage สำหรับ "เอกสารผู้สมัคร (Candidate Docs)"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // โฟลเดอร์ที่ใช้เก็บเอกสารของ Candidate
    // เช่น uploads/candidate_docs
    cb(null, path.join(process.cwd(), 'src', 'uploads', 'death-docs'));
  },
  filename: (req, file, cb) => {
    // ป้องกันชื่อไฟล์ชนกันด้วย timestamp + originalname
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// 2) สร้าง fileFilter (option ถ้ามีเงื่อนไขเรื่อง mime type)
const fileFilter = (req, file, cb) => {
  // ตัวอย่าง: อนุญาตให้ upload แค่ PDF, JPEG, PNG
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, or PNG is allowed.'), false);
  }
};

// 3) สร้าง multer instance
const docsUpload = multer({
  storage,
  fileFilter,
});

// 4) ถ้าต้องการให้รับหลายฟิลด์ กำหนด fields
export const uploadDeathDocs = docsUpload.fields([

  { name: 'death_certificate', maxCount: 1 },
  { name: 'death_house_registration', maxCount: 1 },

]);
