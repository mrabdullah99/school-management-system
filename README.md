# School Management System

A comprehensive web-based school management system built with React, TypeScript, and Tailwind CSS. Manage students, staff, attendance, fees, exams, and more with role-based access control.

## Features

- **Role-based Access**: Admin, Teacher, and Accountant roles
- **Dashboard**: Role-specific metrics and activity
- **Student Management**: Complete student profiles and records
- **Staff Management**: Staff records and administration
- **Attendance Tracking**: Daily attendance monitoring
- **Fee Management**: Payment tracking and fee structures
- **Exam Management**: Schedule and result management
- **Timetable**: Class schedules and organization
- **Notices**: School announcements
- **Reports**: Comprehensive school metrics

## Technology Stack

- React 18 + TypeScript
- Vite build tool
- Tailwind CSS + PostCSS
- React Router DOM
- Lucide React icons
- date-fns for dates
- Custom UI components

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open `http://localhost:5173`

### Build Commands

- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## Project Structure

```
src/
├── components/     # UI components
├── pages/         # Main application pages
├── context/       # React context providers
├── data/          # Dummy data and types
├── App.tsx        # Main app component
└── main.tsx       # App entry point
```

## Authentication

Frontend-only demo with these accounts:

| Role       | Email                 | Password |
| ---------- | --------------------- | -------- |
| Admin      | admin@school.edu      | password |
| Teacher    | teacher@school.edu    | password |
| Accountant | accountant@school.edu | password |
