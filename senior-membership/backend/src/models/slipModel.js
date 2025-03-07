import { query } from "../db.js";

export const createSlipHistory = async (memberId,  deathId, amount, slipData, slipPath, status, errorCode, errorMsg) => {
  const { rows } = await query(
    `
      INSERT INTO slip_history (member_id, death_id, amount, slip_data, slip_path, status, error_code, error_msg)
      VALUES ($1, $2, $3, $4, $5,  $6, $7, $8)
      RETURNING *;
    `,
    [memberId, deathId, amount, slipData, slipPath, status, errorCode, errorMsg]
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

export const getSlipHistoryByMemberAndDeath = async (memberId, deathId) => {
  const { rows } = await query(
    `SELECT *
     FROM slip_history
     WHERE member_id = $1 AND death_id = $2
     LIMIT 1`,
    [memberId, deathId]
  );
  return rows[0];
};

export const updateSlipHistory = async (
  memberId,
  deathId,
  slipData,
  slipPath,
  status,
  errorCode,
  errorMsg
) => {
  const { rows } = await query(
    `UPDATE slip_history
     SET slip_data = $3,
         slip_path = $4,
         status = $5,
         error_code = $6,
         error_msg = $7,
         updated_at = NOW()
     WHERE member_id = $1
       AND death_id = $2
     RETURNING *;`,
    [memberId, deathId, slipData, slipPath, status, errorCode, errorMsg]
  );
  return rows[0];
};

export const getTotalPassedAmount = async () => {
  const { rows } = await query(`
    SELECT COALESCE(SUM(amount), 0) as total
    FROM slip_history
    WHERE status = 'pass'
  `);
  // rows[0].total will be the total sum of all pass amounts
  return rows[0].total;
};

export const getAllPassedSlips = async () => {
  const { rows } = await query(`
    SELECT *
    FROM slip_history
    WHERE status = 'pass'
    ORDER BY created_at DESC
  `);
  return rows;
};
