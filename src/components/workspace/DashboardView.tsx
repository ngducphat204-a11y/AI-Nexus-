import React, { useState } from 'react';
import { 
  Plus, 
  Building2, 
  Layers, 
  DoorOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  Search,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { ProjectInfo } from '../../types';

interface DashboardViewProps {
  projects: ProjectInfo[];
  onSelectProject: (proj: ProjectInfo) => void;
  onCreateProject: () => void;
  onOpenDrawingReview: (proj: ProjectInfo) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onOpenDrawingReview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-white">
      {/* Top Greeting & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#ffc474]">
              01 // TỔNG QUAN KỸ THUẬT & DỰ TOÁN
            </span>
          </div>
          <h1 className="font-serif-cormorant text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Giám sát Bóc tách & Phân tích Hình học 2D CAD
          </h1>
          <p className="text-sm text-white/60 mt-1 max-w-3xl font-sans-tight">
            Phân tích hình học không gian 2D CAD, bóc tách chu vi tường xây, tự động khấu trừ diện tích lỗ mở và quản trị hồ sơ dự toán công trình chuẩn xác.
          </p>
        </div>

        <button
          onClick={onCreateProject}
          className="amber-button inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo dự án mới</span>
        </button>
      </div>

      {/* Engineering Scale Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#161822] border border-white/10 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between text-white/40">
            <span className="text-[11px] font-mono font-semibold text-white/60">DỰ ÁN HOẠT ĐỘNG</span>
            <Building2 className="w-4 h-4 text-[#ffc474]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
            12
          </div>
          <div className="text-xs text-white/40 mt-1 font-sans">127 Tòa nhà tổng cộng</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161822] border border-white/10 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between text-white/40">
            <span className="text-[11px] font-mono font-semibold text-white/60">PHÒNG ĐÃ BÓC TÁCH</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
            1,842
          </div>
          <div className="text-xs text-white/40 mt-1 font-sans">3,921 Cửa đã khấu trừ</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161822] border border-white/10 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between text-white/40">
            <span className="text-[11px] font-mono font-semibold text-white/60">ĐỘ TIN CẬY TRUNG BÌNH</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-2">
            96.8%
          </div>
          <div className="text-xs text-white/40 mt-1 font-sans">Khép kín hình học vector</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161822] border border-white/10 shadow-sm hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-white/40">
            <span className="text-[11px] font-mono font-semibold text-white/60">HÀNG ĐỢI THẨM ĐỊNH</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#ffc474] font-mono mt-2">
            42
          </div>
          <div className="text-xs text-white/40 mt-1 font-sans">Khoảng 18 phút/bản vẽ DXF</div>
        </div>
      </div>

      {/* Projects List Section */}
      <div className="bg-[#12141a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:px-6 bg-[#161822]/80 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Danh sách Dự án & Bản vẽ CAD</h2>
            <p className="text-xs text-white/50">Các file DXF 2D đã nạp và tiến trình bóc tách khối lượng</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bản vẽ hoặc tòa nhà..."
              className="pl-8 pr-3 py-1.5 rounded-lg border border-white/10 text-xs bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffc474]/50 w-full sm:w-64 font-sans"
            />
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {filteredProjects.map((proj) => {
            const isReview = proj.status === 'Review Required';
            const isProcessing = proj.status === 'Processing';
            const statusLabel =
              proj.status === 'Review Required'
                ? 'Cần Thẩm Định'
                : proj.status === 'Processing'
                ? 'Đang Xử Lý'
                : proj.status === 'Approved'
                ? 'Đã Phê Duyệt'
                : proj.status === 'Completed'
                ? 'Đã Hoàn Thành'
                : proj.status === 'Estimating'
                ? 'Đang Lập Dự Toán'
                : 'Bản Nháp';

            return (
              <div
                key={proj.id}
                className="p-4 sm:p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-base">
                      {proj.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        isReview
                          ? 'bg-amber-500/20 text-[#ffc474] border border-amber-500/40'
                          : isProcessing
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {statusLabel}
                    </span>
                    {proj.issuesCount > 0 && (
                      <span className="text-[10px] font-mono text-[#ffc474] bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">
                        ⚠️ {proj.issuesCount} cảnh báo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50 font-mono">
                    <span className="text-white/80">{proj.building}</span>
                    <span>•</span>
                    <span>{proj.currentFloor} ({proj.floorsCount} tầng tổng thể)</span>
                    <span>•</span>
                    <span className="text-sky-400 flex items-center gap-1">
                      <FileCode className="w-3 h-3" />
                      {proj.fileName} ({proj.fileSize})
                    </span>
                  </div>

                  <div className="text-xs text-white/40 font-sans">
                    Kỹ sư phụ trách: <span className="font-medium text-white/70">{proj.engineer}</span> · Cập nhật: {proj.lastModified}
                  </div>
                </div>

                {/* Right Metrics & Launch Button */}
                <div className="flex items-center gap-6 self-end md:self-auto shrink-0 font-mono text-xs">
                  <div className="text-right hidden sm:block">
                    <div className="text-[11px] text-white/40 uppercase">DIỆN TÍCH SƠN</div>
                    <div className="text-sm font-bold text-[#ffc474]">
                      {proj.totalArea.toLocaleString()} m²
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="text-[11px] text-white/40 uppercase">ĐỘ TIN CẬY</div>
                    <div className="text-sm font-bold text-emerald-400">
                      {proj.avgConfidence}%
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDrawingReview(proj)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#ffc474] hover:text-black text-white text-xs font-semibold border border-white/15 transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Mở bản vẽ & Thẩm định</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
