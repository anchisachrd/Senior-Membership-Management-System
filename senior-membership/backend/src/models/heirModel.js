import { query } from '../db.js';  // Assuming you have a db.js file for the database connection

// Create a new heir
export const createHeir = async (person_id, candidate_id, relationship, address_id, account_id) => {
    const result = await query(
      `INSERT INTO heirs (person_id, candidate_id, relationship, address_id, account_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [person_id, candidate_id, relationship, address_id, account_id ]
    );
    return result.rows[0];
  };

  export const getHeirByCandidateId = async (candidateId) => {
    const { rows } = await query(
      `SELECT * FROM heirs WHERE candidate_id = $1 LIMIT 1`,
      [candidateId]
    );
    return rows[0] || null;
  };

  export const getHeirInFoByCandidateId = async (candidateId) => {
    const { rows } = await query(
      `SELECT CONCAT(p.first_name, ' ', p.last_name) AS heir_name, 
       a.email AS heir_email, 
       a.password_hash
    FROM heirs h
    JOIN people p ON h.person_id = p.person_id
    JOIN accounts a ON h.account_id = a.account_id
    WHERE h.candidate_id = $1;`,
      [candidateId]
    );
    return rows[0];
  };

  export const getMemberByHeirId = async (heirId) => {
    const { rows } = await query(
      `SELECT 
      m.member_id,
      CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS member_name,
      m.leaving_reason,
      dr.report_id,
      dr.death_date,
      dr.is_requested,
      dr.is_finalized
    FROM members m
    JOIN candidates c 
      ON m.candidate_id = c.candidate_id
    JOIN people p 
      ON c.person_id = p.person_id
    JOIN heirs h 
      ON h.candidate_id = c.candidate_id
    LEFT JOIN death_reports dr 
      ON dr.member_id = m.member_id
      AND dr.heir_id = h.heir_id
    WHERE h.heir_id = $1
    ORDER BY m.start_date DESC`,
      [heirId]
    );
  
    return rows[0];
  };

  export const getHeirByMemberId = async (memberId) => {
    const { rows } = await query(
      `SELECT 
      h.heir_id,
      CONCAT(p.title, p.first_name, ' ', p.last_name) AS heir_name,
      ce.amount,
      ce.proof_path,
      ce.expense_type,
      ce.paid_at,
      ce.expense_id,
      dr.report_id
    FROM members m
    JOIN death_reports dr ON m.member_id = dr.member_id
    JOIN club_expenses ce ON ce.death_report_id = dr.report_id
    JOIN heirs h ON ce.paid_to_heir_id = h.heir_id
    JOIN people p ON h.person_id = p.person_id
    WHERE m.member_id = $1 
    `,
      [memberId]
    );
    return rows[0];
  };


  






// Get heir by national ID
export const getHeirByNationalId = async (national_id) => {
    const { rows } = await query(
        `SELECT * FROM heirs WHERE national_id = $1`,
        [national_id]
    );
    return rows[0];
};

// Get heir by ID
export const getHeirById = async (heir_id) => {
    const { rows } = await query(
        `SELECT * FROM heirs WHERE heir_id = $1`,
        [heir_id]
    );
    return rows[0];
};

// Update heir
export const updateHeir = async (heir_id, heirData) => {
    const { title, first_name, last_name, email, phone, gender, occupation, relationship } = heirData;
    const { rows } = await query(
        `UPDATE heirs SET title = $1, first_name = $2, last_name = $3, email = $4, phone = $5, gender = $6, occupation = $7, relationship = $8 WHERE heir_id = $9 RETURNING *`,
        [title, first_name, last_name, email, phone, gender, occupation, relationship, heir_id]
    );
    return rows[0];
};

// Delete heir by ID
export const deleteHeir = async (heir_id) => {
    const { rows } = await query(
        `DELETE FROM heirs WHERE heir_id = $1 RETURNING *`,
        [heir_id]
    );
    return rows[0];
};

export const getInfoByAccountId = async (accountId) => {
    const { rows } = await query(
        `SELECT h.heir_id, p.title, p.first_name, p.last_name
        FROM heirs h
        JOIN people p ON h.person_id = p.person_id 
        WHERE account_id = $1`,
        [accountId]
    );
    return rows[0];
};
