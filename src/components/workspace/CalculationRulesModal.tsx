import React, { useState } from 'react';
import { X, Sliders, Check, RotateCcw } from 'lucide-react';
import { CalculationRules } from '../../types';

interface CalculationRulesModalProps {
  isOpen: boolean;
  rules: CalculationRules;
  onClose: () => void;
  onSave: (newRules: CalculationRules) => void;
}

export const CalculationRulesModal: React.FC<CalculationRulesModalProps> = ({
  isOpen,
  rules,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CalculationRules>(rules);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-[#12141a] rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161822]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ffc474]" />
              Quy tắc Tính toán & Tái tính Dự toán Sơn
            </h2>
            <p className="text-xs text-white/50 font-mono">
              Các tham số toàn cục xác định công thức bóc tách khối lượng
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-white/70 font-bold block">CHIỀU CAO THÔNG THỦY (m)</label>
              <input
                type="number"
                step="0.1"
                value={formData.defaultWallHeight}
                onChange={(e) =>
                  setFormData({ ...formData, defaultWallHeight: parseFloat(e.target.value) || 3.2 })
                }
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#ffc474]/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 font-bold block">HỆ SỐ HAO HỤT VẬT TƯ (%)</label>
              <input
                type="number"
                value={formData.wasteFactorPct}
                onChange={(e) =>
                  setFormData({ ...formData, wasteFactorPct: parseInt(e.target.value) || 5 })
                }
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#ffc474]/50"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-3">
            <span className="font-bold text-[#ffc474] block uppercase">
              Khấu trừ Hình học Không gian
            </span>

            <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-[#161822] cursor-pointer hover:border-white/20 transition-colors">
              <div>
                <span className="font-semibold text-white block font-sans">Khấu trừ diện tích Cửa đi</span>
                <span className="text-[11px] text-white/50 font-sans">
                  Tự động trừ diện tích mở cửa đơn/đôi ra khỏi công thức (chu vi × chiều cao)
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.deductDoors}
                onChange={(e) => setFormData({ ...formData, deductDoors: e.target.checked })}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#ffc474] focus:ring-0 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-[#161822] cursor-pointer hover:border-white/20 transition-colors">
              <div>
                <span className="font-semibold text-white block font-sans">Khấu trừ diện tích Cửa sổ</span>
                <span className="text-[11px] text-white/50 font-sans">
                  Trừ diện tích vách kính mặt dựng ra khỏi tổng diện tích tường thô
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.deductWindows}
                onChange={(e) => setFormData({ ...formData, deductWindows: e.target.checked })}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#ffc474] focus:ring-0 cursor-pointer"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div className="space-y-1">
              <label className="text-white/70 font-bold block">SỐ LỚP SƠN LÓT</label>
              <input
                type="number"
                value={formData.primerCoats}
                onChange={(e) =>
                  setFormData({ ...formData, primerCoats: parseInt(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#ffc474]/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 font-bold block">SỐ LỚP SƠN PHỦ</label>
              <input
                type="number"
                value={formData.topCoats}
                onChange={(e) =>
                  setFormData({ ...formData, topCoats: parseInt(e.target.value) || 2 })
                }
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#ffc474]/50"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="amber-button inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu & Tái tính toán</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
