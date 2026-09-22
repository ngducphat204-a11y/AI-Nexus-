import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Layers,
  Sparkles,
  ArrowRight,
  Compass,
  Table2,
  SlidersHorizontal,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface LandingStorytellingProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingStorytelling: React.FC<LandingStorytellingProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  const [activeTraceStep, setActiveTraceStep] = useState<number>(1);
  const [selectedReviewAction, setSelectedReviewAction] = useState<'confirm' | 'correct' | 'reject'>('confirm');

  const fadeInUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <div id="storytelling" className="bg-[#0c0e12] text-white overflow-hidden drafting-grid-dark">
      {/* ─────────────────────────────────────────────────────────────
          PHẦN 1: TẠI SAO PHẢI LÀ VECTOR CAD THAY VÌ ẢNH RASTER
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-white/10 bg-[#0e1015] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              01 // Bản chất Kỹ thuật
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-semibold text-white tracking-tight mt-4 leading-[1.15]">
              Độ chính xác hình học bắt đầu từ Vector CAD nguyên bản.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed font-sans-tight">
              Các công cụ thông thường biến bản vẽ thành file ảnh mờ (raster pixel) rồi quét AI phỏng đoán, dẫn đến sai số diện tích lên tới 15–25%. Chúng tôi phân tích trực tiếp từng tọa độ vector toán học trong file DXF gốc.
            </p>
          </motion.div>

          {/* Bảng so sánh trực quan Vector vs Raster */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cột Trái: Tiếp cận Vector CAD */}
            <motion.div 
              {...fadeInUp}
              className="p-8 rounded-2xl dense-panel border border-emerald-500/30 bg-emerald-950/15 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                  <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Thuật toán AI Paint Take-off
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Chuẩn xác 100%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                Phân tích Thực thể Vector Hình học
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed font-sans-tight">
                Đọc trực tiếp các đối tượng LWPOLYLINE, LINE, CIRCLE và HATCH từ tệp DXF AC1032. Tọa độ đỉnh được giữ nguyên độ chính xác 6 chữ số thập phân của AutoCAD.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-[#111319] border border-emerald-500/30 font-mono text-xs text-white/90 space-y-2">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Trích xuất thực thể DXF:
                </div>
                <div className="text-white/70 pl-5">
                  <span className="text-emerald-400 font-semibold">LWPOLYLINE</span> [Handle: #8F31] - 14 Đỉnh khép kín
                </div>
                <div className="text-white/70 pl-5">
                  Lớp: <span className="text-[#38bdf8] font-semibold">A-WALL</span> | Bề dày: <span className="text-white font-semibold">200mm</span> | Chu vi: <span className="text-white font-semibold">26.50m</span>
                </div>
                <div className="text-white/70 pl-5">
                  Sai số hình học: <span className="text-emerald-400 font-bold">0.0000%</span>
                </div>
              </div>
            </motion.div>

            {/* Cột Phải: Cách làm truyền thống */}
            <motion.div 
              {...fadeInUp}
              className="p-8 rounded-2xl dense-panel border border-rose-500/30 bg-rose-950/15 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
                  <span className="font-mono text-xs font-bold text-rose-300 uppercase tracking-wider">
                    Cách làm Quét ảnh OCR / Raster cũ
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Rủi ro Thất thoát
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                Chụp ảnh màn hình & Đo pixel mờ
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed font-sans-tight">
                Chuyển PDF sang file ảnh PNG/JPG rồi dùng mô hình thị giác máy tính phỏng đoán đường viền. Mất hoàn toàn liên kết tọa độ, méo hình khi co phóng và không phân biệt được vách thạch cao hay tường gạch.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-[#111319] border border-rose-500/30 font-mono text-xs text-white/80 space-y-2">
                <div className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  Hạn chế nghiêm trọng:
                </div>
                <div className="text-white/60 pl-5">
                  Mất thông tin Layer (A-DOOR, A-WINDOW bị gộp chung)
                </div>
                <div className="text-white/60 pl-5">
                  Pixel viền bị mờ khi co giãn tỷ lệ (Aliasing artifacts)
                </div>
                <div className="text-white/60 pl-5">
                  Không thể kiểm toán hay giải trình nguồn gốc số liệu
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PHẦN 2: QUY TRÌNH BÓC TÁCH 6 BƯỚC CHUẨN XÁC
      ───────────────────────────────────────────────────────────── */}
      <section id="detection" className="py-20 md:py-28 border-b border-white/10 bg-[#12141a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              02 // Kiến trúc Pipeline Bóc tách
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-semibold text-white tracking-tight mt-4 leading-[1.15]">
              Thuật toán nhận diện không gian đa tầng.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed font-sans-tight">
              Mô hình nhận diện hình học đa tầng trích xuất đa giác phòng khép kín, định danh cửa đi và lỗ mở kiến trúc, đồng thời tự động phát hiện các ranh giới kết cấu chưa hoàn thiện.
            </p>
          </motion.div>

          {/* 6 Bước quy trình chuẩn */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'Đọc file DXF',
                desc: 'Phân tích thực thể nhị phân / ASCII CAD',
                badgeBg: 'bg-white/10 text-white/80 border-white/15',
              },
              {
                step: '02',
                title: 'Lọc lớp bản vẽ',
                desc: 'Phân loại A-WALL, A-DOOR, A-WINDOW',
                badgeBg: 'bg-white/10 text-white/80 border-white/15',
              },
              {
                step: '03',
                title: 'Khép kín hình học',
                desc: 'Bắt điểm (Snap) đỉnh & nối khe hở',
                badgeBg: 'bg-white/10 text-white/80 border-white/15',
              },
              {
                step: '04',
                title: 'Nhận diện phòng',
                desc: 'Tính chu vi, diện tích sàn S_sàn',
                badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold',
              },
              {
                step: '05',
                title: 'Khấu trừ cửa',
                desc: 'Khấu trừ diện tích cửa đi & cửa sổ',
                badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
              },
              {
                step: '06',
                title: 'Đánh giá & Thẩm định',
                desc: 'Chấm điểm tin cậy & đưa vào hàng đợi',
                badgeBg: 'bg-sky-500/20 text-[#38bdf8] border-sky-500/40 font-bold',
              },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="dense-panel p-5 rounded-xl border border-white/10 bg-[#161822] hover:border-sky-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border inline-block ${p.badgeBg}`}>
                    BƯỚC {p.step}
                  </span>
                  <h4 className="text-sm font-bold mt-3 text-white">{p.title}</h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-snug font-sans-tight">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hệ thống mã màu ngữ nghĩa trực quan */}
          <motion.div 
            {...fadeInUp}
            className="mt-12 p-6 dense-panel rounded-2xl border border-white/10 bg-[#161820]"
          >
            <h4 className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider mb-4">
              Hệ thống Màu Ngữ nghĩa // Nhất quán Tuyệt đối trên Toàn Bộ Bản vẽ & Báo cáo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans-tight">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <div>
                  <span className="font-bold text-white block">Màu Xanh lục (Green)</span>
                  <span className="text-emerald-300 text-[11px]">Đã nhận diện / Đã phê duyệt / Hợp lệ</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-500/10 border border-sky-500/30">
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                <div>
                  <span className="font-bold text-white block">Màu Xanh lam (Blue)</span>
                  <span className="text-sky-300 text-[11px]">Lỗ mở cửa / Thông tin / Thực thể đang chọn</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <div>
                  <span className="font-bold text-white block">Màu Vàng hổ phách (Amber)</span>
                  <span className="text-amber-300 text-[11px]">Cần thẩm định / Cảnh báo khe hở</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                <div>
                  <span className="font-bold text-white block">Màu Đỏ thắm (Rose)</span>
                  <span className="text-rose-300 text-[11px]">Khấu trừ diện tích / Ranh giới trùng lấn</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PHẦN 3: TRIẾT LÝ HUMAN-IN-THE-LOOP (KỸ SƯ KIỂM DUYỆT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-white/10 bg-[#0c0e12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              03 // Cơ chế Thẩm định Kỹ thuật (Human-In-The-Loop)
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-semibold text-white tracking-tight mt-4 leading-[1.15]">
              AI đề xuất. Kỹ sư là người quyết định.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed font-sans-tight">
              Chúng tôi không bao giờ khẳng định AI hoàn hảo 100%. Khi độ tin cậy thấp hơn ngưỡng kỹ thuật hoặc phát hiện khe hở giao cắt, hệ thống lập tức gắn cờ cảnh báo kèm tọa độ đỉnh để kỹ sư thẩm định.
            </p>
          </motion.div>

          {/* Trình mô phỏng thẻ thẩm định tương tác (Dark Concrete Panel) */}
          <motion.div 
            {...fadeInUp}
            className="max-w-3xl mx-auto p-6 md:p-8 bg-[#161822] text-white rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="font-mono text-sm font-bold text-white">
                  Thẩm định Bản vẽ // Phòng A101
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-[#ffc474] border border-amber-500/40 font-semibold">
                ⚠️ Chờ kiểm tra (Độ tin cậy &lt; 95%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 font-mono text-xs">
              <div className="space-y-4">
                <div className="bg-[#1c1f2a] p-4 rounded-xl border border-white/10">
                  <div className="text-white/50 text-[11px] font-semibold">DIỆN TÍCH SÀN BÓC TÁCH</div>
                  <div className="text-2xl font-bold text-white mt-1">42.50 m²</div>
                  <div className="text-white/70 text-[11px] mt-2">
                    Diện tích sơn thực tế: <span className="text-emerald-400 font-bold">85.00 m²</span>
                  </div>
                </div>

                <div className="bg-[#1c1f2a] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="text-white/50 text-[11px] font-bold">NGUỒN THỰC THỂ CAD</div>
                  <div className="flex justify-between text-white/80">
                    <span>Mã định danh (Handle):</span>
                    <span className="text-[#38bdf8] font-bold">LWPOLYLINE #8F31</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Số đỉnh hình học:</span>
                    <span>14 đỉnh (vòng khép kín)</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Lớp bản vẽ:</span>
                    <span className="font-bold text-white">A-WALL</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1c1f2a] p-4 rounded-xl border border-white/10">
                  <div className="text-white/50 text-[11px] font-bold">GIẢI TRÌNH THUẬT TOÁN AI</div>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed font-sans font-light">
                    Polyline có một đoạn giật cấp 140mm dọc theo vách ngăn hành lang. Điểm tin cậy đạt 98% sau khi khấu trừ 2 cửa đi. Khuyến nghị kỹ sư kiểm tra và bấm xác nhận.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <div className="font-bold flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Thao tác kỹ thuật bắt buộc
                  </div>
                  <p className="text-[11px] font-sans text-white/70 mt-1">
                    Chọn hành động để chốt hồ sơ bóc tách cho Phòng A101:
                  </p>
                </div>
              </div>
            </div>

            {/* Thanh nút hành động */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReviewAction('confirm')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedReviewAction === 'confirm'
                      ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                >
                  ✓ Phê duyệt phòng
                </button>
                <button
                  onClick={() => setSelectedReviewAction('correct')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedReviewAction === 'correct'
                      ? 'bg-sky-600 text-white shadow-lg ring-2 ring-sky-400'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                >
                  ✎ Hiệu chỉnh đỉnh
                </button>
                <button
                  onClick={() => setSelectedReviewAction('reject')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedReviewAction === 'reject'
                      ? 'bg-rose-600 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15'
                  }`}
                >
                  × Từ chối
                </button>
              </div>

              <div className="text-xs font-mono text-white/50">
                Trạng thái:{' '}
                <span className="text-[#38bdf8] font-bold capitalize">
                  {selectedReviewAction === 'confirm'
                    ? 'Đã chọn Phê duyệt'
                    : selectedReviewAction === 'correct'
                    ? 'Đã chọn Hiệu chỉnh'
                    : 'Đã chọn Từ chối'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PHẦN 4: TRUY XUẤT NGUỒN GỐC HAI CHIỀU (TÍNH NĂNG ĐỘC BẢN)
      ───────────────────────────────────────────────────────────── */}
      <section id="traceability" className="py-20 md:py-28 border-b border-white/10 bg-[#0e1015] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              04 // Tính năng Kỹ thuật Độc bản
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-semibold text-white tracking-tight mt-4 leading-[1.15]">
              Mọi con số đều có nguồn gốc rõ ràng.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed font-sans-tight">
              Nhấp vào bất kỳ số liệu nào trên bảng dự toán, hệ thống sẽ ngay lập tức truy hồi về đúng đoạn polyline DXF, tọa độ đỉnh và lớp bản vẽ. Kiểm toán minh bạch 100%.
            </p>
          </motion.div>

          {/* Trình diễn chuỗi truy xuất tương tác 5 bước */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Cột trái: 5 Bước trong chuỗi truy xuất */}
            <motion.div {...fadeInUp} className="lg:col-span-6 space-y-3">
              {[
                {
                  id: 1,
                  title: '1. Số liệu trên Dự toán (BOQ)',
                  value: '42.50 m² Diện tích sàn',
                  detail: 'Bóc tách từ vòng đa giác phòng khép kín',
                  tag: 'Khoản mục BOQ #1',
                },
                {
                  id: 2,
                  title: '2. Thực thể gốc DXF',
                  value: 'LWPOLYLINE #8F31',
                  detail: 'Handle được lưu trữ trong bảng AC1032 DXF',
                  tag: 'Mã định danh CAD',
                },
                {
                  id: 3,
                  title: '3. Tọa độ các đỉnh vector',
                  value: '14 Đỉnh tọa độ chính xác',
                  detail: 'Lớp A-WALL, Chiều dày tường 200mm',
                  tag: 'Hình học chuẩn xác',
                },
                {
                  id: 4,
                  title: '4. Công thức tính diện tích sơn',
                  value: 'Diện tích sơn: 85.00 m²',
                  detail: 'Chu vi 26.5m × cao 3.2m − diện tích cửa',
                  tag: 'Quy chuẩn bóc tách',
                },
                {
                  id: 5,
                  title: '5. Chi phí dự toán được phê duyệt',
                  value: '8,330,000 ₫ (Hệ sơn nội thất)',
                  detail: '1 Lót + 2 Phủ Dulux EasyClean',
                  tag: 'Thành tiền dự toán',
                },
              ].map((step) => {
                const isActive = activeTraceStep === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveTraceStep(step.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-500/15 border-sky-400/50 shadow-lg shadow-sky-500/10 translate-x-1.5'
                        : 'dense-panel border-white/10 bg-[#161822] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className={isActive ? 'text-[#38bdf8] font-bold' : 'text-white/60'}>
                        {step.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        isActive ? 'bg-sky-500/25 text-[#38bdf8] font-semibold border border-sky-500/40' : 'bg-white/10 text-white/60'
                      }`}>
                        {step.tag}
                      </span>
                    </div>
                    <div className="text-base font-bold text-white font-mono">{step.value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{step.detail}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Cột phải: Bảng soi chiếu chi tiết */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-6 bg-[#161822] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-white/50">
                <span className="text-[#38bdf8] flex items-center gap-1.5 font-bold">
                  <GitBranch className="w-4 h-4 text-[#38bdf8]" />
                  BẢNG TRA CỨU TRUY XUẤT NGUỒN GỐC HAI CHIỀU
                </span>
                <span className="text-white/40 font-bold">Bước {activeTraceStep} / 5</span>
              </div>

              <div className="my-6 p-6 rounded-xl bg-[#12141a] border border-white/10 font-mono text-xs space-y-4">
                <div className="text-[#38bdf8] text-[11px] uppercase tracking-wider font-bold">
                  BỐI CẢNH TRUY XUẤT ĐANG KÍCH HOẠT
                </div>

                {activeTraceStep === 1 && (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white">42.50 m²</div>
                    <p className="text-white/70 text-xs font-sans font-light">
                      Kỹ sư dự toán kiểm tra giá trị này trong bảng tổng hợp BOQ. Khi nhấp chuột, màn hình CAD 2D tự động phóng to, làm sáng Phòng A101 và hiển thị cấu trúc thực thể gốc.
                    </p>
                  </div>
                )}

                {activeTraceStep === 2 && (
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-[#38bdf8]">LWPOLYLINE #8F31</div>
                    <p className="text-white/70 text-xs font-sans font-light">
                      Con trỏ trỏ trực tiếp đến file DXF. Bất kỳ kỹ sư thẩm định nào mở AutoCAD hoặc Civil 3D, tìm kiếm handle <code className="text-[#38bdf8] font-bold">#8F31</code> đều sẽ thấy chính xác đối tượng tương ứng.
                    </p>
                  </div>
                )}

                {activeTraceStep === 3 && (
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-[#38bdf8]">14 Đỉnh trên Lớp A-WALL</div>
                    <p className="text-white/70 text-xs font-sans font-light">
                      Vòng khép kín chuẩn xác. Chu vi được xác thực ở mức 26.50 mét dài. Bề dày vách tường 200mm đã được tính toán khấu trừ tim trục.
                    </p>
                  </div>
                )}

                {activeTraceStep === 4 && (
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-emerald-400">85.00 m² Diện tích sơn thực tế</div>
                    <p className="text-white/70 text-xs font-sans font-light">
                      Công thức: <code className="text-emerald-300 font-mono font-bold">(Chu vi 26.5m × Cao 3.2m) − Cửa D021 (3.78m²) − Cửa sổ W101 (4.50m²)</code>.
                    </p>
                  </div>
                )}

                {activeTraceStep === 5 && (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white">8,330,000 ₫</div>
                    <p className="text-white/70 text-xs font-sans font-light">
                      Nhân với đơn giá nhà thầu 98,000 ₫/m². Đã bao gồm 1 lớp sơn lót kháng kiềm, 2 lớp sơn phủ Dulux EasyClean và 5% hao hụt thi công.
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 flex items-center justify-between">
                  <span>Nhật ký kiểm toán: Bất biến (Immutable)</span>
                  <span className="text-emerald-400 font-bold">Trạng thái: Đã kiểm tra</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveTraceStep((prev) => (prev > 1 ? prev - 1 : 5))}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 text-xs text-white/80 hover:bg-white/15 transition-colors cursor-pointer font-medium"
                >
                  ← Bước trước
                </button>
                <button
                  onClick={() => setActiveTraceStep((prev) => (prev < 5 ? prev + 1 : 1))}
                  className="tech-blue-button px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Bước tiếp theo →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PHẦN 5: TỪ HÌNH HỌC ĐẾN HỒ SƠ DỰ TOÁN HOÀN CHỈNH
      ───────────────────────────────────────────────────────────── */}
      <section id="estimate" className="py-20 md:py-28 border-b border-white/10 bg-[#12141a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              05 // Khối lượng & Hồ sơ Dự toán
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-semibold text-white tracking-tight mt-4 leading-[1.15]">
              Từ hình học đến hồ sơ dự toán hoàn chỉnh.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed font-sans-tight">
              Mỗi căn phòng được tổng hợp vào bảng tiên lượng khối lượng (BOQ) chuyên nghiệp với các hệ sơn tùy chỉnh, định mức sơn lót, sơn phủ và tiền tệ VND.
            </p>
          </motion.div>

          {/* Các thẻ chỉ số KPI tổng hợp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div {...fadeInUp} className="dense-panel p-6 rounded-2xl border border-white/10 bg-[#161822]">
              <div className="text-xs font-mono font-semibold text-white/50">TỔNG DIỆN TÍCH SƠN</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-2">
                12,482.5 <span className="text-sm font-normal text-white/50">m²</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-2">28 Tầng · Tháp căn hộ A</div>
            </motion.div>

            <motion.div {...fadeInUp} className="dense-panel p-6 rounded-2xl border border-sky-500/30 bg-sky-500/10">
              <div className="text-xs font-mono font-semibold text-[#38bdf8]">TỔNG DỰ TOÁN KINH PHÍ</div>
              <div className="text-3xl font-extrabold text-[#38bdf8] font-mono mt-2">
                1,284,500,000 <span className="text-sm font-normal text-[#38bdf8]/70">₫</span>
              </div>
              <div className="text-xs text-white/70 mt-2 font-medium">Bao gồm Vật tư + Nhân công</div>
            </motion.div>

            <motion.div {...fadeInUp} className="dense-panel p-6 rounded-2xl border border-white/10 bg-[#161822]">
              <div className="text-xs font-mono font-semibold text-white/50">SƠN TƯỜNG NỘI THẤT</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-2">
                8,421.0 <span className="text-sm font-normal text-white/50">m²</span>
              </div>
              <div className="text-xs text-white/70 mt-2 font-medium">1 Lớp lót + 2 Lớp phủ</div>
            </motion.div>

            <motion.div {...fadeInUp} className="dense-panel p-6 rounded-2xl border border-white/10 bg-[#161822]">
              <div className="text-xs font-mono font-semibold text-white/50">NGOẠI THẤT & KHU VỰC ẨM</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-2">
                4,061.5 <span className="text-sm font-normal text-white/50">m²</span>
              </div>
              <div className="text-xs text-white/70 mt-2 font-medium">Dulux Weathershield Chống thấm</div>
            </motion.div>
          </div>

          {/* Bảng tiên lượng mẫu (Dark Table) */}
          <motion.div {...fadeInUp} className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#161822]">
            <div className="px-6 py-4 bg-[#1c1f2b] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs font-mono font-bold text-white">
                  TÒA THÁP SUNRISE TOWER // BẢNG BÓC TÁCH KHỐI LƯỢNG SƠN TẦNG 03
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/40">
                6 / 6 Phòng đã thẩm định
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#181b24] border-b border-white/10 text-white/50 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Phòng</th>
                    <th className="px-4 py-3">Nguồn DXF</th>
                    <th className="px-4 py-3">Diện tích sàn</th>
                    <th className="px-4 py-3">Diện tích sơn</th>
                    <th className="px-4 py-3">Hệ sơn chỉ định</th>
                    <th className="px-4 py-3">Đơn giá</th>
                    <th className="px-4 py-3">Thành tiền</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/80">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">Phòng A101</td>
                    <td className="px-4 py-3 text-[#38bdf8] font-semibold">LWPOLYLINE #8F31</td>
                    <td className="px-4 py-3">42.50 m²</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">85.00 m²</td>
                    <td className="px-4 py-3 font-sans text-white/70">Dulux EasyClean Mờ</td>
                    <td className="px-4 py-3">98,000 ₫</td>
                    <td className="px-4 py-3 font-bold text-white">8,330,000 ₫</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        ✓ Đã thẩm định
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">Phòng A102</td>
                    <td className="px-4 py-3 text-[#38bdf8] font-semibold">LWPOLYLINE #9A12</td>
                    <td className="px-4 py-3">38.20 m²</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">76.40 m²</td>
                    <td className="px-4 py-3 font-sans text-white/70">Dulux EasyClean Mờ</td>
                    <td className="px-4 py-3">98,000 ₫</td>
                    <td className="px-4 py-3 font-bold text-white">7,487,200 ₫</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        ✓ Đã thẩm định
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">Phòng A103</td>
                    <td className="px-4 py-3 text-[#38bdf8] font-semibold">LWPOLYLINE #3D88</td>
                    <td className="px-4 py-3">41.70 m²</td>
                    <td className="px-4 py-3 font-bold text-amber-400">83.40 m²</td>
                    <td className="px-4 py-3 font-sans text-white/70">Jotun Majestic Đẹp Hoàn Hảo</td>
                    <td className="px-4 py-3">102,000 ₫</td>
                    <td className="px-4 py-3 font-bold text-white">8,506,800 ₫</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        ⚠️ Cần thẩm định
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PHẦN 6: KÊU GỌI HÀNH ĐỘNG KỸ THUẬT (CALL TO ACTION)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#090b0e] text-white text-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute left-[20%] top-[40%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_70%)] blur-3xl pointer-events-none" />

        <motion.div {...fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
            Sẵn sàng chuyển đổi bản vẽ thành hồ sơ dự toán?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed font-light font-sans-tight">
            Tải lên bản vẽ 2D DXF đầu tiên của bạn để trải nghiệm tính năng tự động nhận diện phòng, bóc tách chính xác và kiểm toán nguồn gốc kỹ thuật.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="tech-blue-button inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer"
            >
              <span>Bắt đầu bóc tách ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreDemo}
              className="dense-panel inline-flex items-center gap-2 px-7 py-4 text-sm font-medium text-white hover:bg-white/10 rounded-2xl transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#38bdf8]" />
              <span>Khám phá dự án mẫu</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
