import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, ChevronDown, ChevronUp, FileCode, ArrowRight } from 'lucide-react';

interface AIProcessingViewProps {
  fileName: string;
  onComplete: () => void;
}

export const AIProcessingView: React.FC<AIProcessingViewProps> = ({
  fileName,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  const steps = [
    { label: 'Đọc cấu trúc tệp & các lớp CAD', detail: 'Phát hiện 32 lớp CAD: A-WALL, A-DOOR, A-WINDOW, A-DIM...' },
    { label: 'Nhận diện vector tường & ranh giới tường xây', detail: 'Đã phân tích 4.821 đoạn đa tuyến polyline trên lớp A-WALL' },
    { label: 'Trích xuất đa giác phòng khép kín', detail: 'Đã bao đóng 6 ranh giới phòng riêng biệt và tính chu vi' },
    { label: 'Nhận diện cửa đi & tính khấu trừ diện tích', detail: 'Khớp 4 vị trí cửa đi và tự động khấu trừ (10,95 m²)' },
    { label: 'Tính toán diện tích sơn & khối lượng vật tư', detail: 'Áp dụng chiều cao tường 3,2m và công thức bóc tách (85,00 m² A101)' },
    { label: 'Kiểm định hình học & chấm điểm độ tin cậy AI', detail: 'Đánh dấu 3 mục cần kỹ sư kiểm duyệt (Ngưỡng tin cậy < 95%)' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  const isFinished = currentStep >= steps.length - 1;

  return (
    <div className="h-full flex items-center justify-center p-6 bg-[#0c0e12] text-white select-none">
      <div className="max-w-xl w-full bg-[#12141a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#ffc474] font-semibold uppercase tracking-wider">
              Phân tích Không gian Kỹ thuật AI
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Đang phân tích cấu trúc hình học CAD...
            </h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-white/70 border border-white/10">
            {fileName}
          </span>
        </div>

        {/* Steps List */}
        <div className="space-y-3 font-mono text-xs">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep || (isFinished && idx === currentStep);
            const isCurrent = idx === currentStep && !isFinished;
            const isPending = idx > currentStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                  isCurrent
                    ? 'bg-[#161822] border border-[#ffc474]/40 text-white'
                    : isDone
                    ? 'bg-white/5 border border-white/5 text-white/80'
                    : 'text-white/30 border border-transparent'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#ffc474] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[9px] text-white/40">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{step.label}</div>
                  {isCurrent && (
                    <div className="text-[11px] text-[#ffc474] mt-0.5">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Details Expandable Drawer */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#161822]">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>Thông số Kỹ thuật Chi tiết</span>
            {showDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showDetails && (
            <div className="p-4 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono border-t border-white/10 mt-1">
              <div className="p-2.5 rounded-lg bg-[#12141a] border border-white/10">
                <span className="text-[10px] text-white/40 block">Thực thể</span>
                <span className="font-bold text-white">18,492</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#12141a] border border-white/10">
                <span className="text-[10px] text-white/40 block">Đa tuyến</span>
                <span className="font-bold text-sky-400">4,821</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#12141a] border border-white/10">
                <span className="text-[10px] text-white/40 block">Lớp CAD</span>
                <span className="font-bold text-emerald-400">32</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#12141a] border border-white/10">
                <span className="text-[10px] text-white/40 block">Chữ/Ghi chú</span>
                <span className="font-bold text-[#ffc474]">1,284</span>
              </div>
            </div>
          )}
        </div>

        {/* Ready action */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-white/50 font-mono">
            {isFinished
              ? '✓ Phân tích AI hoàn tất. Sẵn sàng để kỹ sư thẩm tra.'
              : 'Đang xử lý các phần tử vector hình học...'}
          </span>
          <button
            onClick={onComplete}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
              isFinished
                ? 'amber-button shadow-lg active:scale-98'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>{isFinished ? 'Mở Thẩm định Bản vẽ' : 'Bỏ qua & Vào Thẩm định'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
