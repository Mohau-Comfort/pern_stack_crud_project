//src/controllers/clientController.js

import * as clientServices from '../services/clientServices.js';

export const getAllClients = async (req, res) => {
    try {
        const clients = await clientServices.getAllClients();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
