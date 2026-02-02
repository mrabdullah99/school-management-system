import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Users, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { dummyClasses, Class } from '../data/dummyData';

export const Classes: React.FC = () => {
  const [classes] = useState<Class[]>(dummyClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacherInCharge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClass = (cls: Class) => {
    setSelectedClass(cls);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes & Sections</h1>
          <p className="text-gray-600">Manage classes, sections and their assignments</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search classes, sections or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cls.name} - {cls.section}
                  </h3>
                  <p className="text-gray-600">{cls.room}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewClass(cls)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Teacher In-Charge</span>
                  <span className="text-sm font-medium text-gray-900">{cls.teacherInCharge}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Students
                  </span>
                  <span className="text-sm font-medium text-gray-900">{cls.studentCount}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <Button size="sm" variant="outline" className="flex-1 mr-2">
                      <Users className="w-4 h-4 mr-1" />
                      View Students
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Timetable
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Class Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Class Details"
        size="lg"
      >
        {selectedClass && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">
                {selectedClass.name} - Section {selectedClass.section}
              </h3>
              <p className="text-blue-700">{selectedClass.room}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Teacher In-Charge</label>
                  <p className="text-gray-900 text-lg">{selectedClass.teacherInCharge}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Students</label>
                  <p className="text-gray-900 text-lg">{selectedClass.studentCount}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Classroom</label>
                  <p className="text-gray-900 text-lg">{selectedClass.room}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button>
                Edit Class
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Class Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Class"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Class Name" placeholder="e.g., Class 8" required />
            <Input label="Section" placeholder="e.g., A" required />
            <Input label="Room Number" placeholder="e.g., Room 101" required />
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select Teacher In-Charge</option>
              <option value="Ms. Fatima Sheikh">Ms. Fatima Sheikh</option>
              <option value="Mr. Ahmed Khan">Mr. Ahmed Khan</option>
              <option value="Dr. Sarah Ali">Dr. Sarah Ali</option>
            </select>
            <Input label="Maximum Students" type="number" placeholder="35" />
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              Add Class
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};