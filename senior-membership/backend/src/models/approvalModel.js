import { query } from "../db.js";

export const createApprovalDetails = async (candidateId) => {
  const { rows } = await query(
    `
        INSERT INTO approval_details (candidate_id, committee_id, verification_details, fail_reasons)
        VALUES ($1, 1, '[]', '[]')
        RETURNING *;
      `,
    [candidateId]
  );
  return rows[0];
};

export const getVerificationDetails = async (candidateId, committeeId) => {
  const { rows } = await query(
    `SELECT verification_details, status
      FROM approval_details
      WHERE candidate_id = $1 AND committee_id = $2`,
    [candidateId, committeeId]
  );

  return rows.length > 0 ? rows[0] : null;
};

export const updateVerificationDetails = async (candidateId, details) => {
  const { rows } = await query(
    `UPDATE approval_details 
     SET verification_details = $1 
     WHERE candidate_id = $2 
     RETURNING *`,
    [JSON.stringify(details), candidateId]
  );
  return rows[0];
};

export const saveFailReasons = async (candidateId, failReasons) => {
  const { rows } = await query(
    ` UPDATE approval_details 
    SET fail_reasons = $1
    WHERE candidate_id = $2
    RETURNING *;`,
    [JSON.stringify(failReasons), candidateId]
  );
  return rows[0];
};

export const findOneApproval = async (candidateId, committeeId) => {
  const { rows } = await query(
    `SELECT * FROM approval_details
     WHERE candidate_id = $1 AND committee_id = $2
     LIMIT 1`,
    [candidateId, committeeId]
  );
  return rows[0] || null;
};

export const createApprovalRecord = async (
  candidateId,
  committeeId,
  { verificationDetails, failReasons, status }
) => {
  const { rows } = await query(
    `
      INSERT INTO approval_details (
        candidate_id, committee_id, verification_details, fail_reasons, status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [
      candidateId,
      committeeId,
      JSON.stringify(verificationDetails || []),
      JSON.stringify(failReasons || []),
      status,
    ]
  );
  return rows[0];
};

export const updateApprovalRecord = async (
  candidateId,
  committeeId,
  { verificationDetails, approvalStatus }
) => {
  const { rows } = await query(
    `
      UPDATE approval_details
      SET 
        verification_details = $3,
        status = $4
      WHERE candidate_id = $1 AND committee_id = $2
      RETURNING *;
    `,
    [
      candidateId,
      committeeId,
      JSON.stringify(verificationDetails || []),
      approvalStatus, // ✅ Make sure approvalStatus is passed correctly
    ]
  );

  return rows[0];
};

export const getCandidatesForCommittee = async (committeeId) => {
  const { rows } = await query(
    `
    SELECT 
      c.candidate_id, 
      c.first_name, 
      c.last_name, 
      c.national_id, 
      c.phone, 
      c.priority,
      a.status
    FROM candidates c
    LEFT JOIN approval_details a 
      ON c.candidate_id = a.candidate_id 
      AND a.committee_id = $1
    `,
    [committeeId]
  );

  return rows;
};

export const getCandidateApprovalSummary = async (candidateId) => {
  const { rows } = await query(
    `SELECT a.committee_id, 
       CONCAT(e.name, ' ', e.surname) AS committee_fullname, 
       a.status AS approval_status, 
       a.verification_details
FROM approval_details a
JOIN employees e ON a.committee_id = e.employee_id
WHERE a.candidate_id = $1
`,
    [candidateId]
  );

  return rows.length > 0 ? rows : null;  // 🔹 Return raw database result
};

