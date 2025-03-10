import { useState, useEffect } from 'react';
import { User } from '../../../types/auth';
import { StudentLayout } from '../../../components/dashboard/layout/student-layout';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
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
  Loader2
} from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { feedbackService, Feedback as FeedbackType, SubmitFeedbackRequest } from '../../../services/feedback-service';
import { toast } from 'react-hot-toast';
import { format, parseISO } from 'date-fns';

interface StudentFeedbackProps {
  user: User;
}

interface Course {
  id: string;
  name: string;
}

export default function StudentFeedback({ user }: StudentFeedbackProps) {
  // State for form
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('give-feedback');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submissions, setSubmissions] = useState<FeedbackType[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch student's courses
        const response = await fetch('/api/students/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.courses);
        
        // Fetch feedback submissions
        const feedbackData = await feedbackService.getStudentFeedback();
        setSubmissions(feedbackData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCourse) {
      setFormError('Please select a course');
      return;
    }
    
    if (rating === 0) {
      setFormError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setFormError('Please enter a comment');
      return;
    }
    
    setFormError('');
    setSubmitting(true);
    
    try {
      const feedbackData: SubmitFeedbackRequest = {
        courseId: selectedCourse,
        rating,
        comment
      };
      
      await feedbackService.submitFeedback(feedbackData);
      
      toast.success('Feedback submitted successfully');
      
      // Reset form
      setSelectedCourse('');
      setRating(0);
      setComment('');
      
      // Refresh feedback submissions
      const updatedFeedback = await feedbackService.getStudentFeedback();
      setSubmissions(updatedFeedback);
      
      // Switch to history tab
      setActiveTab('history');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <StudentLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Feedback</h1>
            <p className="mt-1 text-sm text-gray-500">
              Share your thoughts and help improve your courses
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="give-feedback">Give Feedback</TabsTrigger>
            <TabsTrigger value="history">Feedback History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="give-feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submit Course Feedback</CardTitle>
                <CardDescription>
                  Your feedback helps instructors improve their teaching and course content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Course</label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map(course => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map(value => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            className={`p-2 rounded-full ${
                              rating >= value ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            <Star className="h-6 w-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comments</label>
                      <Textarea
                        placeholder="Share your experience with this course..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                      />
                    </div>
                    
                    {formError && (
                      <div className="text-red-500 text-sm">{formError}</div>
                    )}
                    
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback History</CardTitle>
                <CardDescription>
                  Review feedback you've submitted for your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : submissions.length > 0 ? (
                  <div className="space-y-6">
                    {submissions.map(submission => (
                      <div key={submission.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">{submission.courseName}</h3>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-2">
                                {[1, 2, 3, 4, 5].map(value => (
                                  <Star
                                    key={value}
                                    className={`h-4 w-4 ${
                                      submission.rating >= value ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                Submitted on {formatDate(submission.submittedAt)}
                              </span>
                            </div>
                          </div>
                          <Badge variant={submission.status === 'reviewed' ? 'secondary' : 'outline'}>
                            {submission.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                          </Badge>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-gray-700">{submission.comment}</p>
                        </div>
                        
                        {submission.teacherResponse && (
                          <div className="border-t pt-4 mt-4">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={submission.teacherAvatar} />
                                <AvatarFallback>
                                  {submission.teacherFirstName?.[0]}{submission.teacherLastName?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {submission.teacherFirstName} {submission.teacherLastName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Responded on {formatDate(submission.teacherResponseDate || '')}
                                </p>
                              </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-gray-700">{submission.teacherResponse}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No feedback yet</h3>
                    <p className="text-gray-500">
                      You haven't submitted any feedback for your courses yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}