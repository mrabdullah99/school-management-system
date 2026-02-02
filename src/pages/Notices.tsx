import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Calendar, FileText, AlertTriangle, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { dummyNotices, Notice } from '../data/dummyData';

export const Notices: React.FC = () => {
  const [notices] = useState<Notice[]>(dummyNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5" />;
      case 'exam': return <FileText className="w-5 h-5" />;
      case 'holiday': return <Calendar className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'urgent': return 'danger';
      case 'exam': return 'warning';
      case 'holiday': return 'success';
      default: return 'primary';
    }
  };

  const getAudienceIcon = (audience: string) => {
    return <Users className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices & Announcements</h1>
          <p className="text-gray-600">Manage school notices and events</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Notice
        </Button>
      </div>

      {/* Notice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Notices</p>
              <p className="text-2xl font-bold text-gray-900">{notices.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">
                {notices.filter(n => n.type === 'urgent').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Holidays</p>
              <p className="text-2xl font-bold text-green-600">
                {notices.filter(n => n.type === 'holiday').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {notices.filter(n => new Date(n.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(notice.type)}
                    <Badge variant={getTypeVariant(notice.type)}>
                      {notice.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {notice.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">
                {notice.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(notice.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getAudienceIcon(notice.targetAudience)}
                  <span className="capitalize">{notice.targetAudience}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewNotice(notice)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="danger">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Notice Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Notice Details"
        size="lg"
      >
        {selectedNotice && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex items-center space-x-3 mb-3">
                {getTypeIcon(selectedNotice.type)}
                <Badge variant={getTypeVariant(selectedNotice.type)}>
                  {selectedNotice.type}
                </Badge>
                <Badge variant="secondary">
                  {selectedNotice.targetAudience}
                </Badge>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{selectedNotice.title}</h2>
              <p className="text-gray-500 mt-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {new Date(selectedNotice.date).toLocaleDateString()}
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {selectedNotice.description}
              </p>
            </div>

            {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-2">
                  {selectedNotice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{attachment}</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button>
                Edit Notice
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Notice Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Notice"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Input label="Notice Title" required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Notice Type"
                options={[
                  { value: 'general', label: 'General' },
                  { value: 'urgent', label: 'Urgent' },
                  { value: 'holiday', label: 'Holiday' },
                  { value: 'exam', label: 'Exam Related' }
                ]}
              />
              <Select
                label="Target Audience"
                options={[
                  { value: 'all', label: 'Everyone' },
                  { value: 'students', label: 'Students' },
                  { value: 'parents', label: 'Parents' },
                  { value: 'staff', label: 'Staff Only' }
                ]}
              />
            </div>

            <Textarea
              label="Description"
              rows={5}
              placeholder="Enter the notice description..."
              required
            />

            <Input
              label="Notice Date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload files or drag and drop</p>
                <input type="file" multiple className="hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              Create Notice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};