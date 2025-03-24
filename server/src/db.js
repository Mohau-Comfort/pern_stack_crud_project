// src/db.js
import pg from 'pg';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js'; // Create this utility for better logging

// Load environment variables
dotenv.config();

// Destructure the Pool class from pg
const { Pool } = pg;

// Create a connection pool instead of a single client for better performance
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  //connection pool options for better reliability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to be established
  // Optional SSL configuration for production
  ...(process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: false // Set to true in production with proper certificates
    }
  })
});

// Pool error handling
pool.on('error', (err, client) => {
  logger.error('Unexpected error on idle client', err);
  // Optionally terminate the process on critical errors
  // process.exit(-1);
});

// Verify connection during startup
const verifyConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    logger.info('Database connection established successfully');
    return true;
  } catch (err) {
    logger.error('Database connection error:', err.message);
    logger.error('Check your environment variables and database status');
    // Optionally exit the process if DB connection is critical
    // process.exit(-1);
    return false;
  } finally {
    if (client) client.release();
  }
};

// Execute query with proper error handling
const query = async (text, params) => {
  const start = Date.now();
  let client;
  
  try {
    client = await pool.connect();
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    
    // Log slow queries for performance monitoring
    if (duration > 100) {
      logger.warn('Slow query:', { text, duration, rows: res.rowCount });
    }
    
    return res;
  } catch (err) {
    // Add context to the error
    const enhancedError = new Error(`Database query error: ${err.message}`);
    enhancedError.originalError = err;
    enhancedError.query = text;
    enhancedError.params = params;
    
    logger.error('Query error:', {
      error: err.message,
      query: text,
      params: JSON.stringify(params),
      stack: err.stack
    });
    
    throw enhancedError;
  } finally {
    if (client) client.release();
  }
};

// For transactions that need multiple queries in a single transaction
const transaction = async (callback) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    logger.error('Transaction error:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

// Health check function
const healthCheck = async () => {
  try {
    const result = await query('SELECT NOW()');
    return { 
      status: 'ok', 
      timestamp: result.rows[0].now,
      pool: {
        total: pool.totalCount,
        idle: pool.idleCount,
        waiting: pool.waitingCount
      }
    };
  } catch (err) {
    return { 
      status: 'error', 
      message: err.message 
    };
  }
};

// Run the verification once at startup
verifyConnection();

export default {
  pool,
  query,
  transaction,
  healthCheck
};