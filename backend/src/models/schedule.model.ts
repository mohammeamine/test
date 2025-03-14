import { RowDataPacket } from 'mysql2';
import { query } from '../config/db';

export interface Schedule {
  id: string;
  studentId: string;
  courseId: string;
  dayOfWeek: number; // 1-5 pour Lundi-Vendredi
  startTime: string;
  endTime: string;
  room: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleWithDetails extends Schedule {
  studentName: string;
  courseName: string;
  teacher: string;
}

export interface CreateScheduleDTO {
  studentId: string;
  courseId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
}

interface ScheduleRow extends ScheduleWithDetails, RowDataPacket {}

export class ScheduleModel {
  async createTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS schedules (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        courseId VARCHAR(36) NOT NULL,
        dayOfWeek INT NOT NULL CHECK (dayOfWeek BETWEEN 1 AND 5),
        startTime TIME NOT NULL,
        endTime TIME NOT NULL,
        room VARCHAR(50) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await query(sql);
  }

  async create(scheduleData: CreateScheduleDTO): Promise<string> {
    const id = crypto.randomUUID();
    const sql = `
      INSERT INTO schedules (id, studentId, courseId, dayOfWeek, startTime, endTime, room)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    await query(sql, [
      id,
      scheduleData.studentId,
      scheduleData.courseId,
      scheduleData.dayOfWeek,
      scheduleData.startTime,
      scheduleData.endTime,
      scheduleData.room
    ]);
    return id;
  }

  async findByParent(parentId: string): Promise<ScheduleWithDetails[]> {
    const sql = `
      SELECT 
        s.*,
        CONCAT(u.firstName, ' ', u.lastName) as studentName,
        c.name as courseName,
        CONCAT(t.firstName, ' ', t.lastName) as teacher
      FROM schedules s
      JOIN users u ON s.studentId = u.id
      JOIN courses c ON s.courseId = c.id
      JOIN users t ON c.teacherId = t.id
      JOIN parent_child pc ON u.id = pc.childId
      WHERE pc.parentId = ?
      ORDER BY s.dayOfWeek, s.startTime;
    `;
    const [rows] = await query<ScheduleRow[]>(sql, [parentId]);
    return rows;
  }

  async findByStudent(studentId: string): Promise<ScheduleWithDetails[]> {
    const sql = `
      SELECT 
        s.*,
        CONCAT(u.firstName, ' ', u.lastName) as studentName,
        c.name as courseName,
        CONCAT(t.firstName, ' ', t.lastName) as teacher
      FROM schedules s
      JOIN users u ON s.studentId = u.id
      JOIN courses c ON s.courseId = c.id
      JOIN users t ON c.teacherId = t.id
      WHERE s.studentId = ?
      ORDER BY s.dayOfWeek, s.startTime;
    `;
    const [rows] = await query<ScheduleRow[]>(sql, [studentId]);
    return rows;
  }

  async checkConflicts(scheduleData: CreateScheduleDTO): Promise<boolean> {
    const sql = `
      SELECT COUNT(*) as count
      FROM schedules
      WHERE studentId = ?
        AND dayOfWeek = ?
        AND ((startTime <= ? AND endTime > ?)
        OR (startTime < ? AND endTime >= ?)
        OR (startTime >= ? AND endTime <= ?));
    `;
    const [rows] = await query<RowDataPacket[]>(sql, [
      scheduleData.studentId,
      scheduleData.dayOfWeek,
      scheduleData.endTime,
      scheduleData.startTime,
      scheduleData.endTime,
      scheduleData.startTime,
      scheduleData.startTime,
      scheduleData.endTime
    ]);
    return rows[0].count > 0;
  }
}

export const scheduleModel = new ScheduleModel(); 