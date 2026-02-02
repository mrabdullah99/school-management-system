import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  UserCheck, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  FileText, 
  Bell,
  BookOpen,
  ClipboardList,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { clsx } from 'clsx';

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: Home, path: '/', roles: ['admin', 'teacher', 'accountant'] },
  { name: 'Students', icon: Users, path: '/students', roles: ['admin', 'teacher'] },
  { name: 'Staff', icon: UserCheck, path: '/staff', roles: ['admin'] },
  { name: 'Classes', icon: GraduationCap, path: '/classes', roles: ['admin', 'teacher'] },
  { name: 'Attendance', icon: ClipboardList, path: '/attendance', roles: ['admin', 'teacher'] },
  { name: 'Fees', icon: DollarSign, path: '/fees', roles: ['admin', 'accountant'] },
  { name: 'Exams', icon: BookOpen, path: '/exams', roles: ['admin', 'teacher'] },
  { name: 'Timetable', icon: Calendar, path: '/timetable', roles: ['admin', 'teacher'] },
  { name: 'Notices', icon: Bell, path: '/notices', roles: ['admin'] },
  { name: 'Reports', icon: FileText, path: '/reports', roles: ['admin', 'teacher', 'accountant'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
        'lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">School MS</h1>
          </div>

          {/* User Profile */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <NavLink
              to="/settings"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => clsx(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </NavLink>
            
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};