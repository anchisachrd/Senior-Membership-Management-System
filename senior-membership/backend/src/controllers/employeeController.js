import * as employeeService from '../services/employeeService.js';

export const registerEmployee = async (req, res) => {

    var employee = {
        title:  req.body.title,
        first_name:  req.body.first_name,
        last_name:  req.body.last_name,
        position: req.body.position,
        national_id: req.body.national_id,
        phone: req.body.phone,
        email: req.body.email,
        is_pay: req.body.is_pay,
        type_payment: req.body.type_payment
    }

    try {
        const result = await employeeService.registerEmployee(employee);
        res.status(201).json({ message: "Registration successful (employee)", result });
    } catch (error) {
        console.error("❌ Registration error (employee):", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteEmployee = async (req, res) => {

    const employee = {
        account_id: req.body.accountId,
        employee_id: req.body.employeeId
    }
    try {
        await employeeService.deleteEmployee(employee);
        res.status(200).json({ message: "Delete successful (employee)"});
    } catch (error) {
        console.error("❌ Delete error (employee):", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllEmployee = async (req, res) => {
    try {
          const employees = await employeeService.getAllEmployee();

          res.status(200).json(employees);
      } catch (error) {
          console.error("Database error:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const getDetailEmployee = async (req, res) => {

    const {employeeId} = req.params

    try {
          const employee = await employeeService.getDetailEmployee(employeeId);

          res.status(200).json(employee);
      } catch (error) {
          console.error("Database error:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const updateEmployee = async (req, res) => {

    const employee = {
        title:  req.body.title,
        first_name:  req.body.first_name,
        last_name:  req.body.last_name,
        position: req.body.position,
        national_id: req.body.national_id,
        phone: req.body.phone,
        email: req.body.email,
        is_pay: req.body.is_pay,
        type_payment: req.body.type_payment,
        account_id: req.body.account_id,
        employee_id: req.body.employee_id
    }

    try {
          await employeeService.updateEmployee(employee);

          res.status(200).json("update success");
      } catch (error) {
          console.error("Database error:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
}
