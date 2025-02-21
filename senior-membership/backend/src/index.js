import express from 'express'
import cors from 'cors'
import candidateRoutes from "./routes/candidateRoute.js"
import approvalRoutes from "./routes/approvalRoutes.js"
import bcrypt from "bcrypt"
import path from 'path';
import slipRoutes from "./routes/slipRoutes.js"; // <--- Import slipRoutes





const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Candidate routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/approval-details', approvalRoutes);
// ✅ เพิ่ม slipRoutes ใน app.js
app.use('/api/members', slipRoutes);

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

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Fetch account by email
    const account = await accountModel.getAccountByEmail(email);

    if (!account) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Validate the password
    const isPasswordValid = await bcrypt.compare(password, account.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!account.role === 'candidate') {
      return res.status(400).json({ message: "Not Candidate" });
    }

    // 3. Check if the account is active
    // if (!account.is_active) {
    //   return res.status(403).json({ message: "Account is inactive. Please contact support." });
    // }

    // 4. Generate JWT token
    // const token = jwt.sign(
    //   { accountId: account.account_id, role: account.role },
    //   JWT_SECRET,
    //   { expiresIn: "1h" } // Token expiration time
    // );

    // 5. Return success response with token
    return res.json({
      message: "Login successful",
      // token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "An error occurred during login" });
  }
});




app.listen(port, () => {
    console.log("listening laew")
});
