import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { testConnection } from './config/db';
import routes from './routes';
import { initializeDatabase } from './utils/db-init';
import assignmentRoutes from './routes/assignment.routes';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API routes
app.use('/api', routes);
app.use('/api/assignments', assignmentRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'An unexpected error occurred',
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: true,
    message: 'Resource not found',
  });
});

// Start server
const PORT = config.server.port;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test database connection
  await testConnection();
  
  // Initialize database tables
  await initializeDatabase();
  
  console.log(`Server is ready at http://localhost:${PORT}`);
});

export default app; 