import { query } from "../db.js";

export const createEmployee = async (data) => {
  const { rows } = await query(
    `INSERT INTO employees (title, first_name, last_name, position, national_id, phone, account_id, is_pay, type_payment)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [data.title,
    data.first_name,
    data.last_name,
    data.position,
    data.national_id,
    data.phone,
    data.account_id,
    data.is_pay,
    data.type_payment
    ]
  );
  return rows[0];
}

export const findAllByPosition = async (position) => {
  const { rows } = await query(
    `SELECT * FROM employees WHERE position = $1;`,
    [position]
  );
  return rows;

};

export const getInfoByAccountId = async (accountId) => {
  const { rows } = await query(
    `SELECT employee_id, title, first_name, last_name, is_pay, type_payment
      FROM employees 
      WHERE account_id = $1;`,
    [accountId]
  );
  return rows[0];

};

export const deleteEmployee = async (employeeId) => {
  const { rows } = await query(
    `DELETE FROM employees
    WHERE employee_id = $1 
    RETURNING *;`,
    [employeeId]
  );

  return rows;
};

export const getAllEmployee = async () => {
  const { rows } = await query(
    `SELECT e.employee_id, e.title, e.first_name, e.last_name, e.position, e.phone, a.email
     FROM employees e
	 JOIN accounts a ON e.account_id = a.account_id
     ORDER BY e.employee_id ASC `
  )
  return rows;
}

export const getDetailEmployee = async (employeeId) => {
  const { rows } = await query(
    `SELECT e.employee_id, e.title, e.first_name, e.last_name, e.position, e.phone, e.national_id, e.is_pay, e.type_payment, a.email, a.account_id
     FROM employees e
	   JOIN accounts a ON e.account_id = a.account_id
     WHERE employee_id = $1 `,
    [employeeId]
  )
  return rows[0];
}

export const updateEmployee = async (employeeData) => {
  const { rows } = await query(
    `UPDATE employees e
    SET title = $1, first_name = $2, last_name = $3, position = $4, phone = $5, national_id = $6,
    is_pay = $7, type_payment = $8
    WHERE employee_id = $9 
    RETURNING *`,
    [employeeData.title, employeeData.first_name, employeeData.last_name, employeeData.position, 
      employeeData.phone, employeeData.national_id, employeeData.is_pay, employeeData.type_payment, employeeData.employee_id]
  )
  return rows[0];
}
