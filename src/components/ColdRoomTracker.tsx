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

const ColdRoomTracker = () => {
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

  const [coldrooms, setColdrooms] = useState<ColdRoom[]>(mockData);
  
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

            {/* Maintenance Alert */}
            {room.maintenanceNeeded && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Maintenance Required</AlertTitle>
                <AlertDescription className="text-red-700">
                  Scheduled maintenance due on {room.nextMaintenance}
                </AlertDescription>
              </Alert>
            )}

            {/* Critical Items */}
            {room.inventory.critical.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Critical Items - Expiring Soon</h3>
                <div className="space-y-2">
                  {room.inventory.critical.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{item.item} - {item.quantity}</span>
                      <span className="text-red-600">Expires in {item.daysLeft} days</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today's Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Today's Incoming</h3>
                <div className="space-y-2">
                  {room.inventory.incoming.map((item, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded">
                      <div>{item.item} - {item.quantity}</div>
                      <div className="text-sm text-gray-600">From: {item.farmer}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Today's Outgoing</h3>
                <div className="space-y-2">
                  {room.inventory.outgoing.map((item, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded">
                      <div>{item.item} - {item.quantity}</div>
                      <div className="text-sm text-gray-600">To: {item.client}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Pickups</h3>
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

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Coldroom Status Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coldrooms.map(room => (
                <Card 
                  key={room.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCardClick(room)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{room.location}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Capacity Usage:</span>
                          <span>{getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${getCapacityPercentage(room.usedCapacity, room.totalCapacity)}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Temperature: {room.temperature}°C</div>
                          <div>Last Check: {room.lastChecked}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

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