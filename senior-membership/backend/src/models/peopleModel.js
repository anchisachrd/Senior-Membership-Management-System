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
<<<<<<< HEAD
  

  export const getPersonById = async (personId) => {
    const { rows } = await query(`
      SELECT *
      FROM people
      WHERE person_id = $1
    `, [personId]);
    return rows[0] || null;
  };
=======
>>>>>>> 987039cdee1213812766e8cc628e1df63ec3dc4a
  