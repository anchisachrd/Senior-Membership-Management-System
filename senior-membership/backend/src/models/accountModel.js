import { query } from "../db.js";
import bcrypt from "bcrypt";

export const createAccount = async (email, password, role) => {
  const { rows } = await query(
    `INSERT INTO accounts (email, password_hash, role, is_active)
         VALUES ($1, $2, $3, false) RETURNING *`,
    [email, password, role]
  );

  return rows[0];
};

export const createHeirAccount = async (email, role) => {
  const { rows } = await query(
    `INSERT INTO accounts (email, role, password_hash, is_active)
       VALUES ($1, $2, '', false) RETURNING *`,
    [email, role]
  );

  return rows[0];
};
export const getAccountById = async (accountId) => {
  const { rows } = await query(`SELECT * FROM accounts WHERE account_id = $1`, [
    accountId,
  ]);
  return rows[0];
};

// Get account by email
export const getAccountByEmail = async (email) => {
  const { rows } = await query(`SELECT * FROM accounts WHERE email = $1`, [
    email,
  ]);
  return rows[0]; // Returns the first matching row
};

export const getEmailById = async (accountId) => {
  const { rows } = await query(
    `SELECT email 
       FROM accounts 
       WHERE account_id = $1`,
    [accountId]
  );
  return rows[0]; // Returns the first matching row
};

export const updateHeirPasswordByCandidateId = async (
  candidateId,
  password
) => {
  const { rows } = await query(
    `UPDATE accounts 
    SET password_hash = $1, is_active = TRUE, updated_at = NOW()
    WHERE account_id = (
      SELECT account_id FROM heirs WHERE candidate_id = $2
    )
    RETURNING *`, 
    [password, candidateId]
  );
  return rows[0]; 
};

export const activateMemberAccount = async (candidateId) => {
  const { rows } = await query(
    `UPDATE accounts
     SET is_active = TRUE,
         role = 'member'
     WHERE account_id = (
        SELECT account_id FROM candidates WHERE candidate_id = $1
     )
     RETURNING *;`,
    [candidateId]
  );
  return rows[0]; // Returns the updated account record
};



// Get all accounts with a specific role
export const getAccountsByRole = async (role) => {
  const { rows } = await query(`SELECT * FROM accounts WHERE role = $1`, [
    role,
  ]);
  return rows;
};

// Update account status to active
export const activateAccount = async (accountId) => {
  const { rows } = await query(
    `UPDATE accounts SET is_active = TRUE, updated_at = CURRENT_TIMESTAMP WHERE account_id = $1 RETURNING *`,
    [accountId]
  );
  return rows[0];
};

// Deactivate account
export const deactivateAccount = async (accountId) => {
  const { rows } = await query(
    `UPDATE accounts SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE account_id = $1 RETURNING *`,
    [accountId]
  );
  return rows[0];
};

export const updateRole = async (accountId) => {
  const { rows } = await query(
    `UPDATE accounts 
         SET role = 'member' 
         WHERE account_id = $1 
         RETURNING *`,
    [accountId]
  );
  return rows[0];
};

export const updatePassword = async (accountId, password_hash) => {
  const { rows } = await query(
    `UPDATE accounts 
         SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
         WHERE account_id = $2 
         RETURNING *`,
    [password_hash, accountId]
  );
  return rows[0];
};

export const getCandidateEmail = async (candidateId) => {
  const { rows } = await query(
    `
      SELECT a.email 
      FROM candidates c
      JOIN accounts a ON c.account_id = a.account_id
      WHERE c.candidate_id = $1;
      `,
    [candidateId]
  );
  return rows[0];
};
