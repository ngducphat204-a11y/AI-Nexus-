import React, { useState } from 'react';
import { X, UploadCloud, FileCode, CheckCircle2, AlertCircle, ArrowRight, Building, Layers } from 'lucide-react';

interface ProjectSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (projectName: string, building: string, floor: string, fileName: string) => void;
}

export const ProjectSetupModal: React.FC<ProjectSetupModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
}) => {
  const [projectName, setProjectName] = useState('Tổ hợp Chung cư Sunrise Tower - Giai đoạn 2');
  const [building, setBuilding] = useState('Tòa A - Căn hộ Cao cấp');
  const [floor, setFloor] = useState('Tầng 03');
  const [floorsCount, setFloorsCount] = useState(28);
  const [selectedFile, setSelectedFile] = useState<string>('Floor03_Architectural.dxf');
  const [uploadProgress, setUploadProgress] = useState(100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12141a] rounded-2xl border border-white/10 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161822]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-[#ffc474]" />
              Tạo Dự án Mới & Nạp file DXF
            </h2>
            <p className="text-xs text-white/50 font-mono">
              Nạp hình học không gian 2D phục vụ bóc tách khối lượng
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-white/70 font-medium">TÊN DỰ ÁN</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#161822] text-white text-xs focus:border-[#ffc474]/50 focus:outline-none"
                placeholder="Ví dụ: Chung cư Sunrise Tower"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-medium">TÒA NHÀ / PHÂN KHU</label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#161822] text-white text-xs focus:border-[#ffc474]/50 focus:outline-none"
                placeholder="Ví dụ: Tòa A"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-medium">TẦNG MỤC TIÊU BÓC TÁCH</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#161822] text-white text-xs focus:border-[#ffc474]/50 focus:outline-none"
                placeholder="Ví dụ: Tầng 03"
              />
            </div>
          </div>

          {/* DXF Upload Area */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-white/70">
              TẢI LÊN BẢN VẼ CAD 2D (.DXF)
            </label>
            <div className="border-2 border-dashed border-white/15 hover:border-[#ffc474]/50 rounded-xl p-6 text-center transition-colors bg-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#ffc474] mb-3">
                <UploadCloud className="w-5 h-5 text-[#ffc474]" />
              </div>
              <div className="text-xs font-semibold text-white">
                Kéo thả bản vẽ DXF của bạn vào đây, hoặc nhấp để chọn file
              </div>
              <p className="text-[11px] text-white/40 mt-1 font-mono">
                Hỗ trợ AutoCAD R12, R2000–R2024 ASCII và nhị phân DXF (tối đa 120MB)
              </p>

              {/* Sample files selector for instantaneous engineering trial */}
              <div className="mt-4 pt-3 border-t border-white/10 text-left">
                <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider block mb-2">
                  Hoặc chọn bộ mẫu bản vẽ kỹ thuật đã kiểm chứng:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedFile('Floor03_Architectural.dxf')}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedFile === 'Floor03_Architectural.dxf'
                        ? 'border-[#ffc474] bg-[#ffc474]/15 text-white shadow-xs'
                        : 'border-white/10 bg-[#161822] text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-bold truncate text-white">Floor03_Architectural.dxf</div>
                      <div className="text-[10px] text-white/50">48.2 MB · 32 Lớp CAD</div>
                    </div>
                    {selectedFile === 'Floor03_Architectural.dxf' && (
                      <CheckCircle2 className="w-4 h-4 text-[#ffc474] shrink-0 ml-2" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFile('OceanRes_L08_Final.dxf')}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedFile === 'OceanRes_L08_Final.dxf'
                        ? 'border-[#ffc474] bg-[#ffc474]/15 text-white shadow-xs'
                        : 'border-white/10 bg-[#161822] text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-bold truncate text-white">OceanRes_L08_Final.dxf</div>
                      <div className="text-[10px] text-white/50">32.6 MB · 28 Lớp CAD</div>
                    </div>
                    {selectedFile === 'OceanRes_L08_Final.dxf' && (
                      <CheckCircle2 className="w-4 h-4 text-[#ffc474] shrink-0 ml-2" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Feedback */}
          <div className="p-3.5 rounded-xl bg-[#161822] text-white font-mono text-xs space-y-1.5 border border-white/10">
            <div className="flex items-center justify-between text-white/50 text-[11px]">
              <span className="font-bold text-white/80">KIỂM ĐỊNH TRƯỚC KHI NẠP</span>
              <span className="text-emerald-400 font-bold">✓ Sẵn sàng phân tích AI</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-white/40 block">PHIÊN BẢN:</span>
                <span className="text-white font-semibold">AC1032 (2024)</span>
              </div>
              <div>
                <span className="text-white/40 block">LỚP CAD:</span>
                <span className="text-white font-semibold">32 lớp phát hiện</span>
              </div>
              <div>
                <span className="text-white/40 block">THỰC THỂ:</span>
                <span className="text-white font-semibold">18,492 đã phân tích</span>
              </div>
              <div>
                <span className="text-white/40 block">ĐA TUYẾN:</span>
                <span className="text-emerald-400 font-semibold">4,821 khép kín</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#161822] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => onStartAnalysis(projectName, building, floor, selectedFile)}
            className="amber-button inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <span>Bắt đầu Phân tích AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
