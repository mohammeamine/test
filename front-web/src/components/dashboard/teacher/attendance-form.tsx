import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Textarea } from '../../ui/textarea';

const attendanceSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  date: z.string().min(1, 'Date is required'),
  attendance: z.array(z.object({
    studentId: z.string(),
    status: z.enum(['present', 'absent', 'late', 'excused']),
    note: z.string().optional(),
    timeIn: z.string().optional(),
    timeOut: z.string().optional(),
  })),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

interface Student {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface AttendanceFormProps {
  classes: Class[];
  onSubmit: (data: AttendanceFormData) => void;
}

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

interface StudentAttendance {
  status: AttendanceStatus;
  note: string;
  timeIn?: string;
  timeOut?: string;
}

export function AttendanceForm({ classes, onSubmit }: AttendanceFormProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: StudentAttendance }>({});

  const form = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      classId: '',
      date: new Date().toISOString().split('T')[0],
      attendance: [],
    },
  });

  const handleClassChange = (classId: string) => {
    const selected = classes.find(c => c.id === classId);
    setSelectedClass(selected || null);
    if (selected) {
      const initialAttendance = selected.students.reduce((acc, student) => {
        acc[student.id] = {
          status: 'present',
          note: '',
        };
        return acc;
      }, {} as { [key: string]: StudentAttendance });
      setAttendanceData(initialAttendance);
    }
  };

  const handleSubmit = (formData: AttendanceFormData) => {
    if (!selectedClass) return;

    const attendance = selectedClass.students.map(student => ({
      studentId: student.id,
      ...attendanceData[student.id],
    }));

    onSubmit({
      ...formData,
      attendance,
    });
  };

  const updateStudentAttendance = (studentId: string, updates: Partial<StudentAttendance>) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        ...updates,
      },
    }));
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'excused':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return 'text-green-600';
      case 'absent':
        return 'text-red-600';
      case 'late':
        return 'text-yellow-600';
      case 'excused':
        return 'text-blue-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Take Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleClassChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((class_) => (
                          <SelectItem key={class_.id} value={class_.id}>
                            {class_.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedClass && (
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedClass.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Select
                            value={attendanceData[student.id]?.status}
                            onValueChange={(value: AttendanceStatus) => 
                              updateStudentAttendance(student.id, { status: value })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  Present
                                </div>
                              </SelectItem>
                              <SelectItem value="absent">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-red-600" />
                                  Absent
                                </div>
                              </SelectItem>
                              <SelectItem value="late">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-yellow-600" />
                                  Late
                                </div>
                              </SelectItem>
                              <SelectItem value="excused">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-blue-600" />
                                  Excused
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={attendanceData[student.id]?.timeIn || ''}
                            onChange={(e) => 
                              updateStudentAttendance(student.id, { timeIn: e.target.value })
                            }
                            className="w-[120px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={attendanceData[student.id]?.timeOut || ''}
                            onChange={(e) => 
                              updateStudentAttendance(student.id, { timeOut: e.target.value })
                            }
                            className="w-[120px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={attendanceData[student.id]?.note || ''}
                            onChange={(e) => 
                              updateStudentAttendance(student.id, { note: e.target.value })
                            }
                            placeholder="Add notes..."
                            className="min-h-[60px] w-full"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <Button type="submit" className="w-full mt-6">
              Save Attendance
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
