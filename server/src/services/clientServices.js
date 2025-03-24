// src/services/clientServices.js
import db from "../db.js";

/**
 * Retrieves all clients from the database
 * 
 * @returns {Promise<Array>} Array of client objects
 * @throws {Error} If database query fails
 */
export const getAllClients = async () => {
  try {
    const response = await db.query('SELECT * FROM clients ORDER BY id');
    return response.rows;
  } catch (err) {
    throw new Error(`Error getting clients: ${err.message}`);
  }
};

/**
 * Retrieves a single client by ID
 * 
 * @param {number} id - The client ID to retrieve
 * @returns {Promise<Object>} Client object if found, undefined otherwise
 * @throws {Error} If database query fails
 */
export const getClientById = async (id) => {
  try {
    const response = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    
    // Check if client exists
    if (response.rows.length === 0) {
      return undefined;
    }
    
    return response.rows[0];
  } catch (err) {
    throw new Error(`Error getting client: ${err.message}`);
  }
};

/**
 * Creates a new client in the database
 * 
 * @param {Object} client - The client data
 * @param {string} client.name - Client name
 * @param {string} client.email - Client email (must be unique)
 * @param {string} client.job - Client job title
 * @param {string} client.rate - Client hourly rate
 * @param {string} client.status - Client status (Active, Inactive, Available)
 * @returns {Promise<Object>} The newly created client with ID and timestamps
 * @throws {Error} If database insert fails
 */
export const createClient = async (client) => {
  const { name, email, job, rate, status } = client;
  try {
    const response = await db.query(
      'INSERT INTO clients (name, email, job, rate, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [name, email, job, rate, status]
    );
    return response.rows[0];
  } catch (err) {
    throw new Error(`Error creating client: ${err.message}`);
  }
};

/**
 * Updates an existing client by ID
 * 
 * @param {number} id - The client ID to update
 * @param {Object} client - The updated client data
 * @param {string} client.name - Client name
 * @param {string} client.email - Client email
 * @param {string} client.job - Client job title
 * @param {string} client.rate - Client hourly rate
 * @param {string} client.status - Client status
 * @returns {Promise<Object>} The updated client object
 * @throws {Error} If database update fails or client not found
 */
export const updateClient = async (id, client) => {
  const { name, email, job, rate, status } = client;
  try {
    const response = await db.query(
      'UPDATE clients SET name = $1, email = $2, job = $3, rate = $4, status = $5 WHERE id = $6 RETURNING *', 
      [name, email, job, rate, status, id]
    );
    
    // Check if client exists
    if (response.rows.length === 0) {
      return undefined;
    }
    
    return response.rows[0];
  } catch (err) {
    throw new Error(`Error updating client: ${err.message}`);
  }
};

/**
 * Deletes a client by ID
 * 
 * @param {number} id - The client ID to delete
 * @returns {Promise<boolean>} True if deleted successfully, false if client not found
 * @throws {Error} If database deletion fails
 */
export const deleteClient = async (id) => {
  try {
    const response = await db.query('DELETE FROM clients WHERE id = $1 RETURNING id', [id]);
    
    // Return whether a row was actually deleted
    return response.rows.length > 0;
  } catch (err) {
    throw new Error(`Error deleting client: ${err.message}`);
  }
};