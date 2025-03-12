import { query } from "../db.js"

export const createAddress = async (data) => {
  const result = await query(
    `INSERT INTO address (house_number, moo, soi, street, province, district, subdistrict, postal_code) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      data.house_number,
      data.moo,
      data.soi,
      data.street,
      data.province,
      data.district,
      data.subdistrict,
      data.postal_code,
    ]
  );
  return result.rows[0];
};


export const getAddressById = async (id) => {
    const { rows } = await query (
      `SELECT * FROM address WHERE address_id = $1`,
      [id]
    );
  
    return rows[0];
  };


