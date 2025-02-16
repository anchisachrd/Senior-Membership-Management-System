import { query } from "../db.js";

export const createSlipHistory = async (memberId, slipData, slipPath, status, errorCode, errorMsg) => {
  const { rows } = await query(
    `
      INSERT INTO slip_history (member_id, slip_data, slip_path, status, error_code, error_msg)
      VALUES ($1, $2, $3, $4, $5,  $6)
      RETURNING *;
    `,
    [memberId, slipData, slipPath, status, errorCode, errorMsg]
  );
  return rows[0];
};

export const getAllHistory = async () => {
  const { rows } = await query(
    "SELECT * FROM slip_history ORDER BY created_at DESC"
  );
  return rows;
};

export const getHistoryByMemberId = async (memberId) => {
  // Get candidate details
  const { rows } = await query(
    `
      SELECT * FROM slip_history
      WHERE member_id = $1
      ORDER BY created_at DESC
    `,
    [memberId]
  );

  return rows;
};
