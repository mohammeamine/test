import { apiClient } from "../lib/api-client"
import { Course, Assignment, Material } from "../types/models"

export interface CreateCourseData {
  name: string
  code: string
  description: string
  teacherId: string
  startDate: string
  endDate: string
  credits: number
  maxStudents: number
}

export interface UpdateCourseData extends Partial<CreateCourseData> {}

export interface CourseFilters {
  status?: Course["status"]
  teacherId?: string
  search?: string
}

class CourseService {
  private readonly basePath = "/courses"

  async getCourses(filters?: CourseFilters) {
    const { data } = await apiClient.get<Course[]>(this.basePath, filters as Record<string, string>)
    return data
  }

  async getCourse(id: string) {
    const { data } = await apiClient.get<Course>(`${this.basePath}/${id}`)
    return data
  }

  async createCourse(courseData: CreateCourseData) {
    const { data } = await apiClient.post<Course>(this.basePath, courseData)
    return data
  }

  async updateCourse(id: string, courseData: UpdateCourseData) {
    const { data } = await apiClient.put<Course>(
      `${this.basePath}/${id}`,
      courseData
    )
    return data
  }

  async deleteCourse(id: string) {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  // Assignments
  async getCourseAssignments(courseId: string) {
    const { data } = await apiClient.get<Assignment[]>(
      `${this.basePath}/${courseId}/assignments`
    )
    return data
  }

  async createCourseAssignment(courseId: string, assignmentData: Partial<Assignment>) {
    const { data } = await apiClient.post<Assignment>(
      `${this.basePath}/${courseId}/assignments`,
      assignmentData
    )
    return data
  }

  // Materials
  async getCourseMaterials(courseId: string) {
    const { data } = await apiClient.get<Material[]>(
      `${this.basePath}/${courseId}/materials`
    )
    return data
  }

  async addCourseMaterial(courseId: string, materialData: Partial<Material>) {
    const { data } = await apiClient.post<Material>(
      `${this.basePath}/${courseId}/materials`,
      materialData
    )
    return data
  }

  // Enrollment
  async enrollStudent(courseId: string, studentId: string) {
    const { data } = await apiClient.post<Course>(
      `${this.basePath}/${courseId}/enroll`,
      { studentId }
    )
    return data
  }

  async unenrollStudent(courseId: string, studentId: string) {
    const { data } = await apiClient.post<Course>(
      `${this.basePath}/${courseId}/unenroll`,
      { studentId }
    )
    return data
  }
}

export const courseService = new CourseService() 