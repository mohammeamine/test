# School Management System API

This is a comprehensive school management system API for handling students, teachers, courses, assignments, and more.

## Prerequisites

- Node.js (v14+)
- MySQL (v8+)

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Set up environment variables
```bash
# Copy the sample .env file and modify it as needed
cp .env.example .env
```

4. Create and set up the database
```bash
# Create the database schema
node db/setup.js

# Seed the database with sample data
node db/seed.js
```

## Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Test the API
```bash
# Open the API tester in your browser
open api-tester.html
```

## Database Structure

The system uses a relational database with the following main tables:

- `users`: Stores all users (administrators, teachers, students, and parents)
- `departments`: Academic departments
- `courses`: Courses offered by the institution
- `course_enrollments`: Student enrollments in courses
- `classes`: Specific class instances with schedules
- `assignments`: Assignments for courses
- `assignment_submissions`: Student submissions for assignments
- `grades`: Student grades for assignments and courses
- `attendance`: Student attendance records
- `documents`: Uploaded files and documents

## API Endpoints

### Authentication
- `POST /api/auth/login`: Login with email and password
- `GET /api/auth/me`: Get current authenticated user info

### Student Endpoints
- `GET /api/students/dashboard`: Get student dashboard data
- `GET /api/students/courses`: Get courses for the current student
- `GET /api/students/assignments/upcoming`: Get upcoming assignments
- `GET /api/students/submissions`: Get submitted assignments
- `GET /api/students/grades/recent`: Get recent grades
- `GET /api/students/attendance`: Get attendance statistics
- `GET /api/students/schedule`: Get student schedule

### Course Endpoints
- `GET /api/courses`: Get all courses
- `GET /api/courses/:id`: Get course details

## Default Users

After running the seed script, you can use the following users to login:

- **Admin User**
  - Email: admin@example.com
  - Password: password123

- **Teacher User**
  - Email: teacher@example.com
  - Password: password123

- **Student User**
  - Email: student@example.com
  - Password: password123

## License

[MIT](LICENSE)
