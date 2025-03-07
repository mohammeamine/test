import { useState } from "react";
import { User } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { CourseRegistrationModal } from "../../../components/dashboard/student/course-registration-modal";
import { BookOpen, Clock, Users, Plus, Search, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface StudentCoursesProps {
  user: User;
}

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  prerequisites: string[];
  capacity: number;
  enrolled: number;
  status: 'in_progress' | 'completed' | 'not_started';
  progress?: number;
  grade?: number;
}

export default function StudentCourses({ user }: StudentCoursesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Course["status"] | "all">("all");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Available courses for registration
  const [availableCourses] = useState<Course[]>([
    {
      id: "c4",
      code: "CHEM201",
      name: "Organic Chemistry",
      description: "Study of organic compounds and their reactions.",
      instructor: "Dr. Robert Wilson",
      credits: 4,
      schedule: [
        { day: "Tuesday", time: "11:00 AM", room: "Lab 201" },
        { day: "Thursday", time: "11:00 AM", room: "Lab 201" }
      ],
      prerequisites: ["CHEM101"],
      capacity: 25,
      enrolled: 18,
      status: "in_progress"
    },
    {
      id: "c5",
      code: "BIO101",
      name: "Introduction to Biology",
      description: "Basic principles of biology and life sciences.",
      instructor: "Dr. Lisa Martinez",
      credits: 3,
      schedule: [
        { day: "Monday", time: "9:00 AM", room: "Room 305" },
        { day: "Wednesday", time: "9:00 AM", room: "Room 305" }
      ],
      prerequisites: [],
      capacity: 35,
      enrolled: 28,
      status: "in_progress"
    }
  ]);

  // Mock course data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "c1",
      code: "MATH101",
      name: "Introduction to Calculus",
      description: "Fundamental concepts of calculus including limits, derivatives, and integrals.",
      instructor: "Dr. Sarah Johnson",
      credits: 3,
      schedule: [
        { day: "Monday", time: "10:00 AM", room: "Room 201" },
        { day: "Wednesday", time: "10:00 AM", room: "Room 201" },
        { day: "Friday", time: "10:00 AM", room: "Room 201" }
      ],
      prerequisites: [],
      capacity: 30,
      enrolled: 25,
      status: "in_progress",
      progress: 65,
      grade: 85
    },
    {
      id: "c2",
      code: "PHYS201",
      name: "Classical Mechanics",
      description: "Study of motion, forces, energy, and momentum in physical systems.",
      instructor: "Prof. Michael Chen",
      credits: 4,
      schedule: [
        { day: "Tuesday", time: "2:00 PM", room: "Lab 102" },
        { day: "Thursday", time: "2:00 PM", room: "Lab 102" }
      ],
      prerequisites: ["MATH101"],
      capacity: 25,
      enrolled: 20,
      status: "in_progress",
      progress: 45
    },
    {
      id: "c3",
      code: "CS101",
      name: "Introduction to Programming",
      description: "Basic concepts of programming using Python.",
      instructor: "Dr. Emily Brown",
      credits: 3,
      schedule: [
        { day: "Monday", time: "1:00 PM", room: "Lab 305" },
        { day: "Wednesday", time: "1:00 PM", room: "Lab 305" }
      ],
      prerequisites: [],
      capacity: 35,
      enrolled: 30,
      status: "completed",
      progress: 100,
      grade: 92
    }
  ]);

  // Filter courses based on search and status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate total credits
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const completedCredits = courses
    .filter(course => course.status === "completed")
    .reduce((sum, course) => sum + course.credits, 0);

  // Get status color
  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "in_progress":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "not_started":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  // Get status icon
  const getStatusIcon = (status: Course["status"]) => {
    switch (status) {
      case "in_progress":
        return <Clock className="h-5 w-5" />;
      case "completed":
        return <CheckCircle className="h-5 w-5" />;
      case "not_started":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  // Handle course registration
  const handleCourseRegistration = (courseIds: string[]) => {
    const newCourses = courseIds
      .map(id => {
        const course = availableCourses.find(c => c.id === id);
        if (!course) return null;
        
        // Create a new course object with not_started status
        const newCourse: Course = {
          ...course,
          status: "not_started",
          progress: 0
        };
        return newCourse;
      })
      .filter((course): course is NonNullable<typeof course> => course !== null);

    setCourses(prev => [...prev, ...newCourses]);
  };

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your enrolled courses
            </p>
          </div>
          <button 
            onClick={() => setShowRegistrationModal(true)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Register Course
          </button>
        </div>

        {/* Course Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {courses.filter(c => c.status === "in_progress").length}
            </p>
            <p className="mt-1 text-sm text-gray-500">Current Semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Credits</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{completedCredits}</p>
            <p className="mt-1 text-sm text-gray-500">Out of {totalCredits} Enrolled</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Grade</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">
              {courses.filter(c => c.grade).reduce((sum, c) => sum + (c.grade || 0), 0) / 
               courses.filter(c => c.grade).length || 0}%
            </p>
            <p className="mt-1 text-sm text-gray-500">Across All Courses</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Course["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${
                    course.status === "completed" ? "bg-green-100" :
                    course.status === "in_progress" ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    {getStatusIcon(course.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <span className="text-sm text-gray-500">({course.code})</span>
                    </div>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {course.schedule.map(s => s.day).join(", ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.enrolled}/{course.capacity} Students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {course.progress !== undefined && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{course.progress}%</div>
                      <div className="mt-1 h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Registration Modal */}
      <CourseRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onRegister={handleCourseRegistration}
        availableCourses={availableCourses.filter(course => 
          !courses.some(c => c.id === course.id)
        )}
      />
    </StudentLayout>
  );
}