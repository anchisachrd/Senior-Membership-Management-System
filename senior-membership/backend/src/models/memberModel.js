import { query } from "../db.js";

export const addMember = async (candidateId) => {
  const { rows } = await query(
    `
    INSERT INTO members (candidate_id, start_date, end_date)
    VALUES ($1, CURRENT_DATE, NULL)
    RETURNING *;
    `,
    [candidateId]  
  );

  return rows[0];
};

export const getMemberById = async (memberId) => {
  
  const { rows } = await query(
    `SELECT * FROM members WHERE member_id = $1`,
    [id]
  );

  return rows[0];
};