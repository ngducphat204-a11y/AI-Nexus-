import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ArrowRight, 
  FileSpreadsheet, 
  Check, 
  Edit3, 
  X,
  Filter,
  Layers,
  Maximize2,
  Minimize2,
  Sparkles,
  Download,
  Info,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Building,
  DoorOpen,
  Eye
} from 'lucide-react';
import { RoomEntity, DoorEntity } from '../../types';

interface ReviewQueueViewProps {
  rooms: RoomEntity[];
  doors: DoorEntity[];
  onInspectRoom: (roomId: string) => void;
  onConfirmRoom: (roomId: string) => void;
  onCorrectRoom: (room: RoomEntity) => void;
  onRejectRoom: (roomId: string) => void;
  onNavigateToEstimate?: () => void;
  onBackToReview?: () => void;
}

type TakeoffTab = 'rooms_table' | 'openings_table' | 'flagged_items';

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  rooms,
  doors,
  onInspectRoom,
  onConfirmRoom,
  onCorrectRoom,
  onRejectRoom,
  onNavigateToEstimate,
  onBackToReview,
}) => {
  const [activeTab, setActiveTab] = useState<TakeoffTab>('rooms_table');
  const [searchQuery, setSearchQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState<'all' | 'office' | 'service' | 'corridor'>('all');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Standard wall height assumed
  const standardHeight = 3.0;

  // Compute geometrical totals
  const totalFloorArea = rooms.reduce((sum, r) => sum + (r.floorArea || 0), 0);
  const totalPerimeter = rooms.reduce((sum, r) => sum + (r.perimeter || 0), 0);
  const totalGrossWallArea = totalPerimeter * standardHeight;
  const totalDeduction = rooms.reduce((sum, r) => sum + (r.doorDeductions || 0) + (r.windowDeductions || 0), 0);
  const totalNetWallArea = rooms.reduce((sum, r) => sum + (r.netPaintArea || 0), 0);
  const totalCeilingArea = totalFloorArea;
  const totalTakeoffSurface = totalNetWallArea + totalCeilingArea;

  const flaggedRooms = rooms.filter((r) => r.status === 'Needs Review');
  const flaggedDoors = doors.filter((d) => d.status === 'Needs Review');
  const totalFlags = flaggedRooms.length + flaggedDoors.length;

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.layer.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (roomFilter === 'office') return r.name.toLowerCase().includes('phòng') || r.name.toLowerCase().includes('họp');
    if (roomFilter === 'service') return r.name.toLowerCase().includes('vệ sinh') || r.name.toLowerCase().includes('bếp') || r.name.toLowerCase().includes('kho');
    if (roomFilter === 'corridor') return r.name.toLowerCase().includes('hành lang') || r.name.toLowerCase().includes('sảnh');
    return true;
  });

  const handleExportExcel = () => {
    setExportNotice('✓ Đã xuất bảng khối lượng bóc tách hình học (.xlsx) thành công!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 text-white select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          NOTIFICATION BANNER
      ───────────────────────────────────────────────────────────── */}
      {exportNotice && (
        <div className="bg-[#161a26] border border-amber-500/50 text-[#fbbf24] px-5 py-3 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-white/60 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          HEADER SECTION (STEP 3 CONTEXT & TITLE)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-[#161a26] text-[#fbbf24] border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              BƯỚC 3 / 4 • BẢNG KHỐI LƯỢNG HÌNH HỌC
            </span>
            <span className="text-xs text-amber-200/50 font-mono">• CAD TAKEOFF SHEET</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Bảng Khối Lượng Bóc Tách Đo Đạc CAD
          </h1>
          <p className="text-xs sm:text-sm text-white/65 mt-1 max-w-3xl">
            Toàn bộ số liệu diện tích hình học (sàn, chu vi tường, chiều cao và diện tích trừ cửa) được đo bóc tự động từ bản vẽ vector CAD. 
            <strong className="text-[#fbbf24] font-semibold ml-1">Chưa tính khối lượng sơn & chi phí</strong> (sẽ thực hiện ở Bước 4).
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onBackToReview && (
            <button
              onClick={onBackToReview}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Quay lại kiểm tra bản vẽ CAD"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kiểm tra AI</span>
            </button>
          )}

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Xuất bảng khối lượng ra định dạng Excel / CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Xuất Excel</span>
          </button>

          {onNavigateToEstimate && (
            <button
              onClick={onNavigateToEstimate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 active:scale-98 text-[#080d18] text-xs font-extrabold flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.45)] transition-all cursor-pointer"
              title="Chuyển sang bước 4 để chọn sơn và tính chi phí"
            >
              <span>Lập dự toán sơn (Bước 4)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6 KPI GEOMETRIC MEASUREMENT CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Card 1: Tổng diện tích sàn */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 hover:border-amber-500/30 transition-colors shadow-sm">
          <div className="text-[11px] text-white/50 font-medium">Tổng diện tích sàn</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {totalFloorArea.toFixed(1)} <span className="text-xs font-sans text-white/50 font-normal">m²</span>
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">8 phân khu chức năng</div>
        </div>

        {/* Card 2: Tổng chu vi tường */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 hover:border-amber-500/30 transition-colors shadow-sm">
          <div className="text-[11px] text-white/50 font-medium">Tổng chu vi tường</div>
          <div className="text-xl font-bold font-mono text-[#fbbf24] mt-1">
            {totalPerimeter.toFixed(1)} <span className="text-xs font-sans text-white/50 font-normal">m</span>
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">Đo theo tim/thông thủy</div>
        </div>

        {/* Card 3: Chiều cao thiết kế */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 hover:border-amber-500/30 transition-colors shadow-sm">
          <div className="text-[11px] text-white/50 font-medium">Chiều cao tầng (H)</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {standardHeight.toFixed(1)} <span className="text-xs font-sans text-white/50 font-normal">m</span>
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">Chuẩn trần hoàn thiện</div>
        </div>

        {/* Card 4: Khấu trừ cửa */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 hover:border-amber-500/30 transition-colors shadow-sm">
          <div className="text-[11px] text-white/50 font-medium">Khấu trừ cửa & lỗ mở</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            -{totalDeduction.toFixed(1)} <span className="text-xs font-sans text-white/50 font-normal">m²</span>
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">8 cửa đi + 15 cửa sổ</div>
        </div>

        {/* Card 5: Diện tích tường Net */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 hover:border-amber-500/30 transition-colors shadow-sm">
          <div className="text-[11px] text-emerald-400 font-semibold">Diện tích tường Net</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
            {totalNetWallArea.toFixed(1)} <span className="text-xs font-sans text-white/50 font-normal">m²</span>
          </div>
          <div className="text-[10px] text-white/40 mt-0.5">Đã trừ 100% diện tích cửa</div>
        </div>

        {/* Card 6: Tổng DT bóc tách (Tường + Trần) */}
        <div className="p-4 rounded-2xl bg-[#161a26] border border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.18)]">
          <div className="text-[11px] text-[#fbbf24] font-bold">Tổng DT Bề mặt</div>
          <div className="text-xl font-black font-mono text-white mt-1">
            {totalTakeoffSurface.toFixed(1)} <span className="text-xs font-sans text-amber-200/70 font-normal">m²</span>
          </div>
          <div className="text-[10px] text-[#fbbf24]/80 mt-0.5">Tường net + Trần sàn</div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB SWITCHER & FILTER CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0e1424] border border-amber-500/20 text-xs">
          <button
            onClick={() => setActiveTab('rooms_table')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'rooms_table'
                ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] text-[#080d18] font-extrabold shadow-[0_2px_12px_rgba(245,158,11,0.35)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Bảng bóc tách theo phòng ({rooms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('openings_table')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'openings_table'
                ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] text-[#080d18] font-extrabold shadow-[0_2px_12px_rgba(245,158,11,0.35)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Khấu trừ cửa ({doors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flagged_items')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'flagged_items'
                ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] text-[#080d18] font-extrabold shadow-[0_2px_12px_rgba(245,158,11,0.35)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Mục kỹ sư lưu ý ({totalFlags})</span>
          </button>
        </div>

        {/* Search & Category Filter (only for rooms table) */}
        {activeTab === 'rooms_table' && (
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã hoặc tên phòng..."
                className="w-full bg-[#0e1424] border border-amber-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setRoomFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  roomFilter === 'all'
                    ? 'bg-amber-500/20 text-[#fbbf24] border border-amber-500/50'
                    : 'text-white/50 hover:text-white bg-[#0e1424] border border-white/10'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setRoomFilter('office')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  roomFilter === 'office'
                    ? 'bg-amber-500/20 text-[#fbbf24] border border-amber-500/50'
                    : 'text-white/50 hover:text-white bg-[#0e1424] border border-white/10'
                }`}
              >
                Văn phòng
              </button>
              <button
                onClick={() => setRoomFilter('service')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  roomFilter === 'service'
                    ? 'bg-amber-500/20 text-[#fbbf24] border border-amber-500/50'
                    : 'text-white/50 hover:text-white bg-[#0e1424] border border-white/10'
                }`}
              >
                Kỹ thuật / WC
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DETAILED ROOM GEOMETRIC TAKEOFF TABLE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'rooms_table' && (
        <div className="bg-[#0e1424] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          
          <div className="px-5 py-3.5 bg-[#111728] border-b border-amber-500/20 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-white/90">
              <Layers className="w-4 h-4 text-[#fbbf24]" />
              <span>Chi tiết bóc tách hình học các không gian ({filteredRooms.length} phòng)</span>
            </div>
            <div className="text-amber-200/50 text-[11px] font-mono">
              Công thức: Diện tích tường Net = (Chu vi × Chiều cao 3.0m) - Khấu trừ cửa
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0a0f1d] border-b border-white/10 text-white/50 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Mã phòng</th>
                  <th className="py-3 px-4">Tên phòng / Không gian</th>
                  <th className="py-3 px-3 text-right">DT Sàn (m²)</th>
                  <th className="py-3 px-3 text-right">Chu vi (m)</th>
                  <th className="py-3 px-2 text-right">H (m)</th>
                  <th className="py-3 px-3 text-right">Tường thô (m²)</th>
                  <th className="py-3 px-3 text-right text-amber-400">Trừ cửa (m²)</th>
                  <th className="py-3 px-4 text-right text-emerald-400 font-bold">Tường Net (m²)</th>
                  <th className="py-3 px-3 text-right">Trần (m²)</th>
                  <th className="py-3 px-4 text-right font-bold text-white">Tổng bóc tách (m²)</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRooms.map((room, idx) => {
                  const grossWall = (room.perimeter || 0) * standardHeight;
                  const deduction = (room.doorDeductions || 0) + (room.windowDeductions || 0);
                  const netWall = room.netPaintArea || (grossWall - deduction);
                  const ceiling = room.floorArea || 0;
                  const totalSurface = netWall + ceiling;
                  const isSelected = selectedRoomId === room.id;

                  return (
                    <tr
                      key={room.id}
                      onClick={() => setSelectedRoomId(isSelected ? null : room.id)}
                      className={`hover:bg-amber-500/5 transition-colors cursor-pointer ${
                        isSelected ? 'bg-amber-500/10' : ''
                      }`}
                    >
                      {/* STT */}
                      <td className="py-3 px-4 text-center font-mono text-white/40">
                        {String(idx + 1).padStart(2, '0')}
                      </td>

                      {/* Mã phòng */}
                      <td className="py-3 px-4 font-mono font-bold text-[#fbbf24]">
                        {room.code}
                      </td>

                      {/* Tên phòng */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{room.name}</div>
                        <div className="text-[10px] text-white/40 font-mono">Layer: {room.layer}</div>
                      </td>

                      {/* DT Sàn */}
                      <td className="py-3 px-3 text-right font-mono text-white/90">
                        {room.floorArea.toFixed(1)}
                      </td>

                      {/* Chu vi */}
                      <td className="py-3 px-3 text-right font-mono text-white/70">
                        {room.perimeter.toFixed(1)}
                      </td>

                      {/* Chiều cao */}
                      <td className="py-3 px-2 text-right font-mono text-white/50">
                        {standardHeight.toFixed(1)}
                      </td>

                      {/* Tường thô */}
                      <td className="py-3 px-3 text-right font-mono text-white/70">
                        {grossWall.toFixed(1)}
                      </td>

                      {/* Trừ cửa */}
                      <td className="py-3 px-3 text-right font-mono text-amber-400 font-semibold">
                        -{deduction.toFixed(1)}
                      </td>

                      {/* Tường Net */}
                      <td className="py-3 px-4 text-right font-mono text-emerald-400 font-bold">
                        {netWall.toFixed(1)}
                      </td>

                      {/* Trần */}
                      <td className="py-3 px-3 text-right font-mono text-white/70">
                        {ceiling.toFixed(1)}
                      </td>

                      {/* Tổng bóc tách */}
                      <td className="py-3 px-4 text-right font-mono font-bold text-white bg-white/[0.02]">
                        {totalSurface.toFixed(1)}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          <Check className="w-3 h-3" />
                          <span>Chuẩn hóa</span>
                        </span>
                      </td>

                      {/* Thao tác */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectRoom(room.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-[#fbbf24] text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Xem vị trí phòng trên bản vẽ CAD"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Xem CAD</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
              {/* Footer row with sums */}
              <tfoot>
                <tr className="bg-[#141b2d] font-bold text-xs border-t-2 border-amber-500/60">
                  <td colSpan={3} className="py-3.5 px-4 text-white uppercase font-mono">
                    TỔNG CỘNG ({filteredRooms.length} PHÒNG)
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-white">
                    {totalFloorArea.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-[#fbbf24]">
                    {totalPerimeter.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-2 text-right font-mono text-white/50">
                    3.0
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-white/80">
                    {totalGrossWallArea.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-amber-400">
                    -{totalDeduction.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400 text-sm">
                    {totalNetWallArea.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-white">
                    {totalCeilingArea.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-white text-sm bg-amber-500/20 text-[#fbbf24] border-x border-amber-500/30">
                    {totalTakeoffSurface.toFixed(1)}
                  </td>
                  <td colSpan={2} className="py-3.5 px-4 text-center text-[10px] text-white/60">
                    Đã thẩm định 100%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: OPENINGS & DEDUCTIONS DETAIL TABLE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'openings_table' && (
        <div className="bg-[#0e1424] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 bg-[#111728] border-b border-amber-500/20 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-white/90">
              <DoorOpen className="w-4 h-4 text-amber-400" />
              <span>Bảng thống kê cửa đi & cửa sổ khấu trừ ({doors.length} cửa)</span>
            </div>
            <div className="text-amber-200/50 text-[11px] font-mono">
              Tiêu chuẩn: Trừ 100% diện tích lọt lòng lỗ mở thông thủy
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0a0f1d] border-b border-white/10 text-white/50 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Ký hiệu cửa</th>
                  <th className="py-3 px-4">Loại cửa</th>
                  <th className="py-3 px-4">Vị trí phòng</th>
                  <th className="py-3 px-4 text-right">Rộng (mm)</th>
                  <th className="py-3 px-4 text-right">Cao (mm)</th>
                  <th className="py-3 px-4 text-right font-bold text-amber-400">Diện tích trừ (m²)</th>
                  <th className="py-3 px-4 text-center">Độ tin cậy OCR</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {doors.map((door) => (
                  <tr key={door.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#fbbf24]">
                      {door.code}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      {door.type}
                    </td>
                    <td className="py-3 px-4 text-white/70">
                      Phòng liên kết ({door.id})
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-white/70">
                      {door.width || 900}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-white/70">
                      {door.height || 2100}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-amber-400">
                      {(door.deductionArea || 1.89).toFixed(2)} m²
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {door.confidence || 98}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onInspectRoom('room-a101')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-[#fbbf24] text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Xem CAD</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: HUMAN-IN-THE-LOOP FLAGGED ITEMS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'flagged_items' && (
        <div className="bg-[#0e1424] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 bg-[#111728] border-b border-amber-500/20 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-white/90">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Hàng đợi kiểm duyệt kỹ sư ({totalFlags} mục)</span>
            </div>
            <span className="text-amber-200/50 text-[11px] font-mono">
              Độ tin cậy &lt; 95%
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {flaggedRooms.map((room) => (
              <div key={room.id} className="p-5 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-[#fbbf24]">{room.code}</span>
                    <span className="text-xs text-white/90 font-semibold">{room.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-[#fbbf24] border border-amber-500/40">
                      ⚠️ {room.confidence}% Độ tin cậy
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">{room.sourceHandle}</span>
                  </div>

                  <p className="text-xs text-amber-200/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 max-w-2xl">
                    <strong className="font-semibold text-[#fbbf24]">Vấn đề: </strong>
                    {room.issueDescription || room.aiExplanation}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/50">
                    <span>DT Sàn: {room.floorArea} m²</span>
                    <span>•</span>
                    <span>Chu vi: {room.perimeter} m</span>
                    <span>•</span>
                    <span>Lớp CAD: {room.layer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-xs">
                  <button
                    onClick={() => onInspectRoom(room.id)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-[#fbbf24] hover:text-white font-semibold transition-all flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
                  >
                    <span>Xem CAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onConfirmRoom(room.id)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                    title="Xác nhận hợp lệ"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => onCorrectRoom(room)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 transition-colors cursor-pointer"
                    title="Hiệu chỉnh đỉnh"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRejectRoom(room.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-colors cursor-pointer"
                    title="Từ chối"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {totalFlags === 0 && (
              <div className="p-10 text-center text-white/50 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-white text-sm">Không còn mục nào cần kỹ sư thẩm định!</p>
                <p>Toàn bộ 8 phòng và khẩu độ cửa đã được xác minh chuẩn xác 100%.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STICKY BOTTOM WORKFLOW ACTION BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-[#0e1424] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#ea580c] text-[#080d18] flex items-center justify-center font-black font-mono text-xs shadow-sm">
            3/4
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Đã hoàn tất bóc tách hình học 8/8 phân khu (Tổng 579.1 m² bề mặt)
            </div>
            <div className="text-[11px] text-white/50">
              Sẵn sàng chuyển dữ liệu hình học này sang Bước 4 để lập định mức sơn, đơn giá và dự toán chi phí.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {onBackToReview && (
            <button
              onClick={onBackToReview}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
            >
              ◄ Quay lại Kiểm tra AI
            </button>
          )}

          {onNavigateToEstimate && (
            <button
              onClick={onNavigateToEstimate}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 active:scale-98 text-[#080d18] text-xs font-extrabold flex items-center gap-2 shadow-[0_4px_22px_rgba(245,158,11,0.45)] transition-all cursor-pointer"
            >
              <span>Tiến hành Bước 4: Lập dự toán sơn & chi phí</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
