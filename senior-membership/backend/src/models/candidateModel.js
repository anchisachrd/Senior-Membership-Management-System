import { query } from "../db.js";

//สร้างผู้สมัคร
export const createCandidate = async (person_id, account_id, address_id) => {
  const result = await query(
    `INSERT INTO candidates (person_id, account_id, address_id) 
     VALUES ($1, $2, $3) RETURNING *`,
    [person_id, account_id, address_id]
  );
  return result.rows[0];
};

export const getCandidateById = async (candidate_id) => {
  const { rows } = await query(
    `SELECT * FROM candidates WHERE candidate_id = $1`,
    [candidate_id]
  );
  return rows[0];
};

export const getPendingCandidates = async () => {
  const { rows } = await query(`
     SELECT c.candidate_id, p.first_name, p.last_name, p.national_id, p.phone, 
            dv.verification_status AS doc_verification_status
       FROM candidates c
       JOIN people p ON c.person_id = p.person_id
       JOIN document_verification dv ON c.candidate_id = dv.candidate_id
       WHERE dv.verification_status IN ('รอตรวจเอกสาร', 'ไม่ผ่าน')
       ORDER BY dv.verified_at ASC
  `);
  return rows;
};

export const getCandidateDetails = async (candidateId) => {
  const result = await query(
    `SELECT CONCAT(p.first_name, ' ', p.last_name) AS full_name, 
       a.email,  
       c.final_approval_status
      FROM candidates c
      JOIN people p ON c.person_id = p.person_id
      JOIN accounts a ON c.account_id = a.account_id
      WHERE c.candidate_id = $1;
    `,
    [candidateId]
  );
  return result.rows[0];
};

export const updateIsMember = async (candidateId, isMember) => {
  const { rows } = await query(
    `UPDATE candidates 
     SET is_member = $1 
     WHERE candidate_id = $2
     RETURNING *;`,
    [isMember, candidateId]
  );
  return rows[0]; // Returns the updated row
};

export const getAccountByCandidateId = async (candidateId) => {
  // Get candidate details
  const { rows } = await query(
    `SELECT account_id 
      FROM candidates 
      WHERE candidate_id = $1`,
    [candidateId]
  );

  return rows[0]?.account_id || null;
};



export const deleteCandidateById = async (id) => {
  const { rows } = await query(
    `DELETE FROM candidates WHERE candidate_id = $1`,
    [id]
  );

  return rows[0];
};

export const updateCandidateHeirID = async (candidateId, heirId) => {
  const { rows } = await query(
    `UPDATE candidates
       SET heir_id = $1
       WHERE candidate_id = $2
       RETURNING *`,
    [heirId, candidateId]
  );
  return rows[0];
};

export const getCandidateByFinalApprovalStatus = async (status) => {
  const { rows } = await query(
    `
    SELECT 
        c.candidate_id,
        p.first_name,
        p.last_name,
        p.national_id,
        p.phone,
        c.priority,
        c.final_approval_status,
        dv.sent_at
    FROM candidates c
    JOIN people p ON c.person_id = p.person_id
    LEFT JOIN document_verification dv ON c.candidate_id = dv.candidate_id
    WHERE c.final_approval_status = ANY($1)
    ORDER BY 
        CASE 
            WHEN c.final_approval_status = 'รอการพิจารณา' THEN 1
            WHEN c.final_approval_status = 'ไม่อนุมัติ' THEN 2
            WHEN c.final_approval_status = 'อนุมัติ' THEN 3
        END,
        dv.sent_at ASC ;
    `,
    [status]
  );
  return rows;
};

export const updateFinalApprovalStatus = async (candidateId, status) => {
  const { rows } = await query(
    `UPDATE candidates
       SET final_approval_status = $1
       WHERE candidate_id = $2
       RETURNING *`,
    [status, candidateId]
  );
  return rows[0];
};

export const updateIsMemberbyMemberId = async ( memberId) => {
  const { rows } = await query(
    `UPDATE candidates
     SET is_member = false
     WHERE candidate_id = (
       SELECT candidate_id FROM members WHERE member_id = $1
     )`,
     [memberId]
  );
  return rows[0];
};
