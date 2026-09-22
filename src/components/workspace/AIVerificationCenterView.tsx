import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Slash,
  MousePointer,
  Hand,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
  Search,
  Eye,
  X,
  Layers,
  Sparkles,
  Info,
  ArrowRight,
  RefreshCw,
  Check,
  Edit3,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { RoomEntity, ProjectInfo } from '../../types';
import { useWorkspaceTheme } from '../../data/ThemeContext';

interface AIVerificationCenterViewProps {
  project?: ProjectInfo;
  rooms?: RoomEntity[];
  onNavigateToTakeoff?: () => void;
  onBackToAnalysis?: () => void;
  onOpenAuditLog?: () => void;
}

export type IssueFilter = 'all' | 'need_check' | 'missing_info' | 'excluded';
export type TableTab = 'objects' | 'summary_room' | 'summary_type' | 'audit_log';
export type InspectorTab = 'issues' | 'object_info' | 'notes';

interface IssueItem {
  id: string;
  objectId: string;
  type: 'Phòng' | 'Tường' | 'Cửa' | 'Cửa sổ';
  code: string;
  title: string;
  description: string;
  status: 'need_check' | 'missing_info' | 'excluded';
  tag: string;
  details?: {
    currentVal?: string;
    expectedVal?: string;
    suggestion?: string;
  };
}

interface CadObjectRow {
  id: string;
  type: 'Phòng' | 'Tường' | 'Cửa' | 'Cửa sổ';
  typeColor: string;
  name: string;
  dimension: string;
  status: 'Đã xác minh' | 'Cần kiểm tra' | 'Thiếu thông tin' | 'Loại trừ';
  statusType: 'verified' | 'need_check' | 'missing_info' | 'excluded';
  issue: string;
  note: string;
  highlighted?: boolean;
}

const INITIAL_ISSUES: IssueItem[] = [
  {
    id: 'issue-1',
    objectId: 'R03',
    type: 'Phòng',
    code: 'R03',
    title: 'Room 03 – Open Boundary',
    description: 'Đường bao phòng chưa khép kín.',
    status: 'need_check',
    tag: 'Phòng • R03',
    details: {
      currentVal: 'Khe hở góc Đông-Bắc: 18mm',
      expectedVal: 'Đường bao đa giác đóng kín 100%',
      suggestion: 'Tự động bắt điểm (Snap to endpoint) tới tường Wall 14 lân cận.'
    }
  },
  {
    id: 'issue-2',
    objectId: 'W12',
    type: 'Tường',
    code: 'W12',
    title: 'Wall 12 – Missing Height',
    description: 'Chưa có thông tin chiều cao tường.',
    status: 'missing_info',
    tag: 'Tường • W12',
    details: {
      currentVal: 'Chiều cao = 0.0m (Không có text elevation)',
      expectedVal: 'Chiều cao tầng thông thủy: 3.000m',
      suggestion: 'Áp dụng chiều cao mặc định của tầng: 3.0m.'
    }
  },
  {
    id: 'issue-3',
    objectId: 'D08',
    type: 'Cửa',
    code: 'D08',
    title: 'Door 08 – Uncertain Type',
    description: 'Không xác định được loại cửa (đi/cửa sổ).',
    status: 'need_check',
    tag: 'Cửa • D08',
    details: {
      currentVal: 'Ký hiệu nét mở 1 cánh (Layer A-DOOR)',
      expectedVal: 'Xác định rõ Cửa đi hay Cửa thông gió',
      suggestion: 'Gán loại: Cửa đi đơn 900x2200mm.'
    }
  },
  {
    id: 'issue-4',
    objectId: 'R07',
    type: 'Phòng',
    code: 'R07',
    title: 'Room 07 – Small Area',
    description: 'Diện tích nhỏ bất thường (0.9 m²).',
    status: 'need_check',
    tag: 'Phòng • R07',
    details: {
      currentVal: 'Diện tích: 0.9 m²',
      expectedVal: 'Phòng tối thiểu: 2.5 m²',
      suggestion: 'Kiểm tra xem đây là Hộp kỹ thuật (Shaft) hay WC phụ.'
    }
  },
  {
    id: 'issue-5',
    objectId: 'W25',
    type: 'Tường',
    code: 'W25',
    title: 'Wall 25 – Not Closed at End',
    description: 'Đầu tường không khép kín.',
    status: 'missing_info',
    tag: 'Tường • W25',
    details: {
      currentVal: 'Đầu mút tự do hở 45mm',
      expectedVal: 'Tiếp giáp với dầm hoặc cột kết cấu',
      suggestion: 'Kéo dài giao cắt tới Cột C4.'
    }
  },
  {
    id: 'issue-6',
    objectId: 'W03',
    type: 'Cửa sổ',
    code: 'W03',
    title: 'Window 03 – No Dimension',
    description: 'Thiếu kích thước cửa sổ.',
    status: 'missing_info',
    tag: 'Cửa sổ • W03',
    details: {
      currentVal: 'Block chưa có thuộc tính Width x Height',
      expectedVal: '1800 x 1500 mm',
      suggestion: 'Đo trực tiếp từ hình học CAD: Rộng 1.8m, Cao 1.5m.'
    }
  },
  {
    id: 'issue-7',
    objectId: 'R09',
    type: 'Phòng',
    code: 'R09',
    title: 'Room 09 – Duplicate Label',
    description: 'Trùng tên nhãn phòng với tầng lửng.',
    status: 'need_check',
    tag: 'Phòng • R09',
    details: {
      currentVal: 'Nhãn "KHO TƯ LIỆU"',
      expectedVal: 'KHO TƯ LIỆU - T01',
      suggestion: 'Tự động thêm hậu tố phân tầng.'
    }
  },
  {
    id: 'issue-8',
    objectId: 'D14',
    type: 'Cửa',
    code: 'D14',
    title: 'Door 14 – Swing Direction Blocked',
    description: 'Góc mở cửa cắt qua hộp cứu hỏa.',
    status: 'need_check',
    tag: 'Cửa • D14',
    details: {
      currentVal: 'Góc xoay 90 độ',
      expectedVal: 'Không xung đột thiết bị gắn tường',
      suggestion: 'Đổi hướng mở cửa sang bản lề đối diện.'
    }
  },
  {
    id: 'issue-9',
    objectId: 'X01',
    type: 'Phòng',
    code: 'X01',
    title: 'Void 01 – Exterior Balcony',
    description: 'Khu vực ban công ngoài trời được đánh dấu loại trừ.',
    status: 'excluded',
    tag: 'Phòng • X01',
    details: {
      currentVal: 'Ban công ngoài trời 4.5 m²',
      expectedVal: 'Không tính vào khối lượng sơn nội thất',
      suggestion: 'Đã cấu hình loại trừ theo quy tắc dự án.'
    }
  },
  {
    id: 'issue-10',
    objectId: 'W31',
    type: 'Tường',
    code: 'W31',
    title: 'Wall 31 – Glass Partition',
    description: 'Vách kính cố định không tính sơn.',
    status: 'need_check',
    tag: 'Tường • W31',
    details: {
      currentVal: 'Layer A-GLAZ',
      expectedVal: 'Khấu trừ 100% diện tích sơn tường',
      suggestion: 'Xác nhận trừ sơn vách kính.'
    }
  },
  {
    id: 'issue-11',
    objectId: 'W18',
    type: 'Tường',
    code: 'W18',
    title: 'Wall 18 – Missing Finish Code',
    description: 'Chưa có mã màu hoặc loại sơn chỉ định.',
    status: 'missing_info',
    tag: 'Tường • W18',
    details: {
      currentVal: 'Mã vật liệu: NULL',
      expectedVal: 'Dulux EasyClean A991',
      suggestion: 'Áp dụng hệ sơn mặc định của phòng.'
    }
  },
  {
    id: 'issue-12',
    objectId: 'R05',
    type: 'Phòng',
    code: 'R05',
    title: 'Room 05 – Skirting Deduction',
    description: 'Cần xác nhận có trừ len chân tường hay không.',
    status: 'need_check',
    tag: 'Phòng • R05',
    details: {
      currentVal: 'Len đá cao 100mm',
      expectedVal: 'Khấu trừ 0.1m x Chu vi',
      suggestion: 'Áp dụng quy chuẩn len chân tường.'
    }
  },
  {
    id: 'issue-13',
    objectId: 'D02',
    type: 'Cửa',
    code: 'D02',
    title: 'Door 02 – Arch Head Doorway',
    description: 'Cửa vòm cung tính toán diện tích uốn cong.',
    status: 'need_check',
    tag: 'Cửa • D02',
    details: {
      currentVal: 'Cung tròn bán kính R=450mm',
      expectedVal: 'Khấu trừ diện tích hình vòm',
      suggestion: 'Đã tự động nội suy diện tích vòm.'
    }
  }
];

