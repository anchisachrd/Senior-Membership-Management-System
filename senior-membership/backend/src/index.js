import express from 'express'
import cors from 'cors'
import candidateRoutes from "./routes/candidateRoute.js"
import approvalRoutes from "./routes/approvalRoutes.js"
import bcrypt from "bcrypt"
import path from 'path';
import authRoutes from "./routes/authRoutes.js" // <-- login
import memberRoutes from './routes/memberRoutes.js'
import heirRoutes from './routes/heirRoutes.js'
import deathReportRoutes from './routes/deathReportRoutes.js'
import clubSummaryRoutes from './routes/clubSummaryRoutes.js'
import cookieParser from 'cookie-parser'
import employeeRoutes from './routes/employeeRoutes.js'
import notiRoutes from './routes/notiRoutes.js'


const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// Candidate routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/approval-details', approvalRoutes);
// ✅ เพิ่ม slipRoutes ใน app.js
app.use('/api/members', memberRoutes );
app.use('/api/heirs', heirRoutes);
app.use('/api/death-report', deathReportRoutes);
app.use('/api/club', clubSummaryRoutes);
// Login
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/noti', notiRoutes);

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

app.use(
  '/death-docs',
  express.static(path.join(process.cwd(), 'src', 'uploads', 'death-docs'))
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


