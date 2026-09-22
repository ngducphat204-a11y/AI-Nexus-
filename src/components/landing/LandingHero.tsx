import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Bot, 
  Edit3, 
  FileSpreadsheet, 
  FileText, 
  FileCode, 
  Zap, 
  Upload, 
  Crop, 
  Ruler, 
  CheckCircle2, 
  Download, 
  Check, 
  ChevronRight,
  Home,
  Layers,
  BarChart3,
  FileCheck,
  ShieldCheck,
  Building
} from 'lucide-react';
import { EngineerMascot } from './EngineerMascot';

interface LandingHeroProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onGetStarted,
}) => {
  // Preview Section state
  const [activeTab, setActiveTab] = useState<'raw' | 'ai'>('ai');
  // Video Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Bottom Showcase Demo active tab
  const [demoSidebarTab, setDemoSidebarTab] = useState<'overview' | 'plans' | 'takeoff' | 'reports' | 'download'>('overview');

  const handleDownloadSampleExcel = () => {
    // Simulated instant sample BOQ export download
    const csvContent = "data:text/csv;charset=utf-8,Hạng mục,Ký hiệu,Số lượng,Đơn vị,Ghi chú\nTường xây trát,T1,120.5,m,Tường gạch ống dày 100mm\nDiện tích sàn gạch,S1,85.2,m2,Lát gạch Granite 600x600\nCửa đi chính & phòng,D1-D4,8,bộ,Cửa nhôm kính Xingfa\nThiết bị vệ sinh,TB-01,12,bộ,Bàn cầu & Lavabo Toto\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FloorScan_BaoCaoMau_85m2.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-[#080d18] text-white selection:bg-[#f59e0b] selection:text-[#080d18] overflow-x-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO (Phân tích bản vẽ mặt bằng ngay lập tức bằng AI)
          THEME: WARM INDUSTRIAL AMBER & HIGH-VIS ORANGE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative w-full pt-8 sm:pt-14 pb-16 overflow-hidden">
        {/* Lưới mảnh màu xanh xám tạo bằng CSS linear-gradient */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45, 95, 148, 0.42) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 95, 148, 0.42) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            backgroundPosition: 'center center',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Eyebrow Pill: AI CHO NGÀNH XÂY DỰNG */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a26] border border-amber-500/50 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-5 shadow-[0_0_18px_rgba(245,158,11,0.22)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
              <span>AI CHO NGÀNH XÂY DỰNG</span>
            </motion.div>

            {/* Main Headline with Amber-Orange Gradient text */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.15] mb-5 font-sans"
            >
              Phân tích bản vẽ mặt bằng<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#f59e0b]">
                ngay lập tức bằng AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-white/75 max-w-2xl font-normal leading-relaxed mb-8"
            >
              Bóc tách khối lượng tự động từ bản vẽ PDF chỉ trong 30 giây. FloorScan giúp bạn tiết kiệm thời gian, giảm sai sót và sẵn sàng xuất file Excel, AutoCAD để sử dụng ngay.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10 w-full sm:w-auto"
            >
              {/* Primary Button: Amber-Orange Gradient */}
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 active:scale-98 text-[#080d18] font-extrabold text-sm sm:text-base shadow-[0_4px_22px_rgba(245,158,11,0.45)] transition-all cursor-pointer group"
              >
                <span>Phân tích bản vẽ ngay</span>
                <ArrowRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary Button: Xem video giới thiệu */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-white font-medium text-sm sm:text-base transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-[#fbbf24] text-[#fbbf24] translate-x-0.5" />
                </div>
                <span>Xem video giới thiệu</span>
              </button>
            </motion.div>

            {/* 3 Metric Badges themed to Amber/Gold/Orange */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-amber-500/20 w-full max-w-xl"
            >
              {/* 30 giây */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight font-mono">30 giây</div>
                  <div className="text-xs text-amber-200/60 leading-tight">Có kết quả</div>
                </div>
              </div>

              {/* 95%+ */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight font-mono">95%+</div>
                  <div className="text-xs text-orange-200/60 leading-tight">Độ chính xác</div>
                </div>
              </div>

              {/* 10.000+ */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight font-mono">10.000+</div>
                  <div className="text-xs text-yellow-200/60 leading-tight">Kỹ sư tin dùng</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Chibi Mascot with Amber Aura */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <EngineerMascot className="w-full max-w-[480px]" onGetStarted={onGetStarted} />
          </div>

        </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: XEM TRƯỚC KẾT QUẢ PHÂN TÍCH (Interactive Takeoff Preview)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="preview" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0b1220] border border-amber-500/30 hover:border-amber-400/50 p-4 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all">
          
          {/* Card Header: ⌂ XEM TRƯỚC KẾT QUẢ PHÂN TÍCH · FloorScan AI · ● Đang xử lý hoàn tất */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-amber-500/15">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-amber-500/20 text-[#fbbf24] flex items-center justify-center">
                <Home className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-sans">
                XEM TRƯỚC KẾT QUẢ PHÂN TÍCH
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-white/90">FloorScan AI</span>
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span>Đang xử lý hoàn tất</span>
              </span>
            </div>
          </div>

          {/* Top Floor Plan Switcher: [Bản vẽ gốc] | [Kết quả phân tích (AI)] */}
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'raw'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              Bản vẽ gốc
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] text-[#080d18] shadow-md shadow-amber-500/30'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              Kết quả phân tích (AI)
            </button>
          </div>

          {/* Main Grid: CAD Floor Plan (Left) + Result Info Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 8 Cols: Architectural Floor Plan Viewport */}
            <div className="lg:col-span-8 relative rounded-2xl bg-[#060a14] border border-amber-500/20 p-4 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner">
              
              {/* Drafting grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a14_1px,transparent_1px),linear-gradient(to_bottom,#1f1a14_1px,transparent_1px)] bg-[size:16px_16px] opacity-70" />

              <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* SVG CAD Architectural Blueprint */}
                <div className="w-full md:w-[68%] h-[260px] sm:h-[300px] flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] select-none">
                    
                    {/* Dimension lines */}
                    <line x1="20" y1="20" x2="380" y2="20" stroke="#332414" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="20" y1="280" x2="380" y2="280" stroke="#332414" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="20" y1="20" x2="20" y2="280" stroke="#332414" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="380" y1="20" x2="380" y2="280" stroke="#332414" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Outer Boundary Wall (Warm Amber-Gold in AI mode) */}
                    <rect 
                      x="40" y="40" width="320" height="220" 
                      fill="none" 
                      stroke={activeTab === 'ai' ? '#fbbf24' : '#cbd5e1'} 
                      strokeWidth={activeTab === 'ai' ? '3' : '2'} 
                    />

                    {/* Room 1: Phòng Khách */}
                    <rect 
                      x="45" y="45" width="170" height="110" 
                      fill={activeTab === 'ai' ? 'rgba(245,158,11,0.22)' : 'none'} 
                      stroke={activeTab === 'ai' ? '#f59e0b' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="130" y="95" fill={activeTab === 'ai' ? '#fde68a' : '#94a3b8'} fontSize="11" fontWeight="bold" textAnchor="middle">
                      Phòng Khách
                    </text>
                    <text x="130" y="112" fill={activeTab === 'ai' ? '#fbbf24' : '#64748b'} fontSize="9" textAnchor="middle">
                      28.5 m²
                    </text>

                    {/* Room 2: Bếp & Ăn */}
                    <rect 
                      x="220" y="45" width="135" height="110" 
                      fill={activeTab === 'ai' ? 'rgba(245,158,11,0.22)' : 'none'} 
                      stroke={activeTab === 'ai' ? '#f59e0b' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="287" y="95" fill={activeTab === 'ai' ? '#fde68a' : '#94a3b8'} fontSize="11" fontWeight="bold" textAnchor="middle">
                      Bếp & Ăn
                    </text>
                    <text x="287" y="112" fill={activeTab === 'ai' ? '#fbbf24' : '#64748b'} fontSize="9" textAnchor="middle">
                      21.2 m²
                    </text>

                    {/* Room 3: Phòng Ngủ 1 */}
                    <rect 
                      x="45" y="160" width="140" height="95" 
                      fill={activeTab === 'ai' ? 'rgba(245,158,11,0.22)' : 'none'} 
                      stroke={activeTab === 'ai' ? '#f59e0b' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="115" y="205" fill={activeTab === 'ai' ? '#fde68a' : '#94a3b8'} fontSize="11" fontWeight="bold" textAnchor="middle">
                      Phòng Ngủ 1
                    </text>
                    <text x="115" y="222" fill={activeTab === 'ai' ? '#fbbf24' : '#64748b'} fontSize="9" textAnchor="middle">
                      18.0 m²
                    </text>

                    {/* Room 4: Phòng Ngủ 2 */}
                    <rect 
                      x="190" y="160" width="110" height="95" 
                      fill={activeTab === 'ai' ? 'rgba(245,158,11,0.22)' : 'none'} 
                      stroke={activeTab === 'ai' ? '#f59e0b' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="245" y="205" fill={activeTab === 'ai' ? '#fde68a' : '#94a3b8'} fontSize="11" fontWeight="bold" textAnchor="middle">
                      Phòng Ngủ 2
                    </text>
                    <text x="245" y="222" fill={activeTab === 'ai' ? '#fbbf24' : '#64748b'} fontSize="9" textAnchor="middle">
                      12.5 m²
                    </text>

                    {/* Room 5: WC Vệ Sinh */}
                    <rect 
                      x="305" y="160" width="50" height="95" 
                      fill={activeTab === 'ai' ? 'rgba(234,88,12,0.25)' : 'none'} 
                      stroke={activeTab === 'ai' ? '#ea580c' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="330" y="205" fill={activeTab === 'ai' ? '#fdba74' : '#94a3b8'} fontSize="10" fontWeight="bold" textAnchor="middle">
                      WC
                    </text>
                    <text x="330" y="220" fill={activeTab === 'ai' ? '#f97316' : '#64748b'} fontSize="8" textAnchor="middle">
                      5.0 m²
                    </text>

                    {/* Doors (High-Vis Safety Orange indicators) */}
                    {activeTab === 'ai' ? (
                      <>
                        {/* Door 1 (Main Entrance) */}
                        <rect x="110" y="38" width="30" height="6" fill="#f97316" rx="1" />
                        <path d="M 110 44 A 28 28 0 0 1 138 72" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
                        
                        {/* Door 2 */}
                        <rect x="217" y="90" width="6" height="24" fill="#f97316" rx="1" />
                        {/* Door 3 */}
                        <rect x="187" y="180" width="6" height="20" fill="#f97316" rx="1" />
                        {/* Door 4 */}
                        <rect x="302" y="180" width="6" height="20" fill="#f97316" rx="1" />
                        
                        {/* 4 Windows (Golden Yellow indicators) */}
                        <rect x="70" y="37" width="30" height="4" fill="#fbbf24" />
                        <rect x="250" y="37" width="35" height="4" fill="#fbbf24" />
                        <rect x="70" y="259" width="30" height="4" fill="#fbbf24" />
                        <rect x="220" y="259" width="30" height="4" fill="#fbbf24" />

                        {/* Sanitary Fixtures (Coral Orange markers) */}
                        <circle cx="325" cy="180" r="4.5" fill="#ea580c" />
                        <circle cx="335" cy="180" r="3.5" fill="#f97316" />
                        <rect x="315" y="225" width="22" height="14" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      </>
                    ) : (
                      <>
                        <path d="M 110 44 A 28 28 0 0 1 138 72" fill="none" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="110" y1="44" x2="110" y2="72" stroke="#94a3b8" strokeWidth="1.5" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Right Mini Legend in Amber Palette */}
                <div className="w-full md:w-[32%] flex flex-col gap-2.5 p-3.5 rounded-xl bg-[#121927] border border-amber-500/20 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#fbbf24] shrink-0" />
                    <span className="text-white/90">Tường (120.5 m)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#f59e0b] shrink-0" />
                    <span className="text-white/90">Sàn (85.2 m²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#f97316] shrink-0" />
                    <span className="text-white/90">Cửa (8 bộ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#ea580c] shrink-0" />
                    <span className="text-white/90">Thiết bị (12)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right 4 Cols: THÔNG TIN KẾT QUẢ Panel */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0f1728] border border-amber-500/20 p-5 flex flex-col justify-between shadow-lg">
              
              <div>
                <h3 className="text-xs font-bold text-amber-200/90 uppercase tracking-wider mb-4 pb-2 border-b border-amber-500/20 flex items-center justify-between">
                  <span>THÔNG TIN KẾT QUẢ</span>
                  <span className="text-[10px] text-amber-400/80 font-mono">FloorScan AI</span>
                </h3>

                <div className="flex flex-col gap-3.5 text-xs sm:text-sm font-sans">
                  
                  {/* Tổng diện tích sàn: 85.2 m² */}
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white/70">
                      <Layers className="w-4 h-4 text-[#fbbf24]" />
                      <span>Tổng diện tích sàn</span>
                    </div>
                    <span className="font-bold text-white font-mono text-sm sm:text-base">85.2 m²</span>
                  </div>

                  {/* Chiều dài tường: 120.5 m */}
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white/70">
                      <Ruler className="w-4 h-4 text-[#f59e0b]" />
                      <span>Chiều dài tường</span>
                    </div>
                    <span className="font-bold text-white font-mono text-sm sm:text-base">120.5 m</span>
                  </div>

                  {/* Số lượng cửa: 8 bộ */}
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white/70">
                      <Home className="w-4 h-4 text-[#f97316]" />
                      <span>Số lượng cửa</span>
                    </div>
                    <span className="font-bold text-white font-mono text-sm sm:text-base">8 bộ</span>
                  </div>

                  {/* Thiết bị vệ sinh: 12 */}
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                      <span>Thiết bị vệ sinh</span>
                    </div>
                    <span className="font-bold text-white font-mono text-sm sm:text-base">12</span>
                  </div>

                  {/* Loại bản vẽ: Nhà ở dân dụng */}
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white/70">
                      <FileCheck className="w-4 h-4 text-[#fbbf24]" />
                      <span>Loại bản vẽ</span>
                    </div>
                    <span className="font-semibold text-white/95">Nhà ở dân dụng</span>
                  </div>

                </div>
              </div>

              {/* Big Amber-Orange Button: Tải báo cáo mẫu (Excel) ⤓ */}
              <button
                onClick={handleDownloadSampleExcel}
                className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#080d18] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(245,158,11,0.38)] transition-all cursor-pointer"
              >
                <span>Tải báo cáo mẫu (Excel)</span>
                <Download className="w-4 h-4 stroke-[2.5]" />
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: TÍNH NĂNG NỔI BẬT (Mọi thứ bạn cần trong một nền tảng)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a26] border border-amber-500/50 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-3">
          TÍNH NĂNG NỔI BẬT
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 font-sans">
          Mọi thứ bạn cần trong một nền tảng
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto mb-12">
          Từ bóc tách tự động đến xuất file chuyên nghiệp, FloorScan hỗ trợ toàn bộ quy trình phân tích bản vẽ.
        </p>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: AI bóc tách tự động */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/35 flex items-center justify-center text-[#fbbf24] group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              AI bóc tách tự động
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Nhận diện tường, sàn, cửa, thiết bị... bằng AI siêu nhanh.
            </p>
          </div>

          {/* Card 2: Chỉnh sửa thủ công */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-400/35 flex items-center justify-center text-[#f97316] group-hover:scale-105 transition-transform">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Chỉnh sửa thủ công
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Dễ dàng chỉnh sửa, bổ sung sau khi AI phân tích.
            </p>
          </div>

          {/* Card 3: Xuất file Excel */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-400/35 flex items-center justify-center text-[#facc15] group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Xuất file Excel
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Xuất bảng khối lượng chi tiết, sẵn sàng sử dụng.
            </p>
          </div>

          {/* Card 4: PDF có chú thích */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/35 flex items-center justify-center text-[#fbbf24] group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              PDF có chú thích
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Tạo file PDF với màu sắc, ghi chú rõ ràng.
            </p>
          </div>

          {/* Card 5: Hỗ trợ DWG/DXF */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-400/35 flex items-center justify-center text-[#f97316] group-hover:scale-105 transition-transform">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Hỗ trợ DWG/DXF
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Xuất file AutoCAD gốc, tương thích dễ dàng.
            </p>
          </div>

          {/* Card 6: Kết quả siêu nhanh */}
          <div className="rounded-2xl bg-[#0c1322] border border-amber-500/20 hover:border-amber-400/60 p-6 flex flex-col gap-3 transition-all group hover:bg-[#10182b]">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/35 flex items-center justify-center text-[#f59e0b] group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Kết quả siêu nhanh
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Bóc tách bản vẽ chỉ trong 30 giây.
            </p>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: QUY TRÌNH HOẠT ĐỘNG (Chỉ 6 bước đơn giản)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-amber-500/15">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a26] border border-amber-500/50 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-3">
          QUY TRÌNH HOẠT ĐỘNG
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 font-sans">
          Chỉ 6 bước đơn giản
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-16">
          Từ bản vẽ thô đến bảng khối lượng hoàn chỉnh, nhanh chóng và dễ dàng.
        </p>

        {/* 6 Steps Circular Pipeline with connecting arrows */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          
          {/* Step 1: Tải lên bản vẽ */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                01
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">Tải lên bản vẽ</h4>
            <p className="text-xs text-white/60 leading-tight">PDF, DWG, DXF...</p>
          </div>

          {/* Step 2: Cắt vùng bản vẽ */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Crop className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                02
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">Cắt vùng bản vẽ</h4>
            <p className="text-xs text-white/60 leading-tight">Chọn khu vực cần phân tích</p>
          </div>

          {/* Step 3: Thiết lập tỷ lệ */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Ruler className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                03
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">Thiết lập tỷ lệ</h4>
            <p className="text-xs text-white/60 leading-tight">Nhập thông số hoặc auto-detect</p>
          </div>

          {/* Step 4: AI phân tích */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                04
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">AI phân tích</h4>
            <p className="text-xs text-white/60 leading-tight">Tự động nhận diện và bóc tách</p>
          </div>

          {/* Step 5: Kiểm tra & chỉnh sửa */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                05
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">Kiểm tra & chỉnh sửa</h4>
            <p className="text-xs text-white/60 leading-tight">Xem lại kết quả, điều chỉnh nếu cần</p>
          </div>

          {/* Step 6: Xuất kết quả */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-[#101726] border-2 border-amber-400 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                06
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2 mb-1">Xuất kết quả</h4>
            <p className="text-xs text-white/60 leading-tight">Excel, PDF, DWG... sẵn sàng sử dụng</p>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: ĐƯỢC HÀNG NGHÌN KỸ SƯ VÀ DOANH NGHIỆP TIN DÙNG
      ═══════════════════════════════════════════════════════════════ */}
      <section id="clients" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15 text-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161a26] border border-amber-500/40 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-8">
          ĐƯỢC HÀNG NGHÌN KỸ SƯ VÀ DOANH NGHIỆP TIN DÙNG
        </div>

        {/* Brand Logos: Coteccons, Hoa Binh, Ricons, Central, Vinhomes, Samsung */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-14 text-white/70">
          
          {/* COTECCONS */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#fbbf24] font-black text-sm">
              C
            </div>
            <span className="font-extrabold tracking-wider text-base font-sans">COTECCONS</span>
          </div>

          {/* HOA BINH */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#f59e0b] font-bold text-xs">
              HB
            </div>
            <span className="font-black tracking-widest text-base font-sans">HOABINH</span>
          </div>

          {/* RICONS */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <span className="font-black text-lg tracking-tight font-sans text-amber-200">Ricons</span>
          </div>

          {/* CENTRAL */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <div className="w-6 h-6 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-[10px] font-black text-amber-400">
              C
            </div>
            <span className="font-extrabold text-base tracking-widest font-sans">CENTRAL</span>
          </div>

          {/* VINHOMES */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <span className="font-serif font-bold text-base tracking-wider">VINHOMES</span>
          </div>

          {/* SAMSUNG */}
          <div className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors cursor-pointer">
            <span className="font-black text-base tracking-widest font-sans">SAMSUNG</span>
          </div>

          {/* And more label */}
          <div className="text-xs text-amber-200/50 font-medium">
            Và hơn 1.000+ doanh nghiệp khác
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: RA QUYẾT ĐỊNH NHANH HƠN VỚI DỮ LIỆU CHÍNH XÁC (Showcase)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Value Props & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a26] border border-amber-500/50 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-4">
              BIẾN BẢN VẼ THÀNH THÔNG TIN CÓ GIÁ TRỊ
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
              Ra quyết định nhanh hơn<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">
                với dữ liệu chính xác
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              FloorScan không chỉ giúp bạn bóc tách khối lượng, mà còn cung cấp cái nhìn tổng quan, trực quan về toàn bộ dự án. Tiết kiệm thời gian, tối ưu chi phí và nâng cao hiệu quả làm việc.
            </p>

            {/* 3 Check List Items with Amber Badges */}
            <div className="flex flex-col gap-3 mb-8 w-full">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[#fbbf24] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-white/90 font-medium">Dữ liệu minh bạch, dễ dàng chia sẻ</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[#fbbf24] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-white/90 font-medium">Giảm thiểu sai sót trong dự toán</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[#fbbf24] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-white/90 font-medium">Phù hợp cho nhà thầu, tư vấn, chủ đầu tư</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#080d18] font-extrabold text-sm shadow-[0_4px_18px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
              >
                <span>Bắt đầu trải nghiệm miễn phí</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/20 hover:border-amber-400 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                <span>Xem bảng giá</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: BÁO CÁO DỰ ÁN MẪU Interactive App Box */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl bg-[#0b1220] border border-amber-500/30 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            
            {/* Box Header: BÁO CÁO DỰ ÁN MẪU · Dự án Demo */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  BÁO CÁO DỰ ÁN MẪU
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span>Dự án Demo</span>
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              
              {/* Left Mini Sidebar Tabs: Tổng quan, Bản vẽ, Bóc tách, Báo cáo, Tải xuống */}
              <div className="col-span-12 sm:col-span-4 flex sm:flex-col gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-medium">
                <button
                  onClick={() => setDemoSidebarTab('overview')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'overview'
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] font-bold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Tổng quan</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('plans')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'plans'
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] font-bold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bản vẽ</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('takeoff')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'takeoff'
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] font-bold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bóc tách</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('reports')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'reports'
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#080d18] font-bold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Báo cáo</span>
                </button>

                <button
                  onClick={handleDownloadSampleExcel}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap text-white/60 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải xuống</span>
                </button>
              </div>

              {/* Right Content: 4 Stats Tiles + Biểu đồ khối lượng */}
              <div className="col-span-12 sm:col-span-8 flex flex-col gap-4">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Sàn */}
                  <div className="p-3 rounded-xl bg-[#121929] border border-amber-500/15 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white font-mono leading-none">85.2 m²</div>
                      <div className="text-[10px] text-amber-200/60 mt-1">Diện tích sàn</div>
                    </div>
                    <Layers className="w-4 h-4 text-[#f59e0b]" />
                  </div>

                  {/* Tường */}
                  <div className="p-3 rounded-xl bg-[#121929] border border-amber-500/15 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white font-mono leading-none">120.5 m</div>
                      <div className="text-[10px] text-amber-200/60 mt-1">Chiều dài tường</div>
                    </div>
                    <Ruler className="w-4 h-4 text-[#fbbf24]" />
                  </div>

                  {/* Cửa */}
                  <div className="p-3 rounded-xl bg-[#121929] border border-amber-500/15 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white font-mono leading-none">8 bộ</div>
                      <div className="text-[10px] text-orange-200/60 mt-1">Cửa các loại</div>
                    </div>
                    <Home className="w-4 h-4 text-[#f97316]" />
                  </div>

                  {/* Thiết bị */}
                  <div className="p-3 rounded-xl bg-[#121929] border border-amber-500/15 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white font-mono leading-none">12</div>
                      <div className="text-[10px] text-orange-200/60 mt-1">Thiết bị vệ sinh</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                  </div>
                </div>

                {/* Biểu đồ khối lượng */}
                <div className="p-3.5 rounded-xl bg-[#121929] border border-amber-500/15">
                  <div className="text-xs font-semibold text-white/90 mb-3">
                    Biểu đồ khối lượng
                  </div>

                  {/* Custom Bar Visualization matching reference in Industrial Amber Palette */}
                  <div className="flex items-end justify-between gap-4 h-28 pt-2">
                    
                    {/* Bar 1: Tường 120.5m */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#fbbf24] rounded-t-md transition-all hover:brightness-110 shadow-sm shadow-amber-400/20" style={{ height: '90%' }} />
                      <span className="text-[9px] text-amber-200/70 font-mono">Tường</span>
                    </div>

                    {/* Bar 2: Sàn 85.2m2 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#f59e0b] rounded-t-md transition-all hover:brightness-110 shadow-sm shadow-amber-500/20" style={{ height: '65%' }} />
                      <span className="text-[9px] text-amber-200/70 font-mono">Sàn</span>
                    </div>

                    {/* Bar 3: Cửa 8 bộ */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#f97316] rounded-t-md transition-all hover:brightness-110 shadow-sm shadow-orange-500/20" style={{ height: '25%' }} />
                      <span className="text-[9px] text-orange-200/70 font-mono">Cửa</span>
                    </div>

                    {/* Bar 4: Thiết bị 12 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#ea580c] rounded-t-md transition-all hover:brightness-110 shadow-sm shadow-orange-600/20" style={{ height: '35%' }} />
                      <span className="text-[9px] text-orange-200/70 font-mono">Thiết bị</span>
                    </div>

                    {/* Legend list on right */}
                    <div className="flex flex-col gap-1 text-[10px] font-mono text-white/80 pl-2 border-l border-amber-500/20 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#fbbf24]" />
                        <span>Tường: 120.5m</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#f59e0b]" />
                        <span>Sàn: 85.2m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#f97316]" />
                        <span>Cửa: 8 bộ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#ea580c]" />
                        <span>TB: 12</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          VIDEO DEMO MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0b1220] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#060a14] border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-sm font-bold text-white font-sans">
                  Video Giới Thiệu Phân Tích Bản Vẽ Mặt Bằng - FloorScan AI
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 text-xs font-mono cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="/video.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
