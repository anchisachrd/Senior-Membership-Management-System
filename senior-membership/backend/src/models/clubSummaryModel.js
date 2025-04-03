import { query } from "../db.js";

export const getClubAccountDetail = async () => {
  const result = await query(
    `SELECT * 
     FROM (
       -- รายรับ from slip_history
       SELECT
         sh.trans_date AS datetime,
         'รายรับ' AS type,
         (
           SELECT CONCAT(p.title,p.first_name, ' ', p.last_name)
           FROM members m
             JOIN candidates c ON c.candidate_id = m.candidate_id
             JOIN people p ON p.person_id = c.person_id
           WHERE m.member_id = sh.member_id
         ) AS name,
         (
           'โอนค่าศพของ ' || (
             SELECT CONCAT(p2.title,p2.first_name, ' ', p2.last_name)
             FROM death_reports dr
               JOIN members m2 ON m2.member_id = dr.member_id
               JOIN candidates c2 ON c2.candidate_id = m2.candidate_id
               JOIN people p2 ON p2.person_id = c2.person_id
             WHERE dr.report_id = sh.report_id
           )
         ) AS detail,
         sh.amount,
         '-' AS note
       FROM slip_history sh
       WHERE sh.status = 'pass'

       UNION ALL

       -- รายจ่าย from club_expenses
       SELECT
         ce.paid_at AS datetime,
         'รายจ่าย' AS type,
         (
           SELECT CONCAT(e.title,e.first_name, ' ', e.last_name)
           FROM employees e
           WHERE e.employee_id = ce.paid_by
         ) AS name,
         CASE
           WHEN ce.expense_type = 'โอนเงินสงเคราะห์' THEN
             'โอนเงินสงเคราะห์ให้ ' || (
               SELECT CONCAT(p4.title,p4.first_name, ' ', p4.last_name)
               FROM heirs h
                 JOIN people p4 ON h.person_id = p4.person_id
               WHERE h.heir_id = ce.paid_to_heir_id
             ) || ' (ทายาท)'
           ELSE
             ce.expense_type
         END AS detail,
         ce.amount,
         ce.note
       FROM club_expenses ce
     ) AS combined
     ORDER BY datetime DESC;`
  );
  return result.rows;
};

