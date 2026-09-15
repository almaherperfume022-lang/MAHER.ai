import React, { useState } from 'react';
import { ProductItem } from '../types';
import { X, ChevronRight, ChevronLeft, Sparkles, DollarSign, Image as ImageIcon, ShieldCheck, Download, Copy, Check } from 'lucide-react';

interface Imperial22PhotosModalProps {
  product: ProductItem;
  onClose: () => void;
}

export const Imperial22PhotosModal: React.FC<Imperial22PhotosModalProps> = ({ product, onClose }) => {
  const images = product.galleryImages || [];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const angleDescriptions = [
    '01. اللقطة التأسيسية الشاملة (Master Front Shot)',
    '02. منظور جانبي ديناميكي بزاوية 45 درجة',
    '03. مسقط علوي إعلاني فخم (Flatlay Perspective)',
    '04. ماكرو فائق الدقة لخامات وجودة التصنيع',
    '05. مقياس بشري في يد المستخدم لبيان الحجم',
    '06. لقطة فتح الصندوق الملكي وتغليف الهدايا',
    '07. لايف ستايل في ضوء النهار الطبيعي',
    '08. إضاءة سينمائية احترافية في الاستوديو',
    '09. تفاصيل الأزرار والتشطيبات الهندسية الدقيقة',
    '10. المنتج أثناء التشغيل الحي والاستخدام الفعلي',
    '11. زاوية جانبية يسرى تبرز الأبعاد والمنافذ',
    '12. زاوية جانبية يمنى متناسقة',
    '13. الملحقات الكاملة وكابلات الشحن المضمنة',
    '14. توزيع الألوان والخيارات المتاحة للزبون',
    '15. اختبار الصلوبة والمتانة ومقاومة الاستهلاك',
    '16. إنفوجرافيك المقاسات والأبعاد بالمليمتر',
    '17. إضاءة ليلية وتوهج المؤشرات الذكية',
    '18. علبة التغليف الفاخرة المعتمدة للشحن',
    '19. قرب فائق للمنافذ والعزل الصوتي',
    '20. تجربة فتح الصندوق الحقيقية من المشتري',
    '21. فحص مقاومة الرطوبة والرياح',
    '22. الختم الإمبراطوري وضمان الجودة المعتمد 2026'
  ];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCopyCurrent = () => {
    if (images[selectedIndex]) {
      navigator.clipboard.writeText(images[selectedIndex]);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 font-mono">
                  معرض الـ 22 صورة الإمبراطورية الإلزامية
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  سعر الصورة: 1 سنت (0.01$)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-100 line-clamp-1">
                {product.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-all"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle Main Preview */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden min-h-0">
          {/* Main Large Image Container */}
          <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center group min-h-[260px] sm:min-h-[340px]">
            {images[selectedIndex] ? (
              <img
                src={images[selectedIndex]}
                alt={`Shot ${selectedIndex + 1}`}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="text-slate-500 text-xs">لا توجد صور متوفرة</div>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-full border border-slate-700 shadow-xl transition-all z-10"
                  title="الصورة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-full border border-slate-700 shadow-xl transition-all z-10"
                  title="الصورة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Floating Index Tag */}
            <div className="absolute top-3 right-3 bg-slate-950/90 text-amber-300 font-mono text-xs font-black px-3 py-1 rounded-xl border border-amber-500/30 flex items-center gap-1.5">
              <span>الصورة {selectedIndex + 1} من {images.length}</span>
              <span className="text-[10px] text-slate-400">• 0.01$</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 pt-6 flex items-center justify-between text-xs">
              <span className="text-slate-200 font-bold truncate">
                {angleDescriptions[selectedIndex] || `اللقطة الإمبراطورية رقم ${selectedIndex + 1}`}
              </span>

              <button
                onClick={handleCopyCurrent}
                className="shrink-0 flex items-center gap-1 text-[11px] bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 transition-all font-bold"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ رابط الصورة'}</span>
              </button>
            </div>
          </div>

          {/* Right/Side Thumbnails Grid */}
          <div className="w-full md:w-64 bg-slate-950/60 rounded-2xl border border-slate-800 p-3 overflow-y-auto max-h-[160px] md:max-h-[380px] space-y-2">
            <div className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
              <span>فهرس الـ 22 زاوية:</span>
              <span className="text-amber-400 font-mono">22 Shots</span>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                    selectedIndex === idx
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                      : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] font-mono text-center text-slate-300 py-0.5">
                    #{idx + 1} (1¢)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Financial / Operational Summary */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              بروتوكول الـ 22 صورة الإلزامية: تضمن تغطية بصرية 360 درجة لرفع معدل التحويل (Conversion Rate) بمعدل 4.2x.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950 border border-amber-500/30 px-3 py-1.5 rounded-xl font-mono text-amber-300 font-bold">
              إجمالي تكلفة الصور: 0.22$
            </div>
            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-xl transition-all"
            >
              تم الاعتماد ✓
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
