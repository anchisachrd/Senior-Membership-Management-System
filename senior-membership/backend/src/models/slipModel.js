import { query } from "../db.js";

export const createSlipHistory = async (memberId,  reportId, amount, slipData, slipPath, status, errorCode, errorMsg) => {
  const { rows } = await query(
    `
      INSERT INTO slip_history (member_id, report_id, amount, slip_data, slip_path, status, error_code, error_msg)
      VALUES ($1, $2, $3, $4, $5,  $6, $7, $8)
      RETURNING *;
    `,
    [memberId, reportId, amount, slipData, slipPath, status, errorCode, errorMsg]
  );
  return rows[0];
};

export const getAllHistory = async () => {
  const { rows } = await query(
    `SELECT sh.*,

  -- คนที่โอนเงิน (สมาชิก)
  p_sender.title || p_sender.first_name || ' ' || p_sender.last_name AS member_name,

  -- ผู้เสียชีวิต
  p_death.title || p_death.first_name || ' ' || p_death.last_name AS death_name

FROM slip_history sh


JOIN members m_sender ON sh.member_id = m_sender.member_id
JOIN candidates c_sender ON m_sender.candidate_id = c_sender.candidate_id
JOIN people p_sender ON c_sender.person_id = p_sender.person_id


LEFT JOIN death_reports dr ON sh.report_id = dr.report_id

LEFT JOIN members m_death ON dr.member_id = m_death.member_id
LEFT JOIN candidates c_death ON m_death.candidate_id = c_death.candidate_id
LEFT JOIN people p_death ON c_death.person_id = p_death.person_id

ORDER BY sh.created_at DESC`
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

export const getSlipHistoryByMemberAndDeath = async (memberId, reportId) => {
  const { rows } = await query(
    `SELECT *
     FROM slip_history
     WHERE member_id = $1 AND report_id = $2
     LIMIT 1`,
    [memberId, reportId]
  );
  return rows[0];
};

export const updateSlipHistory = async (
  memberId,
  reportId,
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
       AND report_id = $2
     RETURNING *;`,
    [memberId, reportId, slipData, slipPath, status, errorCode, errorMsg]
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


