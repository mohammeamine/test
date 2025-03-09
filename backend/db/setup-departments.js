const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pfe'
};

async function setup() {
  console.log('Starting departments table setup...');
  
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established.');
    
    // Create departments table
    const createDepartmentsTableSQL = `
      CREATE TABLE IF NOT EXISTS departments (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(10) NOT NULL UNIQUE,
        headId VARCHAR(36),
        description TEXT NOT NULL,
        established DATE NOT NULL,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (headId) REFERENCES users(id) ON DELETE SET NULL
      )
    `;
    
    await connection.query(createDepartmentsTableSQL);
    console.log('Departments table created or verified.');
    
    // Add departmentId column to users table if not exists
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS departmentId VARCHAR(36)`);
      console.log('Added departmentId column to users table.');
    } catch (err) {
      // Column might already exist
      console.log('Note: departmentId column might already exist in users table.');
    }
    
    // Add foreign key to users table
    try {
      await connection.query(`
        ALTER TABLE users 
        ADD CONSTRAINT fk_user_department 
        FOREIGN KEY (departmentId) 
        REFERENCES departments(id) 
        ON DELETE SET NULL
      `);
      console.log('Added foreign key constraint to users table.');
    } catch (err) {
      // Constraint might already exist
      console.log('Note: Foreign key constraint might already exist in users table.');
    }
    
    // Add departmentId column to courses table if not exists
    try {
      await connection.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS departmentId VARCHAR(36)`);
      console.log('Added departmentId column to courses table.');
    } catch (err) {
      // Column might already exist
      console.log('Note: departmentId column might already exist in courses table.');
    }
    
    // Add foreign key to courses table
    try {
      await connection.query(`
        ALTER TABLE courses 
        ADD CONSTRAINT fk_course_department 
        FOREIGN KEY (departmentId) 
        REFERENCES departments(id) 
        ON DELETE SET NULL
      `);
      console.log('Added foreign key constraint to courses table.');
    } catch (err) {
      // Constraint might already exist
      console.log('Note: Foreign key constraint might already exist in courses table.');
    }
    
    console.log('Departments setup completed successfully!');
  } catch (error) {
    console.error('Error setting up departments table:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

setup(); 