import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Folder,
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ArrowUp,
  UploadCloud, 
  Sliders, 
  Cpu, 
  BarChart3, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  MoreHorizontal, 
  Lightbulb, 
  Database,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ProjectInfo } from '../../types';
import { useWorkspaceTheme } from '../../data/ThemeContext';

interface DashboardViewProps {
  projects: ProjectInfo[];
  onSelectProject: (proj: ProjectInfo) => void;
  onCreateProject: () => void;
  onOpenDrawingReview: (proj: ProjectInfo) => void;
}

// CAD Miniature Blueprint Thumbnail component
const CadThumbnail: React.FC<{ type?: string; index: number }> = ({ index }) => {
  const { themeConfig } = useWorkspaceTheme();
  const wallStroke = themeConfig.cadOuterWall;

  return (
    <div className={`w-13 h-10 rounded-lg bg-[#080d18] border ${themeConfig.accentBorder} p-1 flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-white/40 transition-colors`}>
      <svg viewBox="0 0 52 40" className="w-full h-full fill-none" stroke={wallStroke} strokeWidth="1">
        {index % 3 === 0 && (
          <>
            {/* Office floor plan wireframe */}
            <rect x="3" y="3" width="46" height="34" stroke={wallStroke} strokeWidth="1.2" />
            <line x1="3" y1="16" x2="49" y2="16" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="20" y1="3" x2="20" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="36" y1="16" x2="36" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <rect x="7" y="6" width="9" height="7" stroke={wallStroke} strokeWidth="0.6" strokeDasharray="1,1" />
            <rect x="24" y="20" width="8" height="6" stroke={wallStroke} strokeWidth="0.6" />
            {/* Door swing */}
            <path d="M 20 12 A 4 4 0 0 1 24 16" stroke={wallStroke} strokeWidth="0.6" />
          </>
        )}
        {index % 3 === 1 && (
          <>
            {/* Apartment residential blueprint */}
            <rect x="3" y="3" width="46" height="34" stroke={wallStroke} strokeWidth="1.2" />
            <line x1="26" y1="3" x2="26" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="3" y1="20" x2="26" y2="20" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="26" y1="24" x2="49" y2="24" stroke={wallStroke} strokeWidth="0.8" />
            <circle cx="14" cy="11" r="3" stroke={wallStroke} strokeWidth="0.6" />
            <path d="M 26 14 A 4 4 0 0 1 30 18" stroke={wallStroke} strokeWidth="0.6" />
            <rect x="30" y="7" width="14" height="12" stroke={wallStroke} strokeWidth="0.6" strokeDasharray="1.5,1.5" />
          </>
        )}
        {index % 3 === 2 && (
          <>
            {/* House / Factory structure */}
            <polygon points="3,10 26,3 49,10 49,37 3,37" stroke={wallStroke} strokeWidth="1" />
            <line x1="3" y1="22" x2="49" y2="22" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="26" y1="10" x2="26" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <rect x="8" y="26" width="10" height="7" stroke={wallStroke} strokeWidth="0.6" />
            <rect x="32" y="26" width="10" height="7" stroke={wallStroke} strokeWidth="0.6" />
          </>
        )}
      </svg>
      {/* subtle scanline dot */}
      <div 
        className="absolute top-1 right-1 w-1 h-1 rounded-full animate-pulse"
        style={{ backgroundColor: wallStroke }}
      />
    </div>
  );
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onOpenDrawingReview,
}) => {
  const { themeConfig } = useWorkspaceTheme();
  const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'completed' | 'review'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'progress'>('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const itemsPerPage = 5;

  // Counts
  const totalCount = projects.length;
  const completedCount = projects.filter(p => p.status === 'Completed' || p.status === 'Approved').length;
  const processingCount = projects.filter(p => p.status === 'Processing' || p.status === 'Draft').length;
  const reviewCount = projects.filter(p => p.status === 'Review Required').length;

  // Filtered list
  const filteredProjects = useMemo(() => {
    let list = projects.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.building.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (activeFilter === 'completed') {
        return p.status === 'Completed' || p.status === 'Approved';
      }
      if (activeFilter === 'processing') {
        return p.status === 'Processing' || p.status === 'Draft';
      }
      if (activeFilter === 'review') {
        return p.status === 'Review Required';
      }
      return true;
    });

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'progress') {
      list = [...list].sort((a, b) => (b.progressPct || 0) - (a.progressPct || 0));
    }
    return list;
  }, [projects, searchQuery, activeFilter, sortBy]);

  // Paginated list
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));

  const handleToggleSelectAll = () => {
    if (selectedProjectIds.length === paginatedProjects.length) {
      setSelectedProjectIds([]);
    } else {
      setSelectedProjectIds(paginatedProjects.map(p => p.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedProjectIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const gridColor = themeConfig.gridStroke;

  return (
    <div 
      className="min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-white font-sans"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        backgroundColor: '#080d18'
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. GREETING & HERO QUOTE SECTION
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Xin chào, Phát Đức!</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-white/60 mt-1 font-sans">
            Quản lý bản vẽ và kết quả bóc tách khối lượng sơn của bạn.
          </p>
        </div>

        {/* Inspirational quote block */}
        <div className="hidden lg:block text-right">
          <p className="text-sm italic text-white/70 font-sans tracking-tight">
            &ldquo;Bản vẽ chính xác hơn. Dự toán nhanh hơn.<br />
            Cùng xây những công trình tốt đẹp hơn.&rdquo;
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. METRICS CARDS ROW (4 STATS + 1 BIG ACTION CTA CARD)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Tổng số dự án */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} flex items-center justify-center border ${themeConfig.accentBorder}`}>
              <Folder className="w-5 h-5 opacity-80" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+2 tháng này</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono">
              {totalCount}
            </div>
            <div className="text-xs text-white/60 mt-0.5">Tổng số dự án</div>
          </div>
        </div>

        {/* Card 2: Đã hoàn thành */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0a3024] text-[#34d399] flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-white/40">67%</span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono">
              {completedCount}
            </div>
            <div className="text-xs text-white/60 mt-0.5">Đã hoàn thành</div>
          </div>
        </div>

        {/* Card 3: Đang xử lý */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} flex items-center justify-center border ${themeConfig.accentBorder}`}>
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono">
              {processingCount}
            </div>
            <div className="text-xs text-white/60 mt-0.5">Đang xử lý</div>
          </div>
        </div>

        {/* Card 4: Cần kiểm tra */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#381219] text-[#f87171] flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-white/40">8%</span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono">
              {reviewCount}
            </div>
            <div className="text-xs text-white/60 mt-0.5">Cần kiểm tra</div>
          </div>
        </div>

        {/* Card 5: Tạo dự án mới (Action CTA Button Card) */}
        <button
          onClick={onCreateProject}
          className={`p-4 rounded-2xl ${themeConfig.primaryBtn} hover:brightness-110 active:scale-98 flex items-center justify-between shadow-lg transition-all cursor-pointer text-left group`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black/20 flex items-center justify-center text-inherit shrink-0 group-hover:scale-105 transition-transform">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="font-extrabold text-base leading-tight">
                Tạo dự án mới
              </div>
              <div className="text-[11px] opacity-80 mt-0.5 leading-snug font-medium">
                Tải lên bản vẽ CAD để bắt đầu bóc tách
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 stroke-[2.5] shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
        </button>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BẮT ĐẦU NHANH (QUICK START 4-STEP WORKFLOW)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3">
          Bắt đầu nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Step 1 */}
          <div 
            onClick={onCreateProject}
            className={`p-3.5 rounded-2xl bg-[#0e1424] border border-white/10 hover:${themeConfig.accentBorder} transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm`}
          >
            <div className={`w-8 h-8 rounded-full bg-[#161a26] ${themeConfig.accentText} border ${themeConfig.accentBorder} font-bold text-xs flex items-center justify-center font-mono shrink-0`}>
              1
            </div>
            <div className={`w-9 h-9 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className={`font-bold text-xs text-white group-hover:${themeConfig.accentText} transition-colors`}>
                Tải lên bản vẽ
              </div>
              <div className="text-[11px] text-white/50 truncate">
                DWG, DXF hoặc PDF
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={onCreateProject}
            className={`p-3.5 rounded-2xl bg-[#0e1424] border border-white/10 hover:${themeConfig.accentBorder} transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm`}
          >
            <div className={`w-8 h-8 rounded-full bg-[#161a26] ${themeConfig.accentText} border ${themeConfig.accentBorder} font-bold text-xs flex items-center justify-center font-mono shrink-0`}>
              2
            </div>
            <div className={`w-9 h-9 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <Sliders className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className={`font-bold text-xs text-white group-hover:${themeConfig.accentText} transition-colors`}>
                Thiết lập dự án
              </div>
              <div className="text-[11px] text-white/50 truncate">
                Chọn tầng, đơn vị, thông số sơn
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => onSelectProject(projects[0])}
            className={`p-3.5 rounded-2xl bg-[#0e1424] border border-white/10 hover:${themeConfig.accentBorder} transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm`}
          >
            <div className={`w-8 h-8 rounded-full bg-[#161a26] ${themeConfig.accentText} border ${themeConfig.accentBorder} font-bold text-xs flex items-center justify-center font-mono shrink-0`}>
              3
            </div>
            <div className={`w-9 h-9 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <Cpu className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className={`font-bold text-xs text-white group-hover:${themeConfig.accentText} transition-colors`}>
                AI phân tích
              </div>
              <div className="text-[11px] text-white/50 truncate">
                Nhận diện phòng, tường, cửa...
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => onOpenDrawingReview(projects[0])}
            className={`p-3.5 rounded-2xl bg-[#0e1424] border border-white/10 hover:${themeConfig.accentBorder} transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm`}
          >
            <div className={`w-8 h-8 rounded-full bg-[#161a26] ${themeConfig.accentText} border ${themeConfig.accentBorder} font-bold text-xs flex items-center justify-center font-mono shrink-0`}>
              4
            </div>
            <div className={`w-9 h-9 rounded-xl ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className={`font-bold text-xs text-white group-hover:${themeConfig.accentText} transition-colors`}>
                Xem kết quả
              </div>
              <div className="text-[11px] text-white/50 truncate">
                Kiểm tra và xuất báo cáo
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DỰ ÁN GẦN ĐÂY (RECENT PROJECTS TABLE WITH CAD THUMBNAILS)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#0e1424] border border-white/10 p-4 sm:p-5 space-y-4 shadow-xl">
        
        {/* Table Filter Tabs & Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          {/* Left: Title + Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h2 className="text-base font-bold text-white mr-2">
              Dự án gần đây
            </h2>

            <button
              onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} shadow-sm`
                  : 'bg-transparent text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Tất cả ({totalCount})
            </button>

            <button
              onClick={() => { setActiveFilter('processing'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'processing'
                  ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} shadow-sm`
                  : 'bg-transparent text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Đang xử lý ({processingCount})
            </button>

            <button
              onClick={() => { setActiveFilter('completed'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'completed'
                  ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} shadow-sm`
                  : 'bg-transparent text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Hoàn thành ({completedCount})
            </button>

            <button
              onClick={() => { setActiveFilter('review'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'review'
                  ? `${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder} shadow-sm`
                  : 'bg-transparent text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Cần kiểm tra ({reviewCount})
            </button>
          </div>

          {/* Right: Sort + View Toggle + Filter Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-white/60 bg-[#080d18] border border-white/10 rounded-xl px-3 py-1.5">
              <span>Sắp xếp:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`bg-transparent ${themeConfig.accentText} font-medium focus:outline-none cursor-pointer`}
              >
                <option value="recent" className="bg-[#0e1424] text-white">Cập nhật gần nhất</option>
                <option value="name" className="bg-[#0e1424] text-white">Tên dự án</option>
                <option value="progress" className="bg-[#0e1424] text-white">Tiến độ</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#080d18] border border-white/10 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-500/20 text-[#fbbf24]' : 'text-white/40 hover:text-white'
                }`}
                title="Dạng lưới"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-amber-500/20 text-[#fbbf24]' : 'text-white/40 hover:text-white'
                }`}
                title="Dạng danh sách"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Lọc dự án..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-36 sm:w-44 bg-[#080d18] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Table Data View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-semibold text-white/50">
                <th className="py-2.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedProjectIds.length === paginatedProjects.length && paginatedProjects.length > 0}
                    onChange={handleToggleSelectAll}
                    className="rounded bg-[#080d18] border-white/20 text-amber-500 focus:ring-0 cursor-pointer accent-amber-500"
                  />
                </th>
                <th className="py-2.5 px-3">Tên dự án</th>
                <th className="py-2.5 px-3">Thông tin</th>
                <th className="py-2.5 px-3">Trạng thái</th>
                <th className="py-2.5 px-3 w-36">Tiến độ</th>
                <th className="py-2.5 px-3">Cập nhật gần nhất</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {paginatedProjects.map((proj, idx) => {
                const isSelected = selectedProjectIds.includes(proj.id);
                const isCompleted = proj.status === 'Completed' || proj.status === 'Approved';
                const isProcessing = proj.status === 'Processing' || proj.status === 'Draft';
                const isReview = proj.status === 'Review Required';
                const progress = proj.progressPct || (isCompleted ? 100 : isProcessing ? 65 : 80);

                return (
                  <tr 
                    key={proj.id}
                    className={`hover:bg-amber-500/5 transition-colors group ${
                      isSelected ? 'bg-amber-500/10' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectOne(proj.id)}
                        className={`rounded bg-[#080d18] border-white/20 ${themeConfig.accentText} focus:ring-0 cursor-pointer`}
                      />
                    </td>

                    {/* Tên dự án + Thumbnail */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <CadThumbnail index={idx} />
                        <div>
                          <div 
                            onClick={() => onSelectProject(proj)}
                            className={`font-bold text-white group-hover:${themeConfig.accentText} transition-colors cursor-pointer`}
                          >
                            {proj.name}
                          </div>
                          <div className="text-[11px] font-mono text-white/40">
                            {proj.fileName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Thông tin */}
                    <td className="py-3 px-3 text-white/70">
                      <div>
                        {proj.floorsInfo ? proj.floorsInfo.split(' / ')[0] : `${proj.floorsCount} tầng`}
                      </div>
                      <div className="text-[11px] text-white/40">
                        {proj.floorsInfo ? proj.floorsInfo.split(' / ')[1] : `${proj.drawingsCount || 4} bản vẽ`}
                      </div>
                    </td>

                    {/* Trạng thái Badge */}
                    <td className="py-3 px-3">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0a2e24] text-[#34d399] border border-[#059669]/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Đã hoàn thành</span>
                        </span>
                      )}
                      {isProcessing && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${themeConfig.badgeBg} ${themeConfig.accentText} border ${themeConfig.accentBorder}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${themeConfig.activeIndicator} animate-pulse`} />
                          <span>Đang xử lý</span>
                        </span>
                      )}
                      {isReview && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#381017] text-[#f87171] border border-[#ef4444]/40">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Cần kiểm tra</span>
                        </span>
                      )}
                    </td>

                    {/* Tiến độ Bar */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#080d18] overflow-hidden">
                          <div 
                            className={`h-full ${themeConfig.primaryBtn} rounded-full transition-all duration-500`} 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-white/60 w-8 text-right">
                          {progress}%
                        </span>
                      </div>
                    </td>

                    {/* Cập nhật gần nhất */}
                    <td className="py-3 px-3 text-white/60 font-mono text-[11px]">
                      <div>{proj.lastModified.includes(' ') ? proj.lastModified.split(' ')[0] : proj.lastModified}</div>
                      {proj.lastModified.includes(' ') && (
                        <div className="text-white/40">{proj.lastModified.split(' ')[1]}</div>
                      )}
                    </td>

                    {/* Thao tác Buttons */}
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {isCompleted && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${themeConfig.accentText} ${themeConfig.badgeBg} border ${themeConfig.accentBorder} hover:opacity-90 transition-all cursor-pointer`}
                          >
                            Xem kết quả
                          </button>
                        )}
                        {isProcessing && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${themeConfig.accentText} ${themeConfig.badgeBg} border ${themeConfig.accentBorder} hover:opacity-90 transition-all cursor-pointer`}
                          >
                            Tiếp tục
                          </button>
                        )}
                        {isReview && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold text-[#f87171] bg-[#381017]/60 border border-[#ef4444]/60 hover:bg-[#ef4444] hover:text-white transition-all cursor-pointer"
                          >
                            Xem vấn đề
                          </button>
                        )}

                        <button 
                          onClick={() => onSelectProject(proj)}
                          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Tùy chọn khác"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Count + Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-white/50 font-sans">
          <div>
            Hiển thị 1 - {paginatedProjects.length} trong {filteredProjects.length} dự án
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? `${themeConfig.primaryBtn} font-bold shadow-xs`
                      : 'border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM ROW (MẸO SỬ DỤNG + DUNG LƯỢNG LƯU TRỮ)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Left Card: Mẹo sử dụng */}
        <div className="lg:col-span-8 p-4 sm:p-5 rounded-2xl bg-[#0e1424] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl ${themeConfig.badgeBg} border ${themeConfig.accentBorder} ${themeConfig.accentText} flex items-center justify-center shrink-0`}>
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Mẹo sử dụng
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
                Để có kết quả chính xác hơn, hãy đảm bảo bản vẽ có đúng đơn vị đo và cung cấp thông tin chiều cao tường.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectProject(projects[0])}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold ${themeConfig.accentText} ${themeConfig.badgeBg} border ${themeConfig.accentBorder} hover:opacity-90 transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer flex items-center gap-1.5`}
          >
            <span>Xem hướng dẫn chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Card: Dung lượng lưu trữ */}
        <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-[#0e1424] border border-white/10 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-xl ${themeConfig.badgeBg} border ${themeConfig.accentBorder} ${themeConfig.accentText} flex items-center justify-center shrink-0`}>
              <Database className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-white">
                Dung lượng lưu trữ
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#080d18] overflow-hidden">
                  <div 
                    className={`h-full ${themeConfig.primaryBtn} rounded-full w-[24%]`} 
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mt-1">
                <span>2.4 GB / 10 GB</span>
                <span className={themeConfig.accentText}>24%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Gói hiện tại: Kỹ sư Pro (10 GB). Liên hệ nâng cấp lên gói Enterprise (100 GB).')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${themeConfig.primaryBtn} hover:brightness-110 transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-sm`}
          >
            Nâng cấp
          </button>
        </div>

      </div>

    </div>
  );
};
