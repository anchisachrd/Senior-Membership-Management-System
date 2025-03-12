import { query } from "../db.js"
import bcrypt from "bcrypt";

export const createAccount = async (email, password, role) => {

    const { rows } = await query(
        `INSERT INTO accounts (email, password_hash, role, is_active)
         VALUES ($1, $2, $3, false) RETURNING *`,
        [email, password, role]
    );

    return rows[0];
};
