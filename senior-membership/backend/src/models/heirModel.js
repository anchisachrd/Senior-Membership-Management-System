import { query } from '../db.js';  // Assuming you have a db.js file for the database connection

// Create a new heir
export const createHeir = async (person_id, candidate_id, relationship, address_id, account_id) => {
    const result = await query(
      `INSERT INTO heirs (person_id, candidate_id, relationship, address_id, account_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [person_id, candidate_id, relationship, address_id, account_id ]
    );
    return result.rows[0];
  };




// Get heir by national ID
export const getHeirByNationalId = async (national_id) => {
    const { rows } = await query(
        `SELECT * FROM heirs WHERE national_id = $1`,
        [national_id]
    );
    return rows[0];
};

// Get heir by ID
export const getHeirById = async (heir_id) => {
    const { rows } = await query(
        `SELECT * FROM heirs WHERE heir_id = $1`,
        [heir_id]
    );
    return rows[0];
};

// Update heir
export const updateHeir = async (heir_id, heirData) => {
    const { title, first_name, last_name, email, phone, gender, occupation, relationship } = heirData;
    const { rows } = await query(
        `UPDATE heirs SET title = $1, first_name = $2, last_name = $3, email = $4, phone = $5, gender = $6, occupation = $7, relationship = $8 WHERE heir_id = $9 RETURNING *`,
        [title, first_name, last_name, email, phone, gender, occupation, relationship, heir_id]
    );
    return rows[0];
};

// Delete heir by ID
export const deleteHeir = async (heir_id) => {
    const { rows } = await query(
        `DELETE FROM heirs WHERE heir_id = $1 RETURNING *`,
        [heir_id]
    );
    return rows[0];
};

export const getIdByAccountId = async (accountId) => {
    const { rows } = await query(
        `SELECT heir_id FROM heirs WHERE account_id = $1`,
        [accountId]
    );
    return rows[0];
};
