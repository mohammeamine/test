/// <reference types="multer" />
import express, { RequestHandler } from 'express';
import multer from 'multer';
import { DocumentController } from '../controllers/document.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

// Create a router instance
const router = express.Router();

// Configure multer storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

// Apply authentication middleware to all document routes
router.use(authenticate);

// Get all documents with filtering
router.get('/', DocumentController.getDocuments as RequestHandler);

// Search documents
router.get('/search', DocumentController.searchDocuments as RequestHandler);

// Get documents shared with current user
router.get('/shared', DocumentController.getSharedDocuments as RequestHandler);

// Get pending documents (admin only)
router.get('/pending', authorize(['admin']), DocumentController.getPendingDocuments as RequestHandler);

// Upload a new document
router.post('/', upload.single('file'), DocumentController.uploadDocument as RequestHandler);

// Get a specific document
router.get('/:id', DocumentController.getDocument as RequestHandler);

// Update document
router.put('/:id', DocumentController.updateDocument as RequestHandler);

// Delete document
router.delete('/:id', DocumentController.deleteDocument as RequestHandler);

// Download document
router.get('/:id/download', DocumentController.downloadDocument as RequestHandler);

// Approve document (admin only)
router.post('/:id/approve', authorize(['admin']), DocumentController.approveDocument as RequestHandler);

// Reject document (admin only)
router.post('/:id/reject', authorize(['admin']), DocumentController.rejectDocument as RequestHandler);

// Share document with other users
router.post('/:id/share', DocumentController.shareDocument as RequestHandler);

export default router; 