import { query } from "../db.js";

export const findAllByPosition = async (position) => {
  const { rows } = await query(
    `SELECT * FROM employees WHERE position = $1;`,
    [position]
  );
  return rows;

};

export const getInfoByAccountId = async (accountId) => {
  const { rows } = await query(
    `SELECT employee_id, title, first_name, last_name
      FROM employees 
      WHERE account_id = $1;`,
    [accountId]
  );
  return rows[0];

};
