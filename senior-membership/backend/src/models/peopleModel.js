import { query } from "../db.js"

export const createPerson = async (data) => {
    const result = await query(
      `INSERT INTO people (title, first_name, last_name, national_id, dob, phone, gender, occupation) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        data.title,
        data.first_name,
        data.last_name,
        data.national_id,
        data.dob,
        data.phone,
        data.gender,
        data.occupation,
      ]
    );
    return result.rows[0];
  };
  

  export const getPersonById = async (personId) => {
    const { rows } = await query(`
      SELECT *
      FROM people
      WHERE person_id = $1
    `, [personId]);
    return rows[0] || null;
  };

  export const getInfoByMemberId = async (memberId) => {
    const { rows } = await query(`
    SELECT p.title, p.first_name, p.last_name, p.national_id, p.dob, p.phone, p.gender, p.occupation 
    FROM people p
    JOIN candidates c ON c.person_id = p.person_id
	  JOIN members m ON m.candidate_id = c.candidate_id
    WHERE m.member_id = $1
    `, [memberId]);

    return rows[0];
  };

  export const getInfoByHeirId = async (heirId) => {
    const { rows } = await query(`
    SELECT p.title, p.first_name, p.last_name, p.national_id, p.dob, p.phone, p.gender, p.occupation
    FROM people p
    JOIN heirs h ON h.person_id = p.person_id
    WHERE h.heir_id = $1
    `, [heirId]);

    return rows[0];
  };
  