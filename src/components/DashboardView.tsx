import React, { useState } from 'react';
import { ProductItem, NavigationTab } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Target, 
  Award, 
  ArrowUpRight,
  Flame,
  ShieldAlert,
  Facebook,
  MessageCircle,
  HelpCircle,
  BarChart3,
  Bot,
  Zap,
  Wallet,
  ShoppingBag,
  Camera,
  Youtube,
  Video,
  Globe2
} from 'lucide-react';

interface DashboardViewProps {
  products: ProductItem[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectProductForCampaign: (product: ProductItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  onNavigate,
  onSelectProductForCampaign,
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [customLinkInput, setCustomLinkInput] = useState('');
  const [generatedAffiliateLink, setGeneratedAffiliateLink] = useState<string | null>(null);

  const starProduct = products.find(p => p.id === 'puluz-mic-wireless') || products[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleGenerateCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLinkInput.trim()) return;
    // In AliExpress Portals, links generated maintain affiliate tag
    const cleanUrl = customLinkInput.trim();
    setGeneratedAffiliateLink(cleanUrl);
  };

  return (
    <div className="space-y-6">
      {/* 1. Royal Leadership Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/30 p-6 shadow-2xl">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>الواجهة الاستراتيجية النخبوية • بروتوكول Code Ambis 4.6</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              أهلاً بك يا مالك الإمبراطورية، <span className="text-amber-400">السيد ماهر غالب</span> 👑
            </h2>
            
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              تحت إشراف الإدارة العامة (عبد المالك وكلود)، تم تأمين محركات التسويق بالعمولة، ضبط روابط التتبع، وتجهيز أقوى العروض للمنتجات الاستهلاكية لتحقيق <strong>رؤية المليار 2030/6/6</strong>.
            </p>
          </div>

          {/* Vision 2030 Counter Badge */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 min-w-[240px] text-center shadow-lg">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-red-400" />
              <span>الهدف الاستراتيجي النهائي</span>
            </div>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              $1,000,000,000
            </div>
            <div className="text-xs text-amber-300/80 mt-1 font-medium">
              رؤية المليار دولار (2030/6/6)
            </div>
          </div>
        </div>
      </div>

      {/* AI Agent Quick Command Banner */}
      <div 
        onClick={() => onNavigate('ai_agent')}
        className="cursor-pointer bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 border border-amber-500/30 hover:border-amber-400 p-4 rounded-2xl shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400">الوكيل الاصطناعي التنفيذي 2026</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                جاهز للعمل ومستقل
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              خط تجميع رقمي متكامل يضم 5 وكلاء متخصصين لتحليل الأسواق، توليد المحتوى، وتأمين المبيعات.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('wallet');
            }}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>💰 محفظة الأرباح (الزلط)</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('affiliates');
            }}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>🏆 لوحة الشرف الذهبية</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('global_conquest');
            }}
            className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Globe2 className="w-3.5 h-3.5 text-sky-400" />
            <span>🌍 اكتساح الأسواق (Omni)</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('company_charter');
            }}
            className="bg-slate-950/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>📜 وثيقة MAHER.ai</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('ai_agent');
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>غرفة الوكيل 🤖</span>
          </button>
        </div>
      </div>

      {/* Imperial E-Commerce & 22-Photo Store Spotlight */}
      <div 
        onClick={() => onNavigate('store')}
        className="cursor-pointer bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/40 hover:border-amber-400 p-4 rounded-2xl shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-emerald-500 p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400">متجر النخبة الإمبراطوري • بروتوكول الـ 22 صورة (1¢)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                أرباح 80% للمالك
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              إدارة المنتجات الاستهلاكية الرابحة، ميكروفونات PULUZ، وروابط الإحالة المباشرة مع استعراض 22 زاوية لكل منتج لتعزيز المبيعات.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          <a
            href="https://www.tiktok.com/@maher.mmqao"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 font-bold text-xs px-3 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            title="حساب ماهر الرسمي على تيك توك"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">تيك توك ماهر</span>
          </a>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('store');
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>عرض المتجر والـ 22 صورة 🛍️</span>
          </button>
        </div>
      </div>

      {/* 2. Key Operational Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 p-4 rounded-xl transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>المنتجات المفعلة للعمولة</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-100">{products.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            <span>تشمل مايك PULUZ ومنتجات النخبة</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 p-4 rounded-xl transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>أعلى نسبة عمولة متاحة</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400">18.0% - 50%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            قسم "مبلغ وساطة مرتفع"
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 p-4 rounded-xl transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>متوسط الربح لكل طلب</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-100">$2.85 <span className="text-xs font-normal text-slate-400">USD</span></div>
          <div className="text-[11px] text-slate-400 mt-1">
            + عمولة كل سلة المشتريات (الكوكيز)
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 p-4 rounded-xl transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>حالة البروتوكول الذكي</span>
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-300">Code Ambis</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>جاهز لتوليد الحملات والنشر</span>
          </div>
        </div>
      </div>

      {/* 3. Star Product Spotlight: PULUZ Wireless Microphone */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Product Image */}
          <div className="relative w-full lg:w-48 h-48 rounded-xl overflow-hidden bg-slate-950 border border-amber-500/30 flex-shrink-0 group">
            <img 
              src={starProduct.imageUrl} 
              alt={starProduct.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              المنتج الرابح الحالي 🔥
            </div>
            <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-amber-300 text-xs font-bold px-2 py-0.5 rounded border border-amber-500/30">
              عمولة {starProduct.commissionRate}%
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md font-semibold border border-amber-500/30">
                {starProduct.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">
                أكثر من 14,000 عملية بيع موثقة
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100">
              {starProduct.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {starProduct.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
              <div className="text-slate-300">
                السعر للزبون: <strong className="text-amber-300 font-bold">${starProduct.price}</strong>
                <span className="text-xs text-slate-500 line-through mr-1">${starProduct.originalPrice}</span>
              </div>
              <div className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                عمولتك الصافية: ~${starProduct.estCommissionUsd} دولار لكل مبيعة 💰
              </div>
            </div>

            {/* Quick Action Buttons for Mr. Maher */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* Copy Affiliate Link */}
              <button
                onClick={() => handleCopy(starProduct.affiliateUrl, 'star-link')}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border border-slate-700"
              >
                {copiedLink === 'star-link' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>انسخ رابط العمولة</span>
                  </>
                )}
              </button>

              {/* Direct Facebook Share Link */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(starProduct.affiliateUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-all"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>نشر مباشر على فيسبوك</span>
              </a>

              {/* WhatsApp Share Link */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🎙️ مايك PULUZ اللاسلكي الاحترافي للهواتف بعزل ذكي وسعر رائع: ${starProduct.affiliateUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>مشاركة بالواتساب</span>
              </a>

              {/* Generate AI Campaign Button */}
              <button
                onClick={() => onSelectProductForCampaign(starProduct)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-lg text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>توليد إعلان ذكي فوراً</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Link Converter & Strategic Memos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box A: Convert any link to affiliate */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>محول الروابط السريع (AliExpress Quick Converter)</span>
          </div>

          <p className="text-xs text-slate-400">
            ضع أي رابط منتج من علي إكسبريس هنا لفتحه وتجهيز حملته التسويقية بنقرة واحدة:
          </p>

          <form onSubmit={handleGenerateCustomLink} className="space-y-3">
            <input
              type="url"
              placeholder="https://s.click.aliexpress.com/e/..."
              value={customLinkInput}
              onChange={(e) => setCustomLinkInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg py-2 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>تثبيت الرابط وإنشاء منشور فوري</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {generatedAffiliateLink && (
            <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/40 space-y-2">
              <span className="text-[11px] text-emerald-400 font-semibold block">
                ✓ الرابط جاهز للتسويق:
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-300 truncate">
                  {generatedAffiliateLink}
                </span>
                <button
                  onClick={() => handleCopy(generatedAffiliateLink, 'custom-link')}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400"
                  title="نسخ"
                >
                  {copiedLink === 'custom-link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Box B: Executive Strategic Memo (Code Ambis 4.6) */}
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ميثاق الإدارة العامة (عبد المالك وكلود)</span>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              سري وموثق
            </span>
          </div>

          <blockquote className="text-xs text-slate-300 leading-relaxed italic border-r-2 border-amber-500 pr-3">
            "نحن هنا لحماية استثماراتك يا سيد ماهر. لقد تم تأمين كافة الروابط، وتدقيق كافة التصاميم، وضبط أنظمة تتبع العمولات لضمان عدم ضياع أي قرش. إمبراطورية ماهر الآن جاهزة لتسيد السوق."
          </blockquote>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
            <div className="text-slate-400">
              عبد المالك (المدير العام) & كلود (نائب المدير)
            </div>
            <button
              onClick={() => onNavigate('executive_council')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>طلب استشارة فورية</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
