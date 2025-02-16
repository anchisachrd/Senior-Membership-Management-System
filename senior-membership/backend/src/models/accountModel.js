import { query } from "../db.js"; // Assuming you have a db.js file for the database connection

// Create a new account
export const createAccount = async ({
  email,
  password_hash,
  role,
  is_active,
}) => {
  console.log("Account Params:", { email, password_hash, role, is_active }); // Debug log
  try {
    const { rows } = await query(
      `INSERT INTO accounts (email, password_hash, role, is_active)
             VALUES ($1, $2, $3, $4) RETURNING account_id`,
      [email, password_hash, role, is_active]
    );
    return rows[0].account_id;
  } catch (error) {
    console.error("Error in createAccount:", error.message);
    throw error;
  }
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
