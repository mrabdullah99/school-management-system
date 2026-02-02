import React from 'react';
import { Users, UserCheck, GraduationCap, DollarSign, ClipboardList, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { dummyStudents, dummyStaff, dummyClasses } from '../data/dummyData';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => {
  const colorClasses = {
    blue: 'bg-blue-600 text-blue-600',
    green: 'bg-green-600 text-green-600',
    yellow: 'bg-yellow-600 text-yellow-600',
    red: 'bg-red-600 text-red-600',
    purple: 'bg-purple-600 text-purple-600',
    indigo: 'bg-indigo-600 text-indigo-600'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${colorClasses[color]}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[1]}`} />
        </div>
      </div>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: dummyStudents.length.toString(), icon: Users, color: 'blue' as const, change: '+12 this month' },
          { title: 'Total Staff', value: dummyStaff.length.toString(), icon: UserCheck, color: 'green' as const, change: '+2 this month' },
          { title: 'Total Classes', value: dummyClasses.length.toString(), icon: GraduationCap, color: 'purple' as const },
          { title: 'Monthly Revenue', value: '₹4,50,000', icon: DollarSign, color: 'yellow' as const, change: '+8% vs last month' },
          { title: 'Attendance Rate', value: '94.5%', icon: ClipboardList, color: 'indigo' as const, change: '+2.3% this week' },
          { title: 'Pending Fees', value: '₹75,000', icon: AlertTriangle, color: 'red' as const }
        ];
      case 'teacher':
        return [
          { title: 'My Classes', value: '5', icon: GraduationCap, color: 'blue' as const },
          { title: 'Total Students', value: '125', icon: Users, color: 'green' as const },
          { title: 'Attendance Today', value: '118/125', icon: ClipboardList, color: 'purple' as const },
          { title: 'Pending Exams', value: '3', icon: BookOpen, color: 'yellow' as const }
        ];
      case 'accountant':
        return [
          { title: 'Monthly Revenue', value: '₹4,50,000', icon: DollarSign, color: 'green' as const, change: '+8% vs last month' },
          { title: 'Pending Fees', value: '₹75,000', icon: AlertTriangle, color: 'red' as const },
          { title: 'Payments Today', value: '₹25,000', icon: TrendingUp, color: 'blue' as const },
          { title: 'Fee Defaulters', value: '12', icon: Users, color: 'yellow' as const }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening in your school today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {dummyStudents.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center space-x-3">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.class} - {student.section}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  student.feeStatus === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : student.feeStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {student.feeStatus}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Parent-Teacher Meeting</p>
                <p className="text-xs text-gray-500">December 15, 2024</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Science Fair</p>
                <p className="text-xs text-gray-500">December 18, 2024</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Winter Break Starts</p>
                <p className="text-xs text-gray-500">December 20, 2024</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Final Exams</p>
                <p className="text-xs text-gray-500">January 15, 2025</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};