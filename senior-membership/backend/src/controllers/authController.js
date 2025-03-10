import * as authServices from '../services/authServices.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();  

const JWT_SECRET = process.env.JWT_SECRET;


export const loginUserByEmail = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    // 1. Fetch account by email
    const account = await authServices.loginByEmail(email);

    if (!account) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // 2. Validate the password
    const isPasswordValid = await bcrypt.compare(password, account.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // if (!account.role === 'candidate') {
    //   return res.status(400).json({ message: "Not Candidate" });
    // }

    // 3. Check if the account is active
    // if (!account.is_active) {
    //   return res.status(403).json({ message: "Account is inactive. Please contact support." });
    // }

    // 4. Generate JWT token
    const accessToken = jwt.sign(
      {
        "userInfo": {
          "accountId": account.account_id,
          "email": account.email,
          "role": account.role
        }
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    // 5. Return success response with token
    return res.json(
      {
        message: "Login successful"
      }
    );

    req.token = accessToken;
    req.user = {
      accountId: account.account_id,
      email: account.email,
      role: account.role
    };

    next();

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "An error occurred during login" });
  }


}