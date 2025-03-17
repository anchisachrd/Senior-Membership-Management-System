import { query } from "../db.js";

//ใส่ รอการพิจารณา ใน column หลังจากที่ staff กดส่งข้อมูล
export const createApprovalDetails = async (
  candidateId,
  committeeId,
  status = "รอการพิจารณา"
) => {
  const { rows } = await query(
    `
        INSERT INTO approval_details
        (candidate_id, committee_id, approval_status)
      VALUES
        ($1, $2, $3)
      RETURNING *;
      `,
    [candidateId, committeeId, status]
  );
  return rows[0];
};

// pass/fail + verification detail
export const updateApprovalDetail = async (
  approvalId,
  { status, verificationDetails, comment, isSigned }
) => {
  // 🛠 Ensure verificationDetails is properly stringified before inserting into JSONB column
  const formattedDetails = JSON.stringify(verificationDetails || []);

  const { rows } = await query(
    `
      UPDATE approval_details
      SET 
        approval_status = $1,
        verification_details = $2::jsonb,  -- Ensure correct JSON type
        comment = $3,
        is_signed = $4,
        signed_at = CASE WHEN $4 = true THEN NOW() ELSE NULL END
      WHERE approval_id = $5
      RETURNING *;
      `,
    [status, formattedDetails, comment, isSigned, approvalId]
  );

  return rows[0];
};

//เอาข้อมูลของ committee คนเดียว
export const getApprovalDetail = async (candidateId, committeeId) => {
  const { rows } = await query(
    `
      SELECT * 
      FROM approval_details
      WHERE candidate_id = $1
        AND committee_id = $2
      LIMIT 1;
      `,
    [candidateId, committeeId]
  );
  return rows[0];
};

//เอา all committee approval from 1 cnadidate
export const getApprovalsByCandidate = async (candidateId) => {
  const { rows } = await query(
    `
      SELECT ad.*, e.title, e.first_name, e.last_name, e.position
      FROM approval_details ad
      JOIN employees e ON ad.committee_id = e.employee_id
      WHERE ad.candidate_id = $1
      ORDER BY ad.approval_id ASC;
      `,
    [candidateId]
  );
  return rows;
};

//show pending approval of that committee
export const getPendingApprovalsByCommittee = async (committeeId) => {
  const { rows } = await query(
    `
      SELECT ad.*, p.first_name, p.last_name, p.national_id, p.phone
      FROM approval_details ad
      JOIN candidates c ON ad.candidate_id = c.candidate_id
      JOIN people p ON c.person_id = p.person_id
      WHERE ad.committee_id = $1
       AND ad.approval_status IN ('รอการพิจารณา', 'รอการแก้ไข');
      `,
    [committeeId]
  );
  return rows;
};

//for final approval list
export const getCommitteeFinalApprovals = async (committeeId) => {
  const { rows } = await query(
    `
    SELECT 
      ad.candidate_id,
      p.first_name,
      p.last_name,
      c.final_approval_status,
      ad.approval_status
    FROM approval_details ad
    JOIN candidates c ON ad.candidate_id = c.candidate_id
    JOIN people p ON c.person_id = p.person_id
    WHERE ad.committee_id = $1
    ORDER BY ad.candidate_id ASC;
    `,
    [committeeId]
  );
  return rows;
};

//for approval detail summary page
export const getFinalApprovalDetail = async (candidateId) => {
  const { rows } = await query(
    `
    SELECT 
        ad.*, 
        e.title AS committee_title, e.first_name AS committee_first_name, e.last_name AS committee_last_name, 
        p.title AS candidate_title, p.first_name AS candidate_first_name, p.last_name AS candidate_last_name, 
        c.final_approval_status
    FROM approval_details ad
    JOIN employees e ON ad.committee_id = e.employee_id
    JOIN candidates c ON ad.candidate_id = c.candidate_id
    JOIN people p ON c.person_id = p.person_id
    WHERE ad.candidate_id = $1
    ORDER BY ad.approval_id ASC;
    `,
    [candidateId]
  );
  return rows;
};

export const clearVerificationDetail = async (candidateId) => {
  const { rows } = await query(
    `
    UPDATE approval_details 
    SET approval_status = 'รอการแก้ไข', verification_details = '[]'
    WHERE candidate_id = $1
    `,
    [candidateId]
  );
  return rows[0];
};
