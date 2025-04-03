import multer from 'multer';
import path from 'path';

// 1) กำหนด diskStorage สำหรับ "สลิปการชำระเงิน (Slip)"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // โฟลเดอร์ที่ใช้เก็บสลิป (เช่น uploads/slips)
    cb(null, path.join(process.cwd(), 'src','uploads', 'death-payment-proof'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// 2) fileFilter 
const fileFilter = (req, file, cb) => {
  // ตัวอย่าง: อนุญาตเฉพาะรูปภาพ
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG or PNG is allowed.'), false);
  }
};

// 3) สร้าง multer instance
const proofUpload = multer({
  storage,
  fileFilter,
});

// 4) Export middleware (สมมติอัปโหลดครั้งละไฟล์เดียว)
export const uploadProof = proofUpload.single('proof_path'); 
