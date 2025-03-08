import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';
import { userModel } from '../models/user.model';
import { courseModel } from '../models/course.model';
import { courseEnrollmentModel } from '../models/course-enrollment.model';
import { classModel } from '../models/class.model';
import { classScheduleModel } from '../models/class-schedule.model';

/**
 * Initialize database tables
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('Initializing database tables...');
    
    // Path to the schema file
    const schemaPath = path.join(__dirname, '../../db/schema.sql');
    
    // Check if schema file exists
    if (fs.existsSync(schemaPath)) {
      console.log('Using schema file for database initialization...');
      
      // Read the schema file and split into individual statements
      const sql = fs.readFileSync(schemaPath, 'utf8');
      
      try {
        // Execute all statements at once (multipleStatements option should be true in the connection)
        await pool.query(sql);
        console.log('Schema applied successfully');
      } catch (error) {
        console.error('Error executing schema, falling back to direct table creation:', error);
        // Create tables directly if schema execution fails
        await userModel.createTable();
        await courseModel.createTable();
        await courseEnrollmentModel.createTable();
        await classModel.createTable();
        await classScheduleModel.createTable();
      }
    } else {
      console.log('Schema file not found, creating tables directly...');
      
      // Create tables in the correct order (respecting foreign key constraints)
      await userModel.createTable();
      await courseModel.createTable();
      await courseEnrollmentModel.createTable();
      await classModel.createTable();
      await classScheduleModel.createTable();
      // Add other model table creations here as they are implemented
    }
    
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
    throw error;
  }
}; 