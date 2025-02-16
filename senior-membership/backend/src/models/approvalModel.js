import { query } from "../db.js"

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

export const getVerificationDetails = async (candidateId) => {
  const { rows } = await query(
    `SELECT verification_details 
     FROM approval_details
     WHERE candidate_id = $1`,
    [candidateId]
  );
  return rows.length > 0 ? rows[0].verification_details : {}; 
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

