// src/controllers/clientController.js
import * as clientServices from '../services/clientServices.js';
import { logger } from '../utils/logger.js';

/**
 * Retrieve all clients
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllClients = async (req, res) => {
    try {
        const clients = await clientServices.getAllClients();
        logger.info(`Retrieved ${clients.length} clients`);
        res.status(200).json(clients);
    } catch (err) {
        logger.error(`Error in getAllClients: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieve a client by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getClientById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid client ID' });
        }
        
        const client = await clientServices.getClientById(id);
        
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        logger.info(`Retrieved client ID: ${id}`);
        res.status(200).json(client);
    } catch (err) {
        logger.error(`Error in getClientById: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Create a new client
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createClient = async (req, res) => {
    try {
        const { name, email, job, rate, status } = req.body;
        
        // Validate required fields
        if (!name || !email || !job || !rate || !status) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, email, job, rate, and status are required' 
            });
        }
        
        // Validate status value
        const validStatuses = ['Active', 'Inactive', 'Available'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status value. Must be one of: Active, Inactive, Available' 
            });
        }
        
        const newClient = await clientServices.createClient({ name, email, job, rate, status });
        logger.info(`Created new client: ${newClient.name} (ID: ${newClient.id})`);
        res.status(201).json(newClient);
    } catch (err) {
        // Check for duplicate email
        if (err.message.includes('duplicate key') && err.message.includes('email')) {
            return res.status(409).json({ error: 'A client with this email already exists' });
        }
        
        logger.error(`Error in createClient: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Update an existing client
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid client ID' });
        }
        
        const { name, email, job, rate, status } = req.body;
        
        // Validate required fields
        if (!name || !email || !job || !rate || !status) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, email, job, rate, and status are required' 
            });
        }
        
        // Validate status value
        const validStatuses = ['Active', 'Inactive', 'Available'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status value. Must be one of: Active, Inactive, Available' 
            });
        }
        
        const updatedClient = await clientServices.updateClient(id, { name, email, job, rate, status });
        
        if (!updatedClient) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        logger.info(`Updated client ID: ${id}`);
        res.status(200).json(updatedClient);
    } catch (err) {
        // Check for duplicate email
        if (err.message.includes('duplicate key') && err.message.includes('email')) {
            return res.status(409).json({ error: 'A client with this email already exists' });
        }
        
        logger.error(`Error in updateClient: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Delete a client
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid client ID' });
        }
        
        const deleted = await clientServices.deleteClient(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        logger.info(`Deleted client ID: ${id}`);
        res.status(204).send(); // No content response for successful delete
    } catch (err) {
        logger.error(`Error in deleteClient: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};