export type RoomStatus = 'Detected' | 'Needs Review' | 'Confirmed' | 'Corrected' | 'Rejected';

export interface Vertex {
  x: number;
  y: number;
}

export interface RoomEntity {
  id: string; // e.g. "room-a101"
  code: string; // e.g. "Room A101"
  name: string; // e.g. "Executive Suite"
  floor: string; // e.g. "Floor 03"
  building: string; // e.g. "Tower A"
  floorArea: number; // m²
  perimeter: number; // m
  wallHeight: number; // m (default 3.2m)
  grossWallArea: number; // m²
  doorDeductions: number; // m²
  windowDeductions: number; // m²
  netPaintArea: number; // m²
  paintSystem: string; // e.g. "Dulux EasyClean Interior (1 Primer + 2 Coats)"
  primerCoats: number;
  topCoats: number;
  unitRate: number; // VND per m²
  totalCost: number; // VND
  confidence: number; // 0 - 100%
  status: RoomStatus;
  sourceHandle: string; // e.g. "LWPOLYLINE #8F31"
  layer: string; // e.g. "A-WALL"
  vertices: Vertex[];
  issueDescription?: string;
  aiExplanation?: string;
  aiSuggestion?: {
    text: string;
    suggestedVertices: Vertex[];
    deltaArea: number;
  };
}

export interface DoorEntity {
  id: string;
  code: string; // e.g. "D021"
  type: string; // e.g. "Single Flush Door 900x2100"
  width: number;
  height: number;
  deductionArea: number; // m²
  x: number;
  y: number;
  angle: number;
  confidence: number;
  status: 'Detected' | 'Needs Review' | 'Verified';
}

export interface DxfLayer {
  id: string;
  name: string;
  color: string;
  count: number;
  visible: boolean;
}

export interface ProjectInfo {
  id: string;
  name: string;
  building: string;
  floorsCount: number;
  currentFloor: string;
  fileName: string;
  fileSize: string;
  status: 'Draft' | 'Processing' | 'Review Required' | 'Approved' | 'Estimating' | 'Completed';
  lastModified: string;
  engineer: string;
  totalArea: number;
  totalCost: number;
  avgConfidence: number;
  issuesCount: number;
  drawingsCount?: number;
  progressPct?: number;
  floorsInfo?: string;
}

export interface CalculationRules {
  defaultWallHeight: number; // meters
  deductDoors: boolean;
  deductWindows: boolean;
  wasteFactorPct: number; // e.g. 5%
  primerCoats: number;
  topCoats: number;
  defaultUnitRateInterior: number; // VND/m²
  defaultUnitRateExterior: number; // VND/m²
  currency: 'VND' | 'USD';
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  detail: string;
}

export interface EstimateVersion {
  version: string;
  title: string;
  date: string;
  author: string;
  totalArea: number;
  totalCost: number;
  status: 'Draft' | 'In Review' | 'Approved';
}

export type WorkspaceTheme = 'steel-blue' | 'sage-green' | 'muted-sand';

