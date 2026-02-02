export interface Student {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  cnic: string;
  class: string;
  section: string;
  rollNumber: string;
  address: string;
  phone: string;
  email: string;
  admissionDate: string;
  photo?: string;
  status: 'active' | 'inactive';
  feeStatus: 'paid' | 'pending' | 'overdue';
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  cnic: string;
  address: string;
  phone: string;
  email: string;
  joiningDate: string;
  salary: number;
  photo?: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  section: string;
  teacherInCharge: string;
  studentCount: number;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  class: string;
  tuitionFee: number;
  transportFee: number;
  examFee: number;
  miscFee: number;
  total: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'pending';
  dueDate: string;
  paidDate?: string;
}

export interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  maxMarks: number;
  duration: string;
  type: 'written' | 'practical' | 'oral';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  obtainedMarks: number;
  grade: string;
  remarks?: string;
}

export interface TimetableEntry {
  id: string;
  class: string;
  section: string;
  day: string;
  timeSlot: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'general' | 'urgent' | 'holiday' | 'exam';
  attachments?: string[];
  targetAudience: 'all' | 'students' | 'staff' | 'parents';
}

// Dummy data
export const dummyStudents: Student[] = [
  {
    id: '1',
    name: 'Ali Ahmed',
    fatherName: 'Ahmed Ali',
    motherName: 'Fatima Ali',
    dateOfBirth: '2010-05-15',
    cnic: '12345-6789012-3',
    class: 'Class 8',
    section: 'A',
    rollNumber: '801',
    address: '123 Main St, City',
    phone: '+92-300-1234567',
    email: 'ali.ahmed@student.edu',
    admissionDate: '2023-04-01',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    feeStatus: 'paid'
  },
  {
    id: '2',
    name: 'Sara Khan',
    fatherName: 'Khan Sahab',
    motherName: 'Ayesha Khan',
    dateOfBirth: '2011-03-20',
    cnic: '12345-6789012-4',
    class: 'Class 7',
    section: 'B',
    rollNumber: '702',
    address: '456 Oak Ave, City',
    phone: '+92-300-2345678',
    email: 'sara.khan@student.edu',
    admissionDate: '2023-04-01',
    photo: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    feeStatus: 'pending'
  },
  {
    id: '3',
    name: 'Hassan Malik',
    fatherName: 'Malik Hassan',
    motherName: 'Zainab Malik',
    dateOfBirth: '2009-08-10',
    cnic: '12345-6789012-5',
    class: 'Class 9',
    section: 'A',
    rollNumber: '901',
    address: '789 Pine St, City',
    phone: '+92-300-3456789',
    email: 'hassan.malik@student.edu',
    admissionDate: '2023-04-01',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    feeStatus: 'overdue'
  }
];

export const dummyStaff: Staff[] = [
  {
    id: '1',
    name: 'Dr. Muhammad Ali',
    designation: 'Principal',
    cnic: '12345-6789012-1',
    address: '123 Faculty St, City',
    phone: '+92-300-1111111',
    email: 'principal@school.edu',
    joiningDate: '2020-01-01',
    salary: 150000,
    photo: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active'
  },
  {
    id: '2',
    name: 'Ms. Fatima Sheikh',
    designation: 'English Teacher',
    cnic: '12345-6789012-2',
    address: '456 Teacher Ave, City',
    phone: '+92-300-2222222',
    email: 'fatima@school.edu',
    joiningDate: '2021-08-15',
    salary: 80000,
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active'
  }
];

export const dummyClasses: Class[] = [
  {
    id: '1',
    name: 'Class 8',
    section: 'A',
    teacherInCharge: 'Ms. Fatima Sheikh',
    studentCount: 35,
    room: 'Room 101'
  },
  {
    id: '2',
    name: 'Class 7',
    section: 'B',
    teacherInCharge: 'Mr. Ahmed Khan',
    studentCount: 32,
    room: 'Room 102'
  },
  {
    id: '3',
    name: 'Class 9',
    section: 'A',
    teacherInCharge: 'Dr. Sarah Ali',
    studentCount: 28,
    room: 'Room 201'
  }
];

export const dummyFeeStructure: FeeStructure[] = [
  {
    id: '1',
    class: 'Class 8',
    tuitionFee: 15000,
    transportFee: 3000,
    examFee: 2000,
    miscFee: 1000,
    total: 21000
  },
  {
    id: '2',
    class: 'Class 7',
    tuitionFee: 14000,
    transportFee: 3000,
    examFee: 2000,
    miscFee: 1000,
    total: 20000
  }
];

export const dummyNotices: Notice[] = [
  {
    id: '1',
    title: 'Winter Break Announcement',
    description: 'The school will remain closed from December 20th to January 5th for winter break.',
    date: '2024-12-10',
    type: 'holiday',
    targetAudience: 'all'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    description: 'Parent-Teacher meeting scheduled for all classes on December 15th, 2024.',
    date: '2024-12-05',
    type: 'general',
    targetAudience: 'parents'
  },
  {
    id: '3',
    title: 'Final Exams Schedule',
    description: 'Final examinations will commence from January 15th, 2024. Please check the detailed schedule.',
    date: '2024-12-01',
    type: 'exam',
    targetAudience: 'students'
  }
];

export const dummyTimetable: TimetableEntry[] = [
  {
    id: '1',
    class: 'Class 8',
    section: 'A',
    day: 'Monday',
    timeSlot: '08:00-08:45',
    subject: 'Mathematics',
    teacher: 'Mr. Ali Ahmed',
    room: 'Room 101'
  },
  {
    id: '2',
    class: 'Class 8',
    section: 'A',
    day: 'Monday',
    timeSlot: '08:45-09:30',
    subject: 'English',
    teacher: 'Ms. Fatima Sheikh',
    room: 'Room 101'
  },
  {
    id: '3',
    class: 'Class 8',
    section: 'A',
    day: 'Monday',
    timeSlot: '09:30-10:15',
    subject: 'Science',
    teacher: 'Dr. Hassan Khan',
    room: 'Room 101'
  }
];