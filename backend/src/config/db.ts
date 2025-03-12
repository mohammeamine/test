import * as mysql from 'mysql2/promise';
import { config } from './index';

// Create the database connection pool with error handling
let pool: mysql.Pool;

try {
  pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true  // Allow multiple statements in a single query
  });
  
  console.log('Database pool created successfully');
} catch (error) {
  console.error('Error creating database pool:', error);
  // Create a minimal pool object to prevent crashes
  pool = {} as mysql.Pool;
}

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    if (!pool.getConnection) {
      console.error('Database pool not properly initialized');
      return false;
    }
    
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    console.log('Please make sure MySQL is running and the database is set up.');
    console.log('You can run "node db/setup.js" to create the database schema.');
    console.log('You can run "node db/seed.js" to populate the database with sample data.');
    return false;
  }
};

/**
 * Execute a SQL query with better error handling
 */
export const query = async <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
  try {
    if (!pool.execute) {
      console.error('Database pool not properly initialized');
      return [];
    }
    
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw error;
  }
};

/**
 * Execute a transaction with multiple queries
 */
export type Transaction = <T>(callback: (connection: mysql.PoolConnection) => Promise<T>) => Promise<T>;

export const transaction: Transaction = async <T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> => {
  if (!pool.getConnection) {
    console.error('Database pool not properly initialized');
    throw new Error('Database connection not available');
  }
  
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Export the pool
export { pool }; 