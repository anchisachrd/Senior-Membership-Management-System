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
    