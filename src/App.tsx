import React, { useState } from 'react';
import { LandingHeader } from './components/landing/LandingHeader';
import { LandingHero } from './components/landing/LandingHero';
import { LandingFooter } from './components/landing/LandingFooter';

import { AppShell, WorkspaceTab } from './components/workspace/AppShell';
import { DashboardView } from './components/workspace/DashboardView';
import { DrawingCanvas } from './components/workspace/DrawingCanvas';
import { InspectorPanel } from './components/workspace/InspectorPanel';
import { ReviewQueueView } from './components/workspace/ReviewQueueView';
import { EstimateView } from './components/workspace/EstimateView';
import { ProjectSetupModal } from './components/workspace/ProjectSetupModal';
import { AIProcessingView } from './components/workspace/AIProcessingView';
import { GeometryEditorModal } from './components/workspace/GeometryEditorModal';
import { CalculationRulesModal } from './components/workspace/CalculationRulesModal';
import { AuditTrailModal } from './components/workspace/AuditTrailModal';
import { ExportModal } from './components/workspace/ExportModal';
import { CreateProjectView } from './components/workspace/CreateProjectView';
import { AIVerificationCenterView } from './components/workspace/AIVerificationCenterView';

import { 
  INITIAL_ROOMS, 
  INITIAL_DOORS, 
  DXF_LAYERS, 
  MOCK_PROJECTS, 
  INITIAL_CALCULATION_RULES, 
  INITIAL_AUDIT_TRAIL,
  ESTIMATE_VERSIONS
} from './data/mockData';
import { RoomEntity, ProjectInfo, CalculationRules, AuditEvent } from './types';
import { CheckCircle2, RotateCcw, X, GitBranch } from 'lucide-react';

