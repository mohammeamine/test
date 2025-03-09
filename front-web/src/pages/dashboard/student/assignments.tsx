import { useState, useEffect } from "react";
import { User } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Textarea } from "../../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Calendar, Clock, FileText, Filter, Search, Upload } from "lucide-react";
import { studentService } from "../../../services/student-service";
import { toast } from "react-hot-toast";

interface StudentAssignmentsProps {
  user: User;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  courseName: string;
  courseCode: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  points?: number;
  score?: number;
  feedback?: string;
}

export default function StudentAssignments({ user }: StudentAssignmentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Assignment["status"] | "all">("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await studentService.getUpcomingAssignments();
        
        // Transform API data to match our Assignment interface
        const transformedAssignments: Assignment[] = data.map(assignment => ({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: new Date(assignment.dueDate).toISOString().split('T')[0],
          courseName: assignment.courseName,
          courseCode: assignment.courseCode,
          status: 'pending', // This would need to be determined based on submission status
          points: assignment.points
        }));
        
        setAssignments(transformedAssignments);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        toast.error("Failed to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleSubmitAssignment = async () => {
    if (!selectedAssignment) return;
    
    try {
      setSubmitting(true);
      await studentService.submitAssignment(selectedAssignment.id, { content: submissionContent });
      
      // Update the assignment status in the local state
      setAssignments(prev => 
        prev.map(a => 
          a.id === selectedAssignment.id 
            ? { ...a, status: 'submitted' as const } 
            : a
        )
      );
      
      setSubmissionDialogOpen(false);
      setSubmissionContent("");
      toast.success("Assignment submitted successfully");
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      toast.error("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    const matchesCourse = courseFilter === "all" || assignment.courseCode === courseFilter
    
    return matchesSearch && matchesStatus && matchesCourse
  });

  const uniqueCourses = Array.from(new Set(assignments.map(a => a.courseCode)));

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "graded":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <StudentLayout user={user}>
        <div className="p-6 flex justify-center items-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredAssignments.length} assignments • {filteredAssignments.filter(a => a.status === 'submitted' || a.status === 'graded').length} completed
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search assignments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <select
                className="h-10 rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Assignment["status"] | "all")}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
                <option value="late">Late</option>
              </select>
            </div>
            
            <div className="relative">
              <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <select
                className="h-10 rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {uniqueCourses.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {filteredAssignments.filter(a => a.status === 'pending').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssignments
                  .filter(a => a.status === 'pending')
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map(assignment => (
                    <Card key={assignment.id} className={isOverdue(assignment.dueDate) ? "border-red-300" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge className={getStatusColor(isOverdue(assignment.dueDate) ? 'late' : 'pending')}>
                            {isOverdue(assignment.dueDate) ? 'Overdue' : 'Pending'}
                          </Badge>
                        </div>
                        <CardDescription>{assignment.courseCode} - {assignment.courseName}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                        {assignment.points && (
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>Points: {assignment.points}</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setSubmissionDialogOpen(true);
                          }}
                        >
                          Submit Assignment
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming assignments</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up! Check back later for new assignments.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-4">
            {filteredAssignments.filter(a => a.status === 'submitted').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssignments
                  .filter(a => a.status === 'submitted')
                  .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
                  .map(assignment => (
                    <Card key={assignment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge className={getStatusColor('submitted')}>Submitted</Badge>
                        </div>
                        <CardDescription>{assignment.courseCode} - {assignment.courseName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Awaiting grade</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No submitted assignments</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't submitted any assignments yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="graded" className="space-y-4">
            {filteredAssignments.filter(a => a.status === 'graded').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssignments
                  .filter(a => a.status === 'graded')
                  .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
                  .map(assignment => (
                    <Card key={assignment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge className={getStatusColor('graded')}>Graded</Badge>
                        </div>
                        <CardDescription>{assignment.courseCode} - {assignment.courseName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{assignment.description}</p>
                        <div className="flex items-center text-sm font-medium text-gray-900 mt-2">
                          <span>Score: {assignment.score}/{assignment.points}</span>
                        </div>
                        {assignment.feedback && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Feedback:</p>
                            <p className="text-sm text-gray-700">{assignment.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No graded assignments</h3>
                <p className="mt-1 text-sm text-gray-500">You don't have any graded assignments yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title} - {selectedAssignment?.courseName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Assignment Description:</p>
              <p className="text-sm text-gray-700">{selectedAssignment?.description}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Due Date:</p>
              <p className="text-sm text-gray-700">{selectedAssignment && formatDate(selectedAssignment.dueDate)}</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="submission" className="text-sm font-medium">
                Your Submission:
              </label>
              <Textarea
                id="submission"
                placeholder="Enter your submission here..."
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmissionDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmitAssignment} 
              disabled={!submissionContent.trim() || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentLayout>
  );
}