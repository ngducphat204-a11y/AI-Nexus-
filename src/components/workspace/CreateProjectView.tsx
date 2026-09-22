import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  ArrowRight, 
  Bookmark,
  Sliders,
  Sparkles,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { useWorkspaceTheme } from '../../data/ThemeContext';

interface CreateProjectViewProps {
  onCancel: () => void;
  onProceed: (projectData: {
    name: string;
    description: string;
    floor: string;
    fileName: string;
    wallHeight: number;
    paintScope: string[];
    paintSides: string;
    deductions: string[];
    coats: string;
  }) => void;
  onSaveDraft?: () => void;
  onNavigateToReview?: () => void;
  onNavigateToEstimate?: () => void;
}

interface GeometricTakeoffItem {
  id: string;
  name: string;
  type: string;
  floorArea: number; // m2
  wallPerimeter: number; // m
  wallHeight: number; // m
  grossWallArea: number; // m2
  deductionArea: number; // m2 (doors & windows)
  netWallArea: number; // m2
  ceilingArea: number; // m2
  totalSurfaceArea: number; // m2 (netWall + ceiling)
  color: string;
  colorBorder: string;
}

export const CreateProjectView: React.FC<CreateProjectViewProps> = ({
  onCancel,
  onProceed,
  onSaveDraft,
  onNavigateToReview,
  onNavigateToEstimate,
}) => {
  const { themeConfig } = useWorkspaceTheme();

  // Master Flow Phase:
  // 1: Minimal Upload & Geometric Config (Tải bản vẽ & Thiết lập hình học)
  // 2: Visual AI Scanning (Quét CAD trực quan & đo đạc)
  // 3: Geometric Takeoff Workspace (Bảng bóc tách khối lượng hình học)
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  // File State
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
    format: string;
    layersCount: number;
    units: string;
  }>({
    name: 'Office_Building.dxf',
    size: '2.8 MB',
    type: 'DXF',
    format: 'AutoCAD R2018 DXF',
    layersCount: 24,
    units: 'Millimeters (mm)',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isExported, setIsExported] = useState(false);

  // Geometric Parameters ONLY (No paint calculation here)
  const [projectName, setProjectName] = useState('Tòa nhà văn phòng A');
  const [selectedFloor, setSelectedFloor] = useState('Tầng 1 (Floor 01)');
  const [wallHeight, setWallHeight] = useState<number>(3.0);
  const [includeCeiling, setIncludeCeiling] = useState(true);
  const [deductOpenings, setDeductOpenings] = useState(true);

  // Scanning Phase State
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIndex, setScanStepIndex] = useState(0);

  // Takeoff Workspace State
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-01');
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Pure Geometric Takeoff Data (Room-by-room CAD measurements)
  const geometricItems: GeometricTakeoffItem[] = [
    {
      id: 'room-01',
      name: 'OFFICE 01',
      type: 'Văn phòng',
      floorArea: 28.5,
      wallPerimeter: 21.4,
      wallHeight: wallHeight,
      grossWallArea: +(21.4 * wallHeight).toFixed(1),
      deductionArea: 4.8, // 1 door + 1 window
      netWallArea: +(21.4 * wallHeight - 4.8).toFixed(1),
      ceilingArea: 28.5,
      totalSurfaceArea: +((21.4 * wallHeight - 4.8) + (includeCeiling ? 28.5 : 0)).toFixed(1),
      color: themeConfig.roomColors.room1.fill,
      colorBorder: themeConfig.roomColors.room1.stroke,
    },
    {
      id: 'room-02',
      name: 'OFFICE 02',
      type: 'Văn phòng',
      floorArea: 32.0,
      wallPerimeter: 22.8,
      wallHeight: wallHeight,
      grossWallArea: +(22.8 * wallHeight).toFixed(1),
      deductionArea: 5.2,
      netWallArea: +(22.8 * wallHeight - 5.2).toFixed(1),
      ceilingArea: 32.0,
      totalSurfaceArea: +((22.8 * wallHeight - 5.2) + (includeCeiling ? 32.0 : 0)).toFixed(1),
      color: themeConfig.roomColors.room2.fill,
      colorBorder: themeConfig.roomColors.room2.stroke,
    },
    {
      id: 'room-03',
      name: 'MEETING ROOM',
      type: 'Phòng họp',
      floorArea: 34.2,
      wallPerimeter: 23.6,
      wallHeight: wallHeight,
      grossWallArea: +(23.6 * wallHeight).toFixed(1),
      deductionArea: 6.4,
      netWallArea: +(23.6 * wallHeight - 6.4).toFixed(1),
      ceilingArea: 34.2,
      totalSurfaceArea: +((23.6 * wallHeight - 6.4) + (includeCeiling ? 34.2 : 0)).toFixed(1),
      color: themeConfig.roomColors.room3.fill,
      colorBorder: themeConfig.roomColors.room3.stroke,
    },
    {
      id: 'room-04',
      name: 'CORRIDOR',
      type: 'Hành lang',
      floorArea: 48.6,
      wallPerimeter: 36.4,
      wallHeight: wallHeight,
      grossWallArea: +(36.4 * wallHeight).toFixed(1),
      deductionArea: 12.6,
      netWallArea: +(36.4 * wallHeight - 12.6).toFixed(1),
      ceilingArea: 48.6,
      totalSurfaceArea: +((36.4 * wallHeight - 12.6) + (includeCeiling ? 48.6 : 0)).toFixed(1),
      color: themeConfig.roomColors.room4.fill,
      colorBorder: themeConfig.roomColors.room4.stroke,
    },
    {
      id: 'room-05',
      name: 'STORAGE & WC',
      type: 'Kho & Vệ sinh',
      floorArea: 19.8,
      wallPerimeter: 18.2,
      wallHeight: wallHeight,
      grossWallArea: +(18.2 * wallHeight).toFixed(1),
      deductionArea: 3.8,
      netWallArea: +(18.2 * wallHeight - 3.8).toFixed(1),
      ceilingArea: 19.8,
      totalSurfaceArea: +((18.2 * wallHeight - 3.8) + (includeCeiling ? 19.8 : 0)).toFixed(1),
      color: 'rgba(168, 85, 247, 0.18)',
      colorBorder: '#a855f7',
    },
    {
      id: 'room-06',
      name: 'MAIN LOBBY',
      type: 'Sảnh đón',
      floorArea: 26.4,
      wallPerimeter: 20.6,
      wallHeight: wallHeight,
      grossWallArea: +(20.6 * wallHeight).toFixed(1),
      deductionArea: 5.6,
      netWallArea: +(20.6 * wallHeight - 5.6).toFixed(1),
      ceilingArea: 26.4,
      totalSurfaceArea: +((20.6 * wallHeight - 5.6) + (includeCeiling ? 26.4 : 0)).toFixed(1),
      color: 'rgba(16, 185, 129, 0.18)',
      colorBorder: '#10b981',
    },
  ];

  // Geometric Totals
  const totalFloorArea = geometricItems.reduce((acc, r) => acc + r.floorArea, 0);
  const totalWallPerimeter = geometricItems.reduce((acc, r) => acc + r.wallPerimeter, 0);
  const totalNetWallArea = geometricItems.reduce((acc, r) => acc + r.netWallArea, 0);
  const totalCeilingArea = includeCeiling ? totalFloorArea : 0;
  const totalDeductionArea = geometricItems.reduce((acc, r) => acc + r.deductionArea, 0);
  const totalSurfaceArea = totalNetWallArea + totalCeilingArea;

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const ext = f.name.split('.').pop()?.toUpperCase() || 'DXF';
      const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
      const inferredName = f.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setUploadedFile({
        name: f.name,
        size: `${sizeMb} MB`,
        type: ext,
        format: `AutoCAD Standard ${ext}`,
        layersCount: 24,
        units: 'Millimeters (mm)',
      });
      setProjectName(inferredName || 'Dự án mới');
    }
  };

  // Start AI Scanning Simulation
  const handleStartAnalysis = () => {
    setPhase(2);
    setScanProgress(15);
    setScanStepIndex(0);

    const timer1 = setTimeout(() => {
      setScanProgress(45);
      setScanStepIndex(1);
    }, 600);

    const timer2 = setTimeout(() => {
      setScanProgress(80);
      setScanStepIndex(2);
    }, 1300);

    const timer3 = setTimeout(() => {
      setScanProgress(100);
      setScanStepIndex(3);
      setTimeout(() => {
        setPhase(3); // Jump right into geometric takeoff workspace
      }, 400);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleExportExcel = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 3000);
  };

  const handleProceedToEstimate = () => {
    if (onNavigateToEstimate) {
      onNavigateToEstimate();
    } else {
      onProceed({
        name: projectName,
        description: 'Bóc tách hình học hoàn thành từ CAD',
        floor: selectedFloor,
        fileName: uploadedFile.name,
        wallHeight,
        paintScope: includeCeiling ? ['Tường', 'Trần'] : ['Tường'],
        paintSides: '1 mặt',
        deductions: deductOpenings ? ['Trừ cửa đi', 'Trừ cửa sổ'] : [],
        coats: '2 lớp',
      });
    }
  };

  return (
    <div 
      className="min-h-full p-4 sm:p-6 lg:p-7 text-white font-sans space-y-6 transition-all duration-300"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeConfig.gridStroke} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeConfig.gridStroke} 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        backgroundColor: themeConfig.bgCanvas
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP STREAMLINED PROGRESS STEPPER (Bóc tách hình học thuần túy)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full ${themeConfig.accentBadgeBg} text-[11px] font-semibold`}>
              Bóc tách hình học CAD
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs font-mono">{uploadedFile.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            {phase === 1 && 'Tải bản vẽ CAD & Đo đạc hình học'}
            {phase === 2 && 'AI đang trích xuất chu vi & diện tích...'}
            {phase === 3 && 'Bảng bóc tách khối lượng hình học (Takeoff Sheet)'}
          </h1>
        </div>

        {/* 3-Step Pill Bar */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0e1424] border border-white/10 text-xs self-start sm:self-auto">
          <button
            onClick={() => setPhase(1)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium transition-all ${
              phase === 1 
                ? `${themeConfig.primaryBtn} font-bold shadow-xs` 
                : 'text-white/60 hover:text-white cursor-pointer'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${phase === 1 ? 'bg-black/20 text-white' : 'bg-white/20 text-white'}`}>1</span>
            <span>Tải bản vẽ</span>
          </button>

          <div className="w-3 h-px bg-white/20" />

          <button
            onClick={() => {
              if (phase === 1) handleStartAnalysis();
              else setPhase(2);
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium transition-all ${
              phase === 2 
                ? `${themeConfig.primaryBtn} font-bold shadow-xs` 
                : 'text-white/60 hover:text-white cursor-pointer'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${phase === 2 ? 'bg-black/20 text-white' : 'bg-white/20 text-white'}`}>2</span>
            <span>Quét CAD</span>
          </button>

          <div className="w-3 h-px bg-white/20" />

          <button
            onClick={() => setPhase(3)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium transition-all ${
              phase === 3 
                ? `${themeConfig.primaryBtn} font-bold shadow-xs` 
                : 'text-white/60 hover:text-white cursor-pointer'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${phase === 3 ? 'bg-black/20 text-white' : 'bg-white/20 text-white'}`}>3</span>
            <span>Bảng bóc tách</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 1: TẢI BẢN VẼ & CẤU HÌNH THÔNG SỐ HÌNH HỌC
          (Không tính sơn ở bước này)
      ───────────────────────────────────────────────────────────── */}
      {phase === 1 && (
        <div className="max-w-3xl mx-auto space-y-6 pt-2">
          
          {/* File Upload Hero Dropzone */}
          <div className={`rounded-2xl ${themeConfig.cardBg} border border-white/10 p-6 space-y-5 shadow-xl relative overflow-hidden`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".dwg,.dxf,.pdf"
              className="hidden"
            />

            {/* Dropzone Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const f = e.dataTransfer.files[0];
                  const ext = f.name.split('.').pop()?.toUpperCase() || 'DXF';
                  const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
                  setUploadedFile({
                    name: f.name,
                    size: `${sizeMb} MB`,
                    type: ext,
                    format: `AutoCAD Standard ${ext}`,
                    layersCount: 24,
                    units: 'Millimeters (mm)',
                  });
                }
              }}
              className={`border-2 border-dashed ${themeConfig.cadDropzone} rounded-2xl p-7 text-center transition-all cursor-pointer group`}
            >
              <div className={`w-12 h-12 mx-auto rounded-2xl ${themeConfig.cadCloudIcon} flex items-center justify-center group-hover:scale-105 transition-transform mb-3`}>
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Kéo thả bản vẽ CAD vào đây hoặc bấm để chọn tệp
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Hỗ trợ tệp <span className={`${themeConfig.accentText} font-semibold`}>AutoCAD (.DWG, .DXF)</span> và <span className={`${themeConfig.accentText} font-semibold`}>PDF vector</span> (Tối đa 100MB)
              </p>
            </div>

            {/* Ready File Badge */}
            <div className={`p-3.5 rounded-xl ${themeConfig.cardBg} border ${themeConfig.accentBorder} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg ${themeConfig.accentIconBg} flex items-center justify-center shrink-0`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-2">
                    <span>{uploadedFile.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium">
                      Bản vẽ đã sẵn sàng
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 mt-0.5">
                    {uploadedFile.size} • {uploadedFile.format} • Đơn vị: {uploadedFile.units}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium cursor-pointer transition-colors shrink-0"
              >
                Đổi file khác
              </button>
            </div>

            {/* Smart Geometric Defaults (NO PAINT LOGIC HERE) */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#fbbf24]" />
                  <span>Thông số hình học bóc tách</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">
                  ✓ Chuẩn đo đạc TCVN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 mb-1">
                    Tên công trình / Dự án
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#080d18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Floor Select */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 mb-1">
                    Mặt bằng / Tầng bóc tách
                  </label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="w-full bg-[#080d18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Tầng 1 (Floor 01)" className="bg-[#0e1424]">Tầng 1 (Floor 01) - 188.5 m² sàn</option>
                    <option value="Tầng 2 (Floor 02)" className="bg-[#0e1424]">Tầng 2 (Floor 02) - 188.5 m² sàn</option>
                    <option value="Tầng 3 (Floor 03)" className="bg-[#0e1424]">Tầng 3 (Floor 03) - 188.5 m² sàn</option>
                  </select>
                </div>

                {/* Wall Height (Pure Geometry) */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 mb-1">
                    Chiều cao tường thiết kế (H)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={wallHeight}
                      onChange={(e) => setWallHeight(parseFloat(e.target.value) || 3.0)}
                      className="w-full bg-[#080d18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-xs text-white/50 shrink-0">mét</span>
                  </div>
                </div>

                {/* Scope of Surface */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 mb-1">
                    Phạm vi trích xuất diện tích
                  </label>
                  <select
                    value={includeCeiling ? 'wall_and_ceiling' : 'wall_only'}
                    onChange={(e) => setIncludeCeiling(e.target.value === 'wall_and_ceiling')}
                    className="w-full bg-[#080d18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="wall_and_ceiling" className="bg-[#0e1424]">Diện tích Tường + Diện tích Trần</option>
                    <option value="wall_only" className="bg-[#0e1424]">Chỉ bóc tách Diện tích Tường</option>
                  </select>
                </div>
              </div>

              {/* Deductions check */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#080d18] border border-white/10 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-white/80">
                  <input
                    type="checkbox"
                    checked={deductOpenings}
                    onChange={(e) => setDeductOpenings(e.target.checked)}
                    className="rounded accent-amber-500"
                  />
                  <span>Tự động trừ diện tích khẩu độ cửa đi & cửa sổ</span>
                </label>
                <span className={`text-[11px] ${themeConfig.accentText} font-mono font-semibold`}>
                  8 cửa phát hiện (38.4 m²)
                </span>
              </div>

              {/* Collapsible CAD Metadata */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="w-full p-2.5 px-3 bg-[#080d18]/60 hover:bg-[#080d18] flex items-center justify-between text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Layers className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
                    <span>Xem chi tiết lớp bản vẽ & tọa độ CAD (24 layer)</span>
                  </div>
                  {isDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isDetailsExpanded && (
                  <div className="p-3 bg-[#080d18] text-[11px] space-y-2 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-2 text-white/70">
                      <div>Tọa độ X: 0 đến 48,250 mm</div>
                      <div>Tọa độ Y: 0 đến 32,180 mm</div>
                      <div>Layer tường: A-WALL, WALL-INT</div>
                      <div>Layer cửa: A-DOOR, A-GLAZ</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDraftSaved(true);
                  if (onSaveDraft) onSaveDraft();
                  setTimeout(() => setIsDraftSaved(false), 2000);
                }}
                className={`px-4 py-2.5 rounded-xl ${themeConfig.secondaryBtn} text-xs flex items-center gap-2 transition-all cursor-pointer`}
              >
                <Bookmark className={`w-4 h-4 ${themeConfig.accentText}`} />
                <span>{isDraftSaved ? 'Đã lưu nháp ✓' : 'Lưu hồ sơ nháp'}</span>
              </button>

              <button
                type="button"
                onClick={handleStartAnalysis}
                className={`px-6 py-2.5 rounded-xl ${themeConfig.primaryBtn} active:scale-98 text-xs flex items-center gap-2.5 transition-all cursor-pointer`}
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Bắt đầu bóc tách hình học ⚡</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Value Banner */}
          <div className={`p-3.5 rounded-xl ${themeConfig.cardBg} border ${themeConfig.accentBorder} flex items-center gap-3 text-xs text-white/80`}>
            <ShieldCheck className={`w-5 h-5 ${themeConfig.accentText} shrink-0`} />
            <span>
              Hệ thống sẽ trích xuất <strong>chu vi, diện tích sàn, diện tích tường gộp và diện tích tường net</strong>. Thông số định mức sơn và dự toán chi phí sẽ được tính ở tab Dự toán riêng biệt.
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 2: QUÉT AI TRỰC QUAN (Visual CAD Radar Scan)
      ───────────────────────────────────────────────────────────── */}
      {phase === 2 && (
        <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
          <div 
            className="relative w-64 h-64 mx-auto rounded-3xl p-4 overflow-hidden flex items-center justify-center border-2 transition-all"
            style={{
              backgroundColor: themeConfig.bgCanvas,
              borderColor: `${themeConfig.iconColor}55`,
              boxShadow: `0 0 50px ${themeConfig.iconColor}33`
            }}
          >
            
            {/* Animated Laser Scanning Beam */}
            <div 
              className="absolute left-0 right-0 h-1 pointer-events-none transition-all duration-300"
              style={{
                top: `${(scanProgress % 100)}%`,
                background: `linear-gradient(to right, transparent, ${themeConfig.iconColor}, transparent)`,
                boxShadow: `0 0 15px ${themeConfig.iconColor}`,
                animation: 'pulse 1s infinite'
              }}
            />

            {/* Background Vector Preview during scan */}
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
              <rect x="20" y="20" width="160" height="160" fill="none" stroke={themeConfig.cadOuterWall} strokeWidth="2" />
              <line x1="20" y1="90" x2="180" y2="90" stroke={themeConfig.cadOuterWall} strokeWidth="1.5" />
              <line x1="20" y1="120" x2="180" y2="120" stroke={themeConfig.cadOuterWall} strokeWidth="1.5" />
              <line x1="80" y1="20" x2="80" y2="90" stroke={themeConfig.cadOuterWall} strokeWidth="1.5" />
              <line x1="140" y1="20" x2="140" y2="90" stroke={themeConfig.cadOuterWall} strokeWidth="1.5" />
              {scanProgress > 30 && (
                <rect x="25" y="25" width="50" height="60" fill={themeConfig.roomColors.room1.fill} />
              )}
              {scanProgress > 60 && (
                <rect x="85" y="25" width="50" height="60" fill={themeConfig.roomColors.room2.fill} />
              )}
              {scanProgress > 85 && (
                <rect x="145" y="25" width="30" height="60" fill={themeConfig.roomColors.room3.fill} />
              )}
            </svg>

            {/* Center Spinning Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-20 h-20 rounded-full border-2 border-white/10 animate-spin"
                style={{ borderTopColor: themeConfig.iconColor }}
              />
            </div>
            
            <div 
              className="absolute text-lg font-bold font-mono"
              style={{ color: themeConfig.iconColor }}
            >
              {scanProgress}%
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">
              AI đang đo đạc & bóc tách kích thước hình học
            </h2>
            <p className="text-xs text-white/50">
              Trích xuất tọa độ ranh giới tường, diện tích sàn và diện tích trừ cửa...
            </p>
          </div>

          {/* 3 Step Geometric Status Indicators */}
          <div className="max-w-md mx-auto space-y-2 text-xs text-left">
            <div className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
              scanStepIndex >= 1 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : `${themeConfig.cardBg} border-white/10 text-white/40`
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Khép kín ranh giới tường & tính diện tích sàn 6 phòng</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
              scanStepIndex >= 2 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : `${themeConfig.cardBg} border-white/10 text-white/40`
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Đo chu vi tường & tính diện tích tường thô theo chiều cao {wallHeight}m</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
              scanStepIndex >= 3 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : `${themeConfig.cardBg} border-white/10 text-white/40`
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Nhận diện 8 cửa đi/sổ và khấu trừ để tính diện tích tường net</span>
            </div>
          </div>

          <button
            onClick={() => setPhase(3)}
            className={`text-xs ${themeConfig.accentText} hover:underline cursor-pointer pt-2 font-medium`}
          >
            Bỏ qua & Xem ngay kết quả bóc tách →
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 3: BẢNG BÓC TÁCH KHỐI LƯỢNG HÌNH HỌC HỢP NHẤT (CAD + TAKE-OFF)
          (CHỈ BÓC TÁCH HÌNH HỌC - TÍNH SƠN Ở TAB KHÁC)
      ───────────────────────────────────────────────────────────── */}
      {phase === 3 && (
        <div className="space-y-4">
          
          {/* Top Geometric Summary Bar */}
          <div className={`rounded-2xl ${themeConfig.cardBg} border border-white/10 p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl`}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <div>
                <span className="text-white/50 block text-[10px]">TỔNG DIỆN TÍCH SÀN</span>
                <span className="font-bold text-white text-sm sm:text-base font-mono">
                  {totalFloorArea.toFixed(1)} m²
                </span>
              </div>
              <div className="h-7 w-px bg-white/10" />
              <div>
                <span className="text-white/50 block text-[10px]">TỔNG CHU VI TƯỜNG</span>
                <span className="font-bold text-white/90 text-sm sm:text-base font-mono">
                  {totalWallPerimeter.toFixed(1)} m
                </span>
              </div>
              <div className="h-7 w-px bg-white/10" />
              <div>
                <span className="text-white/50 block text-[10px]">DIỆN TÍCH TƯỜNG (NET)</span>
                <span className={`font-bold ${themeConfig.accentText} text-sm sm:text-base font-mono`}>
                  {totalNetWallArea.toFixed(1)} m²
                </span>
              </div>
              <div className="h-7 w-px bg-white/10" />
              <div>
                <span className="text-white/50 block text-[10px]">DIỆN TÍCH TRẦN</span>
                <span className="font-bold text-white/80 text-sm sm:text-base font-mono">
                  {totalCeilingArea.toFixed(1)} m²
                </span>
              </div>
              <div className="h-7 w-px bg-white/10" />
              <div>
                <span className="text-white/50 block text-[10px]">TỔNG BỀ MẶT BÓC TÁCH</span>
                <span className="font-bold text-emerald-400 text-sm sm:text-base font-mono">
                  {totalSurfaceArea.toFixed(1)} m²
                </span>
              </div>
            </div>

            {/* Quick Export & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportExcel}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                title="Xuất bảng khối lượng Excel"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>{isExported ? 'Đã tải Excel ✓' : 'Xuất Excel'}</span>
              </button>

              <button
                onClick={handleProceedToEstimate}
                className={`px-4 py-2 rounded-xl ${themeConfig.primaryBtn} active:scale-98 text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm`}
                title="Chuyển sang tab Dự toán chi phí & Tính sơn"
              >
                <Calculator className="w-4 h-4 stroke-[2.5]" />
                <span>Chuyển sang Tab Tính Sơn & Dự toán →</span>
              </button>
            </div>
          </div>

          {/* Unified 2-Column Split Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* ============================================================
                LEFT PANE (7 of 12 cols): Interactive CAD Blueprint
            ============================================================ */}
            <div className={`lg:col-span-7 rounded-2xl ${themeConfig.cardBg} border border-white/10 p-4 space-y-3 shadow-xl`}>
              
              {/* CAD Controls Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${themeConfig.accentBadgeBg} flex items-center justify-center`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Mặt bằng kích thước hình học</h3>
                    <p className="text-[10px] text-white/50">Di chuột hoặc bấm vào phòng để xem chi tiết kích thước</p>
                  </div>
                </div>

                {/* View toggles */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080d18] border border-white/10 text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.0))}
                    className="p-1 text-white/70 hover:text-white rounded cursor-pointer"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
                    className="p-1 text-white/70 hover:text-white rounded cursor-pointer"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className={`px-2 py-0.5 text-[11px] ${themeConfig.accentText} hover:text-white font-mono cursor-pointer`}
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                </div>
              </div>

              {/* CAD Blueprint Stage */}
              <div className={`relative rounded-2xl bg-[#080d18] border ${themeConfig.accentBorder} h-[400px] sm:h-[450px] overflow-hidden flex items-center justify-center p-3 select-none`}>
                
                {/* CAD Grid Lines */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, ${themeConfig.cadOuterWall} 1px, transparent 1px),
                      linear-gradient(to bottom, ${themeConfig.cadOuterWall} 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* SVG Blueprint */}
                <svg
                  viewBox="0 0 900 620"
                  className="w-full h-full max-h-full transition-transform duration-150"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Outer Walls */}
                  <rect x="160" y="80" width="580" height="430" fill="#0b101d" stroke={themeConfig.cadOuterWall} strokeWidth="2.5" />
                  
                  {/* Top Dimensions */}
                  <g>
                    <line x1="160" y1="50" x2="740" y2="50" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <line x1="160" y1="42" x2="160" y2="58" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <line x1="740" y1="42" x2="740" y2="58" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <text x="450" y="44" fill={themeConfig.cadLabelText} fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      18200 mm
                    </text>
                  </g>

                  {/* Left Dimensions */}
                  <g>
                    <line x1="135" y1="80" x2="135" y2="510" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <line x1="127" y1="80" x2="143" y2="80" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <line x1="127" y1="510" x2="143" y2="510" stroke={themeConfig.cadOuterWall} strokeWidth="1" />
                    <text x="130" y="295" fill={themeConfig.cadLabelText} fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 130 295)" fontFamily="monospace">
                      12600 mm
                    </text>
                  </g>

                  {/* ROOM 1: OFFICE 01 */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-01')}
                    onMouseEnter={() => setHoveredRoomId('room-01')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="165" 
                      y="85" 
                      width="190" 
                      height="190" 
                      fill={selectedRoomId === 'room-01' ? themeConfig.roomColors.room1.fill : hoveredRoomId === 'room-01' ? themeConfig.roomColors.room1.fill : 'rgba(56, 189, 248, 0.08)'}
                      stroke={selectedRoomId === 'room-01' ? themeConfig.roomColors.room1.stroke : themeConfig.cadInnerWall}
                      strokeWidth={selectedRoomId === 'room-01' ? '2.5' : '1.5'}
                    />
                    <text x="260" y="165" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      OFFICE 01
                    </text>
                    <text x="260" y="185" fill={themeConfig.roomColors.room1.stroke} fontSize="11" textAnchor="middle" fontFamily="monospace">
                      S: 28.5 m² • P: 21.4 m
                    </text>
                    <text x="260" y="202" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      Tường Net: 59.4 m²
                    </text>
                  </g>

                  {/* ROOM 2: OFFICE 02 */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-02')}
                    onMouseEnter={() => setHoveredRoomId('room-02')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="360" 
                      y="85" 
                      width="195" 
                      height="190" 
                      fill={selectedRoomId === 'room-02' ? themeConfig.roomColors.room2.fill : hoveredRoomId === 'room-02' ? themeConfig.roomColors.room2.fill : 'rgba(14, 165, 233, 0.08)'}
                      stroke={selectedRoomId === 'room-02' ? themeConfig.roomColors.room2.stroke : themeConfig.cadInnerWall}
                      strokeWidth={selectedRoomId === 'room-02' ? '2.5' : '1.5'}
                    />
                    <text x="457" y="165" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      OFFICE 02
                    </text>
                    <text x="457" y="185" fill={themeConfig.roomColors.room2.stroke} fontSize="11" textAnchor="middle" fontFamily="monospace">
                      S: 32.0 m² • P: 22.8 m
                    </text>
                    <text x="457" y="202" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      Tường Net: 63.2 m²
                    </text>
                  </g>

                  {/* ROOM 3: MEETING ROOM */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-03')}
                    onMouseEnter={() => setHoveredRoomId('room-03')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="560" 
                      y="85" 
                      width="175" 
                      height="190" 
                      fill={selectedRoomId === 'room-03' ? themeConfig.roomColors.room3.fill : hoveredRoomId === 'room-03' ? themeConfig.roomColors.room3.fill : 'rgba(99, 102, 241, 0.08)'}
                      stroke={selectedRoomId === 'room-03' ? themeConfig.roomColors.room3.stroke : themeConfig.cadInnerWall}
                      strokeWidth={selectedRoomId === 'room-03' ? '2.5' : '1.5'}
                    />
                    <text x="647" y="165" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      MEETING ROOM
                    </text>
                    <text x="647" y="185" fill={themeConfig.roomColors.room3.stroke} fontSize="11" textAnchor="middle" fontFamily="monospace">
                      S: 34.2 m² • P: 23.6 m
                    </text>
                    <text x="647" y="202" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      Tường Net: 64.4 m²
                    </text>
                  </g>

                  {/* ROOM 4: CORRIDOR */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-04')}
                    onMouseEnter={() => setHoveredRoomId('room-04')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="165" 
                      y="280" 
                      width="570" 
                      height="80" 
                      fill={selectedRoomId === 'room-04' ? themeConfig.roomColors.room4.fill : hoveredRoomId === 'room-04' ? themeConfig.roomColors.room4.fill : 'rgba(20, 184, 166, 0.08)'}
                      stroke={selectedRoomId === 'room-04' ? themeConfig.roomColors.room4.stroke : themeConfig.cadInnerWall}
                      strokeWidth={selectedRoomId === 'room-04' ? '2.5' : '1.5'}
                    />
                    <text x="450" y="325" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      CORRIDOR (Hành lang: 48.6 m² sàn • P: 36.4 m • Tường Net: 96.6 m²)
                    </text>
                  </g>

                  {/* ROOM 5: STORAGE & WC */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-05')}
                    onMouseEnter={() => setHoveredRoomId('room-05')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="165" 
                      y="365" 
                      width="260" 
                      height="140" 
                      fill={selectedRoomId === 'room-05' ? 'rgba(168, 85, 247, 0.35)' : hoveredRoomId === 'room-05' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.08)'}
                      stroke={selectedRoomId === 'room-05' ? '#c084fc' : '#a855f7'}
                      strokeWidth={selectedRoomId === 'room-05' ? '2.5' : '1.5'}
                    />
                    <text x="295" y="435" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      STORAGE & WC
                    </text>
                    <text x="295" y="455" fill="#c084fc" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      S: 19.8 m² • P: 18.2 m • Tường Net: 50.8 m²
                    </text>
                  </g>

                  {/* ROOM 6: MAIN LOBBY */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedRoomId('room-06')}
                    onMouseEnter={() => setHoveredRoomId('room-06')}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <rect 
                      x="430" 
                      y="365" 
                      width="305" 
                      height="140" 
                      fill={selectedRoomId === 'room-06' ? 'rgba(16, 185, 129, 0.35)' : hoveredRoomId === 'room-06' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.08)'}
                      stroke={selectedRoomId === 'room-06' ? '#34d399' : '#10b981'}
                      strokeWidth={selectedRoomId === 'room-06' ? '2.5' : '1.5'}
                    />
                    <text x="580" y="435" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      MAIN LOBBY
                    </text>
                    <text x="580" y="455" fill="#34d399" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      S: 26.4 m² • P: 20.6 m • Tường Net: 56.2 m²
                    </text>
                  </g>
                </svg>

                {/* Auto-Healed Badge (Smart UX) */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-[#080d18]/90 border border-emerald-500/30 text-[11px] text-emerald-400 flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI đã khép kín chu vi và trừ 8 cửa đi/sổ (38.4 m²)</span>
                </div>
              </div>

              {/* Bottom Quick Jump Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-white/50">Cần chỉnh sửa đường bao hình học chuyên sâu?</span>
                <button
                  onClick={() => {
                    if (onNavigateToReview) onNavigateToReview();
                    else handleProceedToEstimate();
                  }}
                  className={`${themeConfig.accentText} hover:underline flex items-center gap-1 cursor-pointer font-medium`}
                >
                  <span>Mở trung tâm kiểm tra hình học</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ============================================================
                RIGHT PANE (5 of 12 cols): Pure Geometric Takeoff Sheet
            ============================================================ */}
            <div className={`lg:col-span-5 rounded-2xl ${themeConfig.cardBg} border border-white/10 p-4 space-y-3.5 shadow-xl`}>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${themeConfig.accentBadgeBg} flex items-center justify-center`}>
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Bảng kích thước & diện tích phòng</h3>
                    <p className="text-[10px] text-white/50">Chiều cao tường: {wallHeight}m • Khấu trừ cửa đi/sổ</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full ${themeConfig.accentBadgeBg} text-[10px] font-mono`}>
                  6 phân khu
                </span>
              </div>

              {/* Geometric Takeoff Rows */}
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {geometricItems.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  const isHovered = hoveredRoomId === room.id;
                  
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      onMouseEnter={() => setHoveredRoomId(room.id)}
                      onMouseLeave={() => setHoveredRoomId(null)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? `${themeConfig.accentBorder} shadow-sm` 
                          : isHovered 
                          ? 'bg-white/5 border-white/20'
                          : 'bg-[#080d18] border-white/10 hover:border-white/20'
                      }`}
                      style={isSelected ? { backgroundColor: `${themeConfig.iconColor}15` } : undefined}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: room.colorBorder }} 
                          />
                          <span className="text-xs font-bold text-white">{room.name}</span>
                          <span className="text-[10px] text-white/40">({room.type})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-400 font-mono">
                            {room.totalSurfaceArea} m²
                          </span>
                          <span className="text-[9px] text-white/40 block">bề mặt</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-[11px] text-white/60 pt-1 border-t border-white/5 font-mono">
                        <div>
                          <span className="text-[9px] text-white/40 block">SÀN:</span>
                          {room.floorArea} m²
                        </div>
                        <div>
                          <span className="text-[9px] text-white/40 block">CHU VI:</span>
                          {room.wallPerimeter} m
                        </div>
                        <div>
                          <span className="text-[9px] text-white/40 block">TRỪ CỬA:</span>
                          -{room.deductionArea} m²
                        </div>
                        <div>
                          <span className="text-[9px] text-white/40 block">TƯỜNG NET:</span>
                          {room.netWallArea} m²
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Grand Summary Card (Pure Takeoff Data) */}
              <div className={`p-3.5 rounded-xl ${themeConfig.cardBg} border ${themeConfig.accentBorder} space-y-2 shadow-sm`}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Tổng diện tích tường net (sau trừ cửa):</span>
                  <span className={`font-bold ${themeConfig.accentText} font-mono text-sm`}>
                    {totalNetWallArea.toFixed(1)} m²
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Tổng diện tích trần (nếu bóc tách):</span>
                  <span className="font-bold text-white/80 font-mono text-sm">
                    {totalCeilingArea.toFixed(1)} m²
                  </span>
                </div>
                <div className="pt-1.5 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-white font-semibold">Tổng diện tích bề mặt hoàn thiện:</span>
                  <span className="font-bold text-emerald-400 font-mono text-base">
                    {totalSurfaceArea.toFixed(1)} m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
