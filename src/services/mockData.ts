import { ColdRoom, User, MaintenanceRecord, InventoryItem, Report } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    permissions: ['all'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: '2',
    email: 'manager@example.com',
    name: 'Manager User',
    role: 'manager',
    permissions: ['read', 'write'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLogin: new Date()
  }
];

// Mock Cold Rooms
export const mockColdRooms: ColdRoom[] = [
  {
    id: '1',
    location: 'Meru Coldroom',
    totalCapacity: 5000,
    usedCapacity: 3200,
    unit: 'kg',
    temperature: 4,
    humidity: 85,
    lastChecked: new Date(),
    status: 'Operational',
    maintenanceStatus: 'completed',
    nextMaintenance: new Date('2024-03-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-05'),
    inventory: {
      incoming: [
        {
          id: '1',
          date: '2024-02-05',
          item: 'Potatoes',
          quantity: 1000,
          unit: 'kg',
          farmer: 'John Mutua',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      outgoing: [
        {
          id: '2',
          date: '2024-02-05',
          item: 'Carrots',
          quantity: 500,
          unit: 'kg',
          client: 'Fresh Mart',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      critical: [
        {
          id: '3',
          item: 'Tomatoes',
          quantity: 200,
          unit: 'kg',
          expiryDate: new Date('2024-02-10'),
          status: 'critical',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      pickupSchedule: [
        {
          id: '4',
          date: '2024-02-06',
          item: 'Potatoes',
          quantity: 800,
          unit: 'kg',
          client: 'Green Grocers',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    }
  },
  {
    id: '2',
    location: 'Nakuru Coldroom',
    totalCapacity: 8000,
    usedCapacity: 6500,
    unit: 'kg',
    temperature: 3.5,
    humidity: 82,
    lastChecked: new Date(),
    status: 'Near Capacity',
    maintenanceStatus: 'pending',
    nextMaintenance: new Date('2024-02-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-05'),
    inventory: {
      incoming: [
        {
          id: '5',
          date: '2024-02-05',
          item: 'Cabbages',
          quantity: 2000,
          unit: 'kg',
          farmer: 'Peter Kamau',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      outgoing: [
        {
          id: '6',
          date: '2024-02-05',
          item: 'Onions',
          quantity: 1000,
          unit: 'kg',
          client: 'Super Market',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      critical: [
        {
          id: '7',
          item: 'Cabbages',
          quantity: 300,
          unit: 'kg',
          expiryDate: new Date('2024-02-08'),
          status: 'critical',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      pickupSchedule: [
        {
          id: '8',
          date: '2024-02-07',
          item: 'Onions',
          quantity: 500,
          unit: 'kg',
          client: 'Fresh Foods Ltd',
          status: 'normal',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    }
  }
];

// Mock Maintenance Records
export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    coldRoomId: '1',
    status: 'completed',
    scheduledDate: new Date('2024-01-15'),
    completedDate: new Date('2024-01-15'),
    description: 'Regular maintenance check',
    technician: 'James Mwangi',
    notes: 'All systems working properly',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    coldRoomId: '2',
    status: 'pending',
    scheduledDate: new Date('2024-02-15'),
    description: 'Temperature system check',
    technician: 'David Kimani',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: '1',
    type: 'inventory',
    format: 'pdf',
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    },
    generatedBy: 'Admin User',
    createdAt: new Date('2024-02-01'),
    downloadUrl: '#'
  },
  {
    id: '2',
    type: 'maintenance',
    format: 'excel',
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    },
    generatedBy: 'Manager User',
    createdAt: new Date('2024-02-01'),
    downloadUrl: '#'
  }
]; 