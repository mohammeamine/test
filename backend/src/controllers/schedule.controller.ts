import { Request, Response } from 'express';
import { scheduleService } from '../services/schedule.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess, sendError } from '../utils/response.utils';

class ScheduleController {
  /**
   * Récupérer les horaires des enfants d'un parent
   */
  getChildrenSchedules = asyncHandler(async (req: Request, res: Response) => {
    const parentId = req.user?.id;

    if (!parentId) {
      return sendError(res, 'User not authenticated', 401);
    }

    const schedules = await scheduleService.getChildrenSchedules(parentId);
    return sendSuccess(res, schedules, 'Schedules retrieved successfully');
  });

  /**
   * Récupérer l'horaire d'un étudiant spécifique
   */
  getStudentSchedule = asyncHandler(async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const schedules = await scheduleService.getStudentSchedule(studentId);
    return sendSuccess(res, schedules, 'Student schedule retrieved successfully');
  });

  /**
   * Créer un nouvel horaire (réservé aux administrateurs)
   */
  createSchedule = asyncHandler(async (req: Request, res: Response) => {
    const scheduleId = await scheduleService.createSchedule(req.body);
    return sendSuccess(res, { id: scheduleId }, 'Schedule created successfully', 201);
  });
}

export const scheduleController = new ScheduleController(); 