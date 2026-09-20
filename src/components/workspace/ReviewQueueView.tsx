import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ArrowRight, 
  FileCode, 
  Check, 
  Edit3, 
  X,
  Filter
} from 'lucide-react';
import { RoomEntity, DoorEntity } from '../../types';

interface ReviewQueueViewProps {
  rooms: RoomEntity[];
  doors: DoorEntity[];
  onInspectRoom: (roomId: string) => void;
  onConfirmRoom: (roomId: string) => void;
  onCorrectRoom: (room: RoomEntity) => void;
  onRejectRoom: (roomId: string) => void;
}

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  rooms,
  doors,
  onInspectRoom,
  onConfirmRoom,
  onCorrectRoom,
  onRejectRoom,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'rooms' | 'doors'>('all');

  const flaggedRooms = rooms.filter((r) => r.status === 'Needs Review');
  const flaggedDoors = doors.filter((d) => d.status === 'Needs Review');

  const totalFlags = flaggedRooms.length + flaggedDoors.length;

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#ffc474]">
              02 // KIỂM SOÁT ĐỘ TIN CẬY & THẨM ĐỊNH HÌNH HỌC
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Hàng đợi Thẩm định Kỹ thuật (Human-In-The-Loop)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-[#ffc474] border border-amber-500/40">
              {totalFlags} Mục chờ xử lý
            </span>
          </div>
          <p className="text-sm text-white/60 mt-1 max-w-3xl font-sans-tight">
            Quy trình thẩm định bởi kỹ sư đối với các xung đột hình học, hở nét vector và nhận diện độ tin cậy thấp trước khi đưa vào hồ sơ dự toán chính thức.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-[#161822] p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white/15 text-white font-bold shadow-xs border border-white/15'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Tất cả ({totalFlags})
          </button>
          <button
            onClick={() => setFilterType('rooms')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'rooms'
                ? 'bg-white/15 text-white font-bold shadow-xs border border-white/15'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Phòng ({flaggedRooms.length})
          </button>
          <button
            onClick={() => setFilterType('doors')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'doors'
                ? 'bg-white/15 text-white font-bold shadow-xs border border-white/15'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Cửa ({flaggedDoors.length})
          </button>
        </div>
      </div>

      {/* Flagged Items Table */}
      <div className="bg-[#12141a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#161822]/80 border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-white/70 uppercase">
            DANH SÁCH THỰC THỂ CẦN XỬ LÝ // NHẤP VÀO ĐỂ PHÓNG TỚI TOẠ ĐỘ CAD
          </span>
          <span className="text-white/40">Ngưỡng: Độ tin cậy &lt; 95%</span>
        </div>

        <div className="divide-y divide-white/10">
          {/* Room issues */}
          {(filterType === 'all' || filterType === 'rooms') &&
            flaggedRooms.map((room) => (
              <div
                key={room.id}
                className="p-5 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-[#ffc474]">
                      {room.code}
                    </span>
                    <span className="text-xs text-white/80 font-sans">
                      {room.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-[#ffc474] border border-amber-500/40">
                      ⚠️ {room.confidence}% Độ tin cậy
                    </span>
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      {room.sourceHandle}
                    </span>
                  </div>

                  <p className="text-xs text-amber-200/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 font-sans max-w-2xl">
                    <strong className="font-semibold text-[#ffc474]">Vấn đề: </strong>
                    {room.issueDescription || room.aiExplanation}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/40">
                    <span>Diện tích sàn: {room.floorArea} m²</span>
                    <span>•</span>
                    <span>Diện tích sơn tường: {room.netPaintArea} m²</span>
                    <span>•</span>
                    <span>Lớp CAD: {room.layer}</span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto font-mono text-xs">
                  <button
                    onClick={() => onInspectRoom(room.id)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#ffc474] hover:text-black text-white font-semibold transition-all flex items-center gap-1.5 border border-white/15 cursor-pointer"
                    title="Phóng tầm nhìn tới tọa độ CAD"
                  >
                    <span>Phóng tới & Kiểm tra</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  </button>

                  <button
                    onClick={() => onConfirmRoom(room.id)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-sm"
                    title="Xác nhận hợp lệ"
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onCorrectRoom(room)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sky-400 transition-colors cursor-pointer"
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

          {/* Door issues */}
          {(filterType === 'all' || filterType === 'doors') &&
            flaggedDoors.map((door) => (
              <div
                key={door.id}
                className="p-5 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-[#ffc474]">
                      Cửa {door.code}
                    </span>
                    <span className="text-xs text-white/80 font-sans">
                      {door.type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-[#ffc474] border border-amber-500/40">
                      ⚠️ {door.confidence}% Độ tin cậy
                    </span>
                  </div>

                  <p className="text-xs text-amber-200/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 font-sans max-w-2xl">
                    <strong className="font-semibold text-[#ffc474]">Vấn đề: </strong>
                    Chữ chú thích ký hiệu cửa có độ tương phản OCR thấp; yêu cầu kỹ sư xác nhận kích thước mở trừ 900x2100mm (1.89 m²).
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto font-mono text-xs">
                  <button
                    onClick={() => onInspectRoom('room-a101')}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#ffc474] hover:text-black text-white font-semibold transition-all flex items-center gap-1.5 border border-white/15 cursor-pointer"
                  >
                    <span>Phóng tới & Kiểm tra</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              </div>
            ))}

          {totalFlags === 0 && (
            <div className="p-12 text-center text-white/40 font-mono text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-bold text-white text-sm">Tất cả các mục cảnh báo đã được xử lý xong!</p>
              <p>Mọi hình học không gian và khấu trừ cửa đều đã được kỹ sư kiểm tra & phê duyệt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
