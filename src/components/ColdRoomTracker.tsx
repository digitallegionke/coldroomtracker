import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

interface InventoryItem {
  date: string;
  item: string;
  quantity: string;
  farmer?: string;
  client?: string;
}

interface CriticalItem {
  item: string;
  quantity: string;
  expiryDate: string;
  daysLeft: number;
}

interface ColdRoom {
  id: number;
  location: string;
  totalCapacity: string;
  usedCapacity: string;
  unit: string;
  temperature: string;
  lastChecked: string;
  status: string;
  maintenanceNeeded: boolean;
  nextMaintenance: string;
  inventory: {
    incoming: InventoryItem[];
    outgoing: InventoryItem[];
    critical: CriticalItem[];
    pickupSchedule: InventoryItem[];
  };
}

interface DetailModalProps {
  room: ColdRoom;
  onClose: () => void;
}

const ColdRoomTracker: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ColdRoom | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for coldroom inventory with extended details
  const mockData: ColdRoom[] = [
    {
      id: 1,
      location: 'Meru Coldroom',
      totalCapacity: '5000',
      usedCapacity: '3200',
      unit: 'kg',
      temperature: '4',
      lastChecked: '2025-02-04 08:00',
      status: 'Operational',
      maintenanceNeeded: false,
      nextMaintenance: '2025-02-10',
      inventory: {
        incoming: [
          { date: '2025-02-04', item: 'Potatoes', quantity: '1000kg', farmer: 'John Mutua' },
          { date: '2025-02-04', item: 'Carrots', quantity: '500kg', farmer: 'Mary Wanjiku' }
        ],
        outgoing: [
          { date: '2025-02-03', item: 'Potatoes', quantity: '300kg', client: 'Fresh Mart' },
          { date: '2025-02-03', item: 'Carrots', quantity: '200kg', client: 'Green Grocers' }
        ],
        critical: [
          { item: 'Potatoes', quantity: '200kg', expiryDate: '2025-02-07', daysLeft: 3 },
          { item: 'Carrots', quantity: '100kg', expiryDate: '2025-02-06', daysLeft: 2 }
        ],
        pickupSchedule: [
          { date: '2025-02-05', item: 'Potatoes', quantity: '500kg', client: 'Fresh Mart' },
          { date: '2025-02-06', item: 'Carrots', quantity: '300kg', client: 'Green Grocers' }
        ]
      }
    },
    {
      id: 2,
      location: 'Nakuru Coldroom',
      totalCapacity: '8000',
      usedCapacity: '6500',
      unit: 'kg',
      temperature: '3.5',
      lastChecked: '2025-02-04 08:30',
      status: 'Near Capacity',
      maintenanceNeeded: true,
      nextMaintenance: '2025-02-05',
      inventory: {
        incoming: [
          { date: '2025-02-04', item: 'Cabbages', quantity: '2000kg', farmer: 'Peter Kamau' }
        ],
        outgoing: [
          { date: '2025-02-03', item: 'Cabbages', quantity: '500kg', client: 'Super Market' }
        ],
        critical: [
          { item: 'Cabbages', quantity: '300kg', expiryDate: '2025-02-05', daysLeft: 1 }
        ],
        pickupSchedule: [
          { date: '2025-02-05', item: 'Cabbages', quantity: '1000kg', client: 'Fresh Foods Ltd' }
        ]
      }
    }
  ];

  const [coldrooms] = useState<ColdRoom[]>(mockData);
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800';
      case 'Near Capacity':
        return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityPercentage = (used: string, total: string): string => {
    return ((parseInt(used) / parseInt(total)) * 100).toFixed(1);
  };

  const handleCardClick = (room: ColdRoom): void => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const DetailModal: React.FC<DetailModalProps> = ({ room, onClose }) => {
    if (!room) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{room.location} Details</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {room.maintenanceNeeded && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Maintenance Required</AlertTitle>
                <AlertDescription className="text-red-700">
                  Scheduled maintenance due on {room.nextMaintenance}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Temperature</span>
                      <span className="font-semibold">{room.temperature}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Capacity Usage</span>
                      <span className="font-semibold">
                        {getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Checked</span>
                      <span className="font-semibold">{room.lastChecked}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Critical Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Critical Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {room.inventory.critical.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.item}</div>
                          <div className="text-sm text-gray-600">{item.quantity}</div>
                        </div>
                        <div className="text-red-600 text-sm">
                          Expires in {item.daysLeft} days
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Today's Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Incoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {room.inventory.incoming.map((item, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{item.item}</div>
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </div>
                        <div className="text-sm text-gray-600">
                          Farmer: {item.farmer}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Outgoing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {room.inventory.outgoing.map((item, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{item.item}</div>
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </div>
                        <div className="text-sm text-gray-600">
                          Client: {item.client}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pickup Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Pickups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Client</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {room.inventory.pickupSchedule.map((pickup, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2">{pickup.date}</td>
                          <td className="px-4 py-2">{pickup.item}</td>
                          <td className="px-4 py-2">{pickup.quantity}</td>
                          <td className="px-4 py-2">{pickup.client}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coldrooms.map(room => (
          <Card 
            key={room.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(room)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{room.location}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity Usage</span>
                    <span className="font-medium">
                      {getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="font-medium">{room.temperature}°C</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Last Check</div>
                    <div className="font-medium">{room.lastChecked}</div>
                  </div>
                </div>

                {room.inventory.critical.length > 0 && (
                  <Alert className="bg-red-50 border-red-200 mt-4">
                    <AlertTitle className="text-red-800">Critical Items</AlertTitle>
                    <AlertDescription className="text-red-700">
                      {room.inventory.critical.length} items near expiry
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showModal && selectedRoom && (
        <DetailModal
          room={selectedRoom}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ColdRoomTracker;
