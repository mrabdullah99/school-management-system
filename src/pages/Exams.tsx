import React, { useState } from 'react';
import { Plus, Calendar, FileText, Edit, Eye, Trash2, Download, BookOpen, Trophy, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { dummyStudents, dummyClasses } from '../data/dummyData';

interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  maxMarks: number;
  type: 'written' | 'practical' | 'oral';
  status: 'scheduled' | 'ongoing' | 'completed';
}

interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  obtainedMarks: number;
  grade: string;
  remarks?: string;
}

const dummyExams: Exam[] = [
  {
    id: '1',
    name: 'Mid Term Examination',
    class: 'Class 8',
    subject: 'Mathematics',
    date: '2024-12-20',
    time: '09:00',
    duration: '3 hours',
    maxMarks: 100,
    type: 'written',
    status: 'scheduled'
  },
  {
    id: '2',
    name: 'Final Term Examination',
    class: 'Class 7',
    subject: 'English',
    date: '2024-12-15',
    time: '10:00',
    duration: '2.5 hours',
    maxMarks: 80,
    type: 'written',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Science Practical',
    class: 'Class 9',
    subject: 'Physics',
    date: '2024-12-18',
    time: '14:00',
    duration: '2 hours',
    maxMarks: 50,
    type: 'practical',
    status: 'ongoing'
  }
];

const dummyResults: ExamResult[] = [
  {
    id: '1',
    examId: '2',
    studentId: '1',
    obtainedMarks: 75,
    grade: 'A',
    remarks: 'Excellent performance'
  },
  {
    id: '2',
    examId: '2',
    studentId: '2',
    obtainedMarks: 65,
    grade: 'B',
    remarks: 'Good work'
  }
];

export const Exams: React.FC = () => {
  const [exams] = useState<Exam[]>(dummyExams);
  const [results] = useState<ExamResult[]>(dummyResults);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [isAddResultModalOpen, setIsAddResultModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'exams' | 'results'>('exams');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'ongoing': return 'warning';
      case 'completed': return 'success';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'written': return <FileText className="w-4 h-4" />;
      case 'practical': return <BookOpen className="w-4 h-4" />;
      case 'oral': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getExamStats = () => {
    const total = exams.length;
    const scheduled = exams.filter(exam => exam.status === 'scheduled').length;
    const ongoing = exams.filter(exam => exam.status === 'ongoing').length;
    const completed = exams.filter(exam => exam.status === 'completed').length;

    return { total, scheduled, ongoing, completed };
  };

  const stats = getExamStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600">Manage exams, schedules, and results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button onClick={() => setIsAddExamModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.ongoing}</p>
            </div>
            <BookOpen className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('exams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'exams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Exam Schedule
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Results & Marks
          </button>
        </nav>
      </div>

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <Card padding="none">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Exam Details</TableHeader>
                <TableHeader>Class/Subject</TableHeader>
                <TableHeader>Date & Time</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Max Marks</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(exam.type)}
                      <div>
                        <p className="font-medium text-gray-900">{exam.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{exam.type} exam</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{exam.class}</p>
                      <p className="text-sm text-gray-500">{exam.subject}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{new Date(exam.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{exam.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{exam.duration}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{exam.maxMarks}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedExam(exam);
                          setIsResultsModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="danger">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <Card padding="none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Exam Results</CardTitle>
              <Button onClick={() => setIsAddResultModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Result
              </Button>
            </div>
          </CardHeader>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Student</TableHeader>
                <TableHeader>Exam</TableHeader>
                <TableHeader>Marks</TableHeader>
                <TableHeader>Grade</TableHeader>
                <TableHeader>Percentage</TableHeader>
                <TableHeader>Remarks</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => {
                const exam = exams.find(e => e.id === result.examId);
                const student = dummyStudents.find(s => s.id === result.studentId);
                const percentage = exam ? Math.round((result.obtainedMarks / exam.maxMarks) * 100) : 0;
                
                return (
                  <TableRow key={result.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={student?.photo}
                          alt={student?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{student?.name}</p>
                          <p className="text-sm text-gray-500">{student?.class}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{exam?.name}</p>
                        <p className="text-sm text-gray-500">{exam?.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{result.obtainedMarks}/{exam?.maxMarks}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={result.grade === 'A' ? 'success' : result.grade === 'B' ? 'primary' : 'warning'}>
                        {result.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{percentage}%</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{result.remarks || 'N/A'}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add Exam Modal */}
      <Modal
        isOpen={isAddExamModalOpen}
        onClose={() => setIsAddExamModalOpen(false)}
        title="Schedule New Exam"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Exam Name" required />
            <Select
              label="Class"
              options={[
                { value: '', label: 'Select Class' },
                ...dummyClasses.map(cls => ({ value: cls.name, label: cls.name }))
              ]}
            />
            <Input label="Subject" required />
            <Select
              label="Exam Type"
              options={[
                { value: 'written', label: 'Written' },
                { value: 'practical', label: 'Practical' },
                { value: 'oral', label: 'Oral' }
              ]}
            />
            <Input label="Date" type="date" required />
            <Input label="Time" type="time" required />
            <Input label="Duration" placeholder="e.g., 3 hours" required />
            <Input label="Maximum Marks" type="number" required />
          </div>

          <Textarea
            label="Instructions (Optional)"
            rows={3}
            placeholder="Enter exam instructions..."
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddExamModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              Schedule Exam
            </Button>
          </div>
        </div>
      </Modal>

      {/* Results Modal */}
      <Modal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        title="Exam Results"
        size="xl"
      >
        {selectedExam && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">{selectedExam.name}</h4>
              <p className="text-blue-700">{selectedExam.class} - {selectedExam.subject}</p>
              <p className="text-sm text-blue-600">
                {new Date(selectedExam.date).toLocaleDateString()} at {selectedExam.time}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Student Results</h5>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results
                      .filter(result => result.examId === selectedExam.id)
                      .map((result) => {
                        const student = dummyStudents.find(s => s.id === result.studentId);
                        const percentage = Math.round((result.obtainedMarks / selectedExam.maxMarks) * 100);
                        
                        return (
                          <tr key={result.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={student?.photo}
                                  alt={student?.name}
                                  className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <span className="text-sm font-medium text-gray-900">{student?.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result.obtainedMarks}/{selectedExam.maxMarks}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={result.grade === 'A' ? 'success' : result.grade === 'B' ? 'primary' : 'warning'}>
                                {result.grade}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {percentage}%
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsResultsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Result Modal */}
      <Modal
        isOpen={isAddResultModalOpen}
        onClose={() => setIsAddResultModalOpen(false)}
        title="Add Exam Result"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Exam"
              options={[
                { value: '', label: 'Select Exam' },
                ...exams.map(exam => ({ value: exam.id, label: `${exam.name} - ${exam.subject}` }))
              ]}
            />
            <Select
              label="Student"
              options={[
                { value: '', label: 'Select Student' },
                ...dummyStudents.map(student => ({ value: student.id, label: student.name }))
              ]}
            />
            <Input label="Obtained Marks" type="number" required />
            <Select
              label="Grade"
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A', label: 'A' },
                { value: 'B+', label: 'B+' },
                { value: 'B', label: 'B' },
                { value: 'C+', label: 'C+' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
                { value: 'F', label: 'F' }
              ]}
            />
          </div>

          <Textarea
            label="Remarks (Optional)"
            rows={3}
            placeholder="Enter remarks about student performance..."
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddResultModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              Add Result
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};