export const getDashboardRawData = async () => {

  const result = await query(`
    SELECT
      -- 1. Verification Summary
      (SELECT COUNT(*) FROM document_verification WHERE verification_status = 'รอตรวจเอกสาร') AS waiting_verification,
      (SELECT COUNT(*) FROM document_verification WHERE verification_status = 'ไม่ผ่าน') AS failed_verification,
      (SELECT COUNT(*) FROM document_verification WHERE verification_status = 'ผ่าน') AS passed_verification,

      -- 2. Candidate Approval
      (SELECT COUNT(*) 
      FROM document_verification dv 
      JOIN candidates c ON c.candidate_id = dv.candidate_id
      WHERE dv.verification_status = 'ผ่าน' AND c.final_approval_status = 'ยังไม่ส่งพิจารณา'
      ) AS not_sent,
      (SELECT COUNT(*) FROM candidates WHERE final_approval_status IN ('รอการพิจารณา', 'รอการแก้ไข')) AS waiting_approval,
      (SELECT COUNT(*) FROM candidates WHERE final_approval_status = 'อนุมัติ') AS approved,
      (SELECT COUNT(*) FROM candidates WHERE final_approval_status = 'ไม่อนุมัติ') AS rejected,

      -- 3. Member Status
      (SELECT COUNT(*) FROM members WHERE member_status = 'ใช้งานอยู่') AS active_members,
      (SELECT COUNT(DISTINCT member_id) FROM slip_history WHERE status = 'unpaid') AS unpaid_members,
      (SELECT COUNT(DISTINCT member_id) FROM slip_history WHERE status = 'fail') AS failed_payment,

      -- 4. Death Report
      (SELECT COUNT(*) FROM death_reports WHERE staff_status = 'รอตรวจเอกสาร') AS waiting_staff,
      (SELECT COUNT(*) FROM death_reports WHERE final_approval = 'รอการพิจารณา') AS waiting_committee,
      (SELECT COUNT(*) FROM death_reports WHERE final_approval = 'ไม่อนุมัติ') AS rejected_death,
      (SELECT COUNT(*) FROM death_reports WHERE final_approval = 'อนุมัติ') AS approved_death,

      -- 5. Heir Transfer
      (SELECT COUNT(*) FROM death_reports WHERE is_requested = true) AS heir_requested,
      (SELECT COUNT(*) FROM death_reports WHERE is_finalized IS NULL AND is_requested = true) AS heir_wait_transfer
  `);

  

    const transactions = await query(`
      SELECT * 
      FROM (
        SELECT
          sh.trans_date AS datetime,
          'รายรับ' AS type,
          (
            SELECT CONCAT(p.title,p.first_name, ' ', p.last_name)
            FROM members m
            JOIN candidates c ON c.candidate_id = m.candidate_id
            JOIN people p ON p.person_id = c.person_id
            WHERE m.member_id = sh.member_id
          ) AS name,
          (
            'โอนค่าศพของ ' || (
              SELECT CONCAT(p2.title,p2.first_name, ' ', p2.last_name)
              FROM death_reports dr
              JOIN members m2 ON m2.member_id = dr.member_id
              JOIN candidates c2 ON c2.candidate_id = m2.candidate_id
              JOIN people p2 ON p2.person_id = c2.person_id
              WHERE dr.report_id = sh.report_id
            )
          ) AS detail,
          sh.amount,
          '-' AS note
        FROM slip_history sh
        WHERE sh.status = 'pass' 

  
        UNION ALL
  
        SELECT
          ce.paid_at AS datetime,
          'รายจ่าย' AS type,
          (
            SELECT CONCAT(e.title,e.first_name, ' ', e.last_name)
            FROM employees e
            WHERE e.employee_id = ce.paid_by
          ) AS name,
          CASE
            WHEN ce.expense_type = 'โอนเงินสงเคราะห์' THEN
              'โอนเงินสงเคราะห์ให้ ' || (
                SELECT CONCAT(p4.title,p4.first_name, ' ', p4.last_name)
                FROM heirs h
                JOIN people p4 ON h.person_id = p4.person_id
                WHERE h.heir_id = ce.paid_to_heir_id
              ) || ' (ทายาท)'
            ELSE
              ce.expense_type
          END AS detail,
          ce.amount,
          ce.note
        FROM club_expenses ce

      ) AS combined
      ORDER BY datetime DESC;
    `);

    return {
      verificationSummary: {
        waiting: result.rows[0].waiting_verification,
        failed: result.rows[0].failed_verification,
        passed: result.rows[0].passed_verification,
      },
      candidateApprovalSummary: {
        notSent: result.rows[0].not_sent,
        waiting: result.rows[0].waiting_approval,
        approved: result.rows[0].approved,
        rejected: result.rows[0].rejected,
      },
      memberStatusSummary: {
        active: result.rows[0].active_members,
        unpaid: result.rows[0].unpaid_members,
        failed: result.rows[0].failed_payment,
      },
      deathReportSummary: {
        staffWaiting: result.rows[0].waiting_staff,
        committeeWaiting: result.rows[0].waiting_committee,
        committeeRejected: result.rows[0].rejected_death,
        committeeApproved: result.rows[0].approved_death,
      },
      heirTransferSummary: {
        requested: result.rows[0].heir_requested,
        waitingTransfer: result.rows[0].heir_wait_transfer,
      },
      transactions: transactions.rows,
    };
  };

export const getAllClubTransactions = async () => {
  const result = await query(`
    SELECT
  t.trans_date AS datetime,
  t.type,
  t.amount
FROM (
  SELECT 'รายรับ' AS type, sh.trans_date, sh.amount
  FROM slip_history sh
  WHERE sh.status = 'pass'

  UNION ALL

  SELECT 'รายจ่าย' AS type, ce.paid_at AS trans_date, ce.amount
  FROM club_expenses ce

) t
ORDER BY t.trans_date
  `);

  return result.rows;
};