const INITIAL_ROWS: CadObjectRow[] = [
  {
    id: 'R03',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 03',
    dimension: '22.1 m²',
    status: 'Cần kiểm tra',
    statusType: 'need_check',
    issue: 'Đường bao chưa khép kín',
    note: '–',
    highlighted: true
  },
  {
    id: 'W12',
    type: 'Tường',
    typeColor: 'bg-[#06b6d4]',
    name: 'Wall 12',
    dimension: 'Dài 5.0 m',
    status: 'Thiếu thông tin',
    statusType: 'missing_info',
    issue: 'Chưa có chiều cao tường',
    note: '–'
  },
  {
    id: 'D08',
    type: 'Cửa',
    typeColor: 'bg-[#f97316]',
    name: 'Door 08',
    dimension: '0.9 × 2.2 m',
    status: 'Cần kiểm tra',
    statusType: 'need_check',
    issue: 'Không xác định loại cửa',
    note: '–'
  },
  {
    id: 'R01',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 01',
    dimension: '25.8 m²',
    status: 'Đã xác minh',
    statusType: 'verified',
    issue: '–',
    note: '–'
  },
  {
    id: 'R02',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 02',
    dimension: '18.4 m²',
    status: 'Đã xác minh',
    statusType: 'verified',
    issue: '–',
    note: '–'
  },
  {
    id: 'R04',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 04',
    dimension: '16.2 m²',
    status: 'Đã xác minh',
    statusType: 'verified',
    issue: '–',
    note: '–'
  },
  {
    id: 'R05',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 05',
    dimension: '12.6 m²',
    status: 'Cần kiểm tra',
    statusType: 'need_check',
    issue: 'Xác nhận len chân tường',
    note: '–'
  },
  {
    id: 'R06',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 06',
    dimension: '20.3 m²',
    status: 'Đã xác minh',
    statusType: 'verified',
    issue: '–',
    note: '–'
  },
  {
    id: 'W25',
    type: 'Tường',
    typeColor: 'bg-[#06b6d4]',
    name: 'Wall 25',
    dimension: 'Dài 3.8 m',
    status: 'Thiếu thông tin',
    statusType: 'missing_info',
    issue: 'Đầu tường không khép kín',
    note: '–'
  },
  {
    id: 'W03',
    type: 'Cửa sổ',
    typeColor: 'bg-[#a855f7]',
    name: 'Window 03',
    dimension: '1.8 × 1.5 m',
    status: 'Thiếu thông tin',
    statusType: 'missing_info',
    issue: 'Thiếu kích thước cửa sổ',
    note: '–'
  },
  {
    id: 'R07',
    type: 'Phòng',
    typeColor: 'bg-[#0284c7]',
    name: 'Room 07',
    dimension: '0.9 m²',
    status: 'Cần kiểm tra',
    statusType: 'need_check',
    issue: 'Diện tích nhỏ bất thường (0.9 m²)',
    note: '–'
  },
  {
    id: 'X01',
    type: 'Phòng',
    typeColor: 'bg-[#64748b]',
    name: 'Void 01',
    dimension: '4.5 m²',
    status: 'Loại trừ',
    statusType: 'excluded',
    issue: 'Ban công ngoài trời',
    note: 'Đã loại trừ'
  }
];

