import { useState } from "react";
import { User } from "../../../types/auth";
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout";
import { Search, ThumbsUp, ThumbsDown, MessageCircle, Filter, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ParentFeedbackProps {
  user: User;
}

interface TeacherFeedback {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  date: string;
  type: "behavioral" | "academic" | "general";
  sentiment: "positive" | "negative" | "neutral";
  comment: string;
  recommendations?: string;
}

export const ParentFeedback = ({ user }: ParentFeedbackProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<TeacherFeedback["type"] | "all">("all");
  const [selectedSentiment, setSelectedSentiment] = useState<TeacherFeedback["sentiment"] | "all">("all");

  // Mock feedback data
  const [feedbacks] = useState<TeacherFeedback[]>([
    {
      id: "f1",
      studentId: "s1",
      studentName: "John Smith",
      teacherId: "t1",
      teacherName: "Mr. Anderson",
      courseId: "c1",
      courseName: "Mathematics 101",
      date: "2025-03-01",
      type: "academic",
      sentiment: "positive",
      comment: "John has shown significant improvement in problem-solving skills. He actively participates in class discussions and helps other students.",
      recommendations: "Keep up the great work! Consider joining the Math Club."
    },
    {
      id: "f2",
      studentId: "s1",
      studentName: "John Smith",
      teacherId: "t2",
      teacherName: "Dr. Wilson",
      courseId: "c2",
      courseName: "Physics 201",
      date: "2025-03-02",
      type: "behavioral",
      sentiment: "negative",
      comment: "John has been arriving late to class frequently. This disrupts the class and affects his learning.",
      recommendations: "Please ensure timely arrival to class. Consider leaving home 15 minutes earlier."
    },
    {
      id: "f3",
      studentId: "s2",
      studentName: "Emma Smith",
      teacherId: "t1",
      teacherName: "Mr. Anderson",
      courseId: "c1",
      courseName: "Mathematics 101",
      date: "2025-03-01",
      type: "general",
      sentiment: "neutral",
      comment: "Emma is performing at grade level but has potential for improvement. She seems hesitant to ask questions when unclear about concepts."
    },
    {
      id: "f4",
      studentId: "s2",
      studentName: "Emma Smith",
      teacherId: "t3",
      teacherName: "Mrs. Brown",
      courseId: "c3",
      courseName: "English Literature",
      date: "2025-03-03",
      type: "academic",
      sentiment: "positive",
      comment: "Emma's essay writing has improved significantly. Her analysis of literary themes shows depth and creativity.",
      recommendations: "Consider joining the Creative Writing Club to further develop these skills."
    }
  ]);

  // Get unique children
  const children = Array.from(
    new Set(feedbacks.map(feedback => feedback.studentId))
  ).map(studentId => {
    const feedback = feedbacks.find(f => f.studentId === studentId);
    return {
      id: studentId,
      name: feedback?.studentName || ""
    };
  });

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.recommendations?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesChild = selectedChild === "all" || feedback.studentId === selectedChild;
    const matchesType = selectedType === "all" || feedback.type === selectedType;
    const matchesSentiment = selectedSentiment === "all" || feedback.sentiment === selectedSentiment;
    
    return matchesSearch && matchesChild && matchesType && matchesSentiment;
  });

  // Get sentiment icon and color
  const getSentimentDetails = (sentiment: TeacherFeedback["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return {
          icon: <ThumbsUp className="h-5 w-5" />,
          color: "text-green-600 bg-green-100"
        };
      case "negative":
        return {
          icon: <ThumbsDown className="h-5 w-5" />,
          color: "text-red-600 bg-red-100"
        };
      case "neutral":
        return {
          icon: <MessageCircle className="h-5 w-5" />,
          color: "text-blue-600 bg-blue-100"
        };
    }
  };

  // Get feedback type color
  const getTypeColor = (type: TeacherFeedback["type"]) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-600";
      case "behavioral":
        return "bg-yellow-100 text-yellow-600";
      case "general":
        return "bg-purple-100 text-purple-600";
    }
  };

  return (
    <ParentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Feedback</h1>
            <p className="mt-1 text-sm text-gray-500">
              View teacher comments and recommendations for your children
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as TeacherFeedback["type"] | "all")}
          >
            <option value="all">All Types</option>
            <option value="academic">Academic</option>
            <option value="behavioral">Behavioral</option>
            <option value="general">General</option>
          </select>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as TeacherFeedback["sentiment"] | "all")}
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => {
            const sentimentDetails = getSentimentDetails(feedback.sentiment);
            return (
              <div key={feedback.id} className="rounded-lg border bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-3 ${sentimentDetails.color}`}>
                      {sentimentDetails.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{feedback.studentName}</h3>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{feedback.courseName}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(feedback.date), "MMM d, yyyy")}
                        </span>
                        <span>by {feedback.teacherName}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${getTypeColor(feedback.type)}`}>
                    {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{feedback.comment}</p>
                {feedback.recommendations && (
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
                    <p className="text-blue-700">{feedback.recommendations}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ParentLayout>
  );
};