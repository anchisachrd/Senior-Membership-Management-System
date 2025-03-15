import { query } from "../db.js";

export const createCandidateVerification = async (candidateId) => {
  const result = await query(
    `INSERT INTO document_verification (candidate_id, verification_status) 
        VALUES ($1, 'รอตรวจเอกสาร')`,
    [candidateId]
  );
  return result.rows[0];
};

// Update the verification row (pass or fail, staff, etc.)
export const updateVerification = async (
  candidateId,
  staffId,
  status,
  comments
) => {
  const result = await query(
    `UPDATE document_verification
      SET verification_status = $1,
          staff_id = $2,
          comments = $3,
          verified_at = NOW()
      WHERE candidate_id = $4
      RETURNING *;
    `,
    [status, staffId, comments, candidateId]  
  );
  return result.rows[0];
};

// Retrieve verification row for a candidate
export const getVerificationByCandidateId = async (candidateId) => {
  const sql = `
      SELECT 
        dv.verification_id,
        dv.candidate_id,
        dv.staff_id,
        dv.verification_status,
        dv.comments,
        dv.verified_at,
        e.first_name AS staff_first_name,
        e.last_name  AS staff_last_name
      FROM document_verification dv
      LEFT JOIN employees e ON dv.staff_id = e.employee_id
      WHERE dv.candidate_id = $1
      ORDER BY dv.verified_at DESC
      LIMIT 1
    `;
  const { rows } = await query(sql, [candidateId]);
  return rows[0] || null;
};

export const getCandidateByDocVerification = async () => {
  try {
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
          dv.verified_at
      FROM candidates c
      JOIN people p ON c.person_id = p.person_id
      JOIN document_verification dv ON c.candidate_id = dv.candidate_id
      WHERE dv.verification_status = 'ผ่าน'
      ORDER BY dv.verified_at ASC;
      `
    );

    console.log("✅ Fetched Candidates:", rows); // Debugging log

    return rows;
  } catch (error) {
    console.error("❌ Error fetching candidates:", error);
    throw error; // Ensure errors are caught in the frontend
  }
};


export const updateSentTimestamp = async (candidateId) => {
  const { rows } = await query(
    `
    UPDATE document_verification
    SET sent_at = NOW()
    WHERE candidate_id = $1
    RETURNING *;
    `,
    [candidateId]
  );
  return rows[0];
};