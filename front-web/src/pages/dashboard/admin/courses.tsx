import { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout';
import { User } from '../../../types/auth';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock 
} from 'lucide-react';
import { format } from 'date-fns';

interface CoursesPageProps {
  user: User;
}

// Course type definition
interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  teacherName: string;
  startDate: Date;
  endDate: Date;
  credits: number;
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'upcoming' | 'completed';
  category: string;
}

export const CoursesPage = ({ user }: CoursesPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  // Mock data - Replace with actual API call
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Introduction to Mathematics',
      code: 'MATH101',
      description: 'Fundamental concepts of mathematics including algebra, geometry, and calculus.',
      teacherId: '1',
      teacherName: 'John Smith',
      startDate: new Date(2023, 8, 1),
      endDate: new Date(2023, 11, 15),
      credits: 3,
      maxStudents: 30,
      enrolledStudents: 25,
      status: 'active',
      category: 'Mathematics'
    },
    {
      id: '2',
      name: 'Advanced Physics',
      code: 'PHYS201',
      description: 'In-depth study of mechanics, thermodynamics, and electromagnetism.',
      teacherId: '2',
      teacherName: 'Sarah Johnson',
      startDate: new Date(2023, 8, 1),
      endDate: new Date(2023, 11, 15),
      credits: 4,
      maxStudents: 25,
      enrolledStudents: 20,
      status: 'active',
      category: 'Science'
    },
    {
      id: '3',
      name: 'World Literature',
      code: 'LIT101',
      description: 'Survey of major literary works from around the world.',
      teacherId: '3',
      teacherName: 'Emily Davis',
      startDate: new Date(2024, 0, 15),
      endDate: new Date(2024, 4, 30),
      credits: 3,
      maxStudents: 35,
      enrolledStudents: 0,
      status: 'upcoming',
      category: 'Humanities'
    },
    {
      id: '4',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      description: 'Fundamentals of programming, algorithms, and data structures.',
      teacherId: '4',
      teacherName: 'Michael Chen',
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 15),
      credits: 4,
      maxStudents: 30,
      enrolledStudents: 30,
      status: 'completed',
      category: 'Computer Science'
    }
  ]);

  // Filter courses based on search query and selected filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(courses.map(course => course.category))];

  // Handle course creation
  const handleCreateCourse = (newCourse: Omit<Course, 'id'>) => {
    const courseWithId = {
      ...newCourse,
      id: (courses.length + 1).toString()
    };
    setCourses([...courses, courseWithId as Course]);
    setIsCreateModalOpen(false);
  };

  // Handle course update
  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setIsEditModalOpen(false);
    setCurrentCourse(null);
  };

  // Handle course deletion
  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Open edit modal with course data
  const openEditModal = (course: Course) => {
    setCurrentCourse(course);
    setIsEditModalOpen(true);
  };

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.name}</div>
                            <div className="text-sm text-gray-500">{course.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.teacherName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(course.startDate, 'MMM d, yyyy')} - {format(course.endDate, 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {course.enrolledStudents}/{course.maxStudents}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' :
                          course.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => openEditModal(course)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No courses found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Creation Modal would go here */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Create New Course</h2>
              <p className="text-gray-500 mb-4">Fill in the details to create a new course.</p>
              
              {/* Course creation form would go here */}
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    // Mock course creation
                    handleCreateCourse({
                      name: 'New Course',
                      code: 'NEW101',
                      description: 'Description for the new course',
                      teacherId: '1',
                      teacherName: 'John Smith',
                      startDate: new Date(),
                      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                      credits: 3,
                      maxStudents: 30,
                      enrolledStudents: 0,
                      status: 'upcoming',
                      category: 'General'
                    });
                  }}
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Course Edit Modal would go here */}
        {isEditModalOpen && currentCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Edit Course</h2>
              <p className="text-gray-500 mb-4">Update the course details.</p>
              
              {/* Course edit form would go here */}
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setCurrentCourse(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    // Mock course update
                    if (currentCourse) {
                      handleUpdateCourse({
                        ...currentCourse,
                        name: currentCourse.name + ' (Updated)'
                      });
                    }
                  }}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}; 