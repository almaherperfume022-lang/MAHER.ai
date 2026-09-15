import React, { useState } from 'react';
import { ProductItem } from '../types';
import { 
  Globe2, 
  Sparkles, 
  Crown, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Copy, 
  Check, 
  Play, 
  Layers, 
  Radio, 
  Send, 
  Cpu, 
  Target, 
  Compass, 
  Activity, 
  Eye, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  CheckCircle2, 
  Flame,
  Film,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalMarketConquestViewProps {
  products: ProductItem[];
  onSelectProductForCampaign?: (product: ProductItem) => void;
  onNavigateToWallet?: () => void;
}

export const GlobalMarketConquestView: React.FC<GlobalMarketConquestViewProps> = ({
  products,
  onSelectProductForCampaign,
  onNavigateToWallet
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('US');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(products[0]);
  const [strategyMode, setStrategyMode] = useState<string>('omni_multilingual_conquest');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'english' | 'arabic' | 'spanish' | 'german'>('english');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live Conquest Data State
  const [conquestData, setConquestData] = useState<any>({
    conquestTitle: "بروتوكول السيطرة الكونية - منظومة إمبراطورية MAHER بالذكاء الاصطناعي 2026",
    dominanceIndex: 99.8,
    marketOpportunityUSD: "85,000,000$+ سوق مستهدف",
    projectedRevenueUSD: 148500.00,
    ownerShareUSD: 118800.00, // 80%
    operationsShareUSD: 29700.00, // 20%
    targetRegionLabel: "السوق الأمريكي والأوروبي والخليجي (Global Mega Markets)",
    omniTactics: [
      {
        pillar: "الهيمنة البصرية الإمبراطورية (بروتوكول 22 صورة بـ 1¢)",
        description: "توفير تغطية 360 سينمائية للمنتج تمنع تردد المشتري وترفع معدل التحويل (Conversion Rate) بمعدل 4.8x.",
        executionSpeed: "فوري وتلقائي 24/7",
        impactFactor: "معدل تحويل +480%"
      },
      {
        pillar: "محرك الجوزاء و أومني متعدد اللغات (Omni-Language Swarm)",
        description: "صناعة سكريبتات وهوكات إعلانية بـ 6 لغات عالمية تحاكي ثقافة المشتري الأمريكي والأوروبي والخليجي بدقة.",
        executionSpeed: "أقل من 30 ثانية",
        impactFactor: "تغطية 140+ دولة"
      },
      {
        pillar: "مصنع شورتس وفيديوهات 3D الفيروسية",
        description: "إنتاج عشرات مقاطع الفيديو القصيرة التي تتصدر For You Page (FYP) وتحول المشاهدات إلى مبيعات كاش عبر الرابط.",
        executionSpeed: "إنتاج مستمر 24/7",
        impactFactor: "ملايين المشاهدات المجانية"
      }
    ],
    multilingualCampaigns: {
      english: {
        hook: "Stop recording low-quality audio! This pocket wireless mic upgrades your videos instantly for under $15.",
        adScript: "Full noise suppression, 20m ultra-stable range, and instant plug-and-play for iPhone & Android. Verified link in bio!",
        callToAction: "Order now via the verified bio link to unlock exclusive 40% discount!"
      },
      arabic: {
        hook: "الصوت الرديء يدمّر مشاهداتك! شوف الفرق الصادم مع ميكروفون PULUZ الإمبراطوري 🎙️🔥",
        adScript: "عزل صوتي فوري للضوضاء والرياح، بطارية تدوم طوال اليوم، وتوصيل مباشر بدون تطبيقات. رابط الخصم المعتمد في البايو وأول تعليق!",
        callToAction: "اطلب الآن عبر الرابط الحصري واستفد من العرض قبل نفاد الكمية!"
      },
      spanish: {
        hook: "¿Tus videos suenan mal? ¡Este micrófono inalámbrico profesional cuesta menos de 15$!",
        adScript: "Cancelación de ruido automática, batería de larga duración y calidad de estudio para creadores de TikTok y YouTube.",
        callToAction: "¡Consigue el tuyo en el enlace del perfil con descuento especial hoy!"
      },
      german: {
        hook: "Schlechte Audioqualität zerstört deine Reichweite! Hier ist die Lösung unter 15 Euro.",
        adScript: "Kristallklarer Sound mit intelligenter Rauschunterdrückung. Sofort einsatzbereit für Smartphone & Kamera.",
        callToAction: "Jetzt direkt über den verifizierten Link bestellen und sparen!"
      }
    },
    visualEnginePrompts: [
      "Format: 9:16 vertical widescreen, 8K ultra-cinematic macro shot of PULUZ wireless microphone on luxury obsidian pedestal, floating golden soundwaves, studio lighting, hyper-realistic, award-winning commercial.",
      "Cinematic lifestyle footage of content creator recording in noisy city square, instant noise-cancellation visualizer overlay, crystal audio visual feedback, 4k render."
    ],
    actionPlanSteps: [
      "1. تفعيل حزمة الـ 22 صورة الإلزامية بالمتجر لضمان أعلى ثقة وتحويل.",
      "2. إطلاق هوكات الفيديو الفيروسية المتعددة اللغات على TikTok و YouTube Shorts.",
      "3. توجيه ملايين المشاهدات لرابط الإحالة المعتمد لعلي إكسبريس (PULUZ).",
      "4. تحويل العمولات مباشرة إلى محفظة MAHER.ai وتوزيعها: 80% للمالك السيد ماهر و 20% لتشغيل وتطوير الخوادم."
    ],
    emperorBriefing: "سيدي ومؤسس الإمبراطورية السيد ماهر غالب: محركات Gemini و Omni مهيأة بالكامل لاكتساح الأسواق العالمية وسحق أي منافس تقليدي وصب الأرباح مباشرة في محفظتك السيادية."
  });

  const regions = [
    { id: 'US', name: 'الولايات المتحدة (USA)', flag: '🇺🇸', power: 'سوق تريليوني - قوة شرائية عظمى', audience: 'صناع محتوى تيك توك ومشتري أمازون/علي إكسبريس' },
    { id: 'EU', name: 'الاتحاد الأوروبي (EU)', flag: '🇪🇺', power: 'ألمانيا وبريطانيا وفرنسا', audience: 'مشترين يبحثون عن الجودة العالية والشهادات المعتمدة' },
    { id: 'GCC', name: 'الخليج العربي (GCC)', flag: '🇸🇦', power: 'السعودية، الإمارات، قطر، الكويت', audience: 'جمهور نخبوي يقدر المنتجات الفاخرة وسرعة الشحن' },
    { id: 'ASIA', name: 'آسيا والمحيط الهادئ (APAC)', flag: '🌏', power: 'حجم مبيعات فيروسي هائل', audience: 'ترندات تيك توك سريعة الانتشار ومبيعات مليونية' },
    { id: 'LATAM', name: 'أمريكا اللاتينية (LATAM)', flag: '🌎', power: 'أعلى معدل نمو في التجارة الاجتماعية', audience: 'جمهور متفاعل جداً مع فيديوهات الشورتس' },
  ];

  const strategies = [
    { id: 'omni_multilingual_conquest', name: 'الاجتياح الفيروسي المتعدد اللغات (Omni Viral Blitz)', desc: 'توليد هوكات وسكريبتات بـ 6 لغات عالمية لضرب كافة خوارزميات FYP' },
    { id: 'visual_dominance_22', name: 'الهيمنة البصرية المطلقة (22 صورة بـ 1¢)', desc: 'إلزامية الـ 22 زاوية تصوير لتدمير أي شك لدى المشتري ورفع التحويل 4.8x' },
    { id: 'arbitrage_dominance', name: 'تحكيم الأسعار واقتناص العمولات (High-Margin Arbitrage)', desc: 'مقارنة الأسعار العالمية واستهداف أعلى هامش ربحي للمنتجات الفائزة' },
  ];

  const handleLaunchConquest = async () => {
    setIsLaunching(true);
    try {
      const res = await fetch('/api/omni-global-conquest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRegion: selectedRegion,
          productName: selectedProduct.title,
          strategyMode: strategyMode,
          targetAudience: regions.find(r => r.id === selectedRegion)?.audience || 'Global Audience',
          conversionTarget: '4.8x Industry Baseline'
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setConquestData(json.data);
      }
    } catch (err) {
      console.error('Conquest launch error:', err);
    } finally {
      setIsLaunching(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Royal Emperor Super-Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>إمبراطورية MAHER لاكتساح الأسواق العالمية</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>محركات الجوزاء و أومني الكونية (Gemini & Omni 2026)</span>
              </span>
              <span className="bg-purple-500/20 text-purple-300 font-bold text-xs px-3 py-1 rounded-full border border-purple-500/30">
                اتفاقية العقد: 80% للمالك | 20% لتشغيل وتطوير المنظومة
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-100 via-amber-300 to-amber-500 font-serif">
              مركز القيادة الكوني لاكتساح وتطويع الأسواق الدولية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              تحت القيادة المباشرة للمالك والمؤسس <strong className="text-amber-300">السيد ماهر غالب سعد حسن</strong>، تم تسخير أحدث نماذج الذكاء الاصطناعي متعدد الوسائط (Gemini Multimodal & Omni Vision) لإنتاج محتوى فيروسي عالمي، وتطبيق بروتوكول الـ 22 صورة الإلزامية، وتحقيق عوائد مالية تكسر احتكار كبرى الشركات العالمية نحو هدف المليار 2030.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
            <button
              onClick={handleLaunchConquest}
              disabled={isLaunching}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 text-sm"
            >
              {isLaunching ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الاكتساح الكوني...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-slate-950 fill-current animate-bounce" />
                  <span>إطلاق بروتوكول الاكتساح الفوري ⚡</span>
                </>
              )}
            </button>
            <div className="text-center text-[10px] text-amber-300/80 font-mono">
              Quantum Engine Ready • Zero Latency
            </div>
          </div>
        </div>
      </div>

      {/* Global Markets & Target Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Region & Product Selectors */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Target Region Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-slate-200">الأسواق والأقاليم المستهدفة:</span>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">
                {regions.length} أقاليم كبرى
              </span>
            </div>

            <div className="space-y-2">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`w-full text-right p-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedRegion === reg.id
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{reg.flag}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-100">{reg.name}</div>
                      <div className="text-[10px] text-slate-400">{reg.power}</div>
                    </div>
                  </div>
                  {selectedRegion === reg.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black text-slate-200">المنتج الإمبراطوري المستهدف:</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">
                22 صورة معتمدة
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`w-full text-right p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                    selectedProduct.id === p.id
                      ? 'bg-emerald-500/15 border-emerald-500/60 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={p.imageUrl} alt={p.title} className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-700" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{p.title}</div>
                    <div className="text-[10px] text-amber-300 font-mono font-bold">${p.price} • عمولة {p.commissionRate}%</div>
                  </div>
                  {selectedProduct.id === p.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Strategy Mode Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-xs font-black text-slate-200 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>نمط الاجتياح التكتيكي:</span>
            </div>

            <div className="space-y-2">
              {strategies.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStrategyMode(s.id)}
                  className={`w-full text-right p-2.5 rounded-xl border transition-all ${
                    strategyMode === s.id
                      ? 'bg-purple-500/15 border-purple-500/60 text-purple-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 text-xs'
                  }`}
                >
                  <div className="text-xs font-bold">{s.name}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right 2 Columns: Live Imperial Conquest Blueprint */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Top Live Financial Output Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* 1. Market Opportunity */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg">
              <div className="text-[11px] text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                <span>حجم السوق المستهدف:</span>
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">
                {conquestData.marketOpportunityUSD || '$85,000,000+'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">مؤشر الهيمنة: {conquestData.dominanceIndex || 99.8}%</div>
            </div>

            {/* 2. 80% Emperor Share */}
            <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-2 border-amber-500/40 p-4 rounded-2xl shadow-lg">
              <div className="text-[11px] text-amber-300 font-black mb-1 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>أرباح المالك السيد ماهر (80%):</span>
              </div>
              <div className="text-2xl font-black text-amber-300 font-mono">
                ${(conquestData.ownerShareUSD || 118800).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-1">سحب فوري للحساب البنكي ✓</div>
            </div>

            {/* 3. 20% Operations Share */}
            <div className="bg-gradient-to-br from-sky-500/15 via-slate-900 to-slate-950 border border-sky-500/40 p-4 rounded-2xl shadow-lg">
              <div className="text-[11px] text-sky-300 font-bold mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                <span>تشغيل وتطوير المنظومة (20%):</span>
              </div>
              <div className="text-xl font-black text-slate-100 font-mono">
                ${(conquestData.operationsShareUSD || 29700).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">تطوير مستمر لخوادم الذكاء الاصطناعي</div>
            </div>

          </div>

          {/* Emperor Briefing */}
          {conquestData.emperorBriefing && (
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
              <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black text-amber-300 mb-0.5">برقية الوكيل الاصطناعي إلى صاحب الإمبراطورية:</div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {conquestData.emperorBriefing}
                </p>
              </div>
            </div>
          )}

          {/* Multilingual Viral Campaign Center (Omni Engine) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-slate-100">حزم المحتوى الفيروسي المتعدد اللغات (Omni Viral Matrix)</h3>
                  <p className="text-[11px] text-slate-400">مصاغة بأعلى المعايير العالمية لاقتناص المبيعات فوراً</p>
                </div>
              </div>

              {/* Language Selector Tabs */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                {(['english', 'arabic', 'spanish', 'german'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLangTab(lang)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeLangTab === lang
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'english' && '🇺🇸 English'}
                    {lang === 'arabic' && '🇸🇦 العربية'}
                    {lang === 'spanish' && '🇪🇸 Español'}
                    {lang === 'german' && '🇩🇪 Deutsch'}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Language Content */}
            {conquestData.multilingualCampaigns?.[activeLangTab] ? (
              <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                
                {/* 1. Viral Hook */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                    <span>⚡ الهوك الافتتاحي الفيروسي (Viral 3s Hook):</span>
                    <button
                      onClick={() => handleCopy(conquestData.multilingualCampaigns[activeLangTab].hook, `hook_${activeLangTab}`)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 transition-all"
                    >
                      {copiedKey === `hook_${activeLangTab}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                      <span>{copiedKey === `hook_${activeLangTab}` ? 'تم النسخ' : 'نسخ الهوك'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-semibold text-slate-100">
                    "{conquestData.multilingualCampaigns[activeLangTab].hook}"
                  </div>
                </div>

                {/* 2. Ad Script */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-sky-300 mb-1">
                    <span>🎬 سكريبت الإعلان المباشر (TikTok / Reels Ad Script):</span>
                    <button
                      onClick={() => handleCopy(conquestData.multilingualCampaigns[activeLangTab].adScript, `script_${activeLangTab}`)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 transition-all"
                    >
                      {copiedKey === `script_${activeLangTab}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-sky-400" />}
                      <span>{copiedKey === `script_${activeLangTab}` ? 'تم النسخ' : 'نسخ السكريبت'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    {conquestData.multilingualCampaigns[activeLangTab].adScript}
                  </div>
                </div>

                {/* 3. Call to Action */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300 mb-1">
                    <span>🛒 الدعوة للشراء ورابط الإحالة المعتمد (CTA & Verified Link):</span>
                    <button
                      onClick={() => handleCopy(selectedProduct.affiliateUrl, `cta_${activeLangTab}`)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 transition-all"
                    >
                      {copiedKey === `cta_${activeLangTab}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-emerald-400" />}
                      <span>{copiedKey === `cta_${activeLangTab}` ? 'تم النسخ' : 'نسخ رابط الإحالة'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-2">
                    <span className="truncate">{conquestData.multilingualCampaigns[activeLangTab].callToAction}</span>
                    <code className="bg-slate-950 text-amber-300 font-mono px-2 py-0.5 rounded text-[10px] border border-slate-800 shrink-0">
                      {selectedProduct.affiliateUrl}
                    </code>
                  </div>
                </div>

              </div>
            ) : null}

          </div>

          {/* Visual Engine Prompts (Sora / Higgsfield 3D / Studio Master) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-black text-slate-200">برومبتات محرك الفيديو ثلاثي الأبعاد والـ 22 صورة الإمبراطورية:</span>
              </div>
              <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded font-mono">
                Sora / Higgsfield / Runway Ready
              </span>
            </div>

            <div className="space-y-2">
              {(conquestData.visualEnginePrompts || []).map((prompt: string, idx: number) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-slate-300 line-clamp-2 text-[11px]">{prompt}</span>
                  <button
                    onClick={() => handleCopy(prompt, `prompt_${idx}`)}
                    className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    {copiedKey === `prompt_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-purple-400" />}
                    <span>{copiedKey === `prompt_${idx}` ? 'تم النسخ' : 'نسخ البرومبت'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps for World Domination */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-xs font-black text-slate-200 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>خريطة تنفيذ الاكتساح خطوة بخطوة:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(conquestData.actionPlanSteps || []).map((step: string, sIdx: number) => (
                <div key={sIdx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2 text-xs">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="text-slate-300 font-medium leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
