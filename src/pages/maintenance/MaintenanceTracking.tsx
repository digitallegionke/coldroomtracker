import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';
import { mockMaintenanceApi } from '../../services/mockApi';
import { MaintenanceRecord } from '../../types';

const MaintenanceTracking: React.FC = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'scheduled' | 'completed' | 'overdue'>('all');

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        const data = await mockMaintenanceApi.getAll();
        setMaintenanceRecords(data);
      } catch (error) {
        console.error('Failed to fetch maintenance records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRecords();
  }, []);

  const getFilteredRecords = () => {
    if (filter === 'all') return maintenanceRecords;
    return maintenanceRecords.filter(record => record.status === filter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Maintenance Tracking</h1>
        <Button>Schedule Maintenance</Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['all', 'pending', 'scheduled', 'completed', 'overdue'].map((status) => (
          <Card 
            key={status}
            className={`cursor-pointer ${filter === status ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setFilter(status as any)}
          >
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 capitalize">{status}</div>
              <div className="text-2xl font-bold mt-1">
                {status === 'all' 
                  ? maintenanceRecords.length
                  : maintenanceRecords.filter(r => r.status === status).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getFilteredRecords().map((record) => (
              <div
                key={record.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.description}</h3>
                    <p className="text-sm text-gray-500">
                      Scheduled: {record.scheduledDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Technician:</span> {record.technician || 'Not assigned'}
                  </div>
                  {record.completedDate && (
                    <div>
                      <span className="font-medium">Completed:</span> {record.completedDate.toLocaleDateString()}
                    </div>
                  )}
                </div>

                {record.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> {record.notes}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="text-sm">Update Status</Button>
                  <Button className="text-sm">Add Notes</Button>
                  {record.status !== 'completed' && (
                    <Button className="text-sm bg-green-600 hover:bg-green-700">
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceTracking; 