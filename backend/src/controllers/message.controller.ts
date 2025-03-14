import { Request, Response } from 'express';
import { messageService } from '../services/message.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendError } from '../utils/response.utils';

class MessageController {
  /**
   * Envoyer un nouveau message
   */
  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { receiverId, subject, content } = req.body;
    const senderId = req.user?.id;

    if (!senderId) {
      return sendError(res, 'User not authenticated', 401);
    }

    const message = await messageService.sendMessage({
      senderId,
      receiverId,
      subject,
      content
    });

    return sendSuccess(res, message, 'Message sent successfully', 201);
  });

  /**
   * Récupérer tous les messages d'un utilisateur
   */
  getMessages = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return sendError(res, 'User not authenticated', 401);
    }

    const { type, status, search, limit, offset } = req.query;

    const messages = await messageService.getMessages(userId, {
      type: type as 'sent' | 'received',
      status: status as 'sent' | 'delivered' | 'read',
      search: search as string,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined
    });

    return sendSuccess(res, messages, 'Messages retrieved successfully');
  });

  /**
   * Récupérer un message spécifique
   */
  getMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const messageId = req.params.id;

    if (!userId) {
      return sendError(res, 'User not authenticated', 401);
    }

    const message = await messageService.getMessage(messageId, userId);
    return sendSuccess(res, message, 'Message retrieved successfully');
  });

  /**
   * Marquer un message comme lu
   */
  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const messageId = req.params.id;

    if (!userId) {
      return sendError(res, 'User not authenticated', 401);
    }

    await messageService.markAsRead(messageId, userId);
    return sendSuccess(res, null, 'Message marked as read');
  });

  /**
   * Récupérer les statistiques des messages
   */
  getMessageStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return sendError(res, 'User not authenticated', 401);
    }

    const stats = await messageService.getMessageStats(userId);
    return sendSuccess(res, stats, 'Message statistics retrieved successfully');
  });

  /**
   * Supprimer un message
   */
  deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const messageId = req.params.id;

    if (!userId) {
      return sendError(res, 'User not authenticated', 401);
    }

    await messageService.deleteMessage(messageId, userId);
    return sendSuccess(res, null, 'Message deleted successfully');
  });
}

export const messageController = new MessageController(); 