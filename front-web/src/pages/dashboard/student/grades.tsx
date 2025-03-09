import { useState } from 'react';
import { User } from '@/types/auth';
import { StudentLayout } from '../../../components/dashboard/layout/student-layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentGradesProps {
  user: User;
}

interface GradeEntry {
  id: string;
  type: string;
  score: number;
  totalPoints: number;
  date: string;
  feedback?: string;
}

interface CourseGrades {
  id: string;
  name: string;
  teacher: string;
  currentGrade: number;
  grades: GradeEntry[];
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: number;
  };
}

export default function StudentGrades({ user }: StudentGradesProps) {
  // Mock data - replace with actual API call
  const [courses] = useState<CourseGrades[]>([
    {
      id: '1',
      name: 'Mathematics',
      teacher: 'Mr. Anderson',
      currentGrade: 88,
      trend: { direction: 'up', value: 3.2 },
      grades: [
        {
          id: '1',
          type: 'Quiz',
          score: 85,
          totalPoints: 100,
          date: '2024-01-15',
          feedback: 'Good work on algebraic expressions'
        },
        {
          id: '2',
          type: 'Midterm Exam',
          score: 92,
          totalPoints: 100,
          date: '2024-02-01',
          feedback: 'Excellent understanding of calculus concepts'
        },
        {
          id: '3',
          type: 'Homework',
          score: 88,
          totalPoints: 100,
          date: '2024-02-15',
          feedback: 'Well-organized solutions'
        }
      ]
    },
    {
      id: '2',
      name: 'Physics',
      teacher: 'Dr. Johnson',
      currentGrade: 92,
      trend: { direction: 'up', value: 2.5 },
      grades: [
        {
          id: '4',
          type: 'Lab Report',
          score: 95,
          totalPoints: 100,
          date: '2024-01-20',
          feedback: 'Excellent experimental analysis'
        },
        {
          id: '5',
          type: 'Quiz',
          score: 88,
          totalPoints: 100,
          date: '2024-02-05',
          feedback: 'Good understanding of mechanics'
        }
      ]
    },
    {
      id: '3',
      name: 'Literature',
      teacher: 'Ms. Parker',
      currentGrade: 85,
      trend: { direction: 'down', value: 1.8 },
      grades: [
        {
          id: '6',
          type: 'Essay',
          score: 85,
          totalPoints: 100,
          date: '2024-01-25',
          feedback: 'Good analysis but needs more textual evidence'
        }
      ]
    }
  ]);

  const calculateGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateProgress = (score: number, total: number) => {
    return (score / total) * 100;
  };

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Performance</h1>
            <p className="text-sm text-gray-600 mt-1">Track your grades and academic progress</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{course.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${calculateGradeColor(course.currentGrade)}`}>
                      {course.currentGrade}%
                    </span>
                    {course.trend && (
                      <div className={`flex items-center ${
                        course.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {course.trend.direction === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-xs ml-1">{course.trend.value}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{course.teacher}</p>
                <Progress 
                  value={course.currentGrade}
                  className="h-2"
                />
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <Tabs defaultValue={courses[0]?.id}>
            <TabsList className="grid grid-cols-3 gap-4">
              {courses.map((course) => (
                <TabsTrigger key={course.id} value={course.id} className="w-full">
                  {course.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {courses.map((course) => (
              <TabsContent key={course.id} value={course.id}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{course.name} - Grade Details</h3>
                    <span className={`text-lg font-bold ${calculateGradeColor(course.currentGrade)}`}>
                      Overall: {course.currentGrade}%
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium text-gray-500">Type</th>
                          <th className="text-left p-2 font-medium text-gray-500">Score</th>
                          <th className="text-left p-2 font-medium text-gray-500">Date</th>
                          <th className="text-left p-2 font-medium text-gray-500">Progress</th>
                          <th className="text-left p-2 font-medium text-gray-500">Feedback</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {course.grades.map((grade) => (
                          <tr key={grade.id}>
                            <td className="p-2">{grade.type}</td>
                            <td className="p-2">
                              <span className={calculateGradeColor((grade.score / grade.totalPoints) * 100)}>
                                {grade.score}/{grade.totalPoints}
                              </span>
                            </td>
                            <td className="p-2">{new Date(grade.date).toLocaleDateString()}</td>
                            <td className="p-2 w-32">
                              <Progress 
                                value={calculateProgress(grade.score, grade.totalPoints)} 
                                className="h-2"
                              />
                            </td>
                            <td className="p-2 text-sm text-gray-600">{grade.feedback}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </StudentLayout>
  );
}