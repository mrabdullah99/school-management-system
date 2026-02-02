import React, { useState } from 'react';
import { Plus, Edit, Trash2, Clock, BookOpen, User, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { dummyClasses, dummyStaff } from '../data/dummyData';

interface TimetableEntry {
  id: string;
  class: string;
  section: string;
  day: string;
  timeSlot: string;
  subject: string;
  teacher: string;
  room: string;
}

const dummyTimetable: TimetableEntry[] = [
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
  },
  {
    id: '4',
    class: 'Class 8',
    section: 'A',
    day: 'Monday',
    timeSlot: '10:15-10:30',
    subject: 'Break',
    teacher: '',
    room: ''
  },
  {
    id: '5',
    class: 'Class 8',
    section: 'A',
    day: 'Monday',
    timeSlot: '10:30-11:15',
    subject: 'History',
    teacher: 'Ms. Sarah Ali',
    room: 'Room 101'
  },
  {
    id: '6',
    class: 'Class 8',
    section: 'A',
    day: 'Tuesday',
    timeSlot: '08:00-08:45',
    subject: 'Science',
    teacher: 'Dr. Hassan Khan',
    room: 'Room 101'
  },
  {
    id: '7',
    class: 'Class 8',
    section: 'A',
    day: 'Tuesday',
    timeSlot: '08:45-09:30',
    subject: 'Mathematics',
    teacher: 'Mr. Ali Ahmed',
    room: 'Room 101'
  }
];

const timeSlots = [
  '08:00-08:45',
  '08:45-09:30',
  '09:30-10:15',
  '10:15-10:30',
  '10:30-11:15',
  '11:15-12:00',
  '12:00-12:45',
  '12:45-13:30',
  '13:30-14:15',
  '14:15-15:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const subjects = [
  'Mathematics',
  'English',
  'Science',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music',
  'Break'
];

export const Timetable: React.FC = () => {
  const [timetable] = useState<TimetableEntry[]>(dummyTimetable);
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const classOptions = [...new Set(dummyClasses.map(cls => cls.name))];
  const sectionOptions = selectedClass 
    ? [...new Set(dummyClasses.filter(cls => cls.name === selectedClass).map(cls => cls.section))]
    : [];

  const filteredTimetable = timetable.filter(entry => 
    entry.class === selectedClass && entry.section === selectedSection
  );

  const getTimetableGrid = () => {
    const grid: { [key: string]: TimetableEntry | null } = {};
    
    days.forEach(day => {
      timeSlots.forEach(slot => {
        const key = `${day}-${slot}`;
        const entry = filteredTimetable.find(t => t.day === day && t.timeSlot === slot);
        grid[key] = entry || null;
      });
    });
    
    return grid;
  };

  const timetableGrid = getTimetableGrid();

  const handleCellClick = (day: string, timeSlot: string) => {
    const entry = filteredTimetable.find(t => t.day === day && t.timeSlot === timeSlot);
    if (entry) {
      setSelectedEntry(entry);
    } else {
      setSelectedEntry(null);
      setSelectedDay(day);
      setSelectedTimeSlot(timeSlot);
    }
    setIsAddModalOpen(true);
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'English': 'bg-green-100 text-green-800 border-green-200',
      'Science': 'bg-purple-100 text-purple-800 border-purple-200',
      'History': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Geography': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Physics': 'bg-red-100 text-red-800 border-red-200',
      'Chemistry': 'bg-pink-100 text-pink-800 border-pink-200',
      'Biology': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Computer Science': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Physical Education': 'bg-orange-100 text-orange-800 border-orange-200',
      'Art': 'bg-rose-100 text-rose-800 border-rose-200',
      'Music': 'bg-violet-100 text-violet-800 border-violet-200',
      'Break': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
          <p className="text-gray-600">Manage class schedules and time slots</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Class Selection */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classOptions.map(cls => ({ value: cls, label: cls }))}
          />
          <Select
            label="Section"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            options={sectionOptions.map(section => ({ value: section, label: `Section ${section}` }))}
            disabled={!selectedClass}
          />
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Current Selection:</p>
              <p>{selectedClass} - Section {selectedSection}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Timetable Grid */}
      <Card padding="none">
        <CardHeader>
          <CardTitle>Weekly Timetable - {selectedClass} Section {selectedSection}</CardTitle>
        </CardHeader>
        
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900 w-32">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-900">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot}>
                    <td className="border border-gray-200 px-4 py-3 bg-gray-50 font-medium text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {timeSlot}
                      </div>
                    </td>
                    {days.map(day => {
                      const entry = timetableGrid[`${day}-${timeSlot}`];
                      return (
                        <td
                          key={`${day}-${timeSlot}`}
                          className="border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleCellClick(day, timeSlot)}
                        >
                          {entry ? (
                            <div className={`p-3 rounded-lg border-2 ${getSubjectColor(entry.subject)} transition-all hover:shadow-md`}>
                              <div className="font-medium text-sm mb-1">
                                {entry.subject}
                              </div>
                              {entry.teacher && (
                                <div className="text-xs opacity-75 flex items-center mb-1">
                                  <User className="w-3 h-3 mr-1" />
                                  {entry.teacher}
                                </div>
                              )}
                              {entry.room && (
                                <div className="text-xs opacity-75">
                                  {entry.room}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                              <Plus className="w-4 h-4 mx-auto mb-1" />
                              <div className="text-xs">Add Subject</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Legend</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {subjects.map(subject => (
            <div key={subject} className={`p-2 rounded-lg border-2 text-center text-sm ${getSubjectColor(subject)}`}>
              {subject}
            </div>
          ))}
        </div>
      </Card>

      {/* Add/Edit Schedule Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedEntry ? 'Edit Schedule' : 'Add New Schedule'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Class"
              defaultValue={selectedClass}
              options={classOptions.map(cls => ({ value: cls, label: cls }))}
            />
            <Select
              label="Section"
              defaultValue={selectedSection}
              options={sectionOptions.map(section => ({ value: section, label: `Section ${section}` }))}
            />
            <Select
              label="Day"
              defaultValue={selectedEntry?.day || selectedDay}
              options={days.map(day => ({ value: day, label: day }))}
            />
            <Select
              label="Time Slot"
              defaultValue={selectedEntry?.timeSlot || selectedTimeSlot}
              options={timeSlots.map(slot => ({ value: slot, label: slot }))}
            />
            <Select
              label="Subject"
              defaultValue={selectedEntry?.subject}
              options={subjects.map(subject => ({ value: subject, label: subject }))}
            />
            <Select
              label="Teacher"
              defaultValue={selectedEntry?.teacher}
              options={[
                { value: '', label: 'Select Teacher' },
                ...dummyStaff.map(staff => ({ value: staff.name, label: staff.name }))
              ]}
            />
            <Input
              label="Room"
              defaultValue={selectedEntry?.room}
              placeholder="e.g., Room 101"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            {selectedEntry && (
              <Button variant="danger">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
            <Button>
              {selectedEntry ? 'Update Schedule' : 'Add Schedule'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};