import { query } from "../db.js";

export const createClubExpense = async (data) => {
    const result = await query(
        `INSERT INTO club_expenses (amount, paid_by, proof_path, note, 
        death_report_id, paid_to_heir_id, created_at, expense_type, paid_at)
              VALUES ($1, $2,  $3, $4, $5, $6, NOW(), $7, $8)
              RETURNING *;`,
        [data.amount,
        data.paid_by,
        data.proof_path,
        data.note,
        data.death_report_id,
        data.paid_to_heir_id,
        data.expense_type,
        data.paid_at]
    );
    return result.rows[0];
};

export const getHeirPaymentList = async () => {
    const result = await query(
        `SELECT 
        m.member_id AS death_member_id,
        CONCAT(pm.title, pm.first_name, ' ', pm.last_name) AS deceased_full_name,
        dr.death_date AS date_of_death,
        m.leaving_reason AS cause_of_death,
        CONCAT(ph.title, ph.first_name, ' ', ph.last_name) AS heir_full_name,
        dr.is_finalized AS paid_status
      FROM death_reports dr
      JOIN members m ON dr.member_id = m.member_id
      JOIN candidates cm ON m.candidate_id = cm.candidate_id
      JOIN people pm ON cm.person_id = pm.person_id
      LEFT JOIN club_expenses ce ON ce.death_report_id = dr.report_id
      LEFT JOIN heirs h ON ce.paid_to_heir_id = h.heir_id
      LEFT JOIN candidates ch ON h.candidate_id = ch.candidate_id
      LEFT JOIN people ph ON h.person_id = ph.person_id
      WHERE dr.is_finalized = false;`
    );
    return result.rows;
};



export const updateProof = async (proof_path, paid_at, expense_id) => {
    const result = await query(
        `UPDATE club_expenses
        SET proof_path = $1, paid_at = $2
        WHERE expense_id = $3`,
        [proof_path, paid_at, expense_id]
    );
    return result.rows[0];
};

