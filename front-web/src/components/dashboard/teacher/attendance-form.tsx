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
import { CheckCircle, XCircle } from 'lucide-react';

const attendanceSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  date: z.string().min(1, 'Date is required'),
  attendance: z.array(z.object({
    studentId: z.string(),
    present: z.boolean(),
    note: z.string().optional(),
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

export function AttendanceForm({ classes, onSubmit }: AttendanceFormProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: boolean }>({});

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
        acc[student.id] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setAttendanceData(initialAttendance);
    }
  };

  const handleSubmit = (formData: AttendanceFormData) => {
    if (!selectedClass) return;

    const attendance = selectedClass.students.map(student => ({
      studentId: student.id,
      present: attendanceData[student.id] || false,
      note: '',
    }));

    onSubmit({
      ...formData,
      attendance,
    });
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
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
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedClass.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          {attendanceData[student.id] ? (
                            <span className="text-green-600">Present</span>
                          ) : (
                            <span className="text-red-600">Absent</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => toggleAttendance(student.id)}
                          >
                            {attendanceData[student.id] ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </Button>
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
