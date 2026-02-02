import React, { useState } from 'react';
import { Calendar, Search, Download, Filter, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { dummyStudents, dummyClasses } from '../data/dummyData';

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>({});
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const classOptions = [...new Set(dummyClasses.map(cls => cls.name))];
  const sectionOptions = selectedClass 
    ? [...new Set(dummyClasses.filter(cls => cls.name === selectedClass).map(cls => cls.section))]
    : [];

  const filteredStudents = dummyStudents.filter(student => 
    (!selectedClass || student.class === selectedClass) &&
    (!selectedSection || student.section === selectedSection)
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], studentId, status }
    }));
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendance).filter(record => record.status === 'present').length;
    const absent = Object.values(attendance).filter(record => record.status === 'absent').length;
    const late = Object.values(attendance).filter(record => record.status === 'late').length;

    return {
      total,
      present,
      absent,
      late,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    };
  };

  const stats = getAttendanceStats();

  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusVariant = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track and manage daily attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsReportModalOpen(true)}>
            <Download className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Button>
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Date and Class Selection */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Select
            label="Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={[
              { value: '', label: 'All Classes' },
              ...classOptions.map(cls => ({ value: cls, label: cls }))
            ]}
          />
          <Select
            label="Section"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            options={[
              { value: '', label: 'All Sections' },
              ...sectionOptions.map(section => ({ value: section, label: `Section ${section}` }))
            ]}
            disabled={!selectedClass}
          />
          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance %</p>
              <p className="text-2xl font-bold text-blue-600">{stats.percentage}%</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card padding="none">
        <CardHeader>
          <CardTitle>Mark Attendance - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
        </CardHeader>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Student</TableHeader>
              <TableHeader>Roll No.</TableHeader>
              <TableHeader>Class</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => {
              const studentAttendance = attendance[student.id];
              return (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{student.rollNumber}</span>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{student.class}</p>
                    <p className="text-sm text-gray-500">Section {student.section}</p>
                  </TableCell>
                  <TableCell>
                    {studentAttendance ? (
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(studentAttendance.status)}
                        <Badge variant={getStatusVariant(studentAttendance.status)}>
                          {studentAttendance.status}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not marked</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant={studentAttendance?.status === 'present' ? 'success' : 'outline'}
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={studentAttendance?.status === 'absent' ? 'danger' : 'outline'}
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                      >
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={studentAttendance?.status === 'late' ? 'secondary' : 'outline'}
                        onClick={() => handleAttendanceChange(student.id, 'late')}
                      >
                        Late
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Reports Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Attendance Reports"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Generate Reports</h4>
              
              <div className="space-y-3">
                <Input label="From Date" type="date" />
                <Input label="To Date" type="date" />
                <Select
                  label="Class"
                  options={[
                    { value: '', label: 'All Classes' },
                    ...classOptions.map(cls => ({ value: cls, label: cls }))
                  ]}
                />
                <Select
                  label="Report Type"
                  options={[
                    { value: 'daily', label: 'Daily Attendance' },
                    { value: 'monthly', label: 'Monthly Summary' },
                    { value: 'student', label: 'Student-wise Report' },
                    { value: 'class', label: 'Class-wise Report' }
                  ]}
                />
              </div>
              
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quick Reports</h4>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Today's Attendance Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Weekly Attendance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Monthly Attendance Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <XCircle className="w-4 h-4 mr-2" />
                  Defaulters List
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};