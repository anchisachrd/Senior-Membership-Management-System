import { query } from "../db.js";

export const getDeathApprovalStatusByReportId = async (reportId) => {
    const { rows } = await query(
      `
        SELECT approval_status
        FROM death_approvals
        WHERE report_id = $1;
        `,
      [reportId]
    );
    return rows
};

export const updateCommitteeApproval = async (reportId, committeeId, status, comment) => {
  const { rows } = await query(
    `UPDATE death_approvals
     SET approval_status = $1,
     approved_at = NOW(),
     comment = $2
     WHERE report_id = $3
       AND committee_id = $4
     RETURNING *`,
    [status, comment, reportId, committeeId]
  );
  return rows[0];
};

export const getCommitteeApproval = async (reportId) => {
  const { rows } = await query(
    `SELECT da.approval_id,
             da.committee_id,
             da.approval_status,
             da.comment,
             da.approved_at,
             e.title,
             e.first_name,
             e.last_name,
             dr.final_approval,
             dr.member_id,
             dr.heir_id,
             dr.sent_to_heir
      FROM death_approvals da
      JOIN employees e ON da.committee_id = e.employee_id
      JOIN death_reports dr ON da.report_id = dr.report_id
      WHERE da.report_id = $1
      ORDER BY da.approved_at ASC`,
    [reportId]
  );
  return rows;
};

export const updateAllCommitteeApproval = async (reportId, status) => {
  const { rows } = await query(
    `UPDATE death_approvals
      SET approval_status = $1
       WHERE report_id = $2`,
    [status, reportId]
  );
  return rows[0];
};
