import { query } from "../db.js";

export const createSlipHistory = async (
  memberId,
  reportId,
  status,

) => {
  const { rows } = await query(
    `
      INSERT INTO slip_history (member_id, report_id, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `,
    [
      memberId,
      reportId,
      status,
    ]
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
      SELECT 
      sh.history_id,
      sh.created_at,
      sh.status,
      sh.error_msg,
      sh.amount,
      sh.report_id,
      sh.status,
      
      -- รหัสสมาชิกที่เสียชีวิต
      dr.member_id AS death_member_id,
      
      -- ชื่อผู้เสียชีวิต
      CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS death_name

    FROM slip_history sh
    JOIN death_reports dr ON sh.report_id = dr.report_id
    JOIN members m ON dr.member_id = m.member_id
    JOIN candidates c ON m.candidate_id = c.candidate_id
    JOIN people p ON c.person_id = p.person_id

    WHERE sh.member_id = $1

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
  errorMsg,
  senderName,
  sendingBank,
  transTimestamp,
  amount
) => {
  const { rows } = await query(
    `UPDATE slip_history
     SET slip_data = $3,
         slip_path = $4,
         status = $5,
         error_msg = $6,
         updated_at = NOW(),
         sender = $7,
         sending_bank = $8,
         trans_date = $9,
         amount = $10
      WHERE member_id = $1
       AND report_id = $2
     RETURNING *;`,
    [
      memberId,
      reportId,
      slipData,
      slipPath,
      status,
      errorMsg,
      senderName,
      sendingBank,
      transTimestamp,
      amount
    ]
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

export const getSlipByMemberAndReport = async (memberId, reportId) => {
  const { rows } = await query(`
    SELECT 
      sh.slip_path,
      sh.status,
      sh.error_msg,
      sh.amount,
      sh.trans_date,
      sh.sender,
      sh.sending_bank,

      -- ผู้เสียชีวิต
      dp.title AS death_title,
      dp.first_name AS death_first_name,
      dp.last_name AS death_last_name

    FROM slip_history sh

    -- ดึงผู้เสียชีวิตจาก death_reports
    JOIN death_reports dr ON sh.report_id = dr.report_id
    JOIN members dm ON dr.member_id = dm.member_id
    JOIN candidates dc ON dm.candidate_id = dc.candidate_id
    JOIN people dp ON dc.person_id = dp.person_id

    WHERE sh.report_id = $1 AND sh.member_id = $2
  `, [reportId, memberId]);

  return rows[0];
}

