import { mockUsers, mockColdRooms, mockMaintenanceRecords, mockReports } from './mockData';
import { User, ColdRoom, MaintenanceRecord, Report, InventoryItem } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth
export const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return user;
  },
  
  register: async (email: string, password: string, name: string, role: string): Promise<User> => {
    await delay(500);
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role: role as any,
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }
};

// Cold Rooms
export const mockColdRoomApi = {
  getAll: async (): Promise<ColdRoom[]> => {
    await delay(500);
    return mockColdRooms;
  },

  getById: async (id: string): Promise<ColdRoom> => {
    await delay(300);
    const coldRoom = mockColdRooms.find(cr => cr.id === id);
    if (!coldRoom) throw new Error('Cold room not found');
    return coldRoom;
  },

  update: async (id: string, data: Partial<ColdRoom>): Promise<ColdRoom> => {
    await delay(500);
    const index = mockColdRooms.findIndex(cr => cr.id === id);
    if (index === -1) throw new Error('Cold room not found');
    
    const { updatedAt, ...updateData } = data;
    mockColdRooms[index] = {
      ...mockColdRooms[index],
      ...updateData
    };
    return mockColdRooms[index];
  }
};

// Maintenance
export const mockMaintenanceApi = {
  getAll: async (): Promise<MaintenanceRecord[]> => {
    await delay(500);
    return mockMaintenanceRecords;
  },

  getByColdRoom: async (coldRoomId: string): Promise<MaintenanceRecord[]> => {
    await delay(300);
    return mockMaintenanceRecords.filter(mr => mr.coldRoomId === coldRoomId);
  },

  create: async (data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    await delay(500);
    const newRecord: MaintenanceRecord = {
      id: String(mockMaintenanceRecords.length + 1),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    } as MaintenanceRecord;
    mockMaintenanceRecords.push(newRecord);
    return newRecord;
  }
};

// Reports
export const mockReportApi = {
  getAll: async (): Promise<Report[]> => {
    await delay(500);
    return mockReports;
  },

  generate: async (type: 'inventory' | 'maintenance' | 'performance', format: 'csv' | 'pdf' | 'excel'): Promise<Report> => {
    await delay(1000);
    const newReport: Report = {
      id: String(mockReports.length + 1),
      type,
      format,
      dateRange: {
        start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end: new Date()
      },
      generatedBy: 'Current User',
      createdAt: new Date(),
      downloadUrl: '#'
    };
    mockReports.push(newReport);
    return newReport;
  }
}; 