import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { mockColdRoomApi } from '../../services/mockApi';
import { ColdRoom, InventoryItem } from '../../types';

const InventoryManagement: React.FC = () => {
  const [coldRooms, setColdRooms] = useState<ColdRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColdRoom, setSelectedColdRoom] = useState<string>('all');
  const [inventoryType, setInventoryType] = useState<'incoming' | 'outgoing' | 'critical' | 'pickupSchedule'>('incoming');

  useEffect(() => {
    const fetchColdRooms = async () => {
      try {
        const data = await mockColdRoomApi.getAll();
        setColdRooms(data);
      } catch (error) {
        console.error('Failed to fetch cold rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColdRooms();
  }, []);

  const getInventoryItems = () => {
    if (selectedColdRoom === 'all') {
      return coldRooms.flatMap(room => room.inventory[inventoryType]);
    }
    const room = coldRooms.find(r => r.id === selectedColdRoom);
    return room ? room.inventory[inventoryType] : [];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <Button>Add New Item</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <select
                className="rounded-md border border-gray-300 p-2"
                value={selectedColdRoom}
                onChange={(e) => setSelectedColdRoom(e.target.value)}
              >
                <option value="all">All Cold Rooms</option>
                {coldRooms.map(room => (
                  <option key={room.id} value={room.id}>{room.location}</option>
                ))}
              </select>

              <select
                className="rounded-md border border-gray-300 p-2"
                value={inventoryType}
                onChange={(e) => setInventoryType(e.target.value as any)}
              >
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
                <option value="critical">Critical</option>
                <option value="pickupSchedule">Pickup Schedule</option>
              </select>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {inventoryType === 'incoming' ? 'Farmer' : 'Client'}
                    </th>
                    {inventoryType === 'critical' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days Left
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getInventoryItems().map((item: any, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.farmer || item.client || '-'}
                      </td>
                      {inventoryType === 'critical' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {item.daysLeft} days
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button className="mr-2">Edit</Button>
                        <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement; 