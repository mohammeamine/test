import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { PaymentForm } from '../../payment/PaymentForm';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Download, 
  TrendingUp 
} from 'lucide-react';

interface Grade {
  subject: string;
  grade: number;
  date: string;
  teacher: string;
  feedback?: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  description: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

interface Schedule {
  day: string;
  periods: Array<{
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }>;
}

interface StudentDashboardProps {
  studentName: string;
  grades: Grade[];
  assignments: Assignment[];
  schedule: Schedule[];
  onDownloadTranscript: () => void;
  onSubmitAssignment: (assignmentId: string, file: File) => void;
  onPaymentComplete: (paymentId: string) => void;
}

export function StudentDashboard({
  studentName,
  grades,
  assignments,
  schedule,
  onDownloadTranscript,
  onSubmitAssignment,
  onPaymentComplete,
}: StudentDashboardProps) {
  const calculateGPA = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.grade, 0);
    return (sum / grades.length).toFixed(2);
  };

  const handleFileUpload = (assignmentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSubmitAssignment(assignmentId, file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {studentName}</h1>
        <p className="text-gray-600">Here's an overview of your academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calculateGPA(grades)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {assignments.filter(a => a.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => document.getElementById('payment-section')?.scrollIntoView()}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades">
            <TrendingUp className="h-4 w-4 mr-2" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <BookOpen className="h-4 w-4 mr-2" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="payments">
            <Clock className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Academic Performance</CardTitle>
              <Button variant="outline" onClick={onDownloadTranscript}>
                <Download className="h-4 w-4 mr-2" />
                Download Transcript
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>
                        <span className={grade.grade >= 60 ? 'text-green-600' : 'text-red-600'}>
                          {grade.grade}%
                        </span>
                      </TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                      <TableCell>{grade.teacher}</TableCell>
                      <TableCell>{grade.feedback || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={
                          assignment.status === 'graded' ? 'text-green-600' :
                          assignment.status === 'submitted' ? 'text-yellow-600' : 'text-red-600'
                        }>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {assignment.status === 'pending' && (
                          <div>
                            <input
                              type="file"
                              id={`file-${assignment.id}`}
                              className="hidden"
                              onChange={(e) => handleFileUpload(assignment.id, e)}
                            />
                            <Button
                              variant="outline"
                              onClick={() => document.getElementById(`file-${assignment.id}`)?.click()}
                            >
                              Submit
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {schedule.map((day, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{day.day}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Room</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {day.periods.map((period, periodIndex) => (
                          <TableRow key={periodIndex}>
                            <TableCell>{period.time}</TableCell>
                            <TableCell>{period.subject}</TableCell>
                            <TableCell>{period.teacher}</TableCell>
                            <TableCell>{period.room}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" id="payment-section">
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentForm
                onPaymentComplete={onPaymentComplete}
                initialAmount={500}
                description="Tuition Payment"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
