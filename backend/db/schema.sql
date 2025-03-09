-- Drop database if exists (use with caution)
-- DROP DATABASE IF EXISTS pfe;

-- Create database (already created through XAMPP)
-- CREATE DATABASE IF NOT EXISTS pfe;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  role ENUM('administrator', 'teacher', 'student', 'parent') NOT NULL,
  profilePicture VARCHAR(255),
  phoneNumber VARCHAR(20),
  studentId VARCHAR(50),
  bio TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  departmentId VARCHAR(36)
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  headId VARCHAR(36),
  description TEXT NOT NULL,
  established DATE NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (headId) REFERENCES users(id) ON DELETE SET NULL
);

-- Add foreign key constraint to users table for departmentId
ALTER TABLE users ADD CONSTRAINT fk_user_department FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE SET NULL;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  teacherId VARCHAR(36) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  credits INT NOT NULL DEFAULT 1,
  maxStudents INT NOT NULL DEFAULT 30,
  status ENUM('active', 'upcoming', 'completed') NOT NULL DEFAULT 'upcoming',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  departmentId VARCHAR(36),
  FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE SET NULL
);

-- Course Enrollments table (many-to-many relationship between students and courses)
CREATE TABLE IF NOT EXISTS course_enrollments (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  studentId VARCHAR(36) NOT NULL,
  enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'dropped', 'completed') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (courseId, studentId),
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
);

-- Classes table (instances of courses with specific schedules)
CREATE TABLE IF NOT EXISTS classes (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  teacherId VARCHAR(36) NOT NULL,
  room VARCHAR(50) NOT NULL,
  capacity INT NOT NULL DEFAULT 30,
  status ENUM('active', 'cancelled', 'completed') NOT NULL DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE CASCADE
);

-- Class Schedule table
CREATE TABLE IF NOT EXISTS class_schedules (
  id VARCHAR(36) PRIMARY KEY,
  classId VARCHAR(36) NOT NULL,
  day ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATETIME NOT NULL,
  points INT NOT NULL DEFAULT 100,
  status ENUM('draft', 'published', 'closed') NOT NULL DEFAULT 'draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

-- Assignment Submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id VARCHAR(36) PRIMARY KEY,
  assignmentId VARCHAR(36) NOT NULL,
  studentId VARCHAR(36) NOT NULL,
  submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade INT,
  feedback TEXT,
  status ENUM('submitted', 'graded', 'late') NOT NULL DEFAULT 'submitted',
  submissionUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (assignmentId, studentId),
  FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
);

-- Course Materials table
CREATE TABLE IF NOT EXISTS materials (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('document', 'video', 'link') NOT NULL,
  url VARCHAR(255) NOT NULL,
  uploadedBy VARCHAR(36) NOT NULL,
  uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  size INT,
  duration INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (uploadedBy) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(36) PRIMARY KEY,
  senderId VARCHAR(36) NOT NULL,
  receiverId VARCHAR(36) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  readAt TIMESTAMP NULL,
  status ENUM('sent', 'delivered', 'read') NOT NULL DEFAULT 'sent',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  paymentMethod VARCHAR(50) NOT NULL,
  transactionId VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paidAt TIMESTAMP NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
  id VARCHAR(36) PRIMARY KEY,
  studentId VARCHAR(36) NOT NULL,
  courseId VARCHAR(36) NOT NULL,
  assignmentId VARCHAR(36),
  value DECIMAL(5, 2) NOT NULL,
  type ENUM('assignment', 'midterm', 'final', 'participation') NOT NULL,
  gradedBy VARCHAR(36) NOT NULL,
  gradedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comments TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE SET NULL,
  FOREIGN KEY (gradedBy) REFERENCES users(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  studentId VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late', 'excused') NOT NULL,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (courseId, studentId, date),
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
);

-- Parent-Child Relationships table
CREATE TABLE IF NOT EXISTS parent_child (
  id VARCHAR(36) PRIMARY KEY,
  parentId VARCHAR(36) NOT NULL,
  studentId VARCHAR(36) NOT NULL,
  relationship ENUM('parent', 'guardian') NOT NULL DEFAULT 'parent',
  isEmergencyContact BOOLEAN NOT NULL DEFAULT false,
  canPickup BOOLEAN NOT NULL DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (parentId, studentId),
  FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  location VARCHAR(255),
  organizer VARCHAR(36) NOT NULL,
  type ENUM('academic', 'sports', 'cultural', 'holiday', 'other') NOT NULL DEFAULT 'other',
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'warning', 'error', 'success') NOT NULL DEFAULT 'info',
  isRead BOOLEAN NOT NULL DEFAULT false,
  link VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL UNIQUE,
  theme VARCHAR(50) DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'en',
  notifications BOOLEAN DEFAULT true,
  emailNotifications BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- System Settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  settingKey VARCHAR(100) NOT NULL UNIQUE,
  settingValue TEXT NOT NULL,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial admin user (password is 'password123')
-- INSERT INTO users (id, email, password, firstName, lastName, role) 
-- VALUES (UUID(), 'admin@school.com', '$2b$10$xz1Bpz2QM.WNFv7PE7LIAeyPcKN5jbV4ZyBbqZoRHt.BNBM4xnj3a', 'Admin', 'User', 'administrator'); 