import React, { useState, useEffect } from 'react';
import { 
  Home,
  LayoutDashboard, 
  Layers, 
  Image as ImageIcon,
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Bell,
  ChevronDown,
  ArrowRight,
  HardHat,
  MessageSquare,
  X,
  Sparkles,
  Download,
  RotateCcw,
  Bookmark,
  ShieldCheck,
  UploadCloud,
  Calculator,
  Menu,
  LifeBuoy,
  HelpCircle,
  LayoutGrid,
  Palette,
  Eye,
  Check
} from 'lucide-react';
import { ProjectInfo, WorkspaceTheme } from '../../types';
import { useWorkspaceTheme } from '../../data/ThemeContext';
import { WORKSPACE_THEMES } from '../../data/theme';

export type WorkspaceTab = 
  | 'dashboard' 
  | 'create-project'
  | 'drawing-review' 
  | 'review-queue' 
  | 'estimate' 
  | 'audit-trail' 
  | 'calculation-rules';

interface AppShellProps {
  currentTab: WorkspaceTab;
  onSelectTab: (tab: WorkspaceTab) => void;
  onExitToLanding: () => void;
  onOpenExport: () => void;
  onRecalculate: () => void;
  project: ProjectInfo;
  pendingIssuesCount: number;
  isRecalculating?: boolean;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  onExitToLanding,
  onOpenExport,
  onRecalculate,
  project,
  pendingIssuesCount,
  isRecalculating = false,
  children,
}) => {
  const { theme, themeConfig, setTheme } = useWorkspaceTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mascotImg, setMascotImg] = useState<string>('/khoanhtay.png');
  const [isAiHelpOpen, setIsAiHelpOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ai_paint_mascot_img');
    if (saved) {
      setMascotImg(saved);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080d18] text-white font-sans select-none selection:bg-sky-500 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          THANH ĐIỀU HƯỚNG BÊN TRÁI (SIDEBAR)
      ───────────────────────────────────────────────────────────── */}
      <aside
        className={`flex flex-col border-r border-white/10 bg-[#0c1120] transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          {!sidebarCollapsed ? (
            <div 
              onClick={onExitToLanding}
              className="flex items-center gap-3 cursor-pointer group"
              title="Quay lại trang chủ"
            >
              {/* Logo icon matching blueprint house with soothing theme */}
              <div 
                className="w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm transition-transform group-hover:scale-105"
                style={{
                  background: theme === 'steel-blue'
                    ? 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
                    : theme === 'sage-green'
                    ? 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M9 21.5V12.5H15V21.5" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="1.5" fill="#ffffff" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <div className="font-extrabold text-white text-base tracking-tight leading-none transition-colors">
                  PlanAI
                </div>
                <div className={`text-[11px] font-medium tracking-tight mt-1 leading-tight ${themeConfig.accentText}`}>
                  AI Paint Take-off
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={onExitToLanding}
              className="w-9 h-9 mx-auto rounded-xl border flex items-center justify-center text-white shadow-sm cursor-pointer"
              style={{
                background: theme === 'steel-blue'
                  ? 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
                  : theme === 'sage-green'
                  ? 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                borderColor: 'rgba(255,255,255,0.2)'
              }}
              title="PlanAI - Quay lại trang chủ"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors ml-auto cursor-pointer"
            title={sidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items - Clean 4-Step Linear Flow */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {/* Main Dashboard */}
          <div>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                currentTab === 'dashboard'
                  ? themeConfig.navActive
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              title="Tổng quan dự án"
            >
              <Home className={`w-4 h-4 shrink-0 ${currentTab === 'dashboard' ? themeConfig.accentText : 'text-white/50'}`} />
              {!sidebarCollapsed && <span className="truncate flex-1">Tổng quan dự án</span>}
            </button>
          </div>

          {/* Section: QUY TRÌNH BÓC TÁCH (4 BƯỚC LIÊN HOÀN) */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center justify-between">
                <span>Quy trình bóc tách</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${themeConfig.accentBadgeBg}`}>4 bước</span>
              </div>
            )}
            <div className="space-y-1">
              {[
                {
                  id: 'create-project' as WorkspaceTab,
                  label: '1. Tải bản vẽ & Cấu hình',
                  icon: UploadCloud,
                },
                {
                  id: 'drawing-review' as WorkspaceTab,
                  label: '2. Kiểm tra kết quả AI',
                  icon: ShieldCheck,
                  badge: pendingIssuesCount > 0 ? pendingIssuesCount : undefined,
                },
                {
                  id: 'review-queue' as WorkspaceTab,
                  label: '3. Bảng khối lượng',
                  icon: Layers,
                },
                {
                  id: 'estimate' as WorkspaceTab,
                  label: '4. Dự toán chi phí sơn',
                  icon: Calculator,
                },
              ].map((item) => {
                const isActive = currentTab === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? themeConfig.navActive
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? themeConfig.accentText : 'text-white/50'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate flex-1">{item.label}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${themeConfig.accentBadgeBg}`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tiện ích & Xuất hồ sơ */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                Hồ sơ & Tiện ích
              </div>
            )}
            <div className="space-y-1">
              <button
                onClick={onOpenExport}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all text-left cursor-pointer"
                title="Xuất hồ sơ PDF / Excel"
              >
                <FileText className="w-4 h-4 shrink-0 text-white/50" />
                {!sidebarCollapsed && <span className="truncate flex-1">Xuất hồ sơ (PDF / Excel)</span>}
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Actions matching user screenshot: Help (?) & Settings (⚙) */}
        <div className="p-3 border-t border-amber-500/20 flex flex-col gap-1.5">
          <button
            onClick={() => setIsAiHelpOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Trợ giúp"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectTab('calculation-rules')}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Cài đặt hệ thống"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          KHÔNG GIAN LÀM VIỆC CHÍNH VÀ THANH ĐIỀU HƯỚNG ĐẦU TRANG
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar matching soothing theme */}
        <header className="h-16 bg-[#0c1120] border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 z-20 shrink-0">
          
          {/* Main Top Workflow Stepper & Breadcrumb */}
          {['create-project', 'drawing-review', 'review-queue', 'estimate'].includes(currentTab) ? (
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-1 min-w-0 overflow-hidden">
              {/* Breadcrumb */}
              <div className="text-xs text-white/50 font-medium flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={() => onSelectTab('dashboard')} 
                  className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Dự án</span>
                </button>
                <span>&gt;</span>
                <span className="text-white/80 font-semibold truncate max-w-[90px] sm:max-w-[140px]">{project?.name || 'Văn phòng A'}</span>
                <span>&gt;</span>
                <span className={`font-bold ${themeConfig.accentText} truncate max-w-[110px] sm:max-w-none`}>
                  {currentTab === 'create-project' && '1. Tải bản vẽ'}
                  {currentTab === 'drawing-review' && '2. Kiểm tra AI'}
                  {currentTab === 'review-queue' && '3. Bảng khối lượng'}
                  {currentTab === 'estimate' && '4. Dự toán sơn'}
                </span>
              </div>

              {/* 4-Step Linear Stepper Bar - Responsive and Clean */}
              <div className="hidden xl:flex items-center gap-1 text-xs shrink-0 bg-[#0e1424] p-1 rounded-xl border border-white/10">
                {[
                  { id: 'create-project' as WorkspaceTab, num: 1, shortLabel: 'Tải CAD', fullLabel: '1. Tải bản vẽ' },
                  { id: 'drawing-review' as WorkspaceTab, num: 2, shortLabel: 'Kiểm tra AI', fullLabel: '2. Kiểm tra AI' },
                  { id: 'review-queue' as WorkspaceTab, num: 3, shortLabel: 'Khối lượng', fullLabel: '3. Khối lượng' },
                  { id: 'estimate' as WorkspaceTab, num: 4, shortLabel: 'Dự toán', fullLabel: '4. Dự toán sơn' },
                ].map((step, idx, arr) => {
                  const stepIndex = arr.findIndex(s => s.id === currentTab);
                  const isCurrent = currentTab === step.id;
                  const isDone = stepIndex > idx;

                  return (
                    <React.Fragment key={step.id}>
                      <button
                        onClick={() => onSelectTab(step.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-sky-600 text-white font-bold shadow-xs border border-sky-400/30'
                            : isDone
                            ? 'text-emerald-400 hover:text-white hover:bg-white/5'
                            : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                        }`}
                        title={`Chuyển đến Bước ${step.num}: ${step.fullLabel}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                            isCurrent
                              ? 'bg-white text-sky-700'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-white/5 text-white/50 border border-white/10'
                          }`}
                        >
                          {isDone ? '✓' : step.num}
                        </div>
                        <span className="text-xs whitespace-nowrap">{step.fullLabel}</span>
                      </button>

                      {idx < arr.length - 1 && (
                        <div className={`w-2.5 h-px ${stepIndex > idx ? 'bg-emerald-500/40' : 'bg-white/10'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Center Search Input for dashboard */
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm dự án, bản vẽ..."
                className="w-full bg-[#0e1424] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          )}

          {/* Right Area: Step Action CTA + Theme Selector + Notification Bell + User Profile Capsule */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Quick Next Step Action Buttons for Steps 1, 2, 3 only (Step 4 already has prominent Export & Approve inside the view) */}
            {currentTab === 'create-project' && (
              <button
                onClick={() => onSelectTab('drawing-review')}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium active:scale-98 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-sky-400/30"
                title="Tiến hành Bước 2: Kiểm tra kết quả AI"
              >
                <span className="hidden sm:inline">Tiếp:</span>
                <span>Kiểm tra AI</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {currentTab === 'drawing-review' && (
              <button
                onClick={() => onSelectTab('review-queue')}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium active:scale-98 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-sky-400/30"
                title="Tiến hành Bước 3: Bảng khối lượng"
              >
                <span className="hidden sm:inline">Tiếp:</span>
                <span>Khối lượng</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {currentTab === 'review-queue' && (
              <button
                onClick={() => onSelectTab('estimate')}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium active:scale-98 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-sky-400/30"
                title="Tiến hành Bước 4: Dự toán chi phí sơn"
              >
                <span className="hidden sm:inline">Tiếp:</span>
                <span>Dự toán sơn</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors relative cursor-pointer"
                title="Thông báo"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#ef4444] text-[10px] font-bold font-mono text-white flex items-center justify-center shadow-xs">
                  {currentTab === 'drawing-review' ? 1 : 3}
                </span>
              </button>

              {/* Notification dropdown */}
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0e1424] border border-white/15 shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-white">Thông báo (3)</span>
                      <button 
                        onClick={() => setIsNotificationsOpen(false)} 
                        className="text-white/40 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="divide-y divide-white/5 text-xs py-1">
                      <div className="py-2">
                        <div className="font-semibold text-sky-400">Bản vẽ Office_A.dxf đã hoàn thành</div>
                        <div className="text-[11px] text-white/50 mt-0.5">Bóc tách 6 ranh giới phòng & khối lượng hoàn tất.</div>
                      </div>
                      <div className="py-2">
                        <div className="font-semibold text-amber-400">Dự án Nhà phố Nguyễn Văn A cần kiểm tra</div>
                        <div className="text-[11px] text-white/50 mt-0.5">Phát hiện 2 điểm giao cắt cần xác nhận chiều cao tường.</div>
                      </div>
                      <div className="py-2">
                        <div className="font-semibold text-emerald-400">Sao lưu dữ liệu tự động</div>
                        <div className="text-[11px] text-white/50 mt-0.5">Hồ sơ dự toán đã được đồng bộ an toàn.</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Capsule [P] Phát Đức ▾ */}
            <div className="relative">
              <div
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/15 transition-all cursor-pointer"
              >
                {/* Avatar circle */}
                <div 
                  className="w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${themeConfig.iconColor}`,
                    color: themeConfig.iconColor
                  }}
                >
                  P
                </div>
                
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-bold text-xs text-white leading-tight">
                    Phát Đức
                  </span>
                  <span className="text-[11px] text-white/60 leading-tight mt-0.5 font-medium">
                    Kỹ sư dự toán
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-white/50 ml-1" />
              </div>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0e1424] border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-white/10">
                      <div className="font-bold text-xs text-white">Phát Đức</div>
                      <div className={`text-[11px] font-medium ${themeConfig.accentText}`}>Kỹ sư Trưởng Dự toán</div>
                    </div>
                    <div className="py-1 text-xs">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onSelectTab('calculation-rules');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 cursor-pointer flex items-center gap-2"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Cấu hình dự toán</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onExitToLanding();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất về Trang chủ</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </header>

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto relative text-white">
          {children}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          AI HELP DIALOG / CHATBOT (KHI NHẤP "HỎI PLANAI")
      ───────────────────────────────────────────────────────────── */}
      {isAiHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#091526] border border-[#16304d] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#16304d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Trợ lý Kỹ sư Chibi PlanAI</h3>
                  <p className="text-[11px] text-[#38bdf8]">Luôn sẵn sàng hỗ trợ bóc tách & giải đáp quy chuẩn</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiHelpOpen(false)}
                className="text-white/40 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-white/80">
              <div className="p-3 rounded-xl bg-[#0c2a4d]/40 border border-[#0284c7]/30">
                <span className="font-bold text-[#38bdf8]">💡 Bạn có thể hỏi tôi:</span>
                <ul className="mt-1.5 space-y-1 text-white/70 list-disc list-inside">
                  <li>Cách chuẩn bị file DWG/DXF để AI nhận diện tường chính xác 100%</li>
                  <li>Quy chuẩn khấu trừ lỗ mở cửa đi & cửa sổ theo TCVN 9377:2012</li>
                  <li>Công thức định mức hao hụt sơn lót và sơn phủ nội thất</li>
                  <li>Hướng dẫn xuất file dự toán ra bảng Excel & PDF phục vụ đấu thầu</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#071322] border border-[#16304d]">
                <div className="font-semibold text-white mb-1">Mẹo xử lý nhanh cho Kỹ sư:</div>
                <p className="text-white/60 leading-relaxed">
                  Để bóc tách nhanh nhất, hãy giữ nguyên các lớp layer tường tiêu chuẩn như <code className="text-[#38bdf8]">A-WALL</code>, cửa <code className="text-[#38bdf8]">A-DOOR</code>. AI sẽ tự động khoanh vùng ranh giới và khấu trừ diện tích chuẩn xác từng milimet!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAiHelpOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Đã hiểu, cảm ơn!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          THƯ VIỆN VẬT TƯ DIALOG (KHI BẤM "THƯ VIỆN VẬT TƯ")
      ───────────────────────────────────────────────────────────── */}
      {isMaterialsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-[#091526] border border-[#16304d] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#16304d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0c2a4d] border border-[#0284c7]/40 flex items-center justify-center text-[#38bdf8]">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Thư viện vật tư & Hệ sơn công trình</h3>
                  <p className="text-[11px] text-white/50">Định mức vật tư, số lớp sơn & đơn giá tiêu chuẩn</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMaterialsOpen(false)}
                className="text-white/40 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-[#16304d] text-xs">
              {[
                { name: 'Dulux EasyClean Mờ', type: 'Sơn nội thất kháng khuẩn', coats: '1 Lót + 2 Phủ', rate: '98.000 ₫/m²' },
                { name: 'Dulux Weathershield', type: 'Sơn ngoại thất chống thấm', coats: '1 Lót + 2 Phủ', rate: '135.000 ₫/m²' },
                { name: 'Jotun Majestic Sang Trọng', type: 'Sơn nội thất cao cấp', coats: '1 Lót + 2 Phủ', rate: '115.000 ₫/m²' },
                { name: 'Kova Nano Kháng Khuẩn', type: 'Sơn nội thất bền màu', coats: '1 Lót + 2 Phủ', rate: '85.000 ₫/m²' },
              ].map((mat, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{mat.name}</div>
                    <div className="text-[11px] text-white/50">{mat.type} · {mat.coats}</div>
                  </div>
                  <div className="font-mono font-bold text-[#38bdf8] text-sm">
                    {mat.rate}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsMaterialsOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
