import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { FileDown, TrendingUp, Clock, BookOpen } from 'lucide-react';

interface Grade {
  subject: string;
  grade: number;
  date: string;
  teacher: string;
}

interface Attendance {
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

interface Assignment {
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
}

interface StudentData {
  id: string;
  name: string;
  class: string;
  grades: Grade[];
  attendance: Attendance[];
  assignments: Assignment[];
}

interface StudentMonitoringProps {
  students: StudentData[];
  onDownloadReport: (studentId: string, reportType: string) => void;
}

export function StudentMonitoring({ students, onDownloadReport }: StudentMonitoringProps) {
  return (
    <div className="space-y-6">
      {students.map((student) => (
        <Card key={student.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{student.name} - {student.class}</span>
              <Button
                variant="outline"
                onClick={() => onDownloadReport(student.id, 'progress')}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grades" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="grades">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Grades
                </TabsTrigger>
                <TabsTrigger value="attendance">
                  <Clock className="h-4 w-4 mr-2" />
                  Attendance
                </TabsTrigger>
                <TabsTrigger value="assignments">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Assignments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grades">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Teacher</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.grades.map((grade, index) => (
                      <TableRow key={index}>
                        <TableCell>{grade.subject}</TableCell>
                        <TableCell>
                          <span className={grade.grade >= 60 ? 'text-green-600' : 'text-red-600'}>
                            {grade.grade}%
                          </span>
                        </TableCell>
                        <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                        <TableCell>{grade.teacher}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="attendance">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subject</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.attendance.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={
                            record.status === 'present' ? 'text-green-600' :
                            record.status === 'late' ? 'text-yellow-600' : 'text-red-600'
                          }>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{record.subject}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="assignments">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell>{assignment.title}</TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={
                            assignment.status === 'completed' ? 'text-green-600' :
                            assignment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
