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
  const { rows } = await query(
    `SELECT * FROM address WHERE address_id = $1`,
    [id]
  );

  return rows[0];
};

export const getAddressByMemberId = async (memberId) => {
  const { rows } = await query(
    `SELECT a.house_number, a.moo, a.soi, a.street, a.province, a.district, a.subdistrict, a.postal_code 
    FROM address a
    JOIN candidates c ON c.address_id = a.address_id
	  JOIN members m ON m.candidate_id = c.candidate_id
    WHERE m.member_id = $1`,
    [memberId]
  );

  return rows[0];
};

export const getAddressByHeirId = async (heirId) => {
  const { rows } = await query(
    `SELECT a.house_number, a.moo, a.soi, a.street, a.province, a.district, a.subdistrict, a.postal_code 
    FROM address a
    JOIN heirs h ON h.address_id = a.address_id
    WHERE h.heir_id = $1`,
    [heirId]
  );

  return rows[0];
};


