import { apiClient } from '../lib/api-client';

export type FeedbackStatus = 'pending' | 'reviewed';

export interface Feedback {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  rating: number;
  comment: string;
  submittedAt: string;
  status: FeedbackStatus;
  teacherResponse?: string;
  teacherResponseDate?: string;
  teacherFirstName?: string;
  teacherLastName?: string;
  teacherAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseStats {
  averageRating: number;
  totalFeedback: number;
  ratingDistribution: Record<number, number>;
}

export interface SubmitFeedbackRequest {
  courseId: string;
  rating: number;
  comment: string;
}

export interface UpdateFeedbackRequest {
  rating?: number;
  comment?: string;
}

export interface TeacherResponseRequest {
  response: string;
}

class FeedbackService {
  /**
   * Get feedback for the current student
   */
  async getStudentFeedback(): Promise<Feedback[]> {
    const response = await apiClient.get<{ feedback: Feedback[] }>('/feedback/student');
    return response.data.feedback;
  }

  /**
   * Get feedback for a course
   */
  async getCourseFeedback(courseId: string): Promise<Feedback[]> {
    const response = await apiClient.get<{ feedback: Feedback[] }>(`/feedback/course/${courseId}`);
    return response.data.feedback;
  }

  /**
   * Get feedback statistics for a course
   */
  async getCourseFeedbackStats(courseId: string): Promise<CourseStats> {
    const response = await apiClient.get<CourseStats>(`/feedback/course/${courseId}/stats`);
    return response.data;
  }

  /**
   * Submit feedback for a course
   */
  async submitFeedback(feedbackData: SubmitFeedbackRequest): Promise<{ feedbackId: string; message: string }> {
    const response = await apiClient.post<{ feedbackId: string; message: string }>('/feedback/submit', feedbackData);
    return response.data;
  }

  /**
   * Update feedback
   */
  async updateFeedback(feedbackId: string, feedbackData: UpdateFeedbackRequest): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(`/feedback/${feedbackId}`, feedbackData);
    return response.data;
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(feedbackId: string): Promise<void> {
    await apiClient.delete(`/feedback/${feedbackId}`);
  }

  /**
   * Get feedback for the current teacher
   */
  async getTeacherFeedback(): Promise<Feedback[]> {
    const response = await apiClient.get<{ feedback: Feedback[] }>('/feedback/teacher');
    return response.data.feedback;
  }

  /**
   * Add teacher response to feedback
   */
  async addTeacherResponse(feedbackId: string, responseData: TeacherResponseRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/feedback/${feedbackId}/respond`, responseData);
    return response.data;
  }
}

export const feedbackService = new FeedbackService(); 