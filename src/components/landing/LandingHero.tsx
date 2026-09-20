import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Database, 
  FileCode, 
  Sparkles, 
  Eye, 
  Compass, 
  ShieldCheck, 
  ChevronDown,
  Activity,
  Layers,
  Maximize2
} from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'raw' | 'ai' | 'takeoff'>('ai');
  const [hoveredRoom, setHoveredRoom] = useState<string>('A101');
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure video autoplays smoothly on all modern browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const playOnInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('scroll', playOnInteraction);
          };
          window.addEventListener('click', playOnInteraction, { once: true });
          window.addEventListener('scroll', playOnInteraction, { once: true });
        });
      }
    }
  }, []);

  // Parallax scroll effects matching regenerative living architecture
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const scrollToStory = () => {
    const el = document.getElementById('storytelling');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-[#0c0e12] text-white antialiased drafting-grid-dark"
    >
      {/* Top Scroll Progress Indicator (Amber Gradient) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffc976] via-[#f59e0b] to-[#ac732b] z-50 origin-left shadow-[0_0_12px_rgba(255,196,116,0.6)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC AMBIENT GLOWS (OPENHERO REGENERATIVE AESTHETICS)
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-[5%] top-[8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,193,102,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute right-[4%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)] blur-3xl" />
        <div className="absolute left-[30%] bottom-[10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.04),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Eyebrow Badges & Architectural Coordinates */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-300/30 bg-[#16181d]/80 backdrop-blur-md px-4 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-xs text-[#ffc474]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc474] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
            </span>
            <span className="font-semibold tracking-wide">
              Kiến trúc Sinh thái & Bóc tách Không gian AI · Chuẩn xác theo Vector CAD
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md text-white/80">
              <Activity className="w-3.5 h-3.5 text-[#ffc474]" />
              10°46&apos;37&quot;N 106°41&apos;43&quot;E · Tháp Sunrise
            </span>
            <span className="hidden lg:inline text-white/40">
              // DXF R12–2024 · TCVN 8652:2012
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CENTRAL ARCHITECTURAL MONOLITH (OPENHERO CORE + VIDEO PORTAL)
        ───────────────────────────────────────────────────────────── */}
        <div className="relative mx-auto my-6 lg:my-10">
          {/* 4 Architectural Telemetry Cards (Desktop floating, responsive grid on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 lg:gap-5 mb-8">
            {/* Telemetry 1 */}
            <div className="telemetry-card p-4 sm:p-5 transition-transform hover:-translate-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/70 mb-1">
                ĐỘ CHÍNH XÁC VECTOR CAD
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                99.8%
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed">
                Bóc tách trực tiếp từ thực thể vector DXF/DWG nguyên bản, sai số hình học bằng 0.
              </p>
            </div>

            {/* Telemetry 2 */}
            <div className="telemetry-card p-4 sm:p-5 transition-transform hover:-translate-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/70 mb-1">
                THẨM ĐỊNH KỸ THUẬT HITL
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#ffc474] tracking-tight">
                Hạng A+
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed">
                Kỹ sư kiểm duyệt từng đỉnh hình học, khóa audit trail bất biến trước khi xuất BOQ.
              </p>
            </div>

            {/* Telemetry 3 */}
            <div className="telemetry-card p-4 sm:p-5 transition-transform hover:-translate-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/70 mb-1">
                KHẤU TRỪ DIỆN TÍCH TCVN
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                100%
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed">
                Tự động khấu trừ cửa đi, cửa sổ, ban công theo tiêu chuẩn TCVN 8652:2012.
              </p>
            </div>

            {/* Telemetry 4 */}
            <div className="telemetry-card p-4 sm:p-5 transition-transform hover:-translate-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/70 mb-1">
                TRẠNG THÁI HỆ THỐNG
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed">
                Đồng bộ thời gian thực từ bản vẽ CAD sang bảng tiên lượng dự toán kỹ thuật.
              </p>
            </div>
          </div>

          {/* Central Monolith: Video Core with Shimmer Frame & Cormorant Garamond Title */}
          <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-amber-300/25 bg-[#16181d] shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
            {/* Shimmer Glow Frame */}
            <div className="shimmer-frame z-20 pointer-events-none" />

            {/* Video Canvas Element */}
            <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden">
              <motion.div 
                style={{ y: videoY, scale: videoScale }}
                className="w-full h-full"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.08] saturate-110"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </motion.div>

              {/* Atmospheric Gradient Wash for Perfect Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12]/80 via-transparent to-[#0c0e12]/80 z-10" />

              {/* Centered Editorial Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 text-center">
                {/* Material Palette Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
                  <span className="rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-amber-200 backdrop-blur-md">
                    Amber Glow
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 backdrop-blur-md">
                    Concrete Grey
                  </span>
                  <span className="rounded-full border border-amber-600/40 bg-amber-600/15 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-amber-300 backdrop-blur-md">
                    Golden Oak
                  </span>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300 backdrop-blur-md">
                    CAD Vector Precision
                  </span>
                </div>

                {/* Cormorant Garamond Serif Headline */}
                <h1 className="font-serif-cormorant text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.06] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-4xl">
                  <span className="block">Chuyển đổi bản vẽ xây dựng thành</span>
                  <span className="block text-[#ffc474] italic">
                    hồ sơ dự toán sơn được kiểm định.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl font-sans-tight drop-shadow-sm">
                  Tự động nhận diện ranh giới phòng từ vector CAD 2D nguyên bản, khấu trừ chính xác diện tích cửa đi, cửa sổ, và cho phép kỹ sư thẩm định từng đỉnh hình học với độ tin cậy tuyệt đối.
                </p>

                {/* Action CTA Group */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={onGetStarted}
                    className="amber-button inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold cursor-pointer"
                  >
                    <span>Bắt đầu bóc tách ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onExploreDemo}
                    className="dense-panel inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 rounded-2xl transition-all cursor-pointer shadow-lg"
                  >
                    <Compass className="w-4 h-4 text-[#ffc474]" />
                    <span>Xem bản vẽ mẫu & Dự toán</span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                </div>

                {/* Micro trust indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffc474]" />
                  <span>AI đề xuất → Kỹ sư duyệt → Khóa hồ sơ bất biến</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE CAD ENGINE SIMULATOR (DARK DRAFTING TABLE)
        ───────────────────────────────────────────────────────────── */}
        <div className="relative rounded-2xl border border-white/10 bg-[#13151b] text-white shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden mt-12 lg:mt-16">
          {/* Top Architectural Toolbar */}
          <div className="h-12 px-4 sm:px-6 bg-[#181a22] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-white font-semibold flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#ffc474]" />
                Sunrise_Tower_Tang03_KienTruc.dxf
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI SPATIAL ANALYSIS SẴN SÀNG
              </span>
            </div>

            {/* Stage toggle tabs */}
            <div className="flex items-center bg-[#0c0e12] rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'raw'
                    ? 'bg-white/15 text-white shadow-2xs'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                1. Bản vẽ CAD gốc
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-gradient-to-r from-[#ffc976] to-[#ac732b] text-[#1a1005] font-bold shadow-2xs'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                2. AI bóc tách đa giác
              </button>
              <button
                onClick={() => setActiveTab('takeoff')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'takeoff'
                    ? 'bg-white/15 text-white shadow-2xs'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                3. Bảng khối lượng BOQ
              </button>
            </div>
          </div>

          {/* CAD Canvas & Inspector Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left CAD Floor Plan Area */}
            <div className="lg:col-span-8 p-6 relative flex flex-col justify-between select-none bg-[#0e1015] drafting-grid-dark">
              {/* Coordinates HUD */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/60 pb-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white/80">LƯỚI TRỤC: 1000mm</span>
                  <span>TỶ LỆ: 1:100</span>
                  <span className="text-[#ffc474] font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    LỚP: A-WALL (TƯỜNG)
                  </span>
                </div>
                <div className="bg-[#181b22] px-3 py-1 rounded-md border border-white/10 text-white font-mono shadow-2xs">
                  X: <span className="font-semibold text-[#ffc474]">420.50m</span> &nbsp; Y: <span className="font-semibold text-[#ffc474]">180.25m</span>
                </div>
              </div>

              {/* Interactive Vector CAD Blueprint SVG (Dark Drafting Canvas) */}
              <div className="relative my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 800 380"
                  className="w-full max-w-[720px] h-auto drop-shadow-xl"
                >
                  {/* Outer Perimeter Wall */}
                  <rect
                    x="100"
                    y="60"
                    width="620"
                    height="280"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />

                  {/* Room A101: Master Suite */}
                  <path
                    d="M 120 80 L 380 80 L 380 200 L 120 200 Z"
                    className={`cursor-pointer transition-all duration-200 ${
                      activeTab === 'raw'
                        ? 'fill-transparent stroke-[#38bdf8] stroke-[2]'
                        : hoveredRoom === 'A101'
                        ? 'fill-emerald-500/25 stroke-emerald-400 stroke-[3]'
                        : 'fill-emerald-500/15 stroke-emerald-500 stroke-[2]'
                    }`}
                    onMouseEnter={() => setHoveredRoom('A101')}
                  />
                  {activeTab !== 'raw' && (
                    <g className="pointer-events-none">
                      <text x="250" y="135" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        Phòng A101 (Master)
                      </text>
                      <text x="250" y="155" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontFamily="monospace" fontWeight="600">
                        S=42.5m² | Sơn=85.0m²
                      </text>
                      <circle cx="120" cy="80" r="3.5" fill="#10b981" />
                      <circle cx="380" cy="80" r="3.5" fill="#10b981" />
                      <circle cx="380" cy="200" r="3.5" fill="#10b981" />
                      <circle cx="120" cy="200" r="3.5" fill="#10b981" />
                    </g>
                  )}

                  {/* Room A102: Executive Suite */}
                  <path
                    d="M 400 80 L 700 80 L 700 200 L 400 200 Z"
                    className={`cursor-pointer transition-all duration-200 ${
                      activeTab === 'raw'
                        ? 'fill-transparent stroke-[#38bdf8] stroke-[2]'
                        : hoveredRoom === 'A102'
                        ? 'fill-sky-500/25 stroke-sky-400 stroke-[3]'
                        : 'fill-sky-500/15 stroke-sky-500 stroke-[2]'
                    }`}
                    onMouseEnter={() => setHoveredRoom('A102')}
                  />
                  {activeTab !== 'raw' && (
                    <g className="pointer-events-none">
                      <text x="550" y="135" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
                        Phòng A102 (VIP)
                      </text>
                      <text x="550" y="155" textAnchor="middle" fill="#bae6fd" fontSize="11" fontFamily="monospace" fontWeight="600">
                        S=38.2m² | Sơn=76.4m²
                      </text>
                    </g>
                  )}

                  {/* Room A103: Living Hall (Flagged issue) */}
                  <path
                    d="M 120 220 L 420 220 L 420 320 L 120 320 Z"
                    className={`cursor-pointer transition-all duration-200 ${
                      activeTab === 'raw'
                        ? 'fill-transparent stroke-[#38bdf8] stroke-[2]'
                        : hoveredRoom === 'A103'
                        ? 'fill-amber-500/25 stroke-amber-400 stroke-[3]'
                        : 'fill-amber-500/15 stroke-amber-500 stroke-[2] stroke-dasharray-[4,2]'
                    }`}
                    onMouseEnter={() => setHoveredRoom('A103')}
                  />
                  {activeTab !== 'raw' && (
                    <g className="pointer-events-none">
                      <text x="270" y="265" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                        Phòng A103 (Phòng khách)
                      </text>
                      <text x="270" y="285" textAnchor="middle" fill="#fde68a" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        ⚠️ Cần thẩm định khe hở 650mm
                      </text>
                    </g>
                  )}

                  {/* Room B104: Kitchen */}
                  <path
                    d="M 440 220 L 700 220 L 700 320 L 440 320 Z"
                    className={`cursor-pointer transition-all duration-200 ${
                      activeTab === 'raw'
                        ? 'fill-transparent stroke-[#38bdf8] stroke-[2]'
                        : hoveredRoom === 'B104'
                        ? 'fill-emerald-500/25 stroke-emerald-400 stroke-[3]'
                        : 'fill-emerald-500/15 stroke-emerald-500 stroke-[2]'
                    }`}
                    onMouseEnter={() => setHoveredRoom('B104')}
                  />
                  {activeTab !== 'raw' && (
                    <g className="pointer-events-none">
                      <text x="570" y="265" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        Phòng B104 (Bếp)
                      </text>
                      <text x="570" y="285" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontFamily="monospace" fontWeight="600">
                        S=54.8m² | Sơn=109.6m²
                      </text>
                    </g>
                  )}

                  {/* Door D021 on Room A101 */}
                  <line x1="380" y1="120" x2="380" y2="160" stroke="#f43f5e" strokeWidth="3" />
                  <path d="M 380 120 A 40 40 0 0 1 420 160" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="395" y="145" fill="#fb7185" fontSize="9" fontFamily="monospace" fontWeight="bold">D021 (-3.78m²)</text>

                  {/* Window W-101 */}
                  <line x1="180" y1="80" x2="260" y2="80" stroke="#f59e0b" strokeWidth="4" />
                  <text x="210" y="72" fill="#fde68a" fontSize="9" fontFamily="monospace" fontWeight="bold">W-101 (-4.50m²)</text>
                </svg>
              </div>

              {/* Bottom Canvas Legend & Controls */}
              <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                    <span className="font-medium text-white/80">Đã duyệt (Confirmed)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                    <span className="font-medium text-white/80">Cần thẩm định (Needs Review)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                    <span className="font-medium text-white/80">Khấu trừ cửa (Deductions)</span>
                  </span>
                </div>
                <div className="font-mono text-xs text-white/40">
                  Rà chuột vào từng phòng để xem bóc tách chi tiết →
                </div>
              </div>
            </div>

            {/* Right Inspector & Traceability HUD (Dark Concrete Panel) */}
            <div className="lg:col-span-4 p-6 bg-[#161820] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase font-mono tracking-widest text-[#ffc474] font-bold">
                      {hoveredRoom === 'A101' ? 'PHÒNG A101' : hoveredRoom === 'A102' ? 'PHÒNG A102' : hoveredRoom === 'A103' ? 'PHÒNG A103' : 'PHÒNG B104'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {hoveredRoom === 'A101'
                        ? 'Phòng ngủ Master & Phòng làm việc'
                        : hoveredRoom === 'A102'
                        ? 'Phòng ngủ VIP / Executive'
                        : hoveredRoom === 'A103'
                        ? 'Phòng khách & Không gian ăn'
                        : 'Khu vực Bếp & Pantry'}
                    </h3>
                    <p className="text-xs text-white/50 font-medium">Tầng 03 · Tháp căn hộ Sunrise</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold uppercase font-mono ${
                    hoveredRoom === 'A103'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {hoveredRoom === 'A103' ? 'Cần thẩm định' : 'Đã thẩm định'}
                  </span>
                </div>

                {/* Real-time calculated properties */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-[#1c1f28] border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Diện tích sàn</span>
                    <span className="text-xl font-bold font-mono text-white">
                      {hoveredRoom === 'A101' ? '42.50' : hoveredRoom === 'A102' ? '38.20' : hoveredRoom === 'A103' ? '41.70' : '54.80'} <span className="text-xs font-normal text-white/50">m²</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1c1f28] border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Chu vi phòng</span>
                    <span className="text-xl font-bold font-mono text-white">
                      {hoveredRoom === 'A101' ? '26.50' : hoveredRoom === 'A102' ? '24.80' : hoveredRoom === 'A103' ? '25.90' : '30.20'} <span className="text-xs font-normal text-white/50">m</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-[10px] uppercase text-emerald-400 block font-bold">Diện tích sơn thực tế</span>
                    <span className="text-xl font-bold font-mono text-emerald-300">
                      {hoveredRoom === 'A101' ? '85.00' : hoveredRoom === 'A102' ? '76.40' : hoveredRoom === 'A103' ? '83.40' : '109.60'} <span className="text-xs font-normal text-emerald-400/70">m²</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <span className="text-[10px] uppercase font-bold text-rose-400 block">Khấu trừ cửa</span>
                    <span className="text-xl font-bold font-mono text-rose-300">
                      - {hoveredRoom === 'A101' ? '8.28' : hoveredRoom === 'A102' ? '5.09' : hoveredRoom === 'A103' ? '9.18' : '6.58'} <span className="text-xs font-normal text-rose-400/70">m²</span>
                    </span>
                  </div>
                </div>

                {/* Traceability Details */}
                <div className="space-y-2 text-xs font-mono bg-[#1c1f28] p-3.5 rounded-xl border border-white/10">
                  <div className="flex justify-between">
                    <span className="text-white/50">Nguồn thực thể DXF:</span>
                    <span className="text-white font-bold">LWPOLYLINE #{hoveredRoom === 'A101' ? '8F31' : hoveredRoom === 'A102' ? '9A12' : hoveredRoom === 'A103' ? '3D88' : '2E19'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Lớp bản vẽ:</span>
                    <span className="text-[#38bdf8] font-semibold">A-WALL (Tường xây)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Độ tin cậy AI:</span>
                    <span className={`font-bold ${hoveredRoom === 'A103' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {hoveredRoom === 'A101' ? '98%' : hoveredRoom === 'A102' ? '96%' : hoveredRoom === 'A103' ? '71% (Cần xác nhận)' : '95%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Đơn giá dự toán:</span>
                    <span className="text-[#ffc474] font-semibold">98,000 ₫/m²</span>
                  </div>
                </div>

                {/* AI Explanation preview */}
                <div className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                  <div className="flex items-center gap-1.5 text-[#ffc474] font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffc474]" />
                    <span>Giải trình thuật toán AI:</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-white/70">
                    {hoveredRoom === 'A101'
                      ? 'Đa giác 14 đỉnh khép kín hoàn hảo. Cửa đi D021 (3.78m²) và cửa sổ W-101 (4.50m²) đã được khấu trừ tự động khỏi diện tích tường thô.'
                      : hoveredRoom === 'A102'
                      ? 'Biên dạng chữ nhật vuông vắn. Độ tương phản vector cao trên lớp A-WALL với bề dày hoàn thiện 200mm.'
                      : hoveredRoom === 'A103'
                      ? 'Cảnh báo khe hở 650mm gần cột C-04. AI đã bắc cầu tạm thời, đề nghị kỹ sư bấm Phê duyệt hoặc kéo thả chỉnh đỉnh.'
                      : 'Khu vực bếp với yêu cầu chống ẩm cao. Ranh giới khép kín chuẩn xác theo tim tường.'}
                  </p>
                </div>
              </div>

              {/* Action buttons inside inspector */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={onExploreDemo}
                  className="amber-button flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem hồ sơ phòng</span>
                </button>
                <button
                  onClick={onGetStarted}
                  className="dense-panel px-3.5 py-2 text-xs font-semibold text-white/80 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  Bóc tách file của bạn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid (OpenHero Dark Monolithic Cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="dense-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[#ffc474] flex items-center justify-center mb-4">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Đọc vector DXF nguyên bản</h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans-tight">
              Không dùng phương pháp quét ảnh mờ nhạt (raster OCR). Đọc trực tiếp các thực thể LWPOLYLINE, LINE, TEXT và HATCH để đảm bảo sai số hình học bằng 0.
            </p>
          </div>

          <div className="dense-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Quy trình kiểm định kỹ thuật (HITL)</h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans-tight">
              AI đóng vai trò trợ lý bóc tách tốc độ cao. Kỹ sư luôn nắm quyền kiểm soát tối cao: xác nhận, kéo thả đỉnh hình học, hoặc từ chối từng phòng trước khi xuất hồ sơ.
            </p>
          </div>

          <div className="dense-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/30 text-sky-400 flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Truy xuất nguồn gốc hai chiều</h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans-tight">
              Mỗi con số trên bảng dự toán BOQ đều liên kết trực tiếp với ID thực thể CAD, giúp quá trình bảo vệ dự toán với Chủ đầu tư và Tư vấn giám sát diễn ra minh bạch.
            </p>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <button
            onClick={scrollToStory}
            className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-[#ffc474] transition-colors cursor-pointer"
          >
            <span>Cuộn xuống khám phá quy trình kỹ thuật</span>
            <ChevronDown className="w-4 h-4 text-[#ffc474] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
