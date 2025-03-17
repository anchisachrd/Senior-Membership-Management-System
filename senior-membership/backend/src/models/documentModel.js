import { query } from "../db.js";

// Create a document
export const uploadDocument = async (doc_path, doc_type, entity_id, entity_type) => {
  const result = await query(
    `INSERT INTO documents (doc_path, doc_type, entity_id, entity_type) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [doc_path, doc_type, entity_id, entity_type]
  );
  return result.rows[0];
};


// Get a document by ID
export const getDocumentById = async (documentId) => {
  const { rows } = await query(
    `SELECT * FROM documents WHERE document_id = $1`,
    [documentId]
  );
  return rows[0];
};

// Get all documents
export const getAllDocuments = async () => {
  const { rows } = await query(`SELECT * FROM documents`);
  return rows;
};

// Update a document
// export const updateDocument = async (documentId, documentData) => {
//     const { doc_path, doc_type, entity_type, entity_id } = documentData;
//     const { rows } = await query(
//         `UPDATE documents
//          SET doc_path = $1, doc_type = $2, entity_type = $3, entity_id = $4
//          WHERE document_id = $5 RETURNING *`,
//         [doc_path, doc_type, entity_type, entity_id, documentId]
//     );
//     return rows[0];
// };

// Delete a document
export const deleteDocument = async (documentId) => {
  const { rows } = await query(
    `DELETE FROM documents WHERE document_id = $1 RETURNING *`,
    [documentId]
  );
  return rows[0];
};

export const getDocumentsByCandidateId = async (candidateId) => {
  const sql = `
    SELECT document_id, doc_path, doc_type
    FROM documents
    WHERE entity_id = $1 AND entity_type = 'candidate';
  `;
  const { rows } = await query(sql, [candidateId]);
  return rows;
};

export const getDocumentsByHeirId = async (heirId) => {
  const sql = `
    SELECT document_id, doc_path, doc_type
    FROM documents
    WHERE entity_id = $1 AND entity_type = 'heir';
  `;
  const { rows } = await query(sql, [heirId]);
  return rows;
};

