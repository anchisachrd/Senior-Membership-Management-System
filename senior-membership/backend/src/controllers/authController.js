import * as authServices from '../services/authServices.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const loginUserByEmail = async (req, res, next) => {

  const { email, password } = req.body;
  const hashedInputPassword = await bcrypt.hash(password, 10);
console.log("🔍 Hashed Input Password:", hashedInputPassword);



  try {
    // 1. Fetch account by email
    const account = await authServices.loginByEmail(email);

    if (!account) {
      return res.status(400).json({ message: "Invalid email" });
    }

    console.log("🔑 Entered Password:", password);
console.log("🔒 Stored Hash:", account.password_hash);


    // 2. Validate the password
    const isPasswordValid = await bcrypt.compare(password.trim(), account.password_hash.trim());

    // console.log("Password hash length:", account.password_hash.length);
    console.log("✅ Is Password Valid?", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (account.role === 'candidate') {
      return res.status(400).json({ message: "You can not login, You are Candidate." });
    }

    if (account.role === 'member') {
      const member = await authServices.getMemberIdbyAccountId(account.account_id);
      var info = {
        "title": member.title,
        "first_name": member.first_name,
        "last_name": member.last_name
      }
      var role_id = member.member_id
    }

    if (account.role === 'heir') {

      const heir = await authServices.getHeirIdbyAccountId(account.account_id);
      var info = {
        "title": heir.title,
        "first_name": heir.first_name,
        "last_name": heir.last_name
      }
      var role_id = heir.heir_id

    }

    if (account.role === 'staff' || account.role === 'committee') {
      const employee = await authServices.getEmployeeIdbyAccountId(account.account_id);
      var info = {
        "title": employee.title,
        "first_name": employee.first_name,
        "last_name": employee.last_name
      }
      var role_id = employee.employee_id
    }


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
          "role": account.role,
          "role_id": role_id,
          "info": info
        }
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    // 5. Return success response with token
    // return res.json(
    //   {
    //     message: "Login successful",
    //     accessToken
    //   }
    // );

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

export const ChangePassword = async (req, res, next) => {
  const { accountId, oldPassword, newPassword } = req.body;

  try {
    const result = await authServices.changePassword(accountId, oldPassword, newPassword);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Change Password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน"
    });
  }
};

export const getAddressByMemberId = async (req, res, next) => {

  const { memberId } = req.query
  
  try {

    const result = await authServices.getAddressByMemberId(memberId);
   
    return res.status(200).json(result);

  } catch (error) {
    console.error("get address error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงที่อยู่"
    });
  }
};

export const getInfoPeopleByMemberId = async (req, res, next) => {

  const { memberId } = req.query
  
  try {

    const result = await authServices.getInfoPeopleByMemberId(memberId);
   
    return res.status(200).json(result);

  } catch (error) {
    console.error("get address error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว"
    });
  }
};

export const getAddressByHeirId = async (req, res, next) => {

  const { heirId } = req.query
  
  try {

    const result = await authServices.getAddressByHeirId(heirId);
   
    return res.status(200).json(result);

  } catch (error) {
    console.error("get address error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงที่อยู่"
    });
  }
};

export const getInfoPeopleByHeirId = async (req, res, next) => {

  const { heirId } = req.query
  
  try {

    const result = await authServices.getInfoPeopleByHeirId(heirId);
   
    return res.status(200).json(result);

  } catch (error) {
    console.error("get address error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว"
    });
  }
};