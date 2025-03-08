import axios from '../config/axios';
import { Assignment, AssignmentWithDetails, Submission, SubmissionWithDetails } from '../types/assignment';

class AssignmentService {
  private baseUrl = '/assignments';

  /**
   * Get all assignments with optional filters
   */
  async getAssignments(filters?: {
    courseId?: string;
    status?: 'draft' | 'published' | 'closed';
    title?: string;
    dueDate?: string;
    dueBefore?: string;
    dueAfter?: string;
    teacherId?: string;
  }): Promise<AssignmentWithDetails[]> {
    const { data } = await axios.get(this.baseUrl, { params: filters });
    return data.data.assignments;
  }

  /**
   * Get a single assignment by ID
   */
  async getAssignment(id: string): Promise<AssignmentWithDetails> {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);
    return data.data.assignment;
  }

  /**
   * Create a new assignment
   */
  async createAssignment(assignmentData: {
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: 'draft' | 'published' | 'closed';
  }): Promise<Assignment> {
    const { data } = await axios.post(this.baseUrl, assignmentData);
    return data.data.assignment;
  }

  /**
   * Update an existing assignment
   */
  async updateAssignment(id: string, assignmentData: Partial<{
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: 'draft' | 'published' | 'closed';
  }>): Promise<Assignment> {
    const { data } = await axios.put(`${this.baseUrl}/${id}`, assignmentData);
    return data.data.assignment;
  }

  /**
   * Delete an assignment
   */
  async deleteAssignment(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Get all assignments for a course
   */
  async getAssignmentsForCourse(courseId: string): Promise<Assignment[]> {
    const { data } = await axios.get(`${this.baseUrl}/course/${courseId}`);
    return data.data.assignments;
  }

  /**
   * Get upcoming assignments for the current student
   */
  async getUpcomingAssignments(limit?: number): Promise<Assignment[]> {
    const params = limit ? `?limit=${limit}` : '';
    const { data } = await axios.get(`${this.baseUrl}/upcoming${params}`);
    return data.data.assignments;
  }

  /**
   * Get recent assignments for the current teacher
   */
  async getRecentAssignments(limit?: number): Promise<Assignment[]> {
    const params = limit ? `?limit=${limit}` : '';
    const { data } = await axios.get(`${this.baseUrl}/recent${params}`);
    return data.data.assignments;
  }

  /**
   * Submit an assignment
   */
  async submitAssignment(assignmentId: string, submissionData: {
    submissionUrl?: string;
    comment?: string;
  }): Promise<Submission> {
    const { data } = await axios.post(`${this.baseUrl}/${assignmentId}/submit`, submissionData);
    return data.data.submission;
  }

  /**
   * Grade a submission
   */
  async gradeSubmission(submissionId: string, gradeData: {
    grade: number;
    feedback?: string;
  }): Promise<SubmissionWithDetails> {
    const { data } = await axios.post(`${this.baseUrl}/submissions/${submissionId}/grade`, gradeData);
    return data.data.submission;
  }

  /**
   * Get all submissions for an assignment
   */
  async getSubmissionsForAssignment(assignmentId: string): Promise<SubmissionWithDetails[]> {
    const { data } = await axios.get(`${this.baseUrl}/${assignmentId}/submissions`);
    return data.data.submissions;
  }

  /**
   * Get all submissions for the current student
   */
  async getMySubmissions(): Promise<SubmissionWithDetails[]> {
    const { data } = await axios.get(`${this.baseUrl}/submissions/my`);
    return data.data.submissions;
  }
}

export const assignmentService = new AssignmentService();
export default assignmentService; 