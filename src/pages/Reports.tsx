import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { dummyStudents, dummyStaff, dummyClasses } from '../data/dummyData';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'financial' | 'attendance' | 'administrative';
  icon: React.ComponentType<{ className?: string }>;
  parameters: string[];
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'student-list',
    name: 'Student List Report',
    description: 'Complete list of students with their details',
    category: 'administrative',
    icon: Users,
    parameters: ['class', 'section', 'status']
  },
  {
    id: 'attendance-summary',
    name: 'Attendance Summary',
    description: 'Monthly attendance report for students',
    category: 'attendance',
    icon: Calendar,
    parameters: ['class', 'month', 'year']
  },
  {
    id: 'fee-collection',
    name: 'Fee Collection Report',
    description: 'Fee collection status and pending dues',
    category: 'financial',
    icon: DollarSign,
    parameters: ['month', 'year', 'class']
  },
  {
    id: 'exam-results',
    name: 'Exam Results Report',
    description: 'Student performance and grade analysis',
    category: 'academic',
    icon: BarChart3,
    parameters: ['exam', 'class', 'subject']
  },
  {
    id: 'staff-report',
    name: 'Staff Report',
    description: 'Staff details and salary information',
    category: 'administrative',
    icon: Users,
    parameters: ['designation', 'status']
  },
  {
    id: 'class-strength',
    name: 'Class Strength Report',
    description: 'Student distribution across classes',
    category: 'administrative',
    icon: PieChart,
    parameters: ['academic_year']
  },
  {
    id: 'defaulters-list',
    name: 'Fee Defaulters List',
    description: 'Students with pending fee payments',
    category: 'financial',
    icon: TrendingUp,
    parameters: ['months_overdue', 'class']
  },
  {
    id: 'performance-analysis',
    name: 'Performance Analysis',
    description: 'Academic performance trends and statistics',
    category: 'academic',
    icon: BarChart3,
    parameters: ['class', 'subject', 'term']
  }
];

export const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null);
  const [reportParameters, setReportParameters] = useState<{ [key: string]: string }>({});
  const [generatedReports, setGeneratedReports] = useState<any[]>([]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'academic', label: 'Academic Reports' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'attendance', label: 'Attendance Reports' },
    { value: 'administrative', label: 'Administrative Reports' }
  ];

  const filteredReports = selectedCategory 
    ? reportTemplates.filter(report => report.category === selectedCategory)
    : reportTemplates;

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      attendance: 'bg-yellow-100 text-yellow-800',
      administrative: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return BarChart3;
      case 'financial': return DollarSign;
      case 'attendance': return Calendar;
      case 'administrative': return Users;
      default: return FileText;
    }
  };

  const handleGenerateReport = () => {
    if (!selectedReport) return;

    const newReport = {
      id: Date.now().toString(),
      template: selectedReport,
      parameters: { ...reportParameters },
      generatedAt: new Date().toISOString(),
      status: 'completed'
    };

    setGeneratedReports(prev => [newReport, ...prev]);
    setSelectedReport(null);
    setReportParameters({});
  };

  const getParameterOptions = (parameter: string) => {
    switch (parameter) {
      case 'class':
        return dummyClasses.map(cls => ({ value: cls.name, label: cls.name }));
      case 'section':
        return [
          { value: 'A', label: 'Section A' },
          { value: 'B', label: 'Section B' },
          { value: 'C', label: 'Section C' }
        ];
      case 'status':
        return [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ];
      case 'month':
        return [
          { value: '1', label: 'January' },
          { value: '2', label: 'February' },
          { value: '3', label: 'March' },
          { value: '4', label: 'April' },
          { value: '5', label: 'May' },
          { value: '6', label: 'June' },
          { value: '7', label: 'July' },
          { value: '8', label: 'August' },
          { value: '9', label: 'September' },
          { value: '10', label: 'October' },
          { value: '11', label: 'November' },
          { value: '12', label: 'December' }
        ];
      case 'year':
        return [
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' }
        ];
      case 'designation':
        return [
          { value: 'teacher', label: 'Teacher' },
          { value: 'principal', label: 'Principal' },
          { value: 'admin', label: 'Admin Staff' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download various school reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Report History
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{dummyStudents.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{dummyStaff.length}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{dummyClasses.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">{generatedReports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter */}
          <Card>
            <Select
              label="Filter by Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories}
            />
          </Card>

          {/* Report Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map((report) => {
              const IconComponent = report.icon;
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(report.category)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge variant="secondary" className="mt-1 capitalize">
                            {report.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{report.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {report.parameters.length} parameters
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Report Generation Panel */}
        <div className="space-y-6">
          {selectedReport ? (
            <Card>
              <CardHeader>
                <CardTitle>Generate Report</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">{selectedReport.name}</h4>
                  <p className="text-sm text-blue-700 mt-1">{selectedReport.description}</p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">Report Parameters</h5>
                  {selectedReport.parameters.map((parameter) => (
                    <div key={parameter}>
                      {parameter === 'year' || parameter === 'academic_year' ? (
                        <Input
                          label={parameter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          type="number"
                          value={reportParameters[parameter] || ''}
                          onChange={(e) => setReportParameters(prev => ({
                            ...prev,
                            [parameter]: e.target.value
                          }))}
                          placeholder="Enter year"
                        />
                      ) : (
                        <Select
                          label={parameter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          value={reportParameters[parameter] || ''}
                          onChange={(e) => setReportParameters(prev => ({
                            ...prev,
                            [parameter]: e.target.value
                          }))}
                          options={[
                            { value: '', label: `Select ${parameter}` },
                            ...getParameterOptions(parameter)
                          ]}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={handleGenerateReport}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedReport(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report</h3>
                <p className="text-gray-600">Choose a report template to get started</p>
              </div>
            </Card>
          )}

          {/* Recent Reports */}
          {generatedReports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {generatedReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.template.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(report.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};