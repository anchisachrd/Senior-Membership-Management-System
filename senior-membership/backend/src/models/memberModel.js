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
  const { rows } = await query(
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
  );
  return rows[0];
};

export const getMemberByStatus = async (status) => {
  console.log("Received status:", status);
  const { rows } = await query(
    `SELECT 
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

export const updateMemberStatus = async (memberId, status) => {
  const { rows } = await query(
    ` UPDATE members 
            SET member_status = $1
            WHERE member_id = $2;`,
    [status, memberId]
  );

  return rows[0];
};

export const getNotificationListByStatus = async (status) => {
  const { rows } = await query(
    `SELECT 
    m.member_id,
    p.title, 
    p.first_name, 
    p.last_name, 
    p.national_id, 
    p.phone,
    m.start_date,
    m.member_status,
    dr.staff_status,
    dr.final_approval,
    dr.death_date,
    dr.submitted_at
FROM members m
JOIN candidates c ON m.candidate_id = c.candidate_id
JOIN people p ON c.person_id = p.person_id
LEFT JOIN death_reports dr ON m.member_id = dr.member_id  
WHERE m.member_status = $1
ORDER BY m.start_date DESC`,
    [status]
  );

  return rows;
};

export const getReviewedDeathMember = async () => {
  const { rows } = await query(
    ` SELECT 
    m.member_id, 
    CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS member_name, 
    m.member_status, 
    d.committee_status,
    d.death_date
FROM members m
JOIN candidates c ON m.candidate_id = c.candidate_id
JOIN people p ON c.person_id = p.person_id
JOIN death_reports d ON m.member_id = d.member_id
WHERE d.staff_status = 'ผ่าน' 
`,
  );

  return rows;
};
