import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingFooterProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onGetStarted,
}) => {
  return (
    <footer className="bg-[#050a14] border-t border-amber-500/15 py-10 text-white/50 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#fbbf24] p-[1.5px] shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
              <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#fbbf24]">
                  <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 21.5V12.5H15V21.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight font-sans">
                PlanAI
              </span>
              <p className="text-[11px] text-amber-200/50 font-sans">
                Xây dựng thông minh hơn · Phân tích bản vẽ mặt bằng bằng AI
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 font-medium text-white/70">
            <a href="#hero" className="hover:text-[#fbbf24] transition-colors">Sản phẩm</a>
            <a href="#features" className="hover:text-[#fbbf24] transition-colors">Tính năng</a>
            <a href="#how-it-works" className="hover:text-[#fbbf24] transition-colors">Cách hoạt động</a>
            <a href="#clients" className="hover:text-[#fbbf24] transition-colors">Khách hàng</a>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 text-[#fbbf24] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              <span>Dùng thử ngay</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <div>
            © 2026 PlanAI & FloorScan AI. Nền tảng phân tích bản vẽ & bóc tách khối lượng tự động.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#fbbf24] font-semibold">✓ Tiết kiệm 80% thời gian</span>
            <span>•</span>
            <span>Độ chính xác 95%+</span>
            <span>•</span>
            <span>Tiêu chuẩn TCVN & ISO 19650</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
