import React from 'react';
import { Layers } from 'lucide-react';

interface LandingFooterProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  return (
    <footer className="bg-[#090b0e] border-t border-white/10 py-12 text-white/50 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-[#ffc474] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#ffc474]" />
            </div>
            <div>
              <span className="font-bold text-white text-sm font-sans">
                AI Paint Take-off
              </span>
              <p className="text-[11px] text-white/50 font-mono">
                Bóc tách bản vẽ công trình 2D CAD & Lập dự toán sơn minh bạch
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 font-medium text-white/70">
            <button
              onClick={onExploreDemo}
              className="hover:text-[#ffc474] transition-colors cursor-pointer"
            >
              Xem dự án mẫu CAD
            </button>
            <button
              onClick={onGetStarted}
              className="hover:text-[#ffc474] transition-colors cursor-pointer"
            >
              Bắt đầu bóc tách
            </button>
            <span className="text-white/30 font-mono text-[11px]">
              Tiêu chuẩn DXF R12–2024
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
          <div>
            © 2026 AI Paint Take-off. Phần mềm chuyên dụng cho Kỹ sư Dự toán & Trắc đạc Khối lượng (QS).
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#ffc474] font-semibold">✓ Cơ chế Human-in-the-Loop</span>
            <span>•</span>
            <span>Chuẩn hóa CAD / BIM ISO 19650</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
