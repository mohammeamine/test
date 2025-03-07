import { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout';
import { User } from '../../../types/auth';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Download, 
  Upload, 
  Eye, 
  FolderPlus 
} from 'lucide-react';
import { format } from 'date-fns';

interface CourseContentPageProps {
  user: User;
}

// Content type definition
interface CourseContent {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  type: 'document' | 'video' | 'link';
  url: string;
  fileSize?: number;
  duration?: number;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
}

export const CourseContentPage = ({ user }: CourseContentPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<CourseContent | null>(null);

  // Mock data - Replace with actual API call
  const [contents, setContents] = useState<CourseContent[]>([
    {
      id: '1',
      title: 'Introduction to Algebra',
      description: 'Basic concepts of algebra including variables, equations, and functions.',
      courseId: '1',
      courseName: 'Introduction to Mathematics',
      type: 'document',
      url: '/documents/algebra-intro.pdf',
      fileSize: 2.5 * 1024 * 1024, // 2.5 MB
      uploadedBy: 'John Smith',
      uploadedAt: new Date(2023, 8, 5),
      tags: ['algebra', 'mathematics', 'introduction']
    },
    {
      id: '2',
      title: 'Geometry Fundamentals',
      description: 'Introduction to geometric shapes, angles, and theorems.',
      courseId: '1',
      courseName: 'Introduction to Mathematics',
      type: 'document',
      url: '/documents/geometry-fundamentals.pdf',
      fileSize: 3.2 * 1024 * 1024, // 3.2 MB
      uploadedBy: 'John Smith',
      uploadedAt: new Date(2023, 8, 10),
      tags: ['geometry', 'mathematics', 'shapes']
    },
    {
      id: '3',
      title: 'Understanding Calculus',
      description: 'Video lecture on the basics of calculus.',
      courseId: '1',
      courseName: 'Introduction to Mathematics',
      type: 'video',
      url: '/videos/calculus-intro.mp4',
      duration: 45 * 60, // 45 minutes
      uploadedBy: 'John Smith',
      uploadedAt: new Date(2023, 8, 15),
      tags: ['calculus', 'mathematics', 'video']
    },
    {
      id: '4',
      title: 'Physics Simulation Tools',
      description: 'Online tools for physics simulations.',
      courseId: '2',
      courseName: 'Advanced Physics',
      type: 'link',
      url: 'https://physics-simulations.example.com',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: new Date(2023, 8, 20),
      tags: ['physics', 'simulation', 'tools']
    }
  ]);

  // Filter contents based on search query and selected filters
  const filteredContents = contents.filter(content => {
    const matchesSearch = 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesCourse = selectedCourse === 'all' || content.courseId === selectedCourse;
    
    return matchesSearch && matchesType && matchesCourse;
  });

  // Get unique courses for filter dropdown
  const courses = [
    { id: '1', name: 'Introduction to Mathematics' },
    { id: '2', name: 'Advanced Physics' },
    { id: '3', name: 'World Literature' },
    { id: '4', name: 'Introduction to Computer Science' }
  ];

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Format duration
  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  // Handle content upload
  const handleUploadContent = (newContent: Omit<CourseContent, 'id'>) => {
    const contentWithId = {
      ...newContent,
      id: (contents.length + 1).toString()
    };
    setContents([...contents, contentWithId as CourseContent]);
    setIsUploadModalOpen(false);
  };

  // Handle content deletion
  const handleDeleteContent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(contents.filter(content => content.id !== id));
    }
  };

  // Get icon based on content type
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'link':
        return <LinkIcon className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Course Content</h1>
          <div className="flex gap-2">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setIsCreateFolderModalOpen(true)}
            >
              <FolderPlus className="h-5 w-5 mr-2" />
              New Folder
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Content
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
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
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="document">Documents</option>
                  <option value="video">Videos</option>
                  <option value="link">Links</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
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
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size/Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContents.length > 0 ? (
                  filteredContents.map((content) => (
                    <tr key={content.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {getContentIcon(content.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{content.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{content.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{content.courseName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          content.type === 'document' ? 'bg-blue-100 text-blue-800' :
                          content.type === 'video' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {content.type === 'document' ? formatFileSize(content.fileSize) :
                         content.type === 'video' ? formatDuration(content.duration) :
                         'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{format(content.uploadedAt, 'MMM d, yyyy')}</div>
                        <div className="text-sm text-gray-500">{content.uploadedBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900"
                            title="Download"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                            onClick={() => handleDeleteContent(content.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No content found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Content Modal would go here */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Upload Content</h2>
              <p className="text-gray-500 mb-4">Upload new content for your courses.</p>
              
              {/* Upload form would go here */}
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    // Mock content upload
                    handleUploadContent({
                      title: 'New Document',
                      description: 'Description for the new document',
                      courseId: '1',
                      courseName: 'Introduction to Mathematics',
                      type: 'document',
                      url: '/documents/new-document.pdf',
                      fileSize: 1.5 * 1024 * 1024, // 1.5 MB
                      uploadedBy: user.firstName + ' ' + user.lastName,
                      uploadedAt: new Date(),
                      tags: ['new', 'document']
                    });
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Folder Modal would go here */}
        {isCreateFolderModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Folder</h2>
              <p className="text-gray-500 mb-4">Create a new folder to organize your content.</p>
              
              {/* Folder creation form would go here */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Folder Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter folder name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={() => setIsCreateFolderModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    // Mock folder creation
                    setIsCreateFolderModalOpen(false);
                  }}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}; 