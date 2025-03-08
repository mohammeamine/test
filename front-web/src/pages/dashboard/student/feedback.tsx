import { useState } from 'react';
import { User } from '../../../types/auth';
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '../../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Clock,
  CheckCircle2,
  User as UserIcon
} from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';

interface StudentFeedbackProps {
  user: User;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar?: string;
}

interface FeedbackSubmission {
  id: string;
  courseId: string;
  courseName: string;
  rating: number;
  comment: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
  teacherResponse?: string;
}

export const StudentFeedback = ({ user }: StudentFeedbackProps) => {
  // State for form
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('give-feedback');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Mock data
  const courses: Course[] = [
    { id: 'c1', name: 'Mathematics', teacher: 'Mr. Smith', teacherAvatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 'c2', name: 'Science', teacher: 'Mrs. Davis', teacherAvatar: 'https://i.pravatar.cc/150?img=32' },
    { id: 'c3', name: 'History', teacher: 'Mr. Wilson', teacherAvatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 'c4', name: 'English', teacher: 'Ms. Brown', teacherAvatar: 'https://i.pravatar.cc/150?img=49' },
    { id: 'c5', name: 'Computer Science', teacher: 'Mr. Taylor', teacherAvatar: 'https://i.pravatar.cc/150?img=12' },
  ];

  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([
    {
      id: 'f1',
      courseId: 'c1',
      courseName: 'Mathematics',
      rating: 4,
      comment: 'Great class, really helped me understand calculus better.',
      submittedAt: '2025-02-10T14:30:00',
      status: 'reviewed',
      teacherResponse: "Thank you for your feedback! I'm glad you enjoyed the class."
    },
    {
      id: 'f2',
      courseId: 'c3',
      courseName: 'History',
      rating: 3,
      comment: 'The material was interesting but sometimes hard to follow.',
      submittedAt: '2025-01-25T10:15:00',
      status: 'pending'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCourse) {
      setFormError('Please select a course');
      return;
    }
    
    if (rating === 0) {
      setFormError('Please provide a rating');
      return;
    }
    
    if (!comment.trim()) {
      setFormError('Please provide feedback comments');
      return;
    }

    setSubmitting(true);
    setFormError('');

    // Simulate API call
    setTimeout(() => {
      const course = courses.find(c => c.id === selectedCourse);
      const newSubmission: FeedbackSubmission = {
        id: `f${Date.now()}`,
        courseId: selectedCourse,
        courseName: course?.name || '',
        rating,
        comment,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      setSubmissions([...submissions, newSubmission]);
      setSelectedCourse('');
      setRating(0);
      setComment('');
      setSubmitting(false);
      setActiveTab('my-feedback');
    }, 1000);
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout user={user}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Course Feedback</h1>
            <p className="text-sm text-gray-500">Share your thoughts on your courses and instructors</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>Profile</span>
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Support</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="give-feedback" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Give Feedback
                  </TabsTrigger>
                  <TabsTrigger value="my-feedback" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    My Submissions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="give-feedback">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                        {formError}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label htmlFor="course" className="text-sm font-medium">
                        Select Course
                      </label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              <div className="flex items-center gap-2">
                                <span>{course.name}</span>
                                <span className="text-xs text-gray-500">• {course.teacher}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedCourse && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 rounded-md">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={courses.find(c => c.id === selectedCourse)?.teacherAvatar} 
                              alt={courses.find(c => c.id === selectedCourse)?.teacher || ''} 
                            />
                            <AvatarFallback>
                              {courses.find(c => c.id === selectedCourse)?.teacher.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {courses.find(c => c.id === selectedCourse)?.teacher}
                            </div>
                            <div className="text-xs text-gray-500">Instructor</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`h-10 w-10 rounded-full flex items-center justify-center 
                              ${rating >= star ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}
                            onClick={() => setRating(star)}
                          >
                            <Star className="h-6 w-6" fill={rating >= star ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                        <span className="ml-2 self-center text-sm text-gray-500">
                          {rating > 0 ? ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1] : 'Select Rating'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="comment" className="text-sm font-medium">
                        Feedback Comments
                      </label>
                      <Textarea
                        id="comment"
                        placeholder="Share your experience, what worked well, and suggestions for improvement..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Feedback
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="my-feedback">
                  {submissions.length > 0 ? (
                    <div className="space-y-6">
                      {submissions.map((submission) => (
                        <Card key={submission.id} className="bg-gray-50 border">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium">{submission.courseName}</h3>
                                <p className="text-sm text-gray-500">{formatDate(submission.submittedAt)}</p>
                              </div>
                              <Badge
                                className={submission.status === 'reviewed' ? 
                                  'bg-green-100 text-green-800 border-green-200' : 
                                  'bg-yellow-100 text-yellow-800 border-yellow-200'}
                              >
                                {submission.status === 'reviewed' ? (
                                  <><CheckCircle2 className="h-3 w-3 mr-1" /> Reviewed</>
                                ) : (
                                  <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                )}
                              </Badge>
                            </div>
                            
                            <div className="flex mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className="h-5 w-5" 
                                  fill={submission.rating >= star ? '#f59e0b' : 'none'} 
                                  stroke={submission.rating >= star ? '#f59e0b' : 'currentColor'} 
                                />
                              ))}
                            </div>
                            
                            <div className="bg-white p-3 rounded-md border mb-3">
                              <div className="flex items-center mb-2">
                                <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="font-medium text-sm">Your Feedback</span>
                              </div>
                              <p className="text-gray-700">{submission.comment}</p>
                            </div>
                            
                            {submission.teacherResponse && (
                              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                                <div className="flex items-center mb-2">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage 
                                      src={courses.find(c => c.id === submission.courseId)?.teacherAvatar} 
                                      alt={courses.find(c => c.id === submission.courseId)?.teacher || ''} 
                                    />
                                    <AvatarFallback>
                                      {courses.find(c => c.id === submission.courseId)?.teacher.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">{courses.find(c => c.id === submission.courseId)?.teacher}</span>
                                </div>
                                <p className="text-gray-700">{submission.teacherResponse}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No feedback submissions yet</h3>
                      <p className="mt-1 text-gray-500">
                        Once you submit feedback for your courses, they will appear here.
                      </p>
                      <Button 
                        className="mt-4" 
                        variant="outline"
                        onClick={() => setActiveTab('give-feedback')}
                      >
                        Give Feedback
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feedback Guidelines</CardTitle>
              <CardDescription>Tips for providing constructive feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex">
                  <ThumbsUp className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 self-start mt-1" />
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">Helpful Feedback</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Be specific about what worked well</li>
                      <li>• Provide concrete examples</li>
                      <li>• Suggest constructive improvements</li>
                      <li>• Focus on the course content and teaching</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex">
                  <ThumbsDown className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 self-start mt-1" />
                  <div>
                    <h3 className="font-medium text-red-800 mb-1">Unhelpful Feedback</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Personal attacks or disrespectful language</li>
                      <li>• Vague statements without context</li>
                      <li>• Comments unrelated to the course</li>
                      <li>• Focusing only on grades received</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};