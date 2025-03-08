/**
 * Database setup script
 * Run with: node db/setup.js
 */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function setup() {
  console.log('Starting database setup...');
  
  // Create connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true // Important for running multiple SQL statements
  });

  try {
    // Read SQL file
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'pfe'}`);
    
    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'pfe'}`);
    
    // Execute the SQL commands
    await connection.query(sql);
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Run the setup
setup(); 