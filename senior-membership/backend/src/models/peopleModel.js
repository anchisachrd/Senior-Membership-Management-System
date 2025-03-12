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
  