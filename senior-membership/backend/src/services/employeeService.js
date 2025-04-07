import * as employeeModel from "../models/employeeModel.js"
import * as accountModel from "../models/accountModel.js";
import * as emailService from "../utils/emailService.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};


export const registerEmployee = async (employeeData) => {


    let employeePassword = generateRandomPassword();
    const hashedPassword = await hashPassword(employeePassword);
  
    const employeeAccount = await accountModel.createEmployeeAccount(
        employeeData.email,
        hashedPassword,
        employeeData.position
    );

    // รวม `account_id` เข้าไปใน `employeeData`
    employeeData.account_id = employeeAccount.account_id;

    const employee = await employeeModel.createEmployee(employeeData);


    const employee_name = `${employeeData.title}${employeeData.first_name} ${employeeData.last_name}`;

    if (employeeData.position === 'staff'){
      var employeeSubject = `แจ้งข้อมูลเข้าสู่ระบบสมาชิกชมรมผู้สูงอายุสำหรับเจ้าหน้าที่`;
    }
    if (employeeData.position === 'committee'){
      var employeeSubject = `แจ้งข้อมูลเข้าสู่ระบบสมาชิกชมรมผู้สูงอายุสำหรับกรรมการ`;
    }

    const employeePassContent = emailService.generatePasswordEmailTemplate(
          employee_name,
          employeePassword
        );

    await emailService.sendEmail(employeeData.email, employeeSubject, employeePassContent);

    return employee;


}

export const deleteEmployee = async (employeeData) => {
    await accountModel.deleteAccount(employeeData.account_id);
    return await employeeModel.deleteEmployee(employeeData.employee_id);
}

export const getAllEmployee = async () => {
  return await employeeModel.getAllEmployee();
}

export const getDetailEmployee = async (employeeId) => {
  return await employeeModel.getDetailEmployee(employeeId);
}

export const updateEmployee = async (employeeData) => {

  const employee = await employeeModel.updateEmployee(employeeData);
  await accountModel.updateAccount(
    employeeData.email,
    employeeData.position,
    employeeData.account_id
  )
  return employee
}
