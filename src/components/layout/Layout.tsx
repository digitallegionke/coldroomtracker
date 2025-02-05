import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FiHome,
  FiBox,
  FiTool,
  FiFileText,
  FiSettings,
  FiBell,
  FiUser,
  FiLogOut
} from 'react-icons/fi';

const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: FiHome },
    { name: 'Inventory', href: '/inventory', icon: FiBox },
    { name: 'Maintenance', href: '/maintenance', icon: FiTool },
    { name: 'Reports', href: '/reports', icon: FiFileText },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Coldroom Tracker
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FiBell className="h-6 w-6" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                    {/* Notification items would go here */}
                    <div className="px-4 py-2 text-sm text-gray-700">
                      No new notifications
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-gray-500" />
                    </div>
                  </button>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">
                      {currentUser?.name}
                    </div>
                    <div className="text-xs text-gray-500">{currentUser?.role}</div>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FiLogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 