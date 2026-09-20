import React, { useState, useRef, useEffect } from 'react';
import { 
  MousePointer, 
  Hand, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Ruler, 
  Layers, 
  Filter, 
  AlertTriangle, 
  Check, 
  X, 
  Edit3, 
  FileCode,
  RotateCcw
} from 'lucide-react';
import { RoomEntity, DoorEntity, DxfLayer } from '../../types';

interface DrawingCanvasProps {
  rooms: RoomEntity[];
  doors: DoorEntity[];
  layers: DxfLayer[];
  selectedRoomId: string | null;
  highlightedSourceHandle: string | null;
  onSelectRoom: (roomId: string) => void;
  onConfirmRoom: (roomId: string) => void;
  onRejectRoom: (roomId: string) => void;
  onEditBoundary: (room: RoomEntity) => void;
  onToggleLayer: (layerId: string) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  rooms,
  doors,
  layers,
  selectedRoomId,
  highlightedSourceHandle,
  onSelectRoom,
  onConfirmRoom,
  onRejectRoom,
  onEditBoundary,
  onToggleLayer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<'select' | 'pan' | 'measure'>('select');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouseCoord, setMouseCoord] = useState<{ x: number; y: number }>({ x: 420.5, y: 180.25 });
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [filterNeedsReview, setFilterNeedsReview] = useState(false);

  // Measure tool state
  const [measurePointA, setMeasurePointA] = useState<{ x: number; y: number } | null>(null);
  const [measurePointB, setMeasurePointB] = useState<{ x: number; y: number } | null>(null);

  // Find currently selected room
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  // Auto zoom-to-room when selectedRoomId changes or source is clicked
  useEffect(() => {
    if (selectedRoomId) {
      const room = rooms.find((r) => r.id === selectedRoomId);
      if (room && room.vertices.length > 0) {
        const avgX = room.vertices.reduce((sum, v) => sum + v.x, 0) / room.vertices.length;
        const avgY = room.vertices.reduce((sum, v) => sum + v.y, 0) / room.vertices.length;
        setPan({
          x: 450 - avgX * zoom,
          y: 280 - avgY * zoom,
        });
      }
    }
  }, [selectedRoomId]);

  const handleZoomIn = () => setZoom((z) => Math.min(3.5, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.25));
  const handleResetFit = () => {
    setZoom(1);
    setPan({ x: 40, y: 30 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'pan' || e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else if (activeTool === 'measure') {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const svgX = (e.clientX - rect.left - pan.x) / zoom;
      const svgY = (e.clientY - rect.top - pan.y) / zoom;
      if (!measurePointA) {
        setMeasurePointA({ x: svgX, y: svgY });
        setMeasurePointB(null);
      } else {
        setMeasurePointB({ x: svgX, y: svgY });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const currentX = Math.round((e.clientX - rect.left - pan.x) / zoom * 10) / 10;
      const currentY = Math.round((e.clientY - rect.top - pan.y) / zoom * 10) / 10;
      setMouseCoord({ x: currentX, y: currentY });
    }

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isLayerVisible = (layerName: string) => {
    const layer = layers.find((l) => l.name === layerName);
    return layer ? layer.visible : true;
  };

  const measureDistance = measurePointA && measurePointB
    ? Math.round(Math.hypot(measurePointB.x - measurePointA.x, measurePointB.y - measurePointA.y) * 10) / 100
    : 0;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#080c15] overflow-hidden select-none cursor-default flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* ─────────────────────────────────────────────────────────────
          THANH CÔNG CỤ CAD PHÍA TRÊN
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#12141a]/95 backdrop-blur-md border border-white/10 text-white/70 shadow-2xl">
        <button
          onClick={() => {
            setActiveTool('select');
            setMeasurePointA(null);
            setMeasurePointB(null);
          }}
          className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTool === 'select'
              ? 'bg-amber-500/20 text-[#ffc474] font-semibold border border-amber-500/40 shadow-sm'
              : 'hover:text-white hover:bg-white/5'
          }`}
          title="Chọn thực thể CAD (V)"
        >
          <MousePointer className={`w-4 h-4 ${activeTool === 'select' ? 'text-[#ffc474]' : 'text-white/60'}`} />
          <span className="hidden sm:inline">Chọn</span>
        </button>

        <button
          onClick={() => {
            setActiveTool('pan');
            setMeasurePointA(null);
            setMeasurePointB(null);
          }}
          className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTool === 'pan'
              ? 'bg-amber-500/20 text-[#ffc474] font-semibold border border-amber-500/40 shadow-sm'
              : 'hover:text-white hover:bg-white/5'
          }`}
          title="Kéo di chuyển bản vẽ (H / Phím cách)"
        >
          <Hand className={`w-4 h-4 ${activeTool === 'pan' ? 'text-[#ffc474]' : 'text-white/60'}`} />
          <span className="hidden sm:inline">Kéo</span>
        </button>

        <button
          onClick={() => {
            setActiveTool('measure');
            setMeasurePointA(null);
            setMeasurePointB(null);
          }}
          className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTool === 'measure'
              ? 'bg-amber-500/20 text-[#ffc474] font-semibold border border-amber-500/40 shadow-sm'
              : 'hover:text-white hover:bg-white/5'
          }`}
          title="Thước đo khoảng cách (M)"
        >
          <Ruler className={`w-4 h-4 ${activeTool === 'measure' ? 'text-[#ffc474]' : 'text-white/60'}`} />
          <span className="hidden sm:inline">Đo</span>
        </button>

        <div className="w-[1px] h-5 bg-white/10 mx-1" />

        {/* Zoom Group */}
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Phóng to"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono px-1 text-white/50">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Thu nhỏ"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetFit}
          className="p-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Vừa khung hình"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-white/10 mx-1" />

        {/* Bật tắt lớp CAD (Layers) */}
        <div className="relative">
          <button
            onClick={() => setShowLayersMenu(!showLayersMenu)}
            className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              showLayersMenu
                ? 'bg-white/10 text-white border border-white/15'
                : 'hover:text-white hover:bg-white/5'
            }`}
            title="Quản lý lớp CAD"
          >
            <Layers className="w-4 h-4 text-[#ffc474]" />
            <span className="hidden sm:inline">Lớp</span>
          </button>

          {showLayersMenu && (
            <div className="absolute top-12 left-0 w-60 p-3 rounded-xl bg-[#161822] border border-white/10 shadow-2xl text-xs font-mono space-y-2 z-30">
              <div className="flex items-center justify-between text-white/40 text-[10px] pb-1.5 border-b border-white/10 uppercase">
                <span>LỚP CAD (LAYERS)</span>
                <span>HIỂN THỊ</span>
              </div>
              {layers.map((lay) => (
                <label
                  key={lay.id}
                  className="flex items-center justify-between cursor-pointer py-1 text-white/70 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: lay.color }}
                    />
                    <span>{lay.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={lay.visible}
                    onChange={() => onToggleLayer(lay.id)}
                    className="rounded bg-white/10 border-white/20 text-[#ffc474] focus:ring-0 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Lọc cảnh báo thẩm định */}
        <button
          onClick={() => setFilterNeedsReview(!filterNeedsReview)}
          className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            filterNeedsReview
              ? 'bg-amber-500/20 text-[#ffc474] border border-amber-500/40'
              : 'hover:text-white hover:bg-white/5'
          }`}
          title="Lọc các phòng cần thẩm định"
        >
          <Filter className="w-4 h-4 text-[#ffc474]" />
          <span className="hidden md:inline">
            {filterNeedsReview ? 'Chỉ phòng cảnh báo' : 'Tất cả phòng'}
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          THANH HÀNH ĐỘNG KHI ĐANG CHỌN PHÒNG
      ───────────────────────────────────────────────────────────── */}
      {selectedRoom && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 p-1.5 rounded-xl bg-[#12141a]/95 backdrop-blur-md border border-white/10 shadow-2xl font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 bg-[#161822] border border-white/10 rounded-lg text-white font-bold flex items-center gap-2">
            <span className="text-[#ffc474]">{selectedRoom.code}</span>
            <span className="text-white/40 font-normal">({selectedRoom.floorArea} m²)</span>
          </div>

          <button
            onClick={() => onEditBoundary(selectedRoom)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sky-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Hiệu chỉnh đỉnh & đa giác"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Hiệu chỉnh đỉnh</span>
          </button>

          <button
            onClick={() => onConfirmRoom(selectedRoom.id)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Phê duyệt</span>
          </button>

          <button
            onClick={() => onRejectRoom(selectedRoom.id)}
            className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-colors cursor-pointer"
            title="Từ chối phòng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          CANVAS VECTOR CAD SVG TƯƠNG TÁC
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full h-full relative">
        <svg
          className="w-full h-full"
          style={{ cursor: activeTool === 'pan' || isDragging ? 'grab' : 'crosshair' }}
        >
          <defs>
            <pattern
              id="cadGridSmall"
              width={20 * zoom}
              height={20 * zoom}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${20 * zoom} 0 L 0 0 0 ${20 * zoom}`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="cadGridLarge"
              width={100 * zoom}
              height={100 * zoom}
              patternUnits="userSpaceOnUse"
            >
              <rect width={100 * zoom} height={100 * zoom} fill="url(#cadGridSmall)" />
              <path
                d={`M ${100 * zoom} 0 L 0 0 0 ${100 * zoom}`}
                fill="none"
                stroke="#334155"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Lưới tọa độ CAD */}
          <rect width="100%" height="100%" fill="#080c15" />
          <rect width="100%" height="100%" fill="url(#cadGridLarge)" />

          {/* Nhóm hiển thị có thể phóng to và dịch chuyển */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Lưới trục kiến trúc (Layer A-DIM) */}
            {isLayerVisible('A-DIM') && (
              <g stroke="#1e293b" strokeWidth="1" strokeDasharray="6 6">
                <line x1="120" y1="40" x2="120" y2="780" />
                <line x1="420" y1="40" x2="420" y2="780" />
                <line x1="720" y1="40" x2="720" y2="780" />
                <line x1="940" y1="40" x2="940" y2="780" />
                <line x1="40" y1="100" x2="980" y2="100" />
                <line x1="40" y1="340" x2="980" y2="340" />
                <line x1="40" y1="580" x2="980" y2="580" />
              </g>
            )}

            {/* Vòng tròn định danh trục */}
            {isLayerVisible('A-DIM') && (
              <g fill="#475569" className="font-mono text-[10px]">
                <circle cx="120" cy="30" r="10" fill="#0f172a" stroke="#334155" />
                <text x="117" y="34" fill="#94a3b8">1</text>

                <circle cx="420" cy="30" r="10" fill="#0f172a" stroke="#334155" />
                <text x="417" y="34" fill="#94a3b8">2</text>

                <circle cx="720" cy="30" r="10" fill="#0f172a" stroke="#334155" />
                <text x="717" y="34" fill="#94a3b8">3</text>

                <circle cx="940" cy="30" r="10" fill="#0f172a" stroke="#334155" />
                <text x="937" y="34" fill="#94a3b8">4</text>
              </g>
            )}

            {/* Cột bê tông cốt thép kết cấu (Layer S-COL) */}
            {isLayerVisible('S-COL') && (
              <g fill="#1e293b" stroke="#475569" strokeWidth="1.5">
                <rect x="105" y="85" width="30" height="30" />
                <rect x="405" y="85" width="30" height="30" />
                <rect x="705" y="85" width="30" height="30" />
                <rect x="105" y="325" width="30" height="30" />
                <rect x="405" y="325" width="30" height="30" />
                <rect x="705" y="325" width="30" height="30" />
                <rect x="105" y="565" width="30" height="30" />
                <rect x="405" y="565" width="30" height="30" />
                <rect x="705" y="565" width="30" height="30" />
              </g>
            )}

            {/* ─────────────────────────────────────────────────────────
                ĐA GIÁC CÁC PHÒNG BÓC TÁCH (A-WALL)
            ───────────────────────────────────────────────────────── */}
            {isLayerVisible('A-WALL') &&
              rooms
                .filter((r) => !filterNeedsReview || r.status === 'Needs Review')
                .map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  const isSourceHighlighted =
                    highlightedSourceHandle === room.sourceHandle;
                  const isNeedsReview = room.status === 'Needs Review';
                  const isConfirmed = room.status === 'Confirmed';

                  const pointsStr = room.vertices
                    .map((v) => `${v.x},${v.y}`)
                    .join(' ');

                  const avgX =
                    room.vertices.reduce((sum, v) => sum + v.x, 0) /
                    room.vertices.length;
                  const avgY =
                    room.vertices.reduce((sum, v) => sum + v.y, 0) /
                    room.vertices.length;

                  return (
                    <g
                      key={room.id}
                      className="cursor-pointer transition-all duration-150"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room.id);
                      }}
                    >
                      <polygon
                        points={pointsStr}
                        fill={
                          isSelected || isSourceHighlighted
                            ? isNeedsReview
                              ? 'rgba(250, 204, 21, 0.28)'
                              : 'rgba(74, 222, 128, 0.28)'
                            : isNeedsReview
                            ? 'rgba(250, 204, 21, 0.12)'
                            : isConfirmed
                            ? 'rgba(74, 222, 128, 0.14)'
                            : 'rgba(56, 189, 248, 0.10)'
                        }
                        stroke={
                          isSelected || isSourceHighlighted
                            ? '#38bdf8'
                            : isNeedsReview
                            ? '#facc15'
                            : isConfirmed
                            ? '#4ade80'
                            : '#60a5fa'
                        }
                        strokeWidth={
                          isSelected || isSourceHighlighted ? '3' : '1.8'
                        }
                        strokeDasharray={
                          isNeedsReview ? '6 3' : 'none'
                        }
                      />

                      {/* Đánh dấu các đỉnh vector khi phòng được chọn */}
                      {(isSelected || isSourceHighlighted) &&
                        room.vertices.map((v, vIdx) => (
                          <g key={vIdx}>
                            <circle
                              cx={v.x}
                              cy={v.y}
                              r="4.5"
                              fill="#38bdf8"
                              stroke="#080c15"
                              strokeWidth="1.5"
                            />
                            <text
                              x={v.x + 6}
                              y={v.y - 6}
                              fill="#7dd3fc"
                              className="font-mono text-[9px] font-bold pointer-events-none"
                            >
                              #{vIdx + 1}
                            </text>
                          </g>
                        ))}

                      {/* Nhãn thông tin phòng */}
                      <g
                        transform={`translate(${avgX - 45}, ${avgY - 20})`}
                        className="pointer-events-none"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="90"
                          height="44"
                          rx="4"
                          fill="rgba(15, 23, 42, 0.85)"
                          stroke={isSelected ? '#38bdf8' : '#334155'}
                          strokeWidth="1"
                        />
                        <text
                          x="45"
                          y="16"
                          textAnchor="middle"
                          fill="#f8fafc"
                          className="font-mono text-[11px] font-bold"
                        >
                          {room.code}
                        </text>
                        <text
                          x="45"
                          y="29"
                          textAnchor="middle"
                          fill="#94a3b8"
                          className="font-mono text-[10px]"
                        >
                          {room.floorArea.toFixed(2)} m²
                        </text>
                        <text
                          x="45"
                          y="39"
                          textAnchor="middle"
                          fill={isNeedsReview ? '#facc15' : '#4ade80'}
                          className="font-mono text-[8px] font-bold"
                        >
                          {isNeedsReview ? '⚠️ THẨM ĐỊNH 71%' : `● ${room.confidence}% TIN CẬY`}
                        </text>
                      </g>
                    </g>
                  );
                })}

            {/* ─────────────────────────────────────────────────────────
                THỰC THỂ CỬA ĐI (Layer A-DOOR)
            ───────────────────────────────────────────────────────── */}
            {isLayerVisible('A-DOOR') &&
              doors.map((door) => (
                <g key={door.id} transform={`translate(${door.x}, ${door.y})`}>
                  <path
                    d="M 0 0 A 32 32 0 0 1 32 32 L 0 32 Z"
                    fill="rgba(96, 165, 250, 0.25)"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="-18"
                    y="-18"
                    width="36"
                    height="16"
                    rx="3"
                    fill="#0f172a"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-7"
                    textAnchor="middle"
                    fill="#93c5fd"
                    className="font-mono text-[9px] font-bold"
                  >
                    {door.code}
                  </text>
                </g>
              ))}

            {/* Thước đo khoảng cách trực tiếp */}
            {measurePointA && (
              <circle
                cx={measurePointA.x}
                cy={measurePointA.y}
                r="5"
                fill="#facc15"
                stroke="#000"
                strokeWidth="1"
              />
            )}
            {measurePointA && measurePointB && (
              <g>
                <line
                  x1={measurePointA.x}
                  y1={measurePointA.y}
                  x2={measurePointB.x}
                  y2={measurePointB.y}
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={measurePointB.x}
                  cy={measurePointB.y}
                  r="5"
                  fill="#facc15"
                  stroke="#000"
                  strokeWidth="1"
                />
                <rect
                  x={(measurePointA.x + measurePointB.x) / 2 - 30}
                  y={(measurePointA.y + measurePointB.y) / 2 - 18}
                  width="60"
                  height="20"
                  rx="4"
                  fill="#0f172a"
                  stroke="#facc15"
                  strokeWidth="1"
                />
                <text
                  x={(measurePointA.x + measurePointB.x) / 2}
                  y={(measurePointA.y + measurePointB.y) / 2 - 4}
                  textAnchor="middle"
                  fill="#facc15"
                  className="font-mono text-[10px] font-bold"
                >
                  {measureDistance} m
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          THANH TRẠNG THÁI HUD DƯỚI ĐÁY
      ───────────────────────────────────────────────────────────── */}
      <div className="h-9 px-4 bg-[#0e1015] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BỘ XỬ LÝ CAD: AC1032</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/60">THỰC THỂ: 18,492</span>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400 font-semibold">
            {rooms.filter((r) => r.status === 'Confirmed').length} / {rooms.length} Đã duyệt
          </span>
        </div>

        <div className="flex items-center gap-3">
          {activeTool === 'measure' && (
            <span className="text-[#ffc474] hidden sm:inline">
              Thước đo: Nhấp 2 điểm trên bản vẽ để tính khoảng cách CAD
            </span>
          )}
          <div className="px-2.5 py-0.5 rounded-md bg-[#161822] border border-white/10 text-[#ffc474] font-mono font-bold text-[10px]">
            X: {mouseCoord.x.toFixed(2)}m &nbsp; Y: {mouseCoord.y.toFixed(2)}m
          </div>
        </div>
      </div>
    </div>
  );
};
