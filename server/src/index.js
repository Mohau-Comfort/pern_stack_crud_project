// src/index.js
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import clientRoute from './routes/clientRoute.js';
import { logger } from './utils/logger.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load swagger document
const swaggerDocument = JSON.parse(
  readFileSync(join(__dirname, './utils/swagger.json'), 'utf8')
);

// API routes
app.use('/api', clientRoute);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>PERN Stack API</h1>
    <p>Welcome to the PERN Stack API.</p>
    <p>Visit <a href="/api-docs">API Documentation</a> to view the available endpoints.</p>
  `);
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export default app;