import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, FileCode, CheckCircle2, Loader2, Share2 } from 'lucide-react';
import { ProjectInfo, RoomEntity } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectInfo;
  rooms: RoomEntity[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  rooms,
}) => {
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalPaintArea = rooms.reduce((acc, r) => acc + r.netPaintArea, 0);
  const totalCost = rooms.reduce((acc, r) => acc + r.totalCost, 0);

  const handleExport = (type: string, filename: string) => {
    setExportingType(type);
    setTimeout(() => {
      setExportingType(null);
      setSuccessMessage(`Đã xuất thành công tệp: ${filename}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-[#12141a] rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161822]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-sky-400" />
              Xuất Hồ sơ Bóc tách & Bản vẽ CAD Đã Kiểm Định
            </h2>
            <p className="text-xs text-white/50 font-mono">
              {project.name} · {project.currentFloor} ({rooms.length} phòng đã kiểm định)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast inside modal */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Options List */}
        <div className="p-6 space-y-3">
          {[
            {
              id: 'excel',
              name: 'Sổ tính Bóc tách Khối lượng Excel (.xlsx)',
              desc: 'Bảng BOQ phân cấp cấu trúc chuẩn, tích hợp công thức, định mức sơn lót & đơn giá',
              ext: 'Sunrise_Takeoff_v3.xlsx',
              icon: FileSpreadsheet,
              color: 'text-emerald-400',
            },
            {
              id: 'pdf',
              name: 'Báo cáo Dự toán & Tiên lượng Sơn Kỹ thuật (.pdf)',
              desc: 'Bản tóm lược cho chủ đầu tư, kèm hình ảnh mặt bằng phòng, chữ ký & tem kiểm định',
              ext: 'Sunrise_Paint_Estimate.pdf',
              icon: FileText,
              color: 'text-rose-400',
            },
            {
              id: 'dxf',
              name: 'Bản vẽ CAD có gắn Chú thích Kỹ thuật (.dxf)',
              desc: 'File DXF R2024 tích hợp sẵn lớp A-ROOM-BND và nhãn diện tích thực tế',
              ext: 'Floor03_Annotated_Takeoff.dxf',
              icon: FileCode,
              color: 'text-sky-400',
            },
            {
              id: 'csv',
              name: 'Tọa độ Đỉnh Hình học Vector Thô (.csv)',
              desc: 'Toàn bộ tọa độ vector đỉnh IEEE-754, bản đồ phân lớp CAD & mã thẻ thực thể',
              ext: 'Sunrise_Geometry_Raw.csv',
              icon: FileSpreadsheet,
              color: 'text-[#ffc474]',
            },
            {
              id: 'report',
              name: 'Biên bản Chứng thực Tính toán Kỹ thuật (.json / txt)',
              desc: 'Toàn văn nhật ký kiểm toán toán học phục vụ đơn vị thẩm tra độc lập',
              ext: 'Audit_Verification_Cert.json',
              icon: FileText,
              color: 'text-sky-400',
            },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = exportingType === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleExport(item.id, item.ext)}
                className="p-3.5 rounded-xl border border-white/10 hover:border-sky-500/40 bg-[#161822] hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 mt-0.5">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-white/50 font-sans mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-3">
                  {isCurrent ? (
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-white/40 group-hover:text-sky-400 transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#161822] flex items-center justify-between text-xs font-mono text-white/50">
          <div>
            Tổng bóc tách: <strong className="text-sky-400">{totalPaintArea.toLocaleString()} m²</strong> ·{' '}
            <strong className="text-emerald-400">{totalCost.toLocaleString()} ₫</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-sky-500/20 hover:border-sky-500/30 text-white font-medium transition-colors cursor-pointer"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
