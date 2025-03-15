import { query } from "../db.js";

export const findAllByPosition = async (position) => {
  const { rows } = await query(
    `SELECT * FROM employees WHERE position = $1;`,
    [position]
  );
  return rows;
};
