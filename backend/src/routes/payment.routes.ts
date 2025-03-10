import express, { RequestHandler } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Student role required for these routes
router.use(authorize(['student', 'admin']));

// Get payment summary
router.get('/summary', paymentController.getPaymentSummary as RequestHandler);

// Get payment history
router.get('/history', paymentController.getPaymentHistory as RequestHandler);

// Get upcoming payments
router.get('/upcoming', paymentController.getUpcomingPayments as RequestHandler);

// Process a payment
router.post('/process', paymentController.processPayment as RequestHandler);

// Get invoices
router.get('/invoices', paymentController.getInvoices as RequestHandler);

// Get a specific invoice
router.get('/invoices/:invoiceId', paymentController.getInvoice as RequestHandler);

// Download an invoice
router.get('/invoices/:invoiceId/download', paymentController.downloadInvoice as RequestHandler);

// Get payment methods
router.get('/methods', paymentController.getPaymentMethods as RequestHandler);

// Add a payment method
router.post('/methods', paymentController.addPaymentMethod as RequestHandler);

// Delete a payment method
router.delete('/methods/:methodId', paymentController.deletePaymentMethod as RequestHandler);

// Set a payment method as default
router.put('/methods/:methodId/default', paymentController.setDefaultPaymentMethod as RequestHandler);

export default router; 