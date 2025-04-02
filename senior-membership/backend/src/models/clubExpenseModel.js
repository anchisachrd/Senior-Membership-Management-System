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

