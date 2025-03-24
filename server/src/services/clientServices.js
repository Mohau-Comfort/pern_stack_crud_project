// src/services/clientServices.js
import db from "../db.js";

export const getAllClients = async () => {
  try {
    const response = await db.query('SELECT * FROM clients');
    return response.rows;
  } catch (err) {
    throw new Error(`Error getting clients: ${err.message}`);
  }
};