export const AIVerificationCenterView: React.FC<AIVerificationCenterViewProps> = ({
  project,
  onNavigateToTakeoff,
  onBackToAnalysis,
}) => {
  const { theme, themeConfig } = useWorkspaceTheme();

  // CAD Viewer Tools
  const [activeTool, setActiveTool] = useState<'pointer' | 'hand' | 'zoomIn' | 'zoomOut' | 'fit'>('pointer');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('Tầng 01');
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  // Floating Layer Widget Toggle
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [layersFilter, setLayersFilter] = useState({
    all: true,
    rooms: true,
    walls: true,
    doors: true,
    windows: true,
  });
  const [statusFilter, setStatusFilter] = useState({
    verified: true,
    needCheck: true,
    missingInfo: true,
    excluded: true,
  });

  // Highlighted / Selected Room
  const [selectedObjectId, setSelectedObjectId] = useState<string>('R03');
  const [showTooltip, setShowTooltip] = useState(true);

  // Mouse Coordinates for CAD
  const [coords, setCoords] = useState({ x: 12450, y: 8320 });

  // Inspector Sidebar
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('issues');
  const [issueFilter, setIssueFilter] = useState<IssueFilter>('all');
  const [issues, setIssues] = useState<IssueItem[]>(INITIAL_ISSUES);

  // Bottom Table State
  const [tableTab, setTableTab] = useState<TableTab>('objects');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [tableRows, setTableRows] = useState<CadObjectRow[]>(INITIAL_ROWS);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);
  const [isAllFixed, setIsAllFixed] = useState(false);

  // Filtered Issues
  const filteredIssues = issues.filter((item) => {
    if (isAllFixed) return false;
    if (issueFilter === 'all') return true;
    return item.status === issueFilter;
  });

  // Filtered Table Rows
  const filteredRows = tableRows.filter((row) => {
    if (!searchTableQuery.trim()) return true;
    const q = searchTableQuery.toLowerCase();
    return (
      row.id.toLowerCase().includes(q) ||
      row.name.toLowerCase().includes(q) ||
      row.type.toLowerCase().includes(q) ||
      row.issue.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  });

  const selectedIssue = issues.find((i) => i.objectId === selectedObjectId) || issues[0];

  const handleFixIssue = (objectId: string) => {
    setIssues((prev) =>
      prev.map((it) => (it.objectId === objectId ? { ...it, status: 'need_check' } : it))
    );
    setTableRows((prev) =>
      prev.map((row) =>
        row.id === objectId
          ? { ...row, status: 'Đã xác minh', statusType: 'verified', issue: 'Đã xử lý' }
          : row
      )
    );
    setNotificationBanner(`✓ Đã xác minh thành công đối tượng ${objectId}`);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  const handleFixAllIssues = () => {
    setIsAllFixed(true);
    setShowTooltip(false);
    setIssues((prev) =>
      prev.map((it) => ({
        ...it,
        status: 'need_check' as any,
      }))
    );
    setTableRows((prev) =>
      prev.map((row) => ({
        ...row,
        status: 'Đã xác minh' as const,
        statusType: 'verified' as const,
        issue: 'Đã xử lý tự động',
      }))
    );
    setNotificationBanner(
      '✓ Đã tự động vá kín góc hở Room 03, gán chiều cao tường H=3.0m & chuẩn hóa quy cách 8 cửa thành công! 156/156 đối tượng đã được nghiệm thu.'
    );
    setTimeout(() => setNotificationBanner(null), 6000);
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-y-auto ${themeConfig.bgCanvas} text-white select-none`}>
      
      {/* ─────────────────────────────────────────────────────────────
          NOTIFICATION BANNER (IF ANY)
      ───────────────────────────────────────────────────────────── */}
      {notificationBanner && (
        <div 
          className={`border-b ${themeConfig.accentBorder} px-6 py-2.5 text-xs font-semibold ${themeConfig.accentText} flex items-center justify-between animate-in fade-in`}
          style={{ backgroundColor: `${themeConfig.iconColor}15` }}
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{notificationBanner}</span>
          </div>
          <button
            onClick={() => setNotificationBanner(null)}
            className="text-white/60 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION: HEADER (TITLE & 5 STAT BADGES)
      ───────────────────────────────────────────────────────────── */}
      <div className={`px-5 pt-4 pb-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 shrink-0 ${themeConfig.bgCanvas}`}>
        
        {/* Title and subtitle with shield badge */}
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl ${themeConfig.accentBadgeBg} flex items-center justify-center shrink-0`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                AI Verification Center
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${themeConfig.accentBadgeBg}`}>
                Bước 2: Thẩm tra AI
              </span>
            </div>
            <p className="text-xs text-white/60 mt-0.5">
              Kiểm tra, xác nhận và bổ sung dữ liệu hình học CAD trước khi lập bảng khối lượng.
            </p>
          </div>
        </div>

        {/* 5 Stats summary badges on the right + Fix All Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Quick Auto Fix All Issues Action */}
          {!isAllFixed ? (
            <button
              onClick={handleFixAllIssues}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl ${themeConfig.primaryBtn} text-xs font-bold shadow-sm transition-all cursor-pointer`}
              title="AI tự động vá góc hở Room 03, chuẩn hóa quy cách 8 cửa & gán H=3.0m"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ Tự động sửa tất cả 13 lỗi</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã chuẩn hóa 100% đối tượng</span>
            </div>
          )}

          {/* 1. Tổng đối tượng */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl ${themeConfig.cardBg} border border-white/10 shadow-sm`}>
            <div className={`w-6 h-6 rounded-lg ${themeConfig.accentBadgeBg} flex items-center justify-center`}>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/50 leading-none">Tổng đối tượng</div>
              <div className="text-sm font-bold text-white font-mono leading-tight mt-0.5">156</div>
            </div>
          </div>

          {/* 2. Đã xác minh */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl ${themeConfig.cardBg} border border-emerald-500/30 shadow-sm`}>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/50 leading-none">Đã xác minh</div>
              <div className="text-sm font-bold text-emerald-400 font-mono leading-tight mt-0.5">
                {isAllFixed ? '156' : '142'}
              </div>
            </div>
          </div>

          {/* 3. Cần kiểm tra */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl ${themeConfig.cardBg} border border-amber-500/30 shadow-sm`}>
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-[#fbbf24] flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/50 leading-none">Cần kiểm tra</div>
              <div className="text-sm font-bold text-[#fbbf24] font-mono leading-tight mt-0.5">
                {isAllFixed ? '0' : '9'}
              </div>
            </div>
          </div>

          {/* 4. Thiếu thông tin */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl ${themeConfig.cardBg} border border-rose-500/30 shadow-sm`}>
            <div className="w-6 h-6 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/50 leading-none">Thiếu thông tin</div>
              <div className="text-sm font-bold text-rose-400 font-mono leading-tight mt-0.5">
                {isAllFixed ? '0' : '4'}
              </div>
            </div>
          </div>

          {/* 5. Loại trừ */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl ${themeConfig.cardBg} border border-white/10 shadow-sm`}>
            <div className="w-6 h-6 rounded-lg bg-white/5 text-slate-400 flex items-center justify-center">
              <Slash className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/50 leading-none">Loại trừ</div>
              <div className="text-sm font-bold text-white/80 font-mono leading-tight mt-0.5">
                {isAllFixed ? '0' : '1'}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: MIDDLE ROW (CAD WORKSPACE + INSPECTOR SIDEBAR)
      ───────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-3 pb-3 flex flex-col lg:flex-row gap-4 shrink-0" style={{ minHeight: '440px' }}>
        
        {/* LEFT: DARK CAD BLUEPRINT CANVAS */}
        <div className="flex-1 rounded-2xl bg-[#080d18] border border-white/10 flex flex-col relative overflow-hidden shadow-xl min-h-[420px]">
          
          {/* Top CAD Viewer Toolbar */}
          <div className="h-11 px-3 bg-[#0c1322] border-b border-white/10 flex items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-[#080d18] border border-white/10 text-xs font-mono text-white/90 flex items-center gap-2">
                <span>Floor 01.dxf</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1 border border-emerald-500/30">
                  <Check className="w-2.5 h-2.5" /> Đã phân tích
                </span>
              </div>

              {/* Floor Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setSelectedFloor(selectedFloor === 'Tầng 01' ? 'Tầng 02' : 'Tầng 01')}
                  className="px-2.5 py-1 rounded-lg bg-[#080d18] hover:bg-[#121c32] border border-white/10 text-xs text-white/90 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{selectedFloor}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>
            </div>

            {/* CAD Interactive Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTool('pointer')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  activeTool === 'pointer'
                    ? `${themeConfig.primaryBtn} shadow-sm`
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title="Con trỏ chọn"
              >
                <MousePointer className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTool('hand')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  activeTool === 'hand'
                    ? `${themeConfig.primaryBtn} shadow-sm`
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title="Kéo rê bản vẽ (Pan)"
              >
                <Hand className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 15, 250))}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 15, 40))}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setZoomLevel(100)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Căn vừa màn hình"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Display Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDisplayMenu(!showDisplayMenu)}
                  className="px-2.5 py-1 rounded-lg bg-[#080d18] hover:bg-[#121c32] border border-white/10 text-xs text-white/90 flex items-center gap-1.5 cursor-pointer ml-1 transition-colors"
                >
                  <span>Hiển thị</span>
                  <ChevronDown className="w-3 h-3 text-white/50" />
                </button>

                {showDisplayMenu && (
                  <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#0c1322] border border-amber-500/20 shadow-2xl p-2 z-50 text-xs animate-in fade-in">
                    <button
                      onClick={() => {
                        setShowLayerPanel(!showLayerPanel);
                        setShowDisplayMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white flex items-center justify-between"
                    >
                      <span>Bảng Lớp hiển thị</span>
                      <span className="text-[10px] text-[#fbbf24]">{showLayerPanel ? 'Bật' : 'Tắt'}</span>
                    </button>
                    <button
                      onClick={() => setShowDisplayMenu(false)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white flex items-center justify-between"
                    >
                      <span>Lưới tọa độ CAD</span>
                      <span className="text-[10px] text-emerald-400">Bật</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Blueprint Viewport */}
          <div 
            className="flex-1 relative overflow-hidden bg-[#050811] cursor-crosshair"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const xVal = Math.round(10000 + (e.clientX - rect.left) * 12);
              const yVal = Math.round(7000 + (e.clientY - rect.top) * 9);
              setCoords({ x: xVal, y: yVal });
            }}
          >
            {/* Subtle Blueprint Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={themeConfig.gridStroke} strokeWidth="0.5" strokeOpacity="0.35" />
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke={themeConfig.gridStroke} strokeWidth="1" strokeOpacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* FLOATING OVERLAY: LỚP HIỂN THỊ (TOP-LEFT) */}
            {showLayerPanel && (
              <div className={`absolute top-3 left-3 w-52 rounded-xl bg-[#0c1322]/95 border ${themeConfig.accentBorder} backdrop-blur-md p-3 z-30 shadow-2xl animate-in fade-in`}>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Layers className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
                    <span>Lớp hiển thị</span>
                  </div>
                  <button
                    onClick={() => setShowLayerPanel(false)}
                    className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Categories */}
                <div className="py-2 space-y-1.5 text-xs">
                  <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layersFilter.all}
                        onChange={(e) =>
                          setLayersFilter({
                            all: e.target.checked,
                            rooms: e.target.checked,
                            walls: e.target.checked,
                            doors: e.target.checked,
                            windows: e.target.checked,
                          })
                        }
                        className="rounded border-white/20 text-[#f59e0b] focus:ring-0 bg-[#080d18]"
                      />
                      <span>Tất cả đối tượng</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/40">156</span>
                  </label>

                  <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layersFilter.rooms}
                        onChange={(e) => setLayersFilter({ ...layersFilter, rooms: e.target.checked })}
                        className="rounded border-white/20 text-[#f59e0b] focus:ring-0 bg-[#080d18]"
                      />
                      <span className="w-2 h-2 rounded-xs bg-[#f59e0b]" />
                      <span>Phòng</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/40">12</span>
                  </label>

                  <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layersFilter.walls}
                        onChange={(e) => setLayersFilter({ ...layersFilter, walls: e.target.checked })}
                        className="rounded border-white/20 text-[#f59e0b] focus:ring-0 bg-[#080d18]"
                      />
                      <span className="w-2 h-2 rounded-xs bg-[#06b6d4]" />
                      <span>Tường</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/40">48</span>
                  </label>

                  <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layersFilter.doors}
                        onChange={(e) => setLayersFilter({ ...layersFilter, doors: e.target.checked })}
                        className="rounded border-white/20 text-[#f59e0b] focus:ring-0 bg-[#080d18]"
                      />
                      <span className="w-2 h-2 rounded-xs bg-[#f97316]" />
                      <span>Cửa</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/40">8</span>
                  </label>

                  <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layersFilter.windows}
                        onChange={(e) => setLayersFilter({ ...layersFilter, windows: e.target.checked })}
                        className="rounded border-white/20 text-[#f59e0b] focus:ring-0 bg-[#080d18]"
                      />
                      <span className="w-2 h-2 rounded-xs bg-[#a855f7]" />
                      <span>Cửa sổ</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/40">15</span>
                  </label>
                </div>

                {/* Sub-header: Trạng thái xác minh */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-semibold text-white/50 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Trạng thái xác minh</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={statusFilter.verified}
                          onChange={(e) => setStatusFilter({ ...statusFilter, verified: e.target.checked })}
                          className="rounded border-white/20 text-emerald-400 bg-[#080d18]"
                        />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Đã xác minh</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">142</span>
                    </label>

                    <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={statusFilter.needCheck}
                          onChange={(e) => setStatusFilter({ ...statusFilter, needCheck: e.target.checked })}
                          className="rounded border-white/20 text-[#fbbf24] bg-[#080d18]"
                        />
                        <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                        <span>Cần kiểm tra</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#fbbf24]">9</span>
                    </label>

                    <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={statusFilter.missingInfo}
                          onChange={(e) => setStatusFilter({ ...statusFilter, missingInfo: e.target.checked })}
                          className="rounded border-white/20 text-rose-400 bg-[#080d18]"
                        />
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        <span>Thiếu thông tin</span>
                      </div>
                      <span className="font-mono text-[11px] text-rose-400">4</span>
                    </label>

                    <label className="flex items-center justify-between text-white/80 hover:text-white cursor-pointer pl-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={statusFilter.excluded}
                          onChange={(e) => setStatusFilter({ ...statusFilter, excluded: e.target.checked })}
                          className="rounded border-white/20 text-slate-400 bg-[#080d18]"
                        />
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span>Loại trừ</span>
                      </div>
                      <span className="font-mono text-[11px] text-white/40">1</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ARCHITECTURAL 2D FLOOR PLAN DRAWING (SVG) */}
            <div 
              className="w-full h-full flex items-center justify-center p-6 transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <svg
                viewBox="0 0 900 500"
                className="w-full max-w-[860px] h-auto drop-shadow-2xl overflow-visible"
              >
                {/* Exterior Wall Thick Border */}
                <rect
                  x="140"
                  y="60"
                  width="620"
                  height="340"
                  fill="#080e1b"
                  stroke={themeConfig.cadOuterWall}
                  strokeWidth="2.5"
                />

                {/* Inner architectural boundary */}
                <rect
                  x="148"
                  y="68"
                  width="604"
                  height="324"
                  fill="#0b1325"
                  stroke={themeConfig.cadInnerWall}
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />

                {/* Vertical Internal Walls */}
                <line x1="340" y1="68" x2="340" y2="392" stroke={themeConfig.cadOuterWall} strokeWidth="2.5" />
                <line x1="510" y1="68" x2="510" y2="392" stroke={themeConfig.cadOuterWall} strokeWidth="2.5" />

                {/* Horizontal Internal Corridor Walls */}
                <line x1="148" y1="230" x2="752" y2="230" stroke={themeConfig.cadOuterWall} strokeWidth="2.5" />

                {/* ROOM 01 (Top-Left) */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R01');
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="152"
                    y="72"
                    width="184"
                    height="154"
                    fill={selectedObjectId === 'R01' ? '#1c283f' : '#0d1628'}
                    className="hover:fill-[#1c283f] transition-colors"
                  />
                  <text x="244" y="140" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 01
                  </text>
                  <text x="244" y="160" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    25.8 m²
                  </text>
                  {/* Door D01 */}
                  <path d="M 320 230 A 25 25 0 0 1 340 205" fill="none" stroke="#f97316" strokeWidth="2" />
                  <line x1="340" y1="205" x2="340" y2="230" stroke="#f97316" strokeWidth="2" />
                </g>

                {/* ROOM 02 (Top-Middle) */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R02');
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="344"
                    y="72"
                    width="162"
                    height="154"
                    fill={selectedObjectId === 'R02' ? '#1c283f' : '#0d1628'}
                    className="hover:fill-[#1c283f] transition-colors"
                  />
                  <text x="425" y="140" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 02
                  </text>
                  <text x="425" y="160" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    18.4 m²
                  </text>
                  {/* Window W01 on top */}
                  <rect x="380" y="62" width="60" height="6" fill="#a855f7" />
                </g>

                {/* ROOM 03 (Top-Right) - CONDITIONAL HIGHLIGHT */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R03');
                    if (!isAllFixed) setShowTooltip(true);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="514"
                    y="72"
                    width="234"
                    height="154"
                    fill={isAllFixed ? (selectedObjectId === 'R03' ? '#1c283f' : '#0d1628') : '#251b08'}
                    stroke={isAllFixed ? themeConfig.cadOuterWall : '#f59e0b'}
                    strokeWidth={isAllFixed ? '1.5' : '2.5'}
                    strokeDasharray={isAllFixed ? undefined : '6 4'}
                    className={isAllFixed ? 'hover:fill-[#1c283f] transition-colors' : 'animate-pulse'}
                  />
                  {!isAllFixed && (
                    <>
                      {/* Yellow Alert Triangle Badge in Room 03 */}
                      <polygon points="631,105 621,123 641,123" fill="#f59e0b" />
                      <text x="631" y="120" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="black">!</text>
                    </>
                  )}

                  <text x="631" y="145" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 03
                  </text>
                  <text x="631" y="165" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    22.1 m²
                  </text>
                </g>

                {/* ROOM 04 (Bottom-Left) */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R04');
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="152"
                    y="234"
                    width="184"
                    height="154"
                    fill={selectedObjectId === 'R04' ? '#1c283f' : '#0d1628'}
                    className="hover:fill-[#1c283f] transition-colors"
                  />
                  <text x="244" y="305" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 04
                  </text>
                  <text x="244" y="325" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    16.2 m²
                  </text>
                  {/* Door D04 */}
                  <path d="M 200 230 A 25 25 0 0 1 225 205" fill="none" stroke="#f97316" strokeWidth="2" />
                </g>

                {/* ROOM 05 (Bottom-Middle) */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R05');
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="344"
                    y="234"
                    width="162"
                    height="154"
                    fill={selectedObjectId === 'R05' ? '#1c283f' : '#0d1628'}
                    className="hover:fill-[#1c283f] transition-colors"
                  />
                  <text x="425" y="305" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 05
                  </text>
                  <text x="425" y="325" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    12.6 m²
                  </text>
                  {/* Door D08 (orange arc with warning) */}
                  <path d="M 344 280 A 25 25 0 0 1 369 255" fill="none" stroke="#f97316" strokeWidth="2" />
                </g>

                {/* ROOM 06 (Bottom-Right) */}
                <g 
                  onClick={() => {
                    setSelectedObjectId('R06');
                    setShowTooltip(false);
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="514"
                    y="234"
                    width="234"
                    height="154"
                    fill={selectedObjectId === 'R06' ? '#1c283f' : '#0d1628'}
                    className="hover:fill-[#1c283f] transition-colors"
                  />
                  <text x="631" y="305" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    Room 06
                  </text>
                  <text x="631" y="325" textAnchor="middle" fill={themeConfig.cadLabelText} fontSize="11" fontFamily="monospace">
                    20.3 m²
                  </text>
                  {/* Door arc */}
                  <path d="M 540 230 A 25 25 0 0 1 565 205" fill="none" stroke="#f97316" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* FLOATING CAD CALLOUT: ROOM 03 ISSUE POPOVER */}
            {showTooltip && (
              <div 
                className="absolute top-12 right-24 sm:right-32 rounded-xl bg-[#0c1322]/95 border border-amber-500/80 p-3 shadow-2xl backdrop-blur-md z-40 max-w-xs animate-in zoom-in-95"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center justify-between gap-4">
                      <span>Room 03</span>
                      <button 
                        onClick={() => setShowTooltip(false)}
                        className="text-white/40 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#fcd34d] mt-0.5">
                      Đường bao phòng chưa khép kín.
                    </div>
                    <button
                      onClick={() => {
                        setSelectedObjectId('R03');
                        setInspectorTab('object_info');
                      }}
                      className="text-[11px] font-semibold text-[#fbbf24] hover:underline mt-2 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom CAD Indicators: Compass, Scale Bar, Coordinates & Scale */}
            <div className="absolute bottom-3 left-4 flex items-center gap-6 z-10 pointer-events-none">
              
              {/* North Compass Arrow */}
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center relative bg-[#080d18]/80">
                  <div className="w-0.5 h-3 bg-[#f59e0b] absolute top-1" />
                  <div className="w-0.5 h-3 bg-white/40 absolute bottom-1" />
                  <span className="text-[9px] font-bold text-[#fbbf24] absolute -top-3">N</span>
                </div>
              </div>

              {/* Graphic Scale bar: 0 1 2 5 10m */}
              <div className="flex flex-col text-[10px] font-mono text-white/50">
                <div className="flex justify-between w-32 px-0.5">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>5</span>
                  <span>10 m</span>
                </div>
                <div className="w-32 h-1 bg-white/20 relative flex">
                  <div className="w-1/4 h-full bg-[#fbbf24]" />
                  <div className="w-1/4 h-full bg-white/40" />
                  <div className="w-1/2 h-full bg-[#f59e0b]" />
                </div>
              </div>

            </div>

            {/* Bottom-right CAD Coordinate readout */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3 z-10">
              <div className="px-2.5 py-1 rounded-lg bg-[#0c1322]/90 border border-white/10 text-[11px] font-mono text-white/70 flex items-center gap-3 shadow-md">
                <span>X: {coords.x}</span>
                <span>Y: {coords.y}</span>
                <span className="text-[#fbbf24]">1:100</span>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg bg-[#0c1322]/90 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 shadow-md cursor-pointer transition-colors"
                title="Toàn màn hình"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: INSPECTOR PANEL (DANH SÁCH VẤN ĐỀ) */}
        <div className="w-full lg:w-96 rounded-2xl bg-[#0c1322] border border-white/10 flex flex-col shrink-0 shadow-xl overflow-hidden">
          
          {/* Top Tabs in Sidebar */}
          <div className="px-3 pt-3 pb-0 bg-[#080d18] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setInspectorTab('issues')}
                className={`px-3 py-2 text-xs font-bold transition-all relative cursor-pointer ${
                  inspectorTab === 'issues'
                    ? themeConfig.accentText
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span>Danh sách vấn đề ({issues.length})</span>
                {inspectorTab === 'issues' && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${themeConfig.activeIndicator}`} />
                )}
              </button>

              <button
                onClick={() => setInspectorTab('object_info')}
                className={`px-3 py-2 text-xs font-semibold transition-all relative cursor-pointer ${
                  inspectorTab === 'object_info'
                    ? themeConfig.accentText
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span>Thông tin đối tượng</span>
                {inspectorTab === 'object_info' && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${themeConfig.activeIndicator}`} />
                )}
              </button>

              <button
                onClick={() => setInspectorTab('notes')}
                className={`px-2 py-2 text-xs font-semibold transition-all relative cursor-pointer ${
                  inspectorTab === 'notes'
                    ? themeConfig.accentText
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span>Ghi chú (0)</span>
                {inspectorTab === 'notes' && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${themeConfig.activeIndicator}`} />
                )}
              </button>
            </div>
          </div>

          {/* If Tab is ISSUES: show filter pills and cards */}
          {inspectorTab === 'issues' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Filter Pills matching screenshot */}
              <div className="p-3 border-b border-white/10 flex items-center gap-1.5 flex-wrap bg-[#0c1322]">
                <button
                  onClick={() => setIssueFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    issueFilter === 'all'
                      ? `${themeConfig.primaryBtn} shadow-sm`
                      : 'bg-[#080d18] border border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Tất cả ({issues.length})
                </button>

                <button
                  onClick={() => setIssueFilter('need_check')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    issueFilter === 'need_check'
                      ? `${themeConfig.primaryBtn} shadow-sm`
                      : 'bg-[#080d18] border border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Cần kiểm tra (9)
                </button>

                <button
                  onClick={() => setIssueFilter('missing_info')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    issueFilter === 'missing_info'
                      ? `${themeConfig.primaryBtn} shadow-sm`
                      : 'bg-[#080d18] border border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Thiếu thông tin (4)
                </button>

                <button
                  onClick={() => setIssueFilter('excluded')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    issueFilter === 'excluded'
                      ? `${themeConfig.primaryBtn} shadow-sm`
                      : 'bg-[#080d18] border border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Loại trừ (1)
                </button>
              </div>

              {/* Scrollable Issue List */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto max-h-[380px]">
                {filteredIssues.map((issue) => {
                  const isSelected = selectedObjectId === issue.objectId;
                  return (
                    <div
                      key={issue.id}
                      onClick={() => {
                        setSelectedObjectId(issue.objectId);
                        setShowTooltip(issue.objectId === 'R03');
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer group relative ${
                        isSelected
                          ? `${themeConfig.navActive} border ${themeConfig.accentBorder} shadow-md`
                          : 'bg-[#080d18] border-white/10 hover:border-white/20 hover:bg-[#101726]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          {issue.status === 'need_check' ? (
                            <div className={`w-5 h-5 rounded-md ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} flex items-center justify-center shrink-0 mt-0.5`}>
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </div>
                          ) : issue.status === 'missing_info' ? (
                            <div className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-md bg-slate-500/20 text-slate-400 border border-slate-500/30 flex items-center justify-center shrink-0 mt-0.5">
                              <Slash className="w-3.5 h-3.5" />
                            </div>
                          )}

                          <div>
                            <h4 className={`text-xs font-bold text-white group-hover:${themeConfig.accentText} transition-colors leading-tight`}>
                              {issue.title}
                            </h4>
                            <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
                              {issue.description}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col items-end shrink-0">
                          {issue.status === 'need_check' ? (
                            <span className={`px-2 py-0.5 rounded-md ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} text-[10px] font-semibold`}>
                              Cần kiểm tra
                            </span>
                          ) : issue.status === 'missing_info' ? (
                            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-semibold">
                              Thiếu thông tin
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-slate-500/20 text-slate-300 border border-slate-500/30 text-[10px] font-semibold">
                              Loại trừ
                            </span>
                          )}
                          <span className="text-[10px] text-white/40 mt-1">{issue.tag}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                        <span className="text-white/40 text-[10px]">Nhấp để xem trên bản vẽ</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* If Tab is OBJECT INFO: show deep details & resolution actions */}
          {inspectorTab === 'object_info' && (
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#0c1322]">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-mono ${themeConfig.accentText} uppercase tracking-wider`}>
                    {selectedIssue.tag}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{selectedIssue.title}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded-md ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} text-[10px] font-semibold`}>
                  {selectedIssue.status === 'need_check' ? 'Cần kiểm tra' : 'Thiếu thông tin'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#080d18] border border-white/10 space-y-2 text-xs">
                <div className="text-white/50 text-[11px] font-semibold">Chi tiết bất thường:</div>
                <div className="text-white/90">{selectedIssue.details?.currentVal}</div>

                <div className="text-white/50 text-[11px] font-semibold pt-1">Tiêu chuẩn kỹ thuật:</div>
                <div className={themeConfig.accentText}>{selectedIssue.details?.expectedVal}</div>

                <div className="text-white/50 text-[11px] font-semibold pt-1">Đề xuất AI:</div>
                <div className="text-white/90 flex items-start gap-1.5">
                  <Sparkles className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${themeConfig.accentText}`} />
                  <span>{selectedIssue.details?.suggestion}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleFixIssue(selectedIssue.objectId)}
                  className={`w-full py-2.5 px-3 rounded-xl ${themeConfig.primaryBtn} text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Chấp nhận giải pháp AI & Xác minh</span>
                </button>

                <button
                  onClick={() => handleFixIssue(selectedIssue.objectId)}
                  className="w-full py-2 px-3 rounded-xl bg-[#080d18] hover:bg-[#121c32] border border-white/10 text-white/80 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa thủ công</span>
                </button>
              </div>
            </div>
          )}

          {/* If Tab is NOTES */}
          {inspectorTab === 'notes' && (
            <div className="flex-1 p-4 flex flex-col items-center justify-center text-center text-white/40 space-y-2 bg-[#0c1322]">
              <Info className="w-8 h-8 text-white/20" />
              <div className="text-xs font-semibold text-white/60">Chưa có ghi chú nào</div>
              <p className="text-[11px] max-w-xs">
                Bạn có thể thêm ghi chú trực tiếp cho từng phòng hoặc tường để trao đổi cùng kỹ sư dự toán.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: BOTTOM TABLE (DANH SÁCH ĐỐI TƯỢNG)
      ───────────────────────────────────────────────────────────── */}
      <div className="px-5 pb-4 shrink-0">
        <div className="rounded-2xl bg-[#0c1322] border border-white/10 overflow-hidden shadow-xl">
          
          {/* Table Toolbar: Tabs on Left, Search + Filter + Export on Right */}
          <div className="px-4 py-2.5 bg-[#080d18] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            
            {/* Table Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTableTab('objects')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tableTab === 'objects'
                    ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} shadow-xs`
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Danh sách đối tượng
              </button>

              <button
                onClick={() => setTableTab('summary_room')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'summary_room'
                    ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder}`
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Tóm tắt theo phòng
              </button>

              <button
                onClick={() => setTableTab('summary_type')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'summary_type'
                    ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder}`
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Tóm tắt theo loại
              </button>

              <button
                onClick={() => setTableTab('audit_log')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'audit_log'
                    ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder}`
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Nhật ký xác minh
              </button>
            </div>

            {/* Search + Filter + Export Controls */}
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTableQuery}
                  onChange={(e) => setSearchTableQuery(e.target.value)}
                  placeholder="Tìm đối tượng..."
                  className={`w-full bg-[#080d18] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors`}
                />
              </div>

              <button
                onClick={() => setSearchTableQuery('')}
                className="px-3 py-1.5 rounded-xl bg-[#080d18] border border-white/10 hover:bg-[#121c32] text-white/80 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-white/50" />
                <span>Lọc</span>
              </button>

              <button
                onClick={() => {
                  setNotificationBanner('✓ Đã xuất bảng đối tượng DXF/CAD thành công sang định dạng Excel (.xlsx)');
                }}
                className={`px-3 py-1.5 rounded-xl ${themeConfig.primaryBtn} text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất danh sách</span>
              </button>
            </div>
          </div>

          {/* Interactive Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80 border-collapse">
              <thead className="bg-[#080d18] border-b border-white/10 text-white/50 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">ID</th>
                  <th className="py-2.5 px-3">Loại</th>
                  <th className="py-2.5 px-4">Tên</th>
                  <th className="py-2.5 px-4">Diện tích / Kích thước</th>
                  <th className="py-2.5 px-4">Trạng thái</th>
                  <th className="py-2.5 px-4">Vấn đề</th>
                  <th className="py-2.5 px-3">Ghi chú</th>
                  <th className="py-2.5 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-sans bg-[#0c1322]">
                {filteredRows.slice(0, 7).map((row) => {
                  const isRowSelected = selectedObjectId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setSelectedObjectId(row.id);
                        setShowTooltip(row.id === 'R03');
                      }}
                      className={`transition-colors cursor-pointer ${
                        isRowSelected
                          ? `${themeConfig.navActive} text-white font-medium`
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {/* ID */}
                      <td className={`py-2.5 px-4 font-mono font-bold ${themeConfig.accentText}`}>
                        {row.id}
                      </td>

                      {/* Loại */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-xs ${row.typeColor}`} />
                          <span className="text-white/90">{row.type}</span>
                        </div>
                      </td>

                      {/* Tên */}
                      <td className="py-2.5 px-4 font-semibold text-white">
                        {row.name}
                      </td>

                      {/* Dimension */}
                      <td className="py-2.5 px-4 font-mono text-white/70">
                        {row.dimension}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-2.5 px-4">
                        {row.statusType === 'verified' && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-medium border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" /> Đã xác minh
                          </span>
                        )}
                        {row.statusType === 'need_check' && (
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${themeConfig.badgeBg} ${themeConfig.accentText} text-[11px] font-medium border ${themeConfig.accentBorder}`}>
                            <AlertTriangle className="w-3 h-3" /> Cần kiểm tra
                          </span>
                        )}
                        {row.statusType === 'missing_info' && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-medium border border-rose-500/30">
                            <AlertCircle className="w-3 h-3" /> Thiếu thông tin
                          </span>
                        )}
                        {row.statusType === 'excluded' && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 text-[11px] font-medium border border-slate-500/30">
                            <Slash className="w-3 h-3" /> Loại trừ
                          </span>
                        )}
                      </td>

                      {/* Vấn đề */}
                      <td className="py-2.5 px-4 text-white/80">
                        {row.issue !== '–' ? (
                          <span className="text-white/90">{row.issue}</span>
                        ) : (
                          <span className="text-white/30">–</span>
                        )}
                      </td>

                      {/* Ghi chú */}
                      <td className="py-2.5 px-3 text-white/40">
                        {row.note}
                      </td>

                      {/* Hành động */}
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedObjectId(row.id);
                            setShowTooltip(row.id === 'R03');
                          }}
                          className={`px-2.5 py-1 rounded-lg bg-[#080d18] hover:bg-white/10 border ${themeConfig.accentBorder} ${themeConfig.accentText} text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>Xem trên bản vẽ</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: BOTTOM STICKY ACTION BAR MATCHING SCREENSHOT
      ───────────────────────────────────────────────────────────── */}
      <div className="mt-auto px-5 py-3.5 bg-[#080d18] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0 z-20">
        
        {/* Left: Project Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-white/60">Tiến độ xác minh</span>
              <span className={`font-mono font-bold ${themeConfig.accentText} ml-2`}>
                {isAllFixed ? '100%' : '80%'}
              </span>
            </div>
            <div className="w-36 sm:w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isAllFixed 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                    : themeConfig.primaryBtn
                }`}
                style={{ width: isAllFixed ? '100%' : '80%' }} 
              />
            </div>
          </div>

          <button
            onClick={onBackToAnalysis}
            className="text-xs text-white/50 hover:text-white hover:underline cursor-pointer"
          >
            ◄ Quay lại tải bản vẽ
          </button>
        </div>

        {/* Center: System Status Notice */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0c1322] border ${themeConfig.accentBorder} text-xs`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isAllFixed ? 'text-emerald-400' : themeConfig.accentText}`} />
          <div className="text-white/80">
            {isAllFixed ? (
              <span className="text-emerald-400 font-semibold">
                ✓ Toàn bộ 156 đối tượng đã được chuẩn hóa và nghiệm thu. Sẵn sàng bóc tách khối lượng!
              </span>
            ) : (
              <span>
                <span>Có 4 vấn đề thiếu thông tin cần xác nhận. </span>
                <button
                  onClick={handleFixAllIssues}
                  className={`${themeConfig.accentText} hover:underline font-bold ml-1 cursor-pointer`}
                >
                  ⚡ Nhấn để tự động sửa tất cả
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Right: Proceed Button */}
        <div className="flex items-center gap-2">
          {!isAllFixed && (
            <button
              onClick={handleFixAllIssues}
              className={`px-3.5 py-2.5 rounded-xl ${themeConfig.badgeBg} hover:opacity-90 border ${themeConfig.accentBorder} ${themeConfig.accentText} text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sửa lỗi</span>
            </button>
          )}

          <button
            onClick={onNavigateToTakeoff}
            className={`px-5 py-2.5 rounded-xl ${themeConfig.primaryBtn} text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg`}
          >
            <span>Tiếp tục sang Bước 3: Bảng khối lượng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
