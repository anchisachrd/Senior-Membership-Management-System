import { query } from "../db.js";

export const getInfoByAccountId = async (accountId) => {
    const { rows } = await query(
        `SELECT ad.admin_id, ad.title, ad.first_name, ad.last_name
        FROM admins ad
        JOIN accounts ac ON ad.account_id = ac.account_id 
        WHERE ad.account_id = $1`,
        [accountId]
    );
    return rows[0];
};
