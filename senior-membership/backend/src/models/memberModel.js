import { query } from "../db.js";

export const addMember = async (candidateId) => {
  const { rows } = await query(
    `
    INSERT INTO members (candidate_id, start_date)
    VALUES ($1, NOW());
    `,
    [candidateId]
  );

  return rows[0];
};

export const getMemberById = async (memberId) => {
  const { rows } = await query (
    `
    SELECT
      member_id,
      candidate_id,
      start_date,
      end_date,
      leaving_reason,
      member_status
    FROM members
    WHERE member_id = $1
  `,
  [memberId]
  )
  return rows[0]
}

export const getMemberByStatus = async (status) => {
  console.log("Received status:", status); 
  const { rows } = await query(`SELECT 
        m.member_id,
        p.title, 
        p.first_name, 
        p.last_name, 
        p.national_id, 
        p.phone,
        m.start_date,
        m.member_status
    FROM members m
    JOIN candidates c ON m.candidate_id = c.candidate_id
    JOIN people p ON c.person_id = p.person_id
    WHERE m.member_status = $1
    ORDER BY m.start_date DESC;`, 
    [status]
  );

  return rows;
};

export const getInfoByAccountId = async (accountId) => {
  const { rows } = await query(
    `SELECT m.member_id, p.title, p.first_name, p.last_name
     FROM members m
     JOIN candidates c ON m.candidate_id = c.candidate_id
     JOIN accounts a ON c.account_id = a.account_id
	   JOIN people p ON c.person_id = p.person_id
     WHERE a.account_id = $1`,
    [accountId]
  );

  return rows[0];
};

