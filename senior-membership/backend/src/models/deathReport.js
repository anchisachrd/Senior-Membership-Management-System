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
AND da.approval_status = 'รอการพิจารณา'
AND da.committee_id = $1;
      `,
    [committeeId]
  );
  return rows;
};
