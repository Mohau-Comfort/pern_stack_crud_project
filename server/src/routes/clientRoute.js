// src/routes/clientRoute.js
import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

// GET all clients
router.get('/clients', clientController.getAllClients);

// GET client by ID
router.get('/clients/:id', clientController.getClientById);

// POST create a new client
router.post('/clients', clientController.createClient);

// PUT update a client
router.put('/clients/:id', clientController.updateClient);

// DELETE a client
router.delete('/clients/:id', clientController.deleteClient);

export default router;