export function App() {
  // Navigation Mode: 'landing' (Public Storytelling) or 'app' (Authenticated Workspace)
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('app');

  // Application Workspace Tab (matches redesigned user workflow)
  const [currentTab, setCurrentTab] = useState<WorkspaceTab>('create-project');

  // Domain State
  const [projects, setProjects] = useState<ProjectInfo[]>(MOCK_PROJECTS);
  const [activeProject, setActiveProject] = useState<ProjectInfo>(MOCK_PROJECTS[0]);
  const [rooms, setRooms] = useState<RoomEntity[]>(INITIAL_ROOMS);
  const [doors, setDoors] = useState(INITIAL_DOORS);
  const [layers, setLayers] = useState(DXF_LAYERS);
  const [rules, setRules] = useState<CalculationRules>(INITIAL_CALCULATION_RULES);
  const [auditTrail, setAuditTrail] = useState<AuditEvent[]>(INITIAL_AUDIT_TRAIL);

  // Selection & Traceability State
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-a101');
  const [highlightedSourceHandle, setHighlightedSourceHandle] = useState<string | null>('LWPOLYLINE #8F31');
  const [editingRoom, setEditingRoom] = useState<RoomEntity | null>(null);

  // Modals & Overlay States
  const [isProjectSetupOpen, setIsProjectSetupOpen] = useState(false);
  const [isAIProcessingOpen, setIsAIProcessingOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Dependency Invalidation Banner Notification
  const [invalidationBanner, setInvalidationBanner] = useState<string | null>(null);

  // Count pending review items
  const pendingIssuesCount = rooms.filter((r) => r.status === 'Needs Review').length;

  // Selected room object
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || null;

  // Helper to add audit event
  const addAuditEvent = (action: string, target: string, detail: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const newEvent: AuditEvent = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      user: 'Nguyễn Đức Phát (Lead Estimator)',
      action,
      target,
      detail,
    };
    setAuditTrail((prev) => [newEvent, ...prev]);
  };

  // Handlers for Landing
  const handleGetStarted = () => {
    setViewMode('app');
    setCurrentTab('create-project');
  };

  const handleExploreDemo = () => {
    setViewMode('app');
    setCurrentTab('drawing-review');
    setSelectedRoomId('room-a101');
  };

  const handleLogin = () => {
    setViewMode('app');
    setCurrentTab('create-project');
  };

  // Handlers for Project Setup & AI Analysis
  const handleStartAnalysis = (
    projectName: string,
    building: string,
    floor: string,
    fileName: string
  ) => {
    setIsProjectSetupOpen(false);
    setIsAIProcessingOpen(true);

    const newProj: ProjectInfo = {
      id: `proj-${Date.now()}`,
      name: projectName,
      building,
      floorsCount: 28,
      currentFloor: floor,
      fileName,
      fileSize: '48.2 MB',
      status: 'Review Required',
      lastModified: 'Just now',
      engineer: 'Nguyễn Đức Phát',
      totalArea: 12482.5,
      totalCost: 1284500000,
      avgConfidence: 96.8,
      issuesCount: 3,
    };
    setActiveProject(newProj);
    setProjects([newProj, ...projects]);
  };

  const handleAnalysisComplete = () => {
    setIsAIProcessingOpen(false);
    setCurrentTab('drawing-review');
    addAuditEvent(
      'Nạp Phân tích AI',
      activeProject.fileName,
      'Trích xuất 6 ranh giới phòng và 4 cửa đi từ bản vẽ DXF AC1032. Tự động tạo khối lượng sơ bộ.'
    );
  };

  // Room interaction handlers
  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setHighlightedSourceHandle(room.sourceHandle);
    }
  };

  const handleHighlightSource = (sourceHandle: string) => {
    setHighlightedSourceHandle(sourceHandle);
    const room = rooms.find((r) => r.sourceHandle === sourceHandle);
    if (room) {
      setSelectedRoomId(room.id);
    }
  };

  const handleConfirmRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: 'Confirmed' as const } : r))
    );
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      addAuditEvent(
        'Kỹ sư Thẩm định Xác nhận',
        room.code,
        `Đã kiểm định ${room.floorArea} m² diện tích sàn và ${room.netPaintArea} m² diện tích sơn thực tế.`
      );
    }
  };

  const handleRejectRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: 'Rejected' as const } : r))
    );
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      addAuditEvent(
        'Kỹ sư Từ chối Thực thể',
        room.code,
        'Đánh dấu ranh giới không áp dụng cho công tác hoàn thiện kiến trúc.'
      );
    }
  };

  const handleCorrectRoom = (room: RoomEntity) => {
    setEditingRoom(room);
  };

  const handleSaveGeometryEdit = (
    updatedRoom: RoomEntity,
    oldArea: number,
    newArea: number
  ) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    setEditingRoom(null);
    setSelectedRoomId(updatedRoom.id);

    // Trigger Invalidation Notification
    setInvalidationBanner(
      `Đã cập nhật ranh giới cho ${updatedRoom.code}: Diện tích ${oldArea.toFixed(2)} → ${newArea.toFixed(2)} m² | Diện tích sơn thực: ${updatedRoom.netPaintArea.toFixed(2)} m² | Đã tính toán lại toàn bộ dự toán!`
    );

    addAuditEvent(
      'Hiệu chỉnh Ranh giới & Tái tính',
      updatedRoom.code,
      `Đã chỉnh sửa đỉnh ranh giới tại ${updatedRoom.sourceHandle}. Diện tích ${oldArea} → ${newArea} m².`
    );
  };

  const handleApplySuggestion = (room: RoomEntity) => {
    if (!room.aiSuggestion) return;
    const delta = room.aiSuggestion.deltaArea;
    const updatedFloorArea = Math.round((room.floorArea + delta) * 100) / 100;
    const updatedNetPaint = Math.round((room.netPaintArea + delta * 2) * 100) / 100;
    const updatedCost = Math.round(updatedNetPaint * room.unitRate);

    const updated: RoomEntity = {
      ...room,
      floorArea: updatedFloorArea,
      netPaintArea: updatedNetPaint,
      totalCost: updatedCost,
      status: 'Confirmed',
      aiSuggestion: undefined,
    };

    setRooms((prev) => prev.map((r) => (r.id === room.id ? updated : r)));
    setInvalidationBanner(
      `Đã áp dụng đề xuất AI cho ${room.code}: đã cộng +${delta} m² vào diện tích sơn tường.`
    );
    addAuditEvent(
      'Áp dụng Đề xuất AI',
      room.code,
      `Hút dính mép tường kết cấu. Mở rộng diện tích sơn thêm ${(delta * 2).toFixed(1)} m².`
    );
  };

  const handleUpdateUnitRate = (roomId: string, newRate: number) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const newCost = Math.round(r.netPaintArea * newRate);
          return { ...r, unitRate: newRate, totalCost: newCost };
        }
        return r;
      })
    );
    addAuditEvent('Cập nhật Đơn giá', `Phòng ${roomId}`, `Điều chỉnh đơn giá nhà thầu thành ${newRate.toLocaleString()} ₫/m².`);
  };

  const handleJumpToCad = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentTab('drawing-review');
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setHighlightedSourceHandle(room.sourceHandle);
    }
  };

  const handleToggleLayer = (layerId: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l))
    );
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setInvalidationBanner(
        '✓ Hoàn tất tính toán lại toàn bộ bóc tách toán học cho 6 phòng với hệ số hao hụt 5%.'
      );
      addAuditEvent(
        'Tái tính toán Toàn bộ Dự án',
        activeProject.name,
        'Đã kiểm định 12.482,5 m² diện tích sơn với quy cách 2 lớp sơn phủ + 1 lớp sơn lót.'
      );
    }, 600);
  };

  const handleSaveRules = (newRules: CalculationRules) => {
    setRules(newRules);
    setIsRulesModalOpen(false);
    setInvalidationBanner(
      `Đã cập nhật quy tắc tính toán (Chiều cao tường: ${newRules.defaultWallHeight}m, Hao hụt: ${newRules.wasteFactorPct}%). Đồng bộ hóa khối lượng thành công.`
    );
    addAuditEvent(
      'Cập nhật Quy tắc Tính toán',
      'Tham số Toàn cục',
      `Chiều cao tường mặc định: ${newRules.defaultWallHeight}m, Hệ số hao hụt: ${newRules.wasteFactorPct}%.`
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // VIEW MODE 1: PUBLIC PRODUCT LANDING PAGE (REGENERATIVE LIVING ARCHITECTURE)
  // ─────────────────────────────────────────────────────────────────
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-[#080d18] text-white font-sans selection:bg-[#f59e0b] selection:text-[#080d18]">
        <LandingHeader
          onGetStarted={handleGetStarted}
          onExploreDemo={handleExploreDemo}
          onLogin={handleLogin}
        />
        <LandingHero
          onGetStarted={handleGetStarted}
          onExploreDemo={handleExploreDemo}
        />
        <LandingFooter
          onGetStarted={handleGetStarted}
          onExploreDemo={handleExploreDemo}
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // VIEW MODE 2: AUTHENTICATED ENGINEERING WORKSPACE
  // ─────────────────────────────────────────────────────────────────
  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onExitToLanding={() => setViewMode('landing')}
      onOpenExport={() => setIsExportModalOpen(true)}
      onRecalculate={handleRecalculate}
      project={activeProject}
      pendingIssuesCount={pendingIssuesCount}
      isRecalculating={isRecalculating}
    >
      {/* Dependency Invalidation Notification Banner */}
      {invalidationBanner && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-full px-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="p-3.5 rounded-xl bg-[#12141a] text-white border border-[#ffc474]/40 shadow-2xl flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{invalidationBanner}</span>
            </div>
            <button
              onClick={() => setInvalidationBanner(null)}
              className="p-1 rounded text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Workspace Body Routes */}
      {currentTab === 'dashboard' && (
        <DashboardView
          projects={projects}
          onSelectProject={(proj) => {
            setActiveProject(proj);
            setCurrentTab('drawing-review');
          }}
          onCreateProject={() => setCurrentTab('create-project')}
          onOpenDrawingReview={(proj) => {
            setActiveProject(proj);
            setCurrentTab('drawing-review');
          }}
        />
      )}

      {currentTab === 'create-project' && (
        <CreateProjectView
          onCancel={() => setCurrentTab('dashboard')}
          onProceed={(data) => {
            setRules((prev) => ({
              ...prev,
              defaultWallHeight: data.wallHeight,
              deductDoors: data.deductions.includes('Trừ cửa đi'),
              deductWindows: data.deductions.includes('Trừ cửa sổ'),
            }));
            addAuditEvent(
              'Tạo Dự án Mới',
              data.name,
              `Đã tải lên file ${data.fileName}, cấu hình chiều cao tường ${data.wallHeight}m, phạm vi bóc tách: ${data.paintScope.join(', ')}.`
            );
            handleStartAnalysis(data.name, 'Tòa nhà văn phòng A', data.floor, data.fileName);
          }}
          onSaveDraft={() => {
            setInvalidationBanner('✓ Đã lưu nháp hồ sơ dự án thành công.');
          }}
          onNavigateToReview={() => {
            setCurrentTab('drawing-review');
          }}
          onNavigateToEstimate={() => {
            setCurrentTab('estimate');
          }}
        />
      )}

      {currentTab === 'drawing-review' && (
        <AIVerificationCenterView
          project={activeProject}
          rooms={rooms}
          onNavigateToTakeoff={() => setCurrentTab('review-queue')}
          onBackToAnalysis={() => setIsAIProcessingOpen(true)}
          onOpenAuditLog={() => setIsAuditModalOpen(true)}
        />
      )}

      {currentTab === 'review-queue' && (
        <ReviewQueueView
          rooms={rooms}
          doors={doors}
          onInspectRoom={handleJumpToCad}
          onConfirmRoom={handleConfirmRoom}
          onCorrectRoom={handleCorrectRoom}
          onRejectRoom={handleRejectRoom}
          onNavigateToEstimate={() => setCurrentTab('estimate')}
          onBackToReview={() => setCurrentTab('drawing-review')}
        />
      )}

      {currentTab === 'estimate' && (
        <EstimateView
          rooms={rooms}
          rules={rules}
          versions={ESTIMATE_VERSIONS}
          onUpdateUnitRate={handleUpdateUnitRate}
          onJumpToCad={handleJumpToCad}
          onOpenRules={() => setIsRulesModalOpen(true)}
          onApproveEstimate={() => {
            setInvalidationBanner('✓ Đã phê duyệt Dự toán & Bảng tiên lượng sơn bởi Kỹ sư trưởng.');
            addAuditEvent('Phê duyệt Dự toán', activeProject.name, 'Đã phê duyệt bản bóc tách v3. Tổng kinh phí: 1.284.500.000 ₫.');
          }}
          onExport={() => setIsExportModalOpen(true)}
          onBackToTakeoff={() => setCurrentTab('review-queue')}
        />
      )}

      {currentTab === 'audit-trail' && (
        <div className="h-full overflow-y-auto p-6 md:p-8 max-w-5xl mx-auto space-y-6 text-white">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#ffc474] mb-1">
                04 // NHẬT KÝ VẾT TÍNH & BẤT BIẾN DỮ LIỆU
              </div>
              <h1 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Nhật ký Kiểm toán & Lịch sử Kỹ thuật
              </h1>
              <p className="text-xs text-white/50 font-mono mt-1">
                Hồ sơ kiểm toán toàn vẹn về các phát hiện AI, thay đổi thực thể và quyết định của kỹ sư
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 text-[#ffc474] border border-white/10">
              {auditTrail.length} sự kiện ghi nhận
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-white/10 space-y-6">
            {auditTrail.map((ev) => (
              <div key={ev.id} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#ffc474] border-2 border-[#0c0e12] shadow-xs" />
                <div className="flex items-center justify-between font-mono text-xs text-white/40">
                  <span className="font-bold text-white text-sm">{ev.action}</span>
                  <span>{ev.timestamp}</span>
                </div>
                <div className="text-xs font-mono text-[#ffc474] mt-0.5">
                  Đối tượng: {ev.target} · Người thực hiện: {ev.user}
                </div>
                <p className="text-xs text-white/70 font-sans mt-1 bg-[#161822] p-3 rounded-xl border border-white/10 shadow-sm">
                  {ev.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'calculation-rules' && (
        <div className="h-full overflow-y-auto p-6 md:p-8 max-w-4xl mx-auto space-y-6 text-white">
          <div className="pb-6 border-b border-white/10">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#ffc474] mb-1">
              05 // QUY CHUẨN THÔNG THỦY & KHẤU TRỪ VẬT TƯ
            </div>
            <h1 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Quy tắc Tính toán & Tiêu chuẩn Đo bóc
            </h1>
            <p className="text-xs text-white/50 font-mono mt-1">
              Quy chuẩn kỹ thuật áp dụng khi chuyển đổi ranh giới bản vẽ 2D sang khối lượng sơn
            </p>
          </div>

          <div className="bg-[#12141a] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#161822] border border-white/10">
                <div className="text-white/40 text-[10px]">CHIỀU CAO THÔNG THỦY MẶC ĐỊNH</div>
                <div className="text-xl font-bold text-white mt-1">{rules.defaultWallHeight} m</div>
                <div className="text-white/40 text-[10px] mt-1">Chiều cao thông thủy sàn đến đáy dầm/trần</div>
              </div>
              <div className="p-4 rounded-xl bg-[#161822] border border-white/10">
                <div className="text-white/40 text-[10px]">HỆ SỐ HAO HỤT VẬT TƯ</div>
                <div className="text-xl font-bold text-[#ffc474] mt-1">{rules.wasteFactorPct}%</div>
                <div className="text-white/40 text-[10px] mt-1">Dự phòng hao hụt thi công & rơi vãi</div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="font-bold text-white/80 uppercase block">Khấu trừ diện tích lỗ mở:</span>
              <div className="p-3 rounded-xl border border-white/10 bg-[#161822] flex justify-between">
                <span className="text-white/70">Khấu trừ cửa đi:</span>
                <span className="font-bold text-emerald-400">{rules.deductDoors ? 'KÍCH HOẠT (chuẩn 900x2100mm)' : 'VÔ HIỆU HÓA'}</span>
              </div>
              <div className="p-3 rounded-xl border border-white/10 bg-[#161822] flex justify-between">
                <span className="text-white/70">Khấu trừ cửa sổ:</span>
                <span className="font-bold text-emerald-400">{rules.deductWindows ? 'KÍCH HOẠT' : 'VÔ HIỆU HÓA'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsRulesModalOpen(true)}
              className="amber-button inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Chỉnh sửa Quy tắc Tính toán
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          GLOBAL MODALS
      ───────────────────────────────────────────────────────────── */}
      <ProjectSetupModal
        isOpen={isProjectSetupOpen}
        onClose={() => setIsProjectSetupOpen(false)}
        onStartAnalysis={handleStartAnalysis}
      />

      {isAIProcessingOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center p-4">
          <AIProcessingView
            fileName={activeProject.fileName}
            onComplete={handleAnalysisComplete}
          />
        </div>
      )}

      <GeometryEditorModal
        room={editingRoom}
        isOpen={Boolean(editingRoom)}
        onClose={() => setEditingRoom(null)}
        onSave={handleSaveGeometryEdit}
      />

      <CalculationRulesModal
        isOpen={isRulesModalOpen}
        rules={rules}
        onClose={() => setIsRulesModalOpen(false)}
        onSave={handleSaveRules}
      />

      <AuditTrailModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditTrail={auditTrail}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        project={activeProject}
        rooms={rooms}
      />
    </AppShell>
  );
}
export default App;
