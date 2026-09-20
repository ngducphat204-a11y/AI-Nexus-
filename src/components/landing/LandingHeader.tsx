import React from 'react';
import { Layers, ArrowRight, Compass, Activity } from 'lucide-react';

interface LandingHeaderProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
  onLogin: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onGetStarted,
  onExploreDemo,
  onLogin,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0f1115]/85 backdrop-blur-2xl border-b border-white/10 text-white transition-all shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#ffc474] flex items-center justify-center shadow-xs group-hover:border-[#ffc474]/50 transition-colors">
            <Layers className="w-5 h-5 text-[#ffc474]" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-base flex items-center gap-2 font-sans">
              AI Paint Take-off
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-[#ffc474] border border-amber-500/30 font-semibold tracking-wider">
                DXF R12–2024
              </span>
            </span>
            <p className="text-[11px] text-white/50 font-medium hidden sm:block">
              Bóc tách Khối lượng & Dự toán Kỹ thuật · TCVN 8652:2012
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          <a
            href="#storytelling"
            className="hover:text-[#ffc474] transition-colors py-1"
          >
            Vector CAD
          </a>
          <a
            href="#detection"
            className="hover:text-[#ffc474] transition-colors py-1"
          >
            Quy trình AI
          </a>
          <a
            href="#traceability"
            className="hover:text-[#ffc474] transition-colors py-1"
          >
            Thẩm định HITL
          </a>
          <a
            href="#estimate"
            className="hover:text-[#ffc474] transition-colors py-1"
          >
            Dự toán BOQ
          </a>
        </nav>

        {/* Actions & Meter */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest mr-2">
            <Activity className="w-3 h-3 text-[#ffc474]" />
            <span>99.8% CAD Match</span>
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-gradient-to-r from-[#ffc976] to-[#ac732b]" />
            </div>
          </div>

          <button
            onClick={onExploreDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#ffc474]" />
            <span>Bản vẽ mẫu</span>
          </button>
          <button
            onClick={onLogin}
            className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Đăng nhập
          </button>
          <button
            onClick={onGetStarted}
            className="amber-button inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold cursor-pointer"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
