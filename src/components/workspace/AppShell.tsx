import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  AlertTriangle, 
  Calculator, 
  History, 
  Sliders, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  RotateCcw,
  Building,
  CheckCircle2,
  FileCode,
  Compass
} from 'lucide-react';
import { ProjectInfo } from '../../types';

export type WorkspaceTab = 
  | 'dashboard' 
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0c0e12] text-white font-sans select-none selection:bg-[#ffc474]/30 selection:text-[#ffc474]">
      {/* ─────────────────────────────────────────────────────────────
          THANH ĐIỀU HƯỚNG BÊN TRÁI (SIDEBAR)
      ───────────────────────────────────────────────────────────── */}
      <aside
        className={`flex flex-col border-r border-white/10 bg-[#0e1015] transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[#ffc474] flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/10">
                <Layers className="w-4 h-4 text-[#ffc474]" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-xs tracking-tight truncate flex items-center gap-1.5">
                  AI Paint Take-off
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate">
                  {project.name}
                </div>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-amber-500/15 border border-amber-500/30 text-[#ffc474] flex items-center justify-center shadow-sm">
              <Layers className="w-4 h-4 text-[#ffc474]" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors ml-auto cursor-pointer"
            title={sidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Current Active Project Context Badge */}
        {!sidebarCollapsed && (
          <div className="p-3 mx-3 my-2 rounded-xl bg-[#161822] border border-white/10 text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
              <span className="flex items-center gap-1.5 font-semibold text-white/80">
                <Building className="w-3.5 h-3.5 text-[#ffc474]" />
                {project.currentFloor}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-[#ffc474] border border-amber-500/40 font-bold font-mono">
                {project.status}
              </span>
            </div>
            <div className="text-[11px] text-white/40 font-mono mt-1.5 truncate">
              {project.fileName}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {[
            {
              id: 'dashboard' as WorkspaceTab,
              label: 'Tổng quan dự án',
              icon: LayoutDashboard,
            },
            {
              id: 'drawing-review' as WorkspaceTab,
              label: 'Bản vẽ & Bóc tách CAD',
              icon: Layers,
              badge: 'Không gian 2D',
            },
            {
              id: 'review-queue' as WorkspaceTab,
              label: 'Hàng đợi thẩm định',
              icon: AlertTriangle,
              count: pendingIssuesCount,
            },
            {
              id: 'estimate' as WorkspaceTab,
              label: 'Khối lượng & Dự toán',
              icon: Calculator,
            },
            {
              id: 'audit-trail' as WorkspaceTab,
              label: 'Nhật ký kiểm toán',
              icon: History,
            },
            {
              id: 'calculation-rules' as WorkspaceTab,
              label: 'Quy tắc tính toán',
              icon: Sliders,
            },
          ].map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#181c26] text-white border border-[#ffc474]/40 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-[#ffc474]'
                      : item.id === 'review-queue' && (item.count || 0) > 0
                      ? 'text-amber-400'
                      : 'text-white/40'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
                {!sidebarCollapsed && item.count !== undefined && item.count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/30 text-[#ffc474] border border-amber-500/50">
                    {item.count}
                  </span>
                )}
                {!sidebarCollapsed && item.badge && !item.count && (
                  <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer / Engineer Profile / Back to Landing */}
        <div className="p-3 border-t border-white/10 text-xs">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-[#161822] border border-white/10">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-[#ffc474] font-bold text-[11px] flex items-center justify-center font-mono border border-amber-500/40">
                  P
                </div>
                <div className="truncate flex-1">
                  <div className="font-semibold text-white text-xs truncate">
                    Nguyễn Đức Phát
                  </div>
                  <div className="text-[10px] text-white/50 font-mono truncate">
                    Kỹ sư Trưởng Dự toán (PE)
                  </div>
                </div>
              </div>

              <button
                onClick={onExitToLanding}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-white/60 hover:text-[#ffc474] hover:bg-white/5 text-[11px] transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#ffc474]" />
                <span>Quay lại Trang giới thiệu</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-[#ffc474] font-bold text-[11px] flex items-center justify-center font-mono border border-amber-500/40">
                P
              </div>
              <button
                onClick={onExitToLanding}
                className="p-1 rounded text-white/40 hover:text-[#ffc474] hover:bg-white/10 cursor-pointer"
                title="Quay lại Trang giới thiệu"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          KHÔNG GIAN LÀM VIỆC CHÍNH VÀ THANH ĐIỀU HƯỚNG ĐẦU TRANG
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Breadcrumb Bar */}
        <header className="h-14 bg-[#0e1015] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-white/70 overflow-hidden">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              Dự án
            </button>
            <span className="text-white/20 font-mono">/</span>
            <span className="text-white font-semibold truncate">{project.name}</span>
            <span className="text-white/20 font-mono">/</span>
            <span className="text-white/60 shrink-0">{project.currentFloor}</span>
            <span className="text-white/20 font-mono">/</span>
            <span className="text-[#ffc474] font-mono uppercase bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] shrink-0 font-bold">
              {currentTab === 'drawing-review'
                ? 'Bản vẽ CAD'
                : currentTab === 'estimate'
                ? 'Dự toán BOQ'
                : currentTab === 'review-queue'
                ? 'Thẩm định'
                : currentTab === 'dashboard'
                ? 'Tổng quan'
                : currentTab === 'audit-trail'
                ? 'Nhật ký'
                : 'Quy tắc'}
            </span>

            {/* Status Pill */}
            <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-[#ffc474] border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc474] animate-pulse" />
              {project.status}
            </span>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRecalculate}
              disabled={isRecalculating}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer ${
                isRecalculating ? 'opacity-70 animate-pulse' : ''
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 text-[#ffc474] ${isRecalculating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRecalculating ? 'Đang tính toán lại...' : 'Tính lại khối lượng'}</span>
            </button>

            <button
              onClick={onOpenExport}
              className="amber-button inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất hồ sơ</span>
            </button>
          </div>
        </header>

        {/* Body Content */}
        <main className="flex-1 overflow-hidden relative bg-[#0c0e12] drafting-grid-dark text-white">
          {children}
        </main>
      </div>
    </div>
  );
};
