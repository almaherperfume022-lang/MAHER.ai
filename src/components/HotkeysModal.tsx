import React, { useEffect, useState } from 'react';
import { NavigationTab } from '../types';
import { 
  Command, 
  Keyboard, 
  LayoutDashboard, 
  Wallet, 
  Sparkles, 
  Globe2, 
  ShoppingBag, 
  Bot, 
  Video, 
  Users, 
  X, 
  Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HotkeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const HOTKEYS_CONFIG: { 
  key: string; 
  secondaryKey?: string; 
  label: string; 
  tab: NavigationTab; 
  icon: React.ReactNode; 
  category: 'primary' | 'tools' | 'governance';
}[] = [
  { key: '1', secondaryKey: 'd', label: 'لوحة القيادة والاستراتيجية', tab: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 text-amber-400" />, category: 'primary' },
  { key: '2', secondaryKey: 'w', label: 'محفظة الأرباح (الزلط 80%)', tab: 'wallet', icon: <Wallet className="w-4 h-4 text-emerald-400" />, category: 'primary' },
  { key: '3', secondaryKey: 'a', label: 'الحلول الإعلانية الذكية (AI)', tab: 'campaigns', icon: <Sparkles className="w-4 h-4 text-purple-400" />, category: 'primary' },
  { key: '4', secondaryKey: 'g', label: 'اكتساح الأسواق العالمية (Omni)', tab: 'global_conquest', icon: <Globe2 className="w-4 h-4 text-sky-400" />, category: 'tools' },
  { key: '5', secondaryKey: 's', label: 'متجر النخبة (22 صورة)', tab: 'store', icon: <ShoppingBag className="w-4 h-4 text-amber-300" />, category: 'tools' },
  { key: '6', secondaryKey: 'c', label: 'الوكيل الاصطناعي (AI Agent)', tab: 'ai_agent', icon: <Bot className="w-4 h-4 text-indigo-400" />, category: 'tools' },
  { key: '7', secondaryKey: 't', label: 'استوديو تيك توك السينمائي', tab: 'tiktok', icon: <Video className="w-4 h-4 text-pink-400" />, category: 'tools' },
  { key: '8', secondaryKey: 'l', label: 'لوحة الشرف وبوابة المسوقين', tab: 'affiliates', icon: <Users className="w-4 h-4 text-amber-400" />, category: 'governance' },
];

export const HotkeysModal: React.FC<HotkeysModalProps> = ({ isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 w-full max-w-xl shadow-2xl relative overflow-hidden"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                  <span>اختصارات لوحة المفاتيح السريعة (Hotkeys)</span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-mono border border-amber-500/30">
                    Pro Navigation
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  تنقل فوري بين أقسام الإمبراطورية دون الحاجة لاستخدام الماوس
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shortcuts Grid */}
          <div className="py-4 space-y-2">
            <div className="text-[11px] font-bold text-amber-400/90 mb-2">الأقسام الرئيسية والاستراتيجية:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HOTKEYS_CONFIG.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    onNavigate(item.tab);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 transition-all text-right group"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-200">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.secondaryKey && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-300 bg-slate-950 border border-slate-700 rounded shadow-sm">
                        {item.secondaryKey.toUpperCase()}
                      </kbd>
                    )}
                    <span className="text-[10px] text-slate-500">/</span>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-300 bg-slate-950 border border-amber-500/40 rounded shadow-sm">
                      {item.key}
                    </kbd>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tip Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>اضغط <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-amber-300 border border-slate-700 rounded">?</kbd> أو <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-amber-300 border border-slate-700 rounded">K</kbd> لفتح هذه القائمة بأي وقت</span>
            </div>

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow"
            >
              فهمت ذلك ✓
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
