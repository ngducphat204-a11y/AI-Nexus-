import React, { useState } from 'react';
import { 
  Calculator, 
  ExternalLink, 
  CheckCircle2, 
  RotateCcw, 
  Sliders, 
  FileSpreadsheet, 
  Download, 
  ChevronDown, 
  Check,
  Edit2,
  ArrowLeft
} from 'lucide-react';
import { RoomEntity, CalculationRules, EstimateVersion } from '../../types';

interface EstimateViewProps {
  rooms: RoomEntity[];
  rules: CalculationRules;
  versions: EstimateVersion[];
  onUpdateUnitRate: (roomId: string, newRate: number) => void;
  onJumpToCad: (roomId: string) => void;
  onOpenRules: () => void;
  onApproveEstimate: () => void;
  onExport: () => void;
  onBackToTakeoff?: () => void;
}

export const EstimateView: React.FC<EstimateViewProps> = ({
  rooms,
  rules,
  versions,
  onUpdateUnitRate,
  onJumpToCad,
  onOpenRules,
  onApproveEstimate,
  onExport,
  onBackToTakeoff,
}) => {
  const [selectedVersion, setSelectedVersion] = useState('v3');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);

  // Compute live aggregates from rooms
  const totalFloorArea = rooms.reduce((acc, r) => acc + r.floorArea, 0);
  const totalPaintArea = rooms.reduce((acc, r) => acc + r.netPaintArea, 0);
  const totalCost = rooms.reduce((acc, r) => acc + r.totalCost, 0);

  const interiorArea = Math.round(totalPaintArea * 0.72 * 10) / 10;
  const exteriorArea = Math.round((totalPaintArea - interiorArea) * 10) / 10;

  const handleSaveRate = (roomId: string) => {
    onUpdateUnitRate(roomId, tempRate);
    setEditingRoomId(null);
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-white">
      {/* Top Header & Versioning Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sky-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-xs">
              BƯỚC 4 / 4 • DỰ TOÁN SƠN & CHI PHÍ THI CÔNG
            </span>
            <span className="text-xs text-sky-300/60 font-mono">• BOQ & PRICING</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bảng Bóc Tách Khối Lượng & Dự Toán Sơn
            </h1>
            {/* Version Switcher */}
            <div className="flex items-center gap-1.5 bg-[#0e1424] p-1 rounded-xl border border-sky-500/30 text-xs font-mono">
              <span className="text-white/40 pl-2">Phiên bản:</span>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="bg-[#080d18] border border-sky-500/30 rounded-lg px-2.5 py-1 font-bold text-sky-400 focus:outline-none cursor-pointer"
              >
                {versions.map((v) => (
                  <option key={v.version} value={v.version}>
                    {v.version.toUpperCase()} — {v.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/65 mt-1 max-w-3xl">
            Bảng tiên lượng dự toán (BoQ) minh bạch được tổng hợp trực tiếp từ diện tích hình học phòng CAD đã thẩm định ở Bước 3 và định mức vật tư sơn.
          </p>
        </div>

        {/* Right Actions - Well-spaced, clean groups */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap lg:flex-nowrap shrink-0">
          <div className="flex items-center gap-2">
            {onBackToTakeoff && (
              <button
                onClick={onBackToTakeoff}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 text-white/80 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                title="Quay lại Bảng khối lượng hình học (Bước 3)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bảng khối lượng</span>
              </button>
            )}

            <button
              onClick={onOpenRules}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 text-white/80 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
              title="Xem và chỉnh sửa định mức quy tắc tính"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>Quy tắc tính</span>
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <button
              onClick={onApproveEstimate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Phê duyệt</span>
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-[0_2px_14px_rgba(2,132,199,0.35)] border border-sky-400/30 transition-all active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top High-Contrast KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-white/10 hover:border-sky-500/30 transition-colors bg-[#0e1424] shadow-sm">
          <div className="text-[11px] font-mono text-white/50 font-semibold uppercase">TỔNG DIỆN TÍCH SƠN</div>
          <div className="text-3xl font-extrabold text-white font-mono mt-2">
            {totalPaintArea.toLocaleString()} <span className="text-sm font-normal text-white/40">m²</span>
          </div>
          <div className="text-xs text-white/40 mt-2 font-mono">
            Diện tích sàn: {totalFloorArea.toFixed(1)} m²
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-sky-500/40 bg-[#0e1628] shadow-[0_0_25px_rgba(56,189,248,0.12)]">
          <div className="text-[11px] font-mono text-sky-400 font-semibold uppercase">DỰ TOÁN KINH PHÍ</div>
          <div className="text-3xl font-black text-white font-mono mt-2">
            {totalCost.toLocaleString()} <span className="text-sm font-normal text-sky-400">₫</span>
          </div>
          <div className="text-xs text-sky-300/80 mt-2 font-mono font-medium">
            Bình quân: {Math.round(totalCost / totalPaintArea).toLocaleString()} ₫/m²
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 hover:border-sky-500/30 transition-colors bg-[#0e1424] shadow-sm">
          <div className="text-[11px] font-mono text-white/50 font-semibold uppercase">HỆ SƠN NỘI THẤT</div>
          <div className="text-3xl font-extrabold text-white font-mono mt-2">
            {interiorArea.toLocaleString()} <span className="text-sm font-normal text-white/40">m²</span>
          </div>
          <div className="text-xs text-white/40 mt-2 font-mono">
            1 Sơn lót + 2 Sơn phủ mờ Dulux
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 hover:border-sky-500/30 transition-colors bg-[#0e1424] shadow-sm">
          <div className="text-[11px] font-mono text-white/50 font-semibold uppercase">NGOẠI THẤT & HỘP KT</div>
          <div className="text-3xl font-extrabold text-white font-mono mt-2">
            {exteriorArea.toLocaleString()} <span className="text-sm font-normal text-white/40">m²</span>
          </div>
          <div className="text-xs text-white/40 mt-2 font-mono">
            Acrylic chống thấm cao cấp
          </div>
        </div>
      </div>

      {/* Main Engineering Take-off Table */}
      <div className="bg-[#0e1424] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#111728] border-b border-sky-500/20 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white/90 uppercase">
            BẢNG TIÊN LƯỢNG BÓC TÁCH CHI TIẾT TỪNG PHÒNG • NHẤP NGUỒN ĐỂ XEM CAD
          </span>
          <span className="text-xs font-mono text-sky-300/60">
            Quy chuẩn: Cao {rules.defaultWallHeight}m · Hao hụt {rules.wasteFactorPct}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0a0f1d] border-b border-white/10 text-white/50 uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Mã phòng</th>
                <th className="px-4 py-3">Nguồn CAD</th>
                <th className="px-4 py-3">Diện tích sàn</th>
                <th className="px-4 py-3">Chu vi</th>
                <th className="px-4 py-3">Tường thô</th>
                <th className="px-4 py-3">Khấu trừ</th>
                <th className="px-4 py-3">Diện tích sơn</th>
                <th className="px-4 py-3">Đơn giá</th>
                <th className="px-4 py-3">Thành tiền</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Xem CAD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {rooms.map((room) => {
                const isEditing = editingRoomId === room.id;
                const isConfirmed = room.status === 'Confirmed';
                const isNeedsReview = room.status === 'Needs Review';

                return (
                  <tr key={room.id} className="hover:bg-sky-500/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">
                      <div className="text-sky-400 font-mono">{room.code}</div>
                      <div className="text-[10px] text-white/40 font-sans font-normal truncate max-w-[140px]">
                        {room.name}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sky-400 font-semibold">
                      <button
                        onClick={() => onJumpToCad(room.id)}
                        className="hover:underline hover:text-sky-300 flex items-center gap-1 text-left cursor-pointer"
                        title="Phóng tới thực thể trên bản vẽ CAD"
                      >
                        <span>{room.sourceHandle}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3">{room.floorArea.toFixed(2)} m²</td>
                    <td className="px-4 py-3">{room.perimeter.toFixed(1)} m</td>
                    <td className="px-4 py-3">{room.grossWallArea.toFixed(2)} m²</td>
                    <td className="px-4 py-3 text-rose-400">
                      -{(room.doorDeductions + room.windowDeductions).toFixed(2)} m²
                    </td>

                    <td className="px-4 py-3 font-bold text-white">
                      {room.netPaintArea.toFixed(2)} m²
                    </td>

                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempRate}
                            onChange={(e) => setTempRate(parseInt(e.target.value) || 0)}
                            className="w-20 px-1 py-0.5 border border-sky-500/40 rounded text-right bg-[#080d18] text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                          />
                          <button
                            onClick={() => handleSaveRate(room.id)}
                            className="p-1 text-emerald-400 hover:bg-white/10 rounded cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingRoomId(room.id);
                            setTempRate(room.unitRate);
                          }}
                          className="flex items-center gap-1 hover:text-sky-400 group cursor-pointer text-white"
                          title="Nhấp để sửa đơn giá"
                        >
                          <span>{room.unitRate.toLocaleString()} ₫</span>
                          <Edit2 className="w-3 h-3 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-3 font-bold text-emerald-400">
                      {room.totalCost.toLocaleString()} ₫
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isNeedsReview
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : isConfirmed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {room.status === 'Confirmed'
                          ? 'Đã Duyệt'
                          : room.status === 'Needs Review'
                          ? 'Cần Thẩm Định'
                          : room.status === 'Corrected'
                          ? 'Đã Hiệu Chỉnh'
                          : room.status === 'Rejected'
                          ? 'Đã Từ Chối'
                          : 'Đã Phát Hiện'}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onJumpToCad(room.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-[11px] font-semibold transition-all cursor-pointer"
                      >
                        <span>Xem CAD</span>
                        <ExternalLink className="w-3 h-3 text-sky-400" />
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
  );
};
