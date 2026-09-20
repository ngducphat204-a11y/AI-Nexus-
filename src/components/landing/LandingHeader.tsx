import React, { useState } from 'react';
import { Layers, ArrowRight, Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
  onLogin: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onGetStarted,
  onLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Main Floating Capsule / Pill Bar */}
        <div className="bg-[#12141a]/85 backdrop-blur-2xl border border-white/12 rounded-full px-3 sm:px-5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center justify-between gap-2 sm:gap-4 transition-all hover:border-white/20">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 pl-1"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 rounded-full bg-[#ffc474]/15 border border-[#ffc474]/30 text-[#ffc474] flex items-center justify-center shadow-xs group-hover:border-[#ffc474]/60 transition-all">
              <Layers className="w-4 h-4 text-[#ffc474]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-sm font-sans flex items-center gap-1.5">
                AI Paint Take-off
              </span>
              <span className="hidden xl:inline-flex text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-[#ffc474] border border-amber-500/30 font-semibold tracking-wider">
                DXF R12–2024
              </span>
            </div>
          </div>

          {/* Central Capsule Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/5 px-2 py-1 rounded-full text-[11px] font-medium tracking-wider text-white/70">
            <a
              href="#storytelling"
              className="hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all text-white/70"
            >
              Vector CAD
            </a>
            <a
              href="#detection"
              className="hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all text-white/70"
            >
              Quy trình AI
            </a>
            <a
              href="#traceability"
              className="hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all text-white/70"
            >
              Thẩm định HITL
            </a>
            <a
              href="#estimate"
              className="hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all text-white/70"
            >
              Dự toán BoQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Login button */}
            <button
              onClick={onLogin}
              className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Đăng nhập
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onGetStarted}
              className="amber-button inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <span>Bắt đầu ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Capsule Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#12141a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white">Menu Điều Hướng</span>
              <span className="text-[10px] font-mono text-[#ffc474] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                DXF R12–2024
              </span>
            </div>

            <nav className="flex flex-col gap-1 text-xs font-medium">
              <a
                href="#storytelling"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                Vector CAD
              </a>
              <a
                href="#detection"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                Quy trình AI
              </a>
              <a
                href="#traceability"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                Thẩm định HITL
              </a>
              <a
                href="#estimate"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                Dự toán BoQ
              </a>
            </nav>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogin();
                }}
                className="w-full px-4 py-2 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-center"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
