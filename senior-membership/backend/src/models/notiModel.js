import { query } from "../db.js"

// staff
export const notiStaff = async () => {
  const { rows } = await query(`
      SELECT
      -- 1. Verification Summary
      (SELECT COUNT(*) FROM document_verification WHERE verification_status = 'รอตรวจเอกสาร') AS waiting_verification,
      
      -- 2. Candidate Approval

      (SELECT COUNT(*) FROM candidates WHERE final_approval_status IN ('อนุมัติ', 'ไม่อนุมัติ') AND is_member IS NULL) AS waiting_list,

      -- 4. Death Report
      (SELECT COUNT(*) FROM death_reports WHERE staff_status = 'รอตรวจเอกสาร') AS waiting_staff,
      (SELECT COUNT(*) FROM death_reports d JOIN members m ON d.member_id = m.member_id WHERE d.final_approval IN ('อนุมัติ', 'ไม่อนุมัติ') AND m.leaving_reason IS NULL) AS result_death,

      -- 5. Heir Transfer
      (SELECT COUNT(*) FROM death_reports WHERE is_finalized IS NULL AND is_requested = true) AS heir_wait_transfer
  `);
  return rows[0]; // คืนค่าผลลัพธ์เป็น object
};

// committee

export const notiCommittee = async (committee_id) => {
  const { rows } = await query(`
    SELECT
      -- 2. Candidate Approval
      (SELECT COUNT(*) FROM approval_details WHERE approval_status IN ('รอการพิจารณา', 'รอการแก้ไข') AND committee_id = $1) AS waiting_approval,
      (SELECT COUNT(*) FROM death_approvals WHERE approval_status IN ('รอการพิจารณา', 'รอการแก้ไข') AND committee_id = $1) AS waiting_committee,
      (SELECT COUNT(*) FROM death_reports d JOIN club_expenses c ON c.death_report_id = d.report_id WHERE d.is_finalized IS FALSE) AS pay
  `, [committee_id]);
  return rows[0]; // คืนค่าผลลัพธ์เป็น object
};

// heir
export const notiHeir = async (heir_id) => {
  const { rows } = await query(`
      SELECT
      (SELECT COUNT(*) FROM death_reports WHERE final_approval = 'ไม่อนุมัติ' AND heir_id = $1) AS rejected_death,
      (SELECT COUNT(*) FROM death_reports WHERE final_approval = 'อนุมัติ' AND heir_id = $1) AS approved_death
  `, [heir_id]);
  return rows[0];
};

export const notiMember = async (member_id) => {
  const { rows } = await query(`
      SELECT
      (SELECT COUNT(*) FROM slip_history WHERE status = 'unpaid' AND member_id = $1) AS unpaid
  `, [member_id]);
  return rows[0];
};