import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, Camera, Upload, Sparkles, HardHat } from 'lucide-react';

interface EngineerMascotProps {
  className?: string;
  onGetStarted?: () => void;
}

export const EngineerMascot: React.FC<EngineerMascotProps> = ({
  className = '',
}) => {
  const [imageSrc, setImageSrc] = useState<string>('/khoanhtay.png');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ai_paint_mascot_img');
    if (saved) {
      setImageSrc(saved);
      setImageLoaded(true);
      setImageError(false);
    }
  }, []);

  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          setImageError(false);
          setImageLoaded(true);
          try {
            localStorage.setItem('ai_paint_mascot_img', result);
          } catch {
            // Storage quota catch
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* ─────────────────────────────────────────────────────────────
          AMBIENT GOLDEN AMBER GLOW (Soft warm illumination behind Chibi)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25)_0%,rgba(234,88,12,0.12)_45%,transparent_75%)] blur-2xl" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (TOP RIGHT)
          "Biến bản vẽ thành giá trị thật! ~" in Golden Amber
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute -top-3 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans">
        <div className="text-[#fde68a] font-extrabold text-sm sm:text-base leading-tight tracking-tight rotate-[4deg] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Biến bản vẽ<br />
          thành giá trị<br />
          <span className="text-[#fbbf24]">thật! ~</span>
        </div>
        <svg width="100" height="12" viewBox="0 0 100 12" className="mt-1 ml-auto text-[#f59e0b]">
          <path d="M 5 6 Q 50 1 95 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3 CHECK CAPSULES (STACKED ON RIGHT SIDE) - THEMED TO CHIBI
          ✓ Nhanh hơn (Vàng bảo hộ)
          ✓ Chính xác hơn (Cam phản quang)
          ✓ Hiệu quả hơn (Vàng hổ phách)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute right-0 sm:-right-8 top-28 sm:top-32 z-20 flex flex-col gap-2 pointer-events-none">
        {/* Nhanh hơn */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101726]/95 border border-amber-400/50 backdrop-blur-md shadow-lg shadow-black/50"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#090d18] shrink-0 font-black">
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          </div>
          <span className="text-xs font-bold text-amber-100 tracking-wide">Nhanh hơn</span>
        </motion.div>

        {/* Chính xác hơn */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101726]/95 border border-orange-500/50 backdrop-blur-md shadow-lg shadow-black/50"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center text-white shrink-0 font-black">
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          </div>
          <span className="text-xs font-bold text-orange-100 tracking-wide">Chính xác hơn</span>
        </motion.div>

        {/* Hiệu quả hơn */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101726]/95 border border-yellow-400/50 backdrop-blur-md shadow-lg shadow-black/50"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#eab308] to-[#facc15] flex items-center justify-center text-[#090d18] shrink-0 font-black">
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          </div>
          <span className="text-xs font-bold text-yellow-100 tracking-wide">Hiệu quả hơn</span>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (BOTTOM RIGHT)
          "Cùng xây dựng tương lai tốt đẹp hơn ☺"
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute -bottom-4 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans">
        <div className="text-amber-100/90 font-medium text-xs sm:text-sm leading-snug tracking-tight rotate-[-2deg] drop-shadow-md">
          Cùng xây dựng<br />
          tương lai tốt đẹp hơn
        </div>
        <div className="text-[#fbbf24] text-sm font-bold rotate-[6deg]">
          ☺
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN 3D CHIBI CHARACTER RENDERER
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        className={`relative group cursor-pointer transition-all duration-300 ${
          isDragOver ? 'scale-105 ring-4 ring-amber-400 rounded-3xl' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        title="Nhấp để tải hoặc thay đổi ảnh Chibi Engineer"
      >
        {/* Floor drop shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 sm:w-56 h-6 bg-black/85 rounded-[100%] blur-md" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-3 bg-amber-500/35 rounded-[100%] blur-sm" />

        {/* Display image if available */}
        {!imageError ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="Kỹ sư Chibi PlanAI"
              referrerPolicy="no-referrer"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => setImageError(true)}
              className="relative w-64 sm:w-72 md:w-80 lg:w-88 h-auto max-h-[460px] sm:max-h-[500px] object-contain drop-shadow-[0_20px_40px_rgba(245,158,11,0.4)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] filter transition-transform duration-300 group-hover:scale-102"
            />
            {/* Quick change button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 rounded-full text-[10px] text-amber-200 flex items-center gap-1 font-mono shadow-md">
              <Camera className="w-3 h-3 text-amber-400" />
              <span>Đổi ảnh</span>
            </div>
          </div>
        ) : (
          /* High-Fidelity 3D Chibi SVG illustration fallback with Helmet & Safety Vest */
          <div className="relative w-64 sm:w-72 md:w-80 h-[430px] rounded-3xl bg-gradient-to-b from-[#181410]/95 via-[#10131e]/95 to-[#080d18] border-2 border-amber-500/40 p-5 flex flex-col items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden group-hover:border-amber-400 transition-all">
            
            {/* Chibi Character Vector Representation */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center">
              {/* Yellow Hardhat */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-[0_12px_32px_rgba(245,158,11,0.6)] border-4 border-[#080d18]">
                  <div className="flex flex-col items-center">
                    <HardHat className="w-16 h-16 text-[#080d18] fill-[#080d18]" />
                    <span className="text-[7.5px] font-black text-[#080d18] tracking-widest uppercase mt-0.5">
                      BUILD BRIGHTER
                    </span>
                  </div>
                </div>
                {/* Cheerful star sparkle */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] border-2 border-white flex items-center justify-center text-white shadow-md animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Character Badge */}
              <div className="mt-3 text-center">
                <h4 className="font-extrabold text-white text-base font-sans tracking-tight">
                  Kỹ sư Chibi PlanAI
                </h4>
                <p className="text-[11px] text-amber-300/80 font-mono mt-0.5">
                  &ldquo;Biến bản vẽ thành giá trị thật!&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Upload Action */}
            <div className="w-full bg-[#181d2a] border border-amber-500/40 hover:border-amber-400 rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Upload className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Nạp ảnh khoanhtay.png</span>
              </div>
              <span className="text-[10px] text-white/70 text-center leading-tight">
                Nhấp hoặc kéo thả file ảnh từ máy vào đây!
              </span>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </motion.div>
    </div>
  );
};
