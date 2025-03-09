import { useState } from "react";
import { User } from "../../../types/auth";
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout";
import { CreditCard, Download, Search, DollarSign, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface ParentPaymentsProps {
  user: User;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  balance: number;
  tuition: number;
  dueDate: string;
}

interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "tuition" | "fees" | "other";
  description: string;
  reference: string;
}

export default function ParentPayments({ user }: ParentPaymentsProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock student data
  const students: Student[] = [
    {
      id: "s1",
      name: "John Smith",
      grade: "10th Grade",
      balance: 1500,
      tuition: 5000,
      dueDate: "2025-03-15"
    },
    {
      id: "s2",
      name: "Emma Johnson",
      grade: "8th Grade",
      balance: 750,
      tuition: 4500,
      dueDate: "2025-03-15"
    }
  ];

  // Mock payment history
  const payments: Payment[] = [
    {
      id: "p1",
      studentId: "s1",
      amount: 500,
      date: "2025-03-01",
      status: "completed",
      type: "tuition",
      description: "March Tuition Payment",
      reference: "TUI-2025-001"
    },
    {
      id: "p2",
      studentId: "s2",
      amount: 250,
      date: "2025-03-02",
      status: "completed",
      type: "fees",
      description: "Lab Fees",
      reference: "FEE-2025-001"
    },
    {
      id: "p3",
      studentId: "s1",
      amount: 1000,
      date: "2025-02-15",
      status: "completed",
      type: "tuition",
      description: "February Tuition Payment",
      reference: "TUI-2025-002"
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesStudent = selectedStudent === "all" || payment.studentId === selectedStudent;
    const student = students.find(s => s.id === payment.studentId);
    const matchesSearch = 
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStudent && matchesSearch;
  });

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleMakePayment = () => {
    setShowPaymentForm(true);
  };

  const handleDownloadReport = () => {
    // In a real application, this would generate and download a PDF report
    console.log("Downloading payment report");
    alert("Payment report would be downloaded in a real application.");
  };

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments & Billing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage payments and view billing history
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleMakePayment}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <CreditCard className="h-4 w-4" />
              Make Payment
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Student Balances */}
        <div className="grid gap-6 md:grid-cols-2">
          {students.map(student => (
            <div key={student.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    student.balance > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}>
                    Balance: ${student.balance.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tuition</p>
                    <p className="text-lg font-semibold text-gray-900">${student.tuition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Due Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(student.dueDate), "MMM d")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {student.balance > 0 ? "Due" : "Paid"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="all">All Students</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const student = students.find(s => s.id === payment.studentId);
              return (
                <div key={payment.id} className="rounded-lg border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-3 ${getStatusColor(payment.status)}`}>
                        {payment.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : payment.status === "pending" ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{payment.description}</h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(payment.date), "MMM d, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${payment.amount.toFixed(2)}
                          </span>
                          {student && (
                            <span className="text-gray-500">
                              {student.name}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Reference: {payment.reference}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Make a Payment</h2>
              {/* Payment form would go here */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Payment processing would happen here");
                    setShowPaymentForm(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}