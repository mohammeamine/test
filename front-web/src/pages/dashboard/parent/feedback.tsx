import { useState } from "react";
import { User } from "../../../types/auth";
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout";
import { Search, ThumbsUp, ThumbsDown, MessageCircle, Filter, Calendar, ChevronLeft, ChevronRight, BarChart2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import React from "react";

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

interface FeedbackStats {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  behavioral: number;
  academic: number;
  general: number;
}

export const ParentFeedback = ({ user }: ParentFeedbackProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<TeacherFeedback["type"] | "all">("all");
  const [selectedSentiment, setSelectedSentiment] = useState<TeacherFeedback["sentiment"] | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for children
  const children = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Emma Smith" }
  ];

  // Mock feedback data
  const feedbackData: TeacherFeedback[] = [
    {
      id: "1",
      studentId: "1",
      studentName: "John Smith",
      teacherId: "t1",
      teacherName: "Mr. Anderson",
      courseId: "c1",
      courseName: "Mathematics",
      date: "2024-03-08",
      type: "academic",
      sentiment: "positive",
      comment: "John has shown significant improvement in problem-solving skills.",
      recommendations: "Continue practicing complex word problems."
    },
    // ... more mock data ...
  ];

  // Calculate feedback statistics
  const calculateStats = (feedback: TeacherFeedback[]): FeedbackStats => {
    return feedback.reduce((stats, item) => ({
      total: stats.total + 1,
      positive: stats.positive + (item.sentiment === "positive" ? 1 : 0),
      negative: stats.negative + (item.sentiment === "negative" ? 1 : 0),
      neutral: stats.neutral + (item.sentiment === "neutral" ? 1 : 0),
      behavioral: stats.behavioral + (item.type === "behavioral" ? 1 : 0),
      academic: stats.academic + (item.type === "academic" ? 1 : 0),
      general: stats.general + (item.type === "general" ? 1 : 0),
    }), {
      total: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      behavioral: 0,
      academic: 0,
      general: 0,
    });
  };

  const stats = calculateStats(feedbackData);

  // Filter feedback
  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesChild = selectedChild === "all" || feedback.studentId === selectedChild;
    const matchesType = selectedType === "all" || feedback.type === selectedType;
    const matchesSentiment = selectedSentiment === "all" || feedback.sentiment === selectedSentiment;
    
    return matchesSearch && matchesChild && matchesType && matchesSentiment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSentimentDetails = (sentiment: TeacherFeedback["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return { icon: ThumbsUp, color: "bg-green-100 text-green-800" };
      case "negative":
        return { icon: ThumbsDown, color: "bg-red-100 text-red-800" };
      case "neutral":
        return { icon: MessageCircle, color: "bg-gray-100 text-gray-800" };
    }
  };

  const getTypeColor = (type: TeacherFeedback["type"]) => {
    switch (type) {
      case "behavioral":
        return "bg-purple-100 text-purple-800";
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "general":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ParentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Student Feedback</h1>
            <p className="text-sm text-gray-500">View and track your children's progress through teacher feedback</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Positive Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.positive}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({Math.round((stats.positive / stats.total) * 100)}%)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Academic Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.academic}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Behavioral Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.behavioral}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Filters</CardTitle>
            <CardDescription>Refine the feedback list using the filters below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Child</label>
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Children</SelectItem>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Feedback Type</label>
                <Select 
                  value={selectedType} 
                  onValueChange={(value: TeacherFeedback["type"] | "all") => setSelectedType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sentiment</label>
                <Select 
                  value={selectedSentiment} 
                  onValueChange={(value: TeacherFeedback["sentiment"] | "all") => setSelectedSentiment(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {paginatedFeedback.map((feedback) => (
                <Card key={feedback.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{feedback.studentName}</h3>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{feedback.courseName}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {feedback.teacherName} • {format(new Date(feedback.date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(feedback.type)}>
                          {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                        </Badge>
                        {(() => {
                          const { icon: Icon, color } = getSentimentDetails(feedback.sentiment);
                          return (
                            <Badge className={color}>
                              <Icon className="h-3 w-3 mr-1" />
                              {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                            </Badge>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700">{feedback.comment}</p>
                      {feedback.recommendations && (
                        <div className="mt-3 text-sm">
                          <span className="font-medium">Recommendations:</span>
                          <p className="text-gray-600">{feedback.recommendations}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredFeedback.length > itemsPerPage && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFeedback.length)} of {filteredFeedback.length} results
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {filteredFeedback.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No feedback found</h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Distribution</CardTitle>
                  <CardDescription>Breakdown of feedback by type and sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">By Type</h4>
                      <div className="space-y-2">
                        {["academic", "behavioral", "general"].map((type) => (
                          <div key={type} className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                            </div>
                            <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className={`h-full ${
                                  type === "academic" ? "bg-blue-500" :
                                  type === "behavioral" ? "bg-purple-500" : "bg-gray-500"
                                }`}
                                style={{
                                  width: `${Math.round((stats[type as keyof FeedbackStats] / stats.total) * 100)}%`
                                }}
                              />
                            </div>
                            <div className="w-12 text-right text-sm">
                              {Math.round((stats[type as keyof FeedbackStats] / stats.total) * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">By Sentiment</h4>
                      <div className="space-y-2">
                        {["positive", "negative", "neutral"].map((sentiment) => (
                          <div key={sentiment} className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm">{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</div>
                            </div>
                            <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className={`h-full ${
                                  sentiment === "positive" ? "bg-green-500" :
                                  sentiment === "negative" ? "bg-red-500" : "bg-gray-500"
                                }`}
                                style={{
                                  width: `${Math.round((stats[sentiment as keyof FeedbackStats] / stats.total) * 100)}%`
                                }}
                              />
                            </div>
                            <div className="w-12 text-right text-sm">
                              {Math.round((stats[sentiment as keyof FeedbackStats] / stats.total) * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Trends</CardTitle>
                  <CardDescription>Feedback patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    Chart component to be implemented
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
};