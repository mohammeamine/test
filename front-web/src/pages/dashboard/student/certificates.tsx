import { useState } from "react";
import { User } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { Award, Search, Download, Share2, CheckCircle, AlertCircle, Calendar, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface StudentCertificatesProps {
  user: User;
}

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  issuer: string;
  type: string;
  status: "valid" | "expired" | "pending";
  verificationId: string;
  downloadUrl: string;
  description: string;
  skills: string[];
}

export default function StudentCertificates({ user }: StudentCertificatesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Mock certificates data
  const [certificates] = useState<Certificate[]>([
    {
      id: "cert1",
      title: "Advanced Web Development",
      issueDate: "2025-01-15",
      expiryDate: "2027-01-15",
      issuer: "Tech Academy",
      type: "Technical",
      status: "valid",
      verificationId: "TECH-2025-001",
      downloadUrl: "/certificates/web-dev.pdf",
      description: "Certification in modern web development technologies including React, Node.js, and TypeScript",
      skills: ["React", "Node.js", "TypeScript", "Web Security"]
    },
    {
      id: "cert2",
      title: "Project Management Fundamentals",
      issueDate: "2024-11-20",
      issuer: "PM Institute",
      type: "Professional",
      status: "valid",
      verificationId: "PMI-2024-123",
      downloadUrl: "/certificates/pm-cert.pdf",
      description: "Foundation certification in project management methodologies and best practices",
      skills: ["Project Planning", "Risk Management", "Team Leadership"]
    },
    {
      id: "cert3",
      title: "Data Science Essentials",
      issueDate: "2024-08-10",
      expiryDate: "2024-08-10",
      issuer: "Data Academy",
      type: "Technical",
      status: "expired",
      verificationId: "DATA-2024-456",
      downloadUrl: "/certificates/data-science.pdf",
      description: "Comprehensive certification in data science fundamentals and machine learning",
      skills: ["Python", "Machine Learning", "Data Analysis"]
    }
  ]);

  // Filter certificates based on search and type
  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = 
      certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || certificate.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get unique certificate types
  const certificateTypes = Array.from(new Set(certificates.map(cert => cert.type)));

  // Handle certificate sharing
  const handleShare = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowShareModal(true);
  };

  // Handle certificate verification
  const handleVerify = (verificationId: string) => {
    // In a real application, this would make an API call to verify the certificate
    console.log("Verifying certificate:", verificationId);
    alert(`Certificate ${verificationId} is valid and authentic.`);
  };

  // Get status color
  const getStatusColor = (status: Certificate["status"]) => {
    switch (status) {
      case "valid":
        return "text-green-600 bg-green-100";
      case "expired":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get status icon
  const getStatusIcon = (status: Certificate["status"]) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-5 w-5" />;
      case "expired":
        return <AlertCircle className="h-5 w-5" />;
      case "pending":
        return <Clock className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  // Check if certificate is expiring soon (within 30 days)
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const daysUntilExpiry = differenceInDays(new Date(expiryDate), new Date());
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your certificates and achievements
            </p>
          </div>
        </div>

        {/* Certificate Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Certificates</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{certificates.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Valid Certificates</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">
              {certificates.filter(c => c.status === "valid").length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Expiring Soon</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">
              {certificates.filter(c => isExpiringSoon(c.expiryDate)).length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Expired</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">
              {certificates.filter(c => c.status === "expired").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            {certificateTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          {filteredCertificates.map((certificate) => (
            <div key={certificate.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${getStatusColor(certificate.status)}`}>
                    {getStatusIcon(certificate.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{certificate.title}</h3>
                    <p className="text-sm text-gray-500">{certificate.issuer}</p>
                    <p className="mt-1 text-sm text-gray-600">{certificate.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {certificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Issued: {format(new Date(certificate.issueDate), "MMM d, yyyy")}
                      </span>
                      {certificate.expiryDate && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Expires: {format(new Date(certificate.expiryDate), "MMM d, yyyy")}
                          {isExpiringSoon(certificate.expiryDate) && (
                            <span className="ml-2 text-xs font-medium text-yellow-600">
                              Expiring Soon
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerify(certificate.verificationId)}
                    className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleShare(certificate)}
                    className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <a
                    href={certificate.downloadUrl}
                    download
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Modal */}
        {showShareModal && selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Share Certificate</h2>
              <p className="mt-2 text-sm text-gray-500">
                Share your certificate "{selectedCertificate.title}" via:
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    // In a real app, this would integrate with email sharing
                    console.log("Share via email:", selectedCertificate.id);
                    setShowShareModal(false);
                  }}
                  className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  Email
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would integrate with LinkedIn sharing
                    console.log("Share on LinkedIn:", selectedCertificate.id);
                    setShowShareModal(false);
                  }}
                  className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  LinkedIn
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}