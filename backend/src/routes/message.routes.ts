import { Router } from 'express';
import { messageController } from '../controllers/message.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateMessage } from '../middlewares/validators/message.validator';

const router = Router();

// Appliquer l'authentification à toutes les routes de messages
router.use(authenticate);

// Routes pour les messages
router.post('/', validateMessage, messageController.sendMessage);
router.get('/', messageController.getMessages);
router.get('/stats', messageController.getMessageStats);
router.get('/:id', messageController.getMessage);
router.put('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.deleteMessage);

export default router;