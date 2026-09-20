import React from 'react';
import { X, History, User, Clock, CheckCircle2, FileText, Database } from 'lucide-react';
import { AuditEvent } from '../../types';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditTrail: AuditEvent[];
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  auditTrail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-[#12141a] rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161822]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#ffc474]" />
              Nhật ký Kiểm toán & Lịch sử Kỹ thuật Bất biến
            </h2>
            <p className="text-xs text-white/50 font-mono">
              Nhật ký hành động được gắn dấu thời gian phục vụ thẩm định minh bạch
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Body */}
        <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
          <div className="relative pl-6 border-l-2 border-white/10 space-y-6">
            {auditTrail.map((ev) => (
              <div key={ev.id} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-[#ffc474] border-2 border-[#12141a] shadow-xs group-hover:scale-125 transition-transform" />

                <div className="flex items-center justify-between font-mono text-xs text-white/40">
                  <span className="font-bold text-white text-xs">
                    {ev.action}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/40">
                    <Clock className="w-3 h-3 text-[#ffc474]" />
                    {ev.timestamp}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#ffc474] mt-0.5">
                  Đối tượng: {ev.target} · Người thực hiện: {ev.user}
                </div>

                <p className="text-xs text-white/70 mt-1 font-sans bg-white/5 p-3 rounded-xl border border-white/10">
                  {ev.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#161822] flex items-center justify-between text-xs font-mono text-white/40">
          <span>Tổng số sự kiện ghi nhận: {auditTrail.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
