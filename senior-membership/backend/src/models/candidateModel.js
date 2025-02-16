import { query } from "../db.js"

export const getAllCandidates = async() => {
    const {rows} = await query('SELECT * FROM candidates');
    return rows.length > 0 ? rows : [];;
}

//สร้างผู้สมัคร
export const createCandidate = async(candidateData) => {
    const { title, first_name, last_name, national_id, dob, phone, gender, occupation, address_id, account_id, heir_id } = candidateData;
  
  const { rows } = await query(
    `INSERT INTO candidates (title, first_name, last_name, national_id, dob, phone, gender, occupation, address_id, account_id, heir_id) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING candidate_id`,
    [title, first_name, last_name, national_id, dob, phone, gender, occupation, address_id,  account_id, heir_id]
  );
  return rows[0].candidate_id;
}


export const getCandidateById = async (id) => {
    // Get candidate details
    const { rows } = await query(
      `SELECT * FROM candidates WHERE candidate_id = $1`,
      [id]
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



  
