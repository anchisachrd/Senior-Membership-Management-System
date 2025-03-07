import express from 'express'
import cors from 'cors'
import candidateRoutes from "./routes/candidateRoute.js"
import approvalRoutes from "./routes/approvalRoutes.js"
import bcrypt from "bcrypt"
import path from 'path';
import slipRoutes from "./routes/slipRoutes.js"; // <--- Import slipRoutes
import authRoutes from "./routes/authRoutes.js" // <-- login




const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



// Candidate routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/approval-details', approvalRoutes);
// ✅ เพิ่ม slipRoutes ใน app.js
app.use('/api/members', slipRoutes);
// Login
app.use('/api/login', authRoutes);

// Optional: Serve files from the upload folder (if you want direct access to them)

// ให้เข้าถึงโฟลเดอร์ register-docs ผ่าน URL เริ่มต้นด้วย /upload
app.use(
  '/documents',
  express.static(path.join(process.cwd(), 'src', 'uploads', 'register-docs'))
);

// ให้เข้าถึงโฟลเดอร์ slips ผ่าน URL เริ่มต้นด้วย /slips
app.use(
  '/slips',
  express.static(path.join(process.cwd(), 'src', 'uploads', 'slips'))
);



// Error-handling for Multer or custom errors (optional)
app.use((err, req, res, next) => {
  if (err.message.includes('Invalid file type')) {
    // fileFilter error
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
});


app.listen(port, () => {
    console.log("listening laew")
});


