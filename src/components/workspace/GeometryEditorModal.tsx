import React, { useState } from 'react';
import { X, Check, Edit3, ArrowRight, RotateCcw, AlertTriangle, Layers } from 'lucide-react';
import { RoomEntity } from '../../types';

interface GeometryEditorModalProps {
  room: RoomEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRoom: RoomEntity, oldArea: number, newArea: number) => void;
}

export const GeometryEditorModal: React.FC<GeometryEditorModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !room) return null;

  // Local state for interactive adjustment
  const [offsetDelta, setOffsetDelta] = useState<number>(1.6); // +1.6 m²
  const [wallHeight, setWallHeight] = useState<number>(room.wallHeight);

  const originalFloorArea = room.floorArea;
  const newFloorArea = Math.round((originalFloorArea + offsetDelta) * 100) / 100;

  // Recalculate paint area
  const newGrossWallArea = Math.round((newFloorArea * 2) * 100) / 100;
  const newPaintArea = Math.round((newGrossWallArea - room.doorDeductions - room.windowDeductions) * 100) / 100;
  const newCost = Math.round(newPaintArea * room.unitRate);

  const handleApply = () => {
    const updated: RoomEntity = {
      ...room,
      floorArea: newFloorArea,
      grossWallArea: newGrossWallArea,
      netPaintArea: newPaintArea,
      totalCost: newCost,
      status: 'Corrected',
    };
    onSave(updated, originalFloorArea, newFloorArea);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-[#12141a] rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161822]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#ffc474]" />
              Hiệu chỉnh Ranh giới Hình học // {room.code}
            </h2>
            <p className="text-xs text-white/50 font-mono">
              Nguồn: {room.sourceHandle} · Lớp CAD {room.layer}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-xs text-white/60 font-sans leading-relaxed">
            Điều chỉnh độ dịch chuyển tọa độ đỉnh hoặc chiều cao tường. Khối lượng bóc tách và dự toán liên quan sẽ được tự động tính toán lại tức thì.
          </div>

          {/* Interactive Vertex Extension Slider */}
          <div className="p-4 rounded-xl bg-[#161822] border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white/80">
                ĐỘ DỊCH CHUYỂN BÙ RANH GIỚI
              </span>
              <span className="font-bold text-[#ffc474]">
                {offsetDelta >= 0 ? `+${offsetDelta}` : offsetDelta} m²
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              step="0.1"
              value={offsetDelta}
              onChange={(e) => setOffsetDelta(parseFloat(e.target.value))}
              className="w-full accent-[#ffc474] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40">
              <span>Thu hẹp -5.0 m²</span>
              <span>Khớp chuẩn 0.0 m²</span>
              <span>Mở rộng +10.0 m²</span>
            </div>
          </div>

          {/* Wall height parameter */}
          <div className="flex items-center justify-between font-mono text-xs p-3 rounded-xl border border-white/10 bg-[#161822]">
            <span className="text-white/70 font-sans">CHIỀU CAO THÔNG THỦY (m):</span>
            <input
              type="number"
              step="0.1"
              value={wallHeight}
              onChange={(e) => setWallHeight(parseFloat(e.target.value) || 3.2)}
              className="w-24 px-2 py-1 border border-white/20 rounded bg-white/5 text-right font-bold text-[#ffc474] focus:outline-none"
            />
          </div>

          {/* Signature Dependency Propagation Preview */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs space-y-3">
            <div className="text-[11px] font-bold text-[#ffc474] flex items-center gap-1.5 uppercase">
              <Layers className="w-3.5 h-3.5 text-[#ffc474]" />
              Cập nhật Lan truyền Phụ thuộc & Tính toán lại
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="bg-[#161822] p-2.5 rounded-lg border border-white/10">
                <span className="text-white/40 block">DIỆN TÍCH SÀN:</span>
                <span className="text-white/40 line-through mr-1">
                  {originalFloorArea.toFixed(2)} m²
                </span>
                <span className="font-bold text-[#ffc474]">
                  → {newFloorArea.toFixed(2)} m²
                </span>
              </div>

              <div className="bg-[#161822] p-2.5 rounded-lg border border-white/10">
                <span className="text-white/40 block">DIỆN TÍCH SƠN THỰC:</span>
                <span className="text-white/40 line-through mr-1">
                  {room.netPaintArea.toFixed(2)} m²
                </span>
                <span className="font-bold text-emerald-400">
                  → {newPaintArea.toFixed(2)} m²
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60 font-sans">Kinh phí sơn phòng:</span>
              <span className="font-bold text-white">
                {room.totalCost.toLocaleString()} ₫ →{' '}
                <span className="text-[#ffc474]">{newCost.toLocaleString()} ₫</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#161822] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleApply}
            className="amber-button inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Áp dụng & Cập nhật Dự toán</span>
          </button>
        </div>
      </div>
    </div>
  );
};
