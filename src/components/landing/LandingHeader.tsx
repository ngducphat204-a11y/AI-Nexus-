import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

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
  const [activeNav, setActiveNav] = useState('Blog');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080d18]/95 backdrop-blur-xl border-b border-amber-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo: Amber-Orange Isometric Home Icon + PlanAI */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Warm Amber-Orange Gradient Icon matching Chibi's Helmet & Vest */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#fbbf24] p-[1.5px] shadow-[0_2px_14px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#fbbf24]">
                <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21.5V12.5H15V21.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="1.5" fill="#f59e0b" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-white text-lg tracking-tight font-sans leading-none">
                PlanAI
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            </div>
            <span className="text-[10px] text-amber-200/60 font-sans tracking-tight leading-tight mt-0.5">
              Xây dựng thông minh hơn
            </span>
          </div>
        </div>

        {/* Central Navigation Links with Amber hover indicators */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-white/80">
          <a
            href="#hero"
            onClick={() => setActiveNav('Sản phẩm')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Sản phẩm' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Sản phẩm
          </a>
          <a
            href="#features"
            onClick={() => setActiveNav('Tính năng')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Tính năng' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Tính năng
          </a>
          <a
            href="#how-it-works"
            onClick={() => setActiveNav('Cách hoạt động')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Cách hoạt động' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Cách hoạt động
          </a>
          <a
            href="#pricing"
            onClick={() => setActiveNav('Bảng giá')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Bảng giá' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Bảng giá
          </a>
          <a
            href="#clients"
            onClick={() => setActiveNav('Khách hàng')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Khách hàng' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Khách hàng
          </a>
          <a
            href="#blog"
            onClick={() => setActiveNav('Blog')}
            className={`relative py-1 transition-colors hover:text-[#fbbf24] ${activeNav === 'Blog' ? 'text-white font-semibold' : 'text-white/70'}`}
          >
            <span>Blog</span>
            {activeNav === 'Blog' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            )}
          </a>
          <a
            href="#contact"
            onClick={() => setActiveNav('Liên hệ')}
            className={`transition-colors hover:text-[#fbbf24] ${activeNav === 'Liên hệ' ? 'text-[#fbbf24] font-semibold' : 'text-white/70'}`}
          >
            Liên hệ
          </a>
        </nav>

        {/* Right Actions: Language VN + User [P] Phát Đức + Primary Amber Button */}
        <div className="flex items-center gap-3">
          {/* Language Flag Selector */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 cursor-pointer hover:bg-white/10 hover:border-amber-500/30 transition-colors">
            <span className="text-sm">🇻🇳</span>
            <span>VI</span>
            <ChevronDown className="w-3 h-3 text-white/50" />
          </div>

          {/* User Account Capsule [P] Phát Đức ▾ with Amber Avatar */}
          <div 
            onClick={onLogin}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer text-xs font-semibold text-white"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] flex items-center justify-center text-[10px] font-extrabold text-[#0a101f] shadow-xs">
              P
            </div>
            <span>Phát Đức</span>
            <ChevronDown className="w-3 h-3 text-white/50" />
          </div>

          {/* Primary Action Button: Bắt đầu ngay → in Amber-Orange Gradient */}
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#090d18] bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 active:scale-98 rounded-xl shadow-[0_4px_18px_rgba(245,158,11,0.38)] transition-all cursor-pointer"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/20 bg-[#080d18] px-4 py-5 flex flex-col gap-2.5 text-sm text-white/80">
          <a 
            href="#hero" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-[#fbbf24] font-medium"
          >
            Sản phẩm
          </a>
          <a 
            href="#preview" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-[#fbbf24] font-medium"
          >
            Xem trước kết quả
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-[#fbbf24] font-medium"
          >
            Tính năng nổi bật
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-[#fbbf24] font-medium"
          >
            Quy trình hoạt động
          </a>
          <a 
            href="#clients" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-[#fbbf24] font-medium"
          >
            Khách hàng
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#ea580c] text-[#090d18] font-bold text-center shadow-lg"
            >
              Phân tích bản vẽ ngay →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
