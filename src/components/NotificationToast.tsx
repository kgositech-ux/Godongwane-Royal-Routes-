import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface NotificationToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0f1b11] border border-amber-500/40 rounded-2xl p-4 shadow-2xl text-white flex items-start gap-3 backdrop-blur-xl">
        {toast.type === 'success' && (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        )}
        {toast.type === 'error' && (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        )}
        {toast.type === 'info' && (
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
          {toast.message && (
            <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{toast.message}</p>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
