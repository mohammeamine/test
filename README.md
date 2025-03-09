# PFE-Gestion-Scolaire (School Management System)

A comprehensive school management system with web and mobile interfaces, designed to streamline educational institution operations.

## Project Overview

This is a full-stack application for managing all aspects of an educational institution, including student information, courses, classes, assignments, grades, attendance, and more. The system features role-based access with dedicated interfaces for administrators, teachers, students, and parents.

### Key Features

- **User Management**: Role-based access control for administrators, teachers, students, and parents
- **Dashboard**: Custom dashboards for each user role with relevant information and statistics
- **Course Management**: Create, edit, and manage courses, enrollments, and materials
- **Class Scheduling**: Organize and manage class schedules, rooms, and attendance
- **Assignment System**: Create, distribute, and grade assignments
- **Grading System**: Record and manage student grades and academic performance
- **Financial Management**: Track payments, fees, and financial reports
- **Communication**: Internal messaging system for all users
- **Reporting**: Generate comprehensive reports on various aspects of the institution
- **Mobile Access**: Access key features via mobile application

## Tech Stack

### Frontend Web (front-web)
- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Radix UI** and **shadcn/ui** for UI components
- **React Hook Form** for form handling
- **Zod** for validation
- **React Query** for data fetching
- **Axios** for API communication
- **Chart.js** and **Recharts** for data visualization

### Backend (backend)
- **Node.js** with Express
- **TypeScript** for type safety
- **MySQL** database with raw SQL queries
- **JWT** for authentication
- **Socket.io** for real-time features
- **Bcrypt** for password hashing
- **Express Validator** for request validation

### Mobile App (front-mobile)
- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** (TailwindCSS for React Native)
- **Expo Router** for navigation
- **React Native Chart Kit** for data visualization

## Project Structure

```
PFE-Gestion-Scolaire/
├── front-web/              # Web frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components organized by routes
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── data/           # Mock data
│   │   └── validations/    # Form validation schemas
│   └── public/             # Static assets
│
├── backend/                # Server backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Express middlewares
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── config/         # Configuration files
│   │   ├── app.ts          # Main express application
│   │   └── socket.ts       # Socket.io server setup
│   └── db/                 # Database related files
│       ├── schema.sql      # Database schema definition
│       └── setup.js        # Database setup script
│
└── front-mobile/           # Mobile application
    ├── app/                # Expo Router based screens
    ├── components/         # Reusable UI components
    ├── services/           # API services
    ├── types/              # TypeScript type definitions
    └── hooks/              # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MySQL database
- XAMPP (recommended for local development)

### Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/PFE-Gestion-Scolaire.git
cd PFE-Gestion-Scolaire
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file based on the example
# Make sure to set up your database configuration

# Set up the database
# Start MySQL server via XAMPP
# Run the schema.sql script in your MySQL server

# Start the development server
npm run dev
```

#### 3. Web Frontend Setup

```bash
cd front-web

# Install dependencies
npm install

# Configure environment variables
# Create a .env file if needed

# Start the development server
npm run dev
```

#### 4. Mobile App Setup

```bash
cd front-mobile

# Install dependencies
npm install

# Start the Expo development server
npm start

# Run on iOS or Android
npm run ios
# or
npm run android
```

## Future Goals

### Short Term

- **Complete API Implementation**: Finish implementing all backend API endpoints
- **Authentication System Enhancement**: Add OAuth providers and improve security
- **Real-time Notifications**: Implement push notifications for mobile users
- **Offline Support**: Add offline capabilities for critical features
- **Testing**: Add comprehensive test coverage
- **Documentation**: Create detailed API documentation

### Medium Term

- **Advanced Analytics**: Implement detailed analytics and reporting features
- **Content Management**: Add support for rich media content in courses
- **Calendar Integration**: Add calendar synchronization features
- **Parent Portal Enhancements**: Expand features available to parents
- **Multilingual Support**: Add support for multiple languages

### Long Term

- **AI Features**: Implement AI-driven insights for student performance
- **Learning Management System**: Expand into full LMS capabilities
- **Integrated Video Conferencing**: Add built-in video conferencing for virtual classes
- **Mobile App Expansion**: Add feature parity between web and mobile platforms
- **Enterprise Features**: School network management for multiple campuses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Special thanks to all contributors and mentors who guided this project
- UI components powered by shadcn/ui
- Icons provided by Lucide and Heroicons 
