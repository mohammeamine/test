import { useState } from "react"
import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { Search, BookOpen, FileText, Video, Bookmark, ExternalLink, Filter, Clock, Star, Plus, ChevronDown, Heart, HeartOff, Download } from "lucide-react"

interface StudentLibraryProps {
  user: User
}

interface Resource {
  id: string;
  title: string;
  type: "book" | "video" | "article" | "document";
  format: string;
  category: string;
  description: string;
  author: string;
  dateAdded: string;
  size?: string;
  duration?: string;
  count?: number;
  isBookmarked: boolean;
  rating: number;
  coverImage?: string;
}

export default function StudentLibrary({ user }: StudentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "r1",
      title: "Advanced Mathematics",
      type: "book",
      format: "PDF",
      category: "Mathematics",
      description: "Comprehensive guide to advanced mathematics concepts for university students.",
      author: "Dr. Maria Johnson",
      dateAdded: "2024-12-10",
      size: "12.4 MB",
      isBookmarked: true,
      rating: 4.8
    },
    {
      id: "r2",
      title: "Physics Fundamentals",
      type: "video",
      format: "MP4",
      category: "Physics",
      description: "Video series covering foundational physics concepts and practical examples.",
      author: "Prof. Robert Chen",
      dateAdded: "2025-01-15",
      duration: "12 Videos • 8.5 hours",
      isBookmarked: false,
      rating: 4.6
    },
    {
      id: "r3",
      title: "Recent Advances in Quantum Computing",
      type: "article",
      format: "PDF",
      category: "Computer Science",
      description: "Collection of research papers and articles on quantum computing breakthroughs.",
      author: "Various Authors",
      dateAdded: "2025-02-20",
      count: 25,
      isBookmarked: true,
      rating: 4.9
    },
    {
      id: "r4",
      title: "Introduction to Organic Chemistry",
      type: "book",
      format: "EPUB",
      category: "Chemistry",
      description: "A beginner's guide to organic chemistry principles and applications.",
      author: "Dr. Sarah Williams",
      dateAdded: "2025-01-05",
      size: "8.7 MB",
      isBookmarked: false,
      rating: 4.5
    },
    {
      id: "r5",
      title: "Global Economics: Theory and Practice",
      type: "book",
      format: "PDF",
      category: "Economics",
      description: "Comprehensive textbook on global economic systems and market theories.",
      author: "Prof. James Thompson",
      dateAdded: "2025-02-01",
      size: "15.2 MB",
      isBookmarked: false,
      rating: 4.3
    },
    {
      id: "r6",
      title: "Web Development Masterclass",
      type: "video",
      format: "MP4",
      category: "Computer Science",
      description: "Complete course on modern web development technologies and practices.",
      author: "Tech Academy",
      dateAdded: "2025-02-28",
      duration: "24 Videos • 18 hours",
      isBookmarked: true,
      rating: 4.9
    }
  ]);

  const categories = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics", "Literature", "History"];
  const formats = ["PDF", "EPUB", "MP4", "MP3", "DOC", "PPT"];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleBookmark = (id: string) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, isBookmarked: !resource.isBookmarked } 
          : resource
      )
    );
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesFormat = selectedFormat === "all" || resource.format === selectedFormat;
    const matchesBookmarked = !showBookmarked || resource.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesFormat && matchesBookmarked;
  });

  const getResourceIcon = (type: Resource["type"]) => {
    switch (type) {
      case "book":
        return <BookOpen className="h-6 w-6 text-blue-600" />;
      case "video":
        return <Video className="h-6 w-6 text-purple-600" />;
      case "article":
        return <FileText className="h-6 w-6 text-green-600" />;
      case "document":
        return <FileText className="h-6 w-6 text-orange-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const getResourceTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "book":
        return "bg-blue-100";
      case "video":
        return "bg-purple-100";
      case "article":
        return "bg-green-100";
      case "document":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getBookmarkCount = () => {
    return resources.filter(r => r.isBookmarked).length;
  };

  const recentlyAdded = [...resources].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 3);

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access educational resources and study materials
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                showBookmarked 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              {showBookmarked ? "All Resources" : "Saved Items"}
              <span className="ml-1 rounded-full bg-white bg-opacity-20 px-2 py-0.5 text-xs">
                {getBookmarkCount()}
              </span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search library resources..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div>
              <select
                className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="all">All Formats</option>
                {formats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Library Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Available Resources</h3>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{resources.length}</p>
            <p className="mt-1 text-sm text-gray-500">Books, articles & videos</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Recently Added</h3>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-blue-600">{recentlyAdded.length}</p>
            <p className="mt-1 text-sm text-gray-500">This month</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Saved Items</h3>
              <Bookmark className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-purple-600">{getBookmarkCount()}</p>
            <p className="mt-1 text-sm text-gray-500">In your bookmarks</p>
          </div>
        </div>

        {/* Recently Added */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recently Added</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {recentlyAdded.map(resource => (
              <div key={resource.id} className="rounded-lg border bg-white overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    {getResourceIcon(resource.type)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {resource.category}
                    </span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{resource.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{resource.format} • {resource.size || resource.duration || resource.count}</span>
                    <button 
                      onClick={() => handleToggleBookmark(resource.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      {resource.isBookmarked ? (
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="border-t p-3 flex justify-between">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    <ExternalLink className="h-4 w-4" />
                    Preview
                  </button>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">All Resources</h2>
            <div className="text-sm text-gray-500">
              {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'}
            </div>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map(resource => (
                <div key={resource.id} className="rounded-lg border bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg ${getResourceTypeColor(resource.type)} p-3`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-500">{resource.category}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {resource.format} • {resource.size || resource.duration || (resource.count ? `${resource.count} items` : '')}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleBookmark(resource.id)}
                        className={`rounded-full p-1.5 ${resource.isBookmarked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-gray-500'}`}
                      >
                        {resource.isBookmarked ? <Heart className="h-4 w-4 fill-red-500" /> : <Heart className="h-4 w-4" />}
                      </button>
                      <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                        <ExternalLink className="h-4 w-4" />
                        Access
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-white p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No resources found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}