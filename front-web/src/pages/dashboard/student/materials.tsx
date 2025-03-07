import { useState } from "react"
import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { FileText, Video, Download, Search, Book, Filter, Clock, ChevronDown, Play, Eye, CheckCircle, BarChart } from "lucide-react"

interface StudentMaterialsProps {
  user: User
}

interface Material {
  id: string;
  title: string;
  courseId: string;
  type: "document" | "video" | "quiz" | "assignment";
  format: string;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  dueDate?: string;
  size?: string;
  duration?: string;
  status: "not_started" | "in_progress" | "completed";
  progress?: number;
  lastAccessed?: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  materialsCount: number;
}

export default function StudentMaterials({ user }: StudentMaterialsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showCompleted, setShowCompleted] = useState(true);

  // Mock courses data
  const courses: Course[] = [
    {
      id: "c1",
      name: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Maria Johnson",
      progress: 75,
      materialsCount: 12
    },
    {
      id: "c2",
      name: "Physics Fundamentals",
      code: "PHYS201",
      instructor: "Prof. Robert Chen",
      progress: 60,
      materialsCount: 8
    },
    {
      id: "c3",
      name: "Computer Science Basics",
      code: "CS101",
      instructor: "Prof. Alan Smith",
      progress: 90,
      materialsCount: 15
    }
  ];

  // Mock materials data
  const materials: Material[] = [
    {
      id: "m1",
      title: "Week 1: Introduction to Calculus",
      courseId: "c1",
      type: "document",
      format: "PDF",
      description: "Introduction to basic calculus concepts and derivatives.",
      uploadedBy: "Dr. Maria Johnson",
      uploadDate: "2025-03-01",
      size: "2.5 MB",
      status: "completed",
      lastAccessed: "2025-03-05"
    },
    {
      id: "m2",
      title: "Vector Calculus Lecture",
      courseId: "c1",
      type: "video",
      format: "MP4",
      description: "Comprehensive lecture on vector calculus and its applications.",
      uploadedBy: "Dr. Maria Johnson",
      uploadDate: "2025-03-03",
      duration: "45 minutes",
      status: "in_progress",
      progress: 60,
      lastAccessed: "2025-03-06"
    },
    {
      id: "m3",
      title: "Physics Lab Report Template",
      courseId: "c2",
      type: "document",
      format: "DOCX",
      description: "Template for writing physics lab reports with guidelines.",
      uploadedBy: "Prof. Robert Chen",
      uploadDate: "2025-03-02",
      size: "1.2 MB",
      status: "not_started"
    },
    {
      id: "m4",
      title: "Programming Assignment 1",
      courseId: "c3",
      type: "assignment",
      format: "ZIP",
      description: "First programming assignment covering basic algorithms.",
      uploadedBy: "Prof. Alan Smith",
      uploadDate: "2025-03-04",
      dueDate: "2025-03-15",
      size: "500 KB",
      status: "in_progress",
      progress: 30,
      lastAccessed: "2025-03-07"
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === "all" || material.courseId === selectedCourse;
    const matchesType = selectedType === "all" || material.type === selectedType;
    const matchesCompletion = showCompleted || material.status !== "completed";
    
    return matchesSearch && matchesCourse && matchesType && matchesCompletion;
  });

  const getStatusColor = (status: Material["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in_progress":
        return "text-blue-600 bg-blue-100";
      case "not_started":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: Material["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-600" />;
      case "video":
        return <Video className="h-6 w-6 text-purple-600" />;
      case "quiz":
        return <Book className="h-6 w-6 text-green-600" />;
      case "assignment":
        return <FileText className="h-6 w-6 text-orange-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const getTypeColor = (type: Material["type"]) => {
    switch (type) {
      case "document":
        return "bg-blue-100";
      case "video":
        return "bg-purple-100";
      case "quiz":
        return "bg-green-100";
      case "assignment":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Materials</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access and track your course materials and resources
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                !showCompleted
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              <Eye className="h-4 w-4" />
              {showCompleted ? "Hide Completed" : "Show All"}
            </button>
          </div>
        </div>

        {/* Course Progress Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map(course => (
            <div key={course.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.code}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-900">{course.materialsCount} materials</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="quiz">Quizzes</option>
              <option value="assignment">Assignments</option>
            </select>
          </div>
        </div>

        {/* Materials List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Materials</h2>
            <div className="text-sm text-gray-500">
              {filteredMaterials.length} {filteredMaterials.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {filteredMaterials.length > 0 ? (
            <div className="space-y-4">
              {filteredMaterials.map(material => {
                const course = courses.find(c => c.id === material.courseId);
                return (
                  <div key={material.id} className="rounded-lg border bg-white p-6">
                    <div className="flex items-center gap-6">
                      <div className={`rounded-lg ${getTypeColor(material.type)} p-3`}>
                        {getTypeIcon(material.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <h3 className="font-medium text-gray-900">{material.title}</h3>
                            <p className="text-sm text-gray-500">{course?.name}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(material.status)}`}>
                            {material.status.replace("_", " ").charAt(0).toUpperCase() + material.status.slice(1).replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {new Date(material.uploadDate).toLocaleDateString()}
                          </div>
                          {material.dueDate && (
                            <div className="flex items-center gap-2 text-sm text-orange-600">
                              <Clock className="h-4 w-4" />
                              Due: {new Date(material.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {material.size || material.duration}
                          </div>
                        </div>
                        {material.progress !== undefined && (
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-medium text-gray-900">{material.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-blue-600"
                                style={{ width: `${material.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {material.type === "video" ? (
                          <button className="flex items-center gap-2 rounded-md bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-100">
                            <Play className="h-4 w-4" />
                            Watch
                          </button>
                        ) : (
                          <button className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border bg-white p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No materials found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}