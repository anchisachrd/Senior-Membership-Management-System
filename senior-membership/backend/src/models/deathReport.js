import { query } from "../db.js"; // Assuming you have a db.js file for the database connection

// Create a new heir
export const createReport = async (memberId, heirId, deathDate) => {
  const result = await query(
    `INSERT INTO death_reports (member_id, heir_id, submitted_at, death_date)
            VALUES ($1, $2, NOW(), $3)
            RETURNING report_id;`,
    [memberId, heirId, deathDate]
  );
  return result.rows[0];
};

export const getDeathReportDetails = async (memberId) => {
  const result = await query(
    `SELECT dr.*, CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS member_name
  FROM death_reports dr
  JOIN members m ON dr.member_id = m.member_id
  JOIN candidates c ON m.candidate_id = c.candidate_id
  JOIN people p ON c.person_id = p.person_id
  WHERE dr.member_id = $1`,
    [memberId]
  );
  return result.rows[0];
};

export const getDeathReportDetailsbyReportId = async (reportId) => {
  const result = await query(
    `SELECT dr.*, CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS death_name
  FROM death_reports dr
  JOIN members m ON dr.member_id = m.member_id
  JOIN candidates c ON m.candidate_id = c.candidate_id
  JOIN people p ON c.person_id = p.person_id
  WHERE dr.report_id = $1`,
    [reportId]
  );
  return result.rows[0];
};

export const getDeathReportDocuments = async (reportId) => {
  const result = await query(
    ` SELECT doc_path, doc_type FROM documents
          WHERE entity_id = $1 AND entity_type = 'death_report'`,
    [reportId]
  );
  return result.rows;
};

export const updateDeathReportStatus = async (
  reportId,
  employeeId,
  staffStatus,
  staffComment
) => {
  const result = await query(
    `UPDATE death_reports
    SET 
    staff_status = $1,
    reviewed_by = $2,
    staff_comment = $3,
    final_approval = 'รอการพิจารณา',
    reviewed_at = NOW()
    WHERE report_id = $4
    RETURNING*;`,
    [staffStatus, employeeId, staffComment, reportId]
  );
  return result.rows[0];
};

export const createDeathApproval = async (reportId, committeeId, status) => {
  const { rows } = await query(
    `
        INSERT INTO death_approvals
        (report_id, committee_id, approval_status)
      VALUES
        ($1, $2, $3)
      RETURNING *;
      `,
    [reportId, committeeId, status]
  );
  return rows[0];
};

export const getPendingDeathApprovalsByCommittee = async (committeeId) => {
  const { rows } = await query(
    `
      SELECT 
    m.member_id,
    m.member_status,
    CONCAT(p.title, ' ', p.first_name,' ', p.last_name) AS member_name,
    dr.death_date,
    da.approval_status AS committee_status
FROM death_reports dr
JOIN members m ON dr.member_id = m.member_id
JOIN candidates c ON m.candidate_id = c.candidate_id
JOIN people p ON c.person_id = p.person_id
LEFT JOIN death_approvals da ON dr.report_id = da.report_id
WHERE dr.staff_status = 'ผ่าน'
AND m.member_status = 'เสียชีวิต'
AND da.approval_status IN ('รอการพิจารณา', 'รอการแก้ไข')
AND da.committee_id = $1;
      `,
    [committeeId]
  );
  return rows;
};

export const updateFinalApprovalStatus = async (reportId, status) => {
  const { rows } = await query(
    `UPDATE death_reports
       SET final_approval = $1
       WHERE report_id = $2
       RETURNING *`,
    [status, reportId]
  );
  return rows[0];
};

export const getFinalApprovalStatus = async (reportId) => {
  const { rows } = await query(
    `SELECT final_approval
      FROM death_reports
      WHERE report_id = $1`,
    [reportId]
  );
  return rows[0];
};

export const getDeathReportByHeirId = async (heirId) => {
  const result = await query(
    `SELECT 
       report_id,
       staff_status,
       staff_comment,
       final_approval,
       final_comment,
       sent_to_heir
     FROM death_reports
     WHERE heir_id = $1
     ORDER BY submitted_at DESC
     LIMIT 1`,
    [heirId]
  );

  return result.rows[0]; // could be undefined if not found
};

export const findByHeirAndMember = async (heirId, memberId) => {
  const result = await query(
    `SELECT report_id FROM death_reports WHERE heir_id = $1 AND member_id = $2`,
    [heirId, memberId]
  );
  return result.rows[0];
};

export const updateDeathReport = async ({
  reportId,
  death_date,
}) => {
  const values = [death_date, reportId];

  await query(
    `
    UPDATE death_reports
    SET
      death_date = $1,
      staff_status = 'รอตรวจเอกสาร',
      staff_comment = NULL,
      final_approval = 'ยังไม่ส่งพิจารณา',
      final_comment = NULL,
      sent_to_heir = false
    WHERE report_id = $2
    `,
    values
  );
};

export const updateIsFinalized = async (reportId, status) => {
  const result = await query(
    `UPDATE death_reports
     SET is_finalized = $1
     WHERE report_id = $2
     RETURNING *;`,
    [status, reportId]
  );

  return result.rows[0];
};






