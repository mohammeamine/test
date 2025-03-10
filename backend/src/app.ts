import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { config } from './config';
import { testConnection } from './config/db';
import routes from './routes';
import { initializeDatabase } from './utils/db-init';
import { setupSocketIO } from './socket';
import assignmentRoutes from './routes/assignment.routes';
import documentRoutes from './routes/document.routes';
import { ensureUploadDirectories } from './services/file-upload.service';
import dotenv from 'dotenv';

// Import error handling middleware
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const server = http.createServer(app);

// Set up Socket.IO
setupSocketIO(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API routes
app.use('/api', routes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/documents', documentRoutes);

// Register routes
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import classRoutes from './routes/class.routes';
import departmentRoutes from './routes/department.routes';
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/departments', departmentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('School Management API is running');
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.server.port;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    // Test database connection
    await testConnection();
    console.log('Database connection established successfully');
    
    // Initialize database tables
    try {
      await initializeDatabase();
      console.log('Database tables initialized successfully');
    } catch (err) {
      console.error('Error initializing database tables, but server will continue running:', err);
    }
    
    // Ensure upload directories exist
    ensureUploadDirectories();
    console.log('Upload directories initialized');
    
    console.log(`Server is ready at http://localhost:${PORT}`);
    console.log(`Socket.IO server is running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to initialize server properly:', err);
    console.log('Server is running but some functionality may be limited');
  }
});

export default app; 