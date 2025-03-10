# School Management System

A comprehensive school management system with features for students, teachers, and administrators.

## Features

### Student Dashboard
- View upcoming assignments, recent grades, and attendance statistics
- Access course materials and submit assignments
- View and download attendance reports
- Check class schedule

### Teacher Dashboard
- Manage courses and assignments
- Grade student submissions
- Track student attendance
- View teaching schedule

### Admin Dashboard
- Manage users, courses, and departments
- Generate reports
- Configure system settings

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```

2. Install dependencies for both frontend and backend:
```
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd front-web
npm install
cd ..
```

3. Configure the database:
   - Create a MySQL database
   - Copy `.env.example` to `.env` in the backend directory
   - Update the database connection details in the `.env` file

4. Run the application:

#### Using PowerShell (Windows):
```
# Run the backend server
.\run-backend.ps1

# In a separate terminal, run the frontend
cd front-web
npm run dev
```

#### Using Bash (Linux/Mac):
```
# Run the backend server
cd backend
npm run dev

# In a separate terminal, run the frontend
cd front-web
npm run dev
```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## API Documentation

### Student Endpoints

- `GET /api/students/dashboard` - Get student dashboard data
- `GET /api/students/courses` - Get student courses
- `GET /api/students/assignments/upcoming` - Get upcoming assignments
- `GET /api/students/grades/recent` - Get recent grades
- `GET /api/students/attendance` - Get attendance statistics
- `GET /api/students/attendance/records` - Get detailed attendance records
- `GET /api/students/attendance/monthly-summary` - Get monthly attendance summary
- `GET /api/students/attendance/report` - Download attendance report
- `GET /api/students/schedule` - Get student schedule
- `GET /api/students/submissions` - Get student submissions
- `POST /api/students/assignments/:assignmentId/submit` - Submit an assignment

## License

This project is licensed under the MIT License - see the LICENSE file for details.
