import React from 'react';
import ColdRoomTracker from '../components/ColdRoomTracker';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {currentUser?.name}
          </p>
        </div>
        <div className="flex space-x-3">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Role: {currentUser?.role}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white shadow rounded-lg">
        <ColdRoomTracker />
      </div>
    </div>
  );
};

export default Dashboard; 