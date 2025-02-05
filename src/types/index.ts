export type Unit = 'kg' | 'boxes' | 'crates';
export type ItemStatus = 'normal' | 'critical' | 'expiring';
export type MaintenanceStatus = 'pending' | 'scheduled' | 'completed' | 'overdue';
export type ColdRoomStatus = 'Operational' | 'Near Capacity' | 'Maintenance' | 'Critical';
export type NotificationType = 'inventory' | 'maintenance' | 'expiry' | 'capacity';
export type UserRole = 'admin' | 'manager' | 'operator' | 'viewer';

export interface InventoryItem {
  id: string;
  date?: string;
  item: string;
  quantity: number;
  unit: Unit;
  farmer?: string;
  client?: string;
  expiryDate?: Date;
  status: ItemStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  coldRoomId: string;
  status: MaintenanceStatus;
  scheduledDate: Date;
  completedDate?: Date;
  description: string;
  technician?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColdRoom {
  id: string;
  location: string;
  totalCapacity: number;
  usedCapacity: number;
  unit: Unit;
  temperature: number;
  humidity?: number;
  lastChecked: Date;
  status: ColdRoomStatus;
  maintenanceStatus: MaintenanceStatus;
  nextMaintenance?: Date;
  createdAt: Date;
  updatedAt: Date;
  inventory: {
    incoming: InventoryItem[];
    outgoing: InventoryItem[];
    critical: InventoryItem[];
    pickupSchedule: InventoryItem[];
  };
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  severity: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  coldRoomId?: string;
  inventoryItemId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  type: 'inventory' | 'maintenance' | 'performance';
  format: 'csv' | 'pdf' | 'excel';
  dateRange: {
    start: Date;
    end: Date;
  };
  generatedBy: string;
  createdAt: Date;
  downloadUrl?: string;
} 