import { query } from "../db.js"


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

  export const updateDocVerificationStatus = async (candidateId, status) => {
    const { rows } = await query(
        `UPDATE candidates
         SET doc_verification_status = $1
         WHERE candidate_id = $2
         RETURNING *`,
        [status, candidateId]
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


export const getCandidateByDocVerification = async (status) => {
  const { rows } = await query(
      `SELECT * FROM candidates WHERE doc_verification_status = $1`,
      [status]
  );
  return rows;
};

export const getCandidateByApprovalStatus = async (status) => {
  const { rows } = await query(
      `SELECT * FROM candidates WHERE approval_status = ANY($1)`,
      [status]
  );
  return rows;
};

export const updateApprovalStatus = async (candidateId, status) => {
  const { rows } = await query(
      `UPDATE candidates
       SET approval_status = $1
       WHERE candidate_id = $2
       RETURNING *`,
      [status, candidateId]
  );
  return rows[0];

};



  
