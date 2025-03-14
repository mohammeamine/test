import { scheduleModel, CreateScheduleDTO, ScheduleWithDetails } from '../models/schedule.model';
import { ApiError } from '../middlewares/error.middleware';

class ScheduleService {
  async getChildrenSchedules(parentId: string): Promise<ScheduleWithDetails[]> {
    try {
      return await scheduleModel.findByParent(parentId);
    } catch (error) {
      throw new ApiError('Failed to fetch schedules', 500);
    }
  }

  async getStudentSchedule(studentId: string): Promise<ScheduleWithDetails[]> {
    try {
      return await scheduleModel.findByStudent(studentId);
    } catch (error) {
      throw new ApiError('Failed to fetch student schedule', 500);
    }
  }

  async createSchedule(scheduleData: CreateScheduleDTO): Promise<string> {
    // Vérifier les conflits d'horaire
    const hasConflict = await scheduleModel.checkConflicts(scheduleData);
    if (hasConflict) {
      throw new ApiError('Schedule conflict detected', 400);
    }

    try {
      return await scheduleModel.create(scheduleData);
    } catch (error) {
      throw new ApiError('Failed to create schedule', 500);
    }
  }

  // Fonction utilitaire pour valider le format de l'heure
  private validateTimeFormat(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  // Fonction utilitaire pour valider les données du planning
  private validateScheduleData(data: CreateScheduleDTO): void {
    if (!this.validateTimeFormat(data.startTime) || !this.validateTimeFormat(data.endTime)) {
      throw new ApiError('Invalid time format', 400);
    }

    if (data.dayOfWeek < 1 || data.dayOfWeek > 5) {
      throw new ApiError('Day of week must be between 1 and 5', 400);
    }

    const start = new Date(`1970-01-01T${data.startTime}`);
    const end = new Date(`1970-01-01T${data.endTime}`);
    if (end <= start) {
      throw new ApiError('End time must be after start time', 400);
    }
  }
}

export const scheduleService = new ScheduleService(); 