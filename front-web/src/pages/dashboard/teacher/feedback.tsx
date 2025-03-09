import { User } from '../../../types/auth';
import { useState } from 'react';
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout";
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Star, 
  Reply,
  Mail,
  UserCheck,
  Calendar
} from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Separator } from '../../../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Textarea } from '../../../components/ui/textarea';

interface TeacherFeedbackProps {
  user: User;
}

// Sample data types
interface StudentFeedback {
  id: string;
  studentName: string;
  studentId: string;
  avatar: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
}

interface FeedbackMetric {
  category: string;
  score: number;
  maxScore: number;
  previousScore?: number;
}

interface CourseRating {
  course: string;
  rating: number;
  students: number;
  semester: string;
}

export const TeacherFeedback = ({ user }: TeacherFeedbackProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Sample feedback data
  const studentFeedbacks: StudentFeedback[] = [
    {
      id: 'fb-001',
      studentName: 'Emma Thompson',
      studentId: 'ST12345',
      avatar: 'https://i.pravatar.cc/150?img=1',
      course: 'Introduction to Computer Science',
      rating: 5,
      comment: 'Dr. Turing is an excellent teacher! The way he explains complex concepts makes them easy to understand. Always available for additional help.',
      date: '2023-11-15',
      replied: true
    },
    {
      id: 'fb-002',
      studentName: 'James Wilson',
      studentId: 'ST12346',
      avatar: 'https://i.pravatar.cc/150?img=2',
      course: 'Introduction to Computer Science',
      rating: 4,
      comment: 'The course content is well-structured and engaging. Could use more practical examples.',
      date: '2023-11-16',
      replied: false
    },
    {
      id: 'fb-003',
      studentName: 'Sophia Lee',
      studentId: 'ST12347',
      avatar: 'https://i.pravatar.cc/150?img=3',
      course: 'Advanced Algorithms',
      rating: 5,
      comment: 'I appreciate the challenging assignments and how they push us to think critically. Dr. Turing is always patient with questions.',
      date: '2023-11-17',
      replied: false
    },
    {
      id: 'fb-004',
      studentName: 'Oliver Brown',
      studentId: 'ST12348',
      avatar: 'https://i.pravatar.cc/150?img=4',
      course: 'Advanced Algorithms',
      rating: 3,
      comment: 'The pace of the course is a bit fast for me, but the study materials provided are helpful.',
      date: '2023-11-18',
      replied: true
    },
    {
      id: 'fb-005',
      studentName: 'Ava Martinez',
      studentId: 'ST12349',
      avatar: 'https://i.pravatar.cc/150?img=5',
      course: 'Data Structures',
      rating: 4,
      comment: 'Great teaching style and informative lectures. Would like more office hours.',
      date: '2023-11-19',
      replied: false
    },
  ];

  const courseRatings: CourseRating[] = [
    { course: 'Introduction to Computer Science', rating: 4.7, students: 45, semester: 'Fall 2023' },
    { course: 'Advanced Algorithms', rating: 4.2, students: 28, semester: 'Fall 2023' },
    { course: 'Data Structures', rating: 4.5, students: 36, semester: 'Fall 2023' },
    { course: 'Operating Systems', rating: 4.8, students: 32, semester: 'Spring 2023' },
    { course: 'Database Systems', rating: 4.4, students: 40, semester: 'Spring 2023' },
  ];

  const feedbackMetrics: FeedbackMetric[] = [
    { category: 'Teaching Style', score: 4.8, maxScore: 5, previousScore: 4.6 },
    { category: 'Content Clarity', score: 4.7, maxScore: 5, previousScore: 4.5 },
    { category: 'Responsiveness', score: 4.9, maxScore: 5, previousScore: 4.7 },
    { category: 'Assignment Quality', score: 4.5, maxScore: 5, previousScore: 4.3 },
    { category: 'Grading Fairness', score: 4.6, maxScore: 5, previousScore: 4.4 },
  ];

  const skillsData = [
    { subject: 'Teaching Style', A: 4.8, fullMark: 5 },
    { subject: 'Content Clarity', A: 4.7, fullMark: 5 },
    { subject: 'Responsiveness', A: 4.9, fullMark: 5 },
    { subject: 'Assignment Quality', A: 4.5, fullMark: 5 },
    { subject: 'Grading Fairness', A: 4.6, fullMark: 5 },
  ];

  const feedbackTrend = [
    { month: 'Jan', rating: 4.5 },
    { month: 'Feb', rating: 4.6 },
    { month: 'Mar', rating: 4.5 },
    { month: 'Apr', rating: 4.7 },
    { month: 'May', rating: 4.8 },
    { month: 'Jun', rating: 4.7 },
    { month: 'Jul', rating: 4.6 },
    { month: 'Aug', rating: 4.7 },
    { month: 'Sep', rating: 4.8 },
    { month: 'Oct', rating: 4.9 },
    { month: 'Nov', rating: 4.8 },
  ];

  const ratingDistribution = [
    { name: '5 Stars', value: 65 },
    { name: '4 Stars', value: 25 },
    { name: '3 Stars', value: 8 },
    { name: '2 Stars', value: 1.5 },
    { name: '1 Star', value: 0.5 },
  ];

  const handleReply = (feedbackId: string) => {
    if (replyingTo === feedbackId) {
      // In a real application, you would send the reply to the backend
      console.log(`Reply to feedback ${feedbackId}: ${replyText}`);
      setReplyingTo(null);
      setReplyText('');
    } else {
      setReplyingTo(feedbackId);
      setReplyText('');
    }
  };

  const filteredFeedback = studentFeedbacks.filter(feedback => {
    if (selectedCourse !== 'all' && feedback.course !== selectedCourse) return false;
    if (showReplies === false && feedback.replied) return false;
    return true;
  });

  const averageRating = studentFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / studentFeedbacks.length;

  return (
    <DashboardLayout user={user}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Feedback</h1>
          <div className="text-sm text-gray-600">
            Logged in as: {user.firstName} {user.lastName}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="feedback">Feedback List</TabsTrigger>
            <TabsTrigger value="courses">Course Ratings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-yellow-500 flex items-center">
                      {averageRating.toFixed(1)}
                      <Star className="ml-2 h-6 w-6 fill-yellow-500 text-yellow-500" />
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(averageRating)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Based on {studentFeedbacks.length} student reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-blue-500 flex items-center">
                      {studentFeedbacks.filter(f => !f.replied).length}
                      <MessageSquare className="ml-2 h-6 w-6 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Feedback items awaiting your response
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full"
                      onClick={() => {
                        setActiveTab('feedback');
                        setShowReplies(false);
                      }}
                    >
                      View Pending Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Highest Rated Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-center">
                      {courseRatings.sort((a, b) => b.rating - a.rating)[0].course}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-green-500 mr-2">
                        {courseRatings.sort((a, b) => b.rating - a.rating)[0].rating.toFixed(1)}
                      </span>
                      <Star className="h-5 w-5 fill-green-500 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {courseRatings.sort((a, b) => b.rating - a.rating)[0].students} students enrolled
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Rating Trend</CardTitle>
                  <CardDescription>
                    Average monthly rating over the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={feedbackTrend}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Distribution of student ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ratingDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ratingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'][index % 5]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Students']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  The most recent feedback from your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentFeedbacks
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                    .map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={feedback.avatar} alt={feedback.studentName} />
                            <AvatarFallback>{feedback.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{feedback.studentName}</h4>
                                <div className="text-sm text-gray-500">{feedback.course}</div>
                              </div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= feedback.rating
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-sm">{feedback.comment}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs text-gray-500">{feedback.date}</span>
                              {feedback.replied ? (
                                <Badge variant="outline" className="text-green-600 bg-green-50">
                                  Replied
                                </Badge>
                              ) : (
                                <Button variant="outline" size="sm" onClick={() => handleReply(feedback.id)}>
                                  <Reply className="mr-2 h-3 w-3" />
                                  Reply
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setActiveTab('feedback')}
                >
                  View All Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Feedback</CardTitle>
                  <CardDescription>
                    Review and respond to feedback from your students
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {Array.from(new Set(studentFeedbacks.map(f => f.course))).map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowReplies(!showReplies)}
                  >
                    {showReplies ? 'Show All' : 'Show Unreplied'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredFeedback.length > 0 ? (
                    filteredFeedback.map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={feedback.avatar} alt={feedback.studentName} />
                            <AvatarFallback>{feedback.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{feedback.studentName}</h4>
                                <div className="text-sm text-gray-500">
                                  {feedback.course} • ID: {feedback.studentId}
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= feedback.rating
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2">{feedback.comment}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs text-gray-500">{feedback.date}</span>
                              {feedback.replied ? (
                                <Badge variant="outline" className="text-green-600 bg-green-50">
                                  Replied
                                </Badge>
                              ) : (
                                <Button variant="outline" size="sm" onClick={() => handleReply(feedback.id)}>
                                  <Reply className="mr-2 h-3 w-3" />
                                  Reply
                                </Button>
                              )}
                            </div>
                            
                            {replyingTo === feedback.id && (
                              <div className="mt-4 space-y-3">
                                <Textarea 
                                  placeholder="Write your response to the student..." 
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  className="min-h-[100px]"
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setReplyingTo(null)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => handleReply(feedback.id)}>
                                    Send Response
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No feedback matches your current filters.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Ratings</CardTitle>
                  <CardDescription>
                    Average ratings across all your courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseRatings}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" />
                        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rating" name="Average Rating" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Detailed feedback metrics across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius={80} data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} />
                        <Radar
                          name="Performance"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Rating Details</CardTitle>
                <CardDescription>
                  Comprehensive view of each course's ratings and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseRatings.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{course.course}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{course.rating.toFixed(1)}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Math.round(course.rating)
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>
                          {studentFeedbacks.filter(f => f.course === course.course).length} comments
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(course.course);
                              setActiveTab('feedback');
                            }}
                          >
                            View Feedback
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <Mail className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">24h</div>
                        <div className="text-sm text-gray-500">
                          Average feedback response time
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-3">
                        <UserCheck className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">
                          {Math.round((studentFeedbacks.filter(f => f.replied).length / studentFeedbacks.length) * 100)}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Feedback response rate
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Feedback Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-3">
                        <Calendar className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">
                          {studentFeedbacks.length}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total feedback this semester
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of feedback metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedbackMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{metric.category}</span>
                        <div className="flex items-center">
                          <span className="text-xl font-bold mr-2">{metric.score.toFixed(1)}</span>
                          <span className="text-sm text-gray-500">/ {metric.maxScore.toFixed(1)}</span>
                          {metric.previousScore && (
                            <span className={`ml-2 text-xs ${metric.score >= metric.previousScore ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.score >= metric.previousScore ? '▲' : '▼'} {Math.abs(metric.score - metric.previousScore).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Top Positive Comments</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ThumbsUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <span>"Dr. Turing explains complex concepts in an easy-to-understand way."</span>
                    </li>
                    <li className="flex items-start">
                      <ThumbsUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <span>"Always available for additional help and guidance."</span>
                    </li>
                    <li className="flex items-start">
                      <ThumbsUp className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <span>"The course materials are well-structured and comprehensive."</span>
                    </li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ThumbsDown className="h-4 w-4 text-amber-600 mr-2 mt-1" />
                      <span>"Could use more practical examples in lectures."</span>
                    </li>
                    <li className="flex items-start">
                      <ThumbsDown className="h-4 w-4 text-amber-600 mr-2 mt-1" />
                      <span>"Would benefit from additional office hours."